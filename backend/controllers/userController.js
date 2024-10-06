import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const { name, rut, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      rut,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
};
