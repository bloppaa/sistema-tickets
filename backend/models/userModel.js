import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";

/**
 * Calcula el DV de un RUT y lo compara con el DV proporcionado.
 * @param {string} rut El RUT a validar.
 * @returns `true` si el RUT es válido, es decir, si los DVs coinciden.
 *          `false` en caso contrario.
 */
const validateRut = function (rut) {
  const [rut, dv] = value.split("-");
  const reversedRut = [...rut].reverse();
  let sum = 0;
  let multiplier = 0;

  for (let i = 0; i < reversedRut.length; i++) {
    if (!isNaN(reversedRut[i])) {
      sum += reversedRut[i] * ((multiplier++ % 6) + 2);
    }
  }

  const result = 11 - (sum % 11);
  const calculatedDv = result === 10 ? "K" : result % 11;

  return dv == calculatedDv;
}

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
        notEmpty: { msg: "name can't be empty" },
        isAlpha: { msg: "name must contain only letters" },
      },
    },

    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "rut can't be empty" },
        is: {
          args: /^[1-9]\d?(?:\.\d{3}){2}-[\dK]$/,
          msg: "rut is not valid",
        },
        isValidRut(value) {
          if (!validateRut(value)) throw new Error("rut is not valid");
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
      // Hashear contraseña antes de crear un usuario
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

export default User;
