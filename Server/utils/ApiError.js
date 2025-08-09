class ApiError extends Error {
  constructor({ message, statusCode, errors = [], stack = "", path = "" }) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.path = path;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
  }
}

export default ApiError;
