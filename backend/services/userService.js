import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import errors from "../utils/errors.js";

const login = async (data) => {
  const { identifier, password } = data;

  let user;
  // El usuario ingresó un email
  if (identifier.includes("@")) {
    user = await User.findOne({ where: { email: identifier } });
  // El usuario ingresó un RUT
  } else {
    user = await User.findOne({ where: { rut: identifier } });
  }

  if (!user) {
    throw new errors.UserNotFoundError();
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new errors.IncorrectPasswordError();
  }

  return user;
};

export default {
  login,
}
