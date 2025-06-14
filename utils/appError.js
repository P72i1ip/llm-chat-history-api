class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // call the parent constructor with the message
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')
      ? 'fail'
      : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor); // capture the stack trace
  }
}
export default AppError;
