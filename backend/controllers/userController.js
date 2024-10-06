import User from "../models/userModel.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};