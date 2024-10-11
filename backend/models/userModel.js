import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
import { validateRut } from "../utils/rutValidator.js";

export default User = sequelize.define(
  "User",
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
          } else if (!validateRut(value)) throw new Error("rut is not valid");
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
    hooks: {
      // Antes de validar los datos, eliminar espacios en blanco del RUT y el
      // email, y convertir el email a minúsculas
      beforeValidate: (user) => {
        user.rut && (user.rut = user.rut.trim());
        user.email && (user.email = user.email.trim().toLowerCase());
      },

      // Antes de crear el usuario, hashear la contraseña y eliminar espacios
      // en blanco del nombre
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        user.name = user.name.trim();
      },
    },
  }
);
