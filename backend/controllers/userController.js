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

export const register = async (req, res, next) => {
  const user = User.build(req.body);
  user.register();

  if (user.errors.length > 0) {
    return res.status(400).send(user.errors);
  } else {
    return res.status(201).send({ message: "User created", user });
  }

  // try {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = await User.create({
  //     name,
  //     rut,
  //     email,
  //     password: hashedPassword,
  //   });

  //   return res.status(201).send({ message: "User created", user });
  // } catch (err) {
  //   next(err);
  // }
};

export const updateUser = async (req, res, next) => {
  const { name, rut, email, password } = req.body;

  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Solo hashear la contraseña si se envió una
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name,
      rut,
      email,
      password: hashedPassword,
    });

    return res.status(200).send({ message: "User updated", user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.destroy();

    return res.status(200).send({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
