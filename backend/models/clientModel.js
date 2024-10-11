import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";

class Client extends Model {
  /**
   * Calcula el DV de un RUT y lo compara con el DV proporcionado.
   * @param {string} rut El RUT a validar.
   * @returns `true` si el RUT es válido, es decir, si los DVs coinciden.
   *          `false` en caso contrario.
   */
  validateRut() {
    const [body, dv] = this.rut.split("-");
    const reversedBody = [...body].reverse();
    let sum = 0;
    let multiplier = 0;

    for (let i = 0; i < reversedBody.length; i++) {
      if (!isNaN(reversedBody[i])) {
        sum += reversedBody[i] * ((multiplier++ % 6) + 2);
      }
    }

    const result = 11 - (sum % 11);
    const calculatedDv = result === 10 ? "K" : result % 11;

    return dv == calculatedDv;
  }
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "name can't be empty" },
      },
    },

    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "rut can't be empty" },
        isValidRut(value) {
          if (!value.match(/^\d{1,3}\.\d{3}\.\d{3}-[\dK]$/)) {
            throw new Error("rut is in an invalid format");
          } else if (!this.validateRut()) throw new Error("rut is not valid");
        },
      },
    },

    companyRut: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "company rut can't be empty" },
        isValidRut(value) {
          if (!value.match(/^\d{1,3}\.\d{3}\.\d{3}-[\dK]$/)) {
            throw new Error("company rut is in an invalid format");
          } else if (!this.validateRut()) {
            throw new Error("company rut is not valid")
          };
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "email can't be empty" },
        isEmail: { msg: "email is not valid" },
      },
    },

    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      validate: {
        notEmpty: { msg: "password can't be empty" },
        len: {
          args: [6, 255],
          msg: "password must be at least 6 characters long",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Client",
    hooks: {
      // Antes de validar los datos, eliminar espacios en blanco del RUT y el
      // email, y convertir el email a minúsculas
      beforeValidate: (client) => {
        client.rut && (client.rut = client.rut.trim());
        client.email && (client.email = client.email.trim().toLowerCase());
      },

      // Antes de crear el usuario, hashear la contraseña y eliminar espacios
      // en blanco del nombre
      beforeCreate: async (client) => {
        client.password = await bcrypt.hash(client.password, 10);
        client.name = client.name.trim();
      },
    },
  }
);

export default Client;
