class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super("user not found", 404);
  }
}

class IncorrectPasswordError extends AppError {
  constructor() {
    super("incorrect password", 401);
  }
}

export default {
  UserNotFoundError,
  IncorrectPasswordError,
};
