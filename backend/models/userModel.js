import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { isEmail, isAlphanumeric } from "validator";

class User extends Model {
  errors = [];
  static minimumPasswordLength = 6;
  static rutRegex = /^[1-9]\d?(?:\.\d{3}){2}-[\dK]$/;

  /**
   * Calcula el DV del RUT y verifica si coincide con el ingresado.
   * @returns {boolean} `true` si el RUT es válido, `false` si no.
   */
  validateRut() {
    const [rut, dv] = this.rut.split("-");
    const reversedRut = [...rut].reverse();
    let sum = 0;
    let multiplier = 0;

    for (let i = 0; i < reversedRut.length; i++) {
      if (!isNaN(reversedRut[i])) {
        sum += reversedRut[i] * (multiplier++ % 6 + 2);
      }
    }

    const result = 11 - (sum % 11);
    const calculatedDv = result === 10 ? "K" : result % 11;

    return dv == calculatedDv;
  }

  /**
   * Valida los datos del usuario. En caso de errores, almacena los mensajes
   * en `errors`.
   */
  validate() {
    // Validar nombre
    if (!this.name) {
      this.errors.push("Name is required");
    } else if (!isAlphanumeric(this.name)) {
      this.errors.push("Name must be alphanumeric");
    }

    // Validar RUT
    // Que esté en el formato XX.XXX.XXX-X y su DV sea válido
    if (!this.rut) {
      this.errors.push("RUT is required");
    } else if (!User.rutRegex.test(this.rut) || !this.validateRut()) {
      this.errors.push("RUT is invalid");
    }

    // Validar email
    // Que esté en el formato string@string.string
    if (!this.email) {
      this.errors.push("Email is required");
    } else if (!isEmail(this.email)) {
      this.errors.push("Email is invalid");
    }

    // Validar contraseña
    // Que tenga una longitud mínima
    if (!this.password) {
      this.errors.push("Password is required");
    } else if (this.password.length < User.minimumPasswordLength) {
      this.errors.push(
        `Password must be at least ${User.minimumPasswordLength} characters`
      );
    }
  }

  /**
   * Registra un usuario en la base de datos
   */
  register() {
    this.validate();
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
