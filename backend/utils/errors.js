export const MIN_PASSWORD_LENGTH = 6;

export const RUT_REGEX = /^\d{1,3}\.\d{3}\.\d{3}-[\dK]$/;

export const validationErrorMessages = {
  notEmpty: (field) => `${field} can't be empty`,
  notValid: (field) => `${field} is not valid`,
  invalidFormat: (field) => `${field} is in an invalid format`,
  tooShort: (field, length) => {
    return `${field} must be at least ${length} characters long`;
  },
};

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
  EmptyFieldError,
  WrongFormatError,
  InvalidValueError,
  TooShortError,
};
