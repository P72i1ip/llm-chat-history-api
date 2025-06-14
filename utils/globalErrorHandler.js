import AppError from './appError.js'; // Import the AppError class

const handleCastErrorDB = (err) => {
  // Handle Mongoose CastError
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  // Handle Mongoose duplicate key error
  const value = err.keyValue.name; // Assuming 'name' is the field that is duplicated
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  // Handle Mongoose ValidationError
  const errors = Object.values(err.errors).map(
    (el) => el.message
  );
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError(
    'Your token has expired! Please log in again.',
    401
  );

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // Operational errors are trusted and can be sent to the client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown errors are not trusted and should not be sent to the client
    console.error('ERROR:\n', err); // Log the error for debugging purposes
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  // this middleware will be executed if an error occurs
  err.statusCode = err.statusCode || 500; // set default status code to 500
  err.status = err.status || 'error'; // set default status to error

  if (process.env.NODE_ENV === 'development') {
    // In development, send detailed error information
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // In production, handle errors differently
    let error = err; // start with the original error
    // console.log(err.keyValue.name);
    if (err.name === 'CastError')
      error = handleCastErrorDB(err);
    if (err.code === 11000)
      error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError')
      error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError')
      error = handleJWTError();
    if (err.name === 'TokenExpiredError')
      error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
  // next(); // this will not be executed since we are sending a response
};

export default globalErrorHandler;
