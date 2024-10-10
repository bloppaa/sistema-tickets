import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  errors = [];

  /**
   * Valida los datos del usuario
   */
  validate() {
    if (!this.name) {
      this.errors.push("Name is required");
    }
    if (!this.rut) {
      this.errors.push("RUT is required");
    }
    if (!this.email) {
      this.errors.push("Email is required");
    }
    if (!this.password) {
      this.errors.push("Password is required");
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
