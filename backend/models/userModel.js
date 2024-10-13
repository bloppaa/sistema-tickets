import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
import { validateRut } from "../utils/rutValidator.js";

const MIN_PASSWORD_LENGTH = 6;
const RUT_REGEX = /^\d{1,3}\.\d{3}\.\d{3}-[\dK]$/;

const errorMessages = {
  notEmpty: (field) => `${field} can't be empty`,
  notValid: (field) => `${field} is not valid`,
  invalidFormat: (field) => `${field} is in an invalid format`,
  tooShort: (field, length) => {
    return `${field} must be at least ${length} characters long`;
  },
};

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
        notEmpty: { msg: errorMessages.notEmpty("name") },
      },
    },

    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: errorMessages.notEmpty("rut") },
        isValidRut(value) {
          if (!value.match(RUT_REGEX)) {
            throw new Error(errorMessages.invalidFormat("rut"));
          } else if (!validateRut(value)) {
            throw new Error(errorMessages.notValid("rut"));
          }
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: errorMessages.notEmpty("email") },
        isEmail: { msg: errorMessages.invalidFormat("email") },
      },
    },

    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      validate: {
        notEmpty: { msg: errorMessages.notEmpty("password") },
        len: {
          args: [MIN_PASSWORD_LENGTH, 255],
          msg: errorMessages.tooShort("password", MIN_PASSWORD_LENGTH),
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
