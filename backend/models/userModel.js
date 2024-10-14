import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
import { validateRut } from "../utils/rutValidator.js";
import {
  MIN_PASSWORD_LENGTH,
  RUT_REGEX,
  validationErrorMessages as messages,
} from "../utils/errors.js";

const User = sequelize.define(
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
        notEmpty: { msg: messages.notEmpty("name") },
      },
    },

    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: messages.notEmpty("rut") },
        isValidRut(value) {
          if (!value.match(RUT_REGEX)) {
            throw new Error(messages.invalidFormat("rut"));
          } else if (!validateRut(value)) {
            throw new Error(messages.notValid("rut"));
          }
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: messages.notEmpty("email") },
        isEmail: { msg: messages.invalidFormat("email") },
      },
    },

    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      validate: {
        notEmpty: { msg: messages.notEmpty("password") },
        len: {
          args: [MIN_PASSWORD_LENGTH, 255],
          msg: messages.tooShort("password", MIN_PASSWORD_LENGTH),
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

export default User;
