import User from "../models/userModel.js";
import { ValidationError } from "sequelize";
import userService from "../services/userService.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send({ message: "user created", user });
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error(err.stack);

      const errorMessages = err.errors.map((error) => error.message);

      return res.status(400).send({ message: errorMessages });
    } else {
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await userService.login(req.body);

    return res.status(200).send({ message: "user logged in", user });
  } catch (err) {
    if (err.isOperational) {
      return res.status(err.statusCode).send({ message: err.message });
    }

    next(err);
  }
};
