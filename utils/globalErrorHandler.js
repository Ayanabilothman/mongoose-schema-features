const globalErrorHandler = async (error, req, res, next) =>
  res
    .status(error.cause || 500)
    .json({ success: false, error: error.message, stack: error.stack });

export default globalErrorHandler;
