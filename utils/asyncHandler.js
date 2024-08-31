const asyncHandler = (controller) => (req, res, next) =>
  controller(req, res, next).catch(next);

export default asyncHandler;
