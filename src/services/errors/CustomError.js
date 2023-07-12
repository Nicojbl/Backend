export class CustomError {
  static createError({ name = "Error", cause, message, errorCode }) {
    const error = new CustomError(message);
    error.name = name;
    error.code = errorCode;
    error.cause = cause;
    console.log("Error", error.cause);
    throw error;
  }
}
