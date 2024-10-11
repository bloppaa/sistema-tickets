import Client from "../models/clientModel.js";
import { ValidationError } from "sequelize";

export const register = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);

    return res.status(201).send({ message: "client created", client });
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error(err.stack)

      const errorMessages = err.errors.map((error) => error.message);

      return res.status(400).send({ message: errorMessages });
    } else {
      next(err);
    }
  }
};