const validation = (schema) => {
  return (req, res, next) => {
    let data = { ...req.body, ...req.query, ...req.params };

    const validationResult = schema.validate(data, { abortEarly: false });
    if (validationResult.error?.details)
      return next(
        new Error(JSON.stringify(validationResult.error.details), {
          cause: 400,
        })
      );

    return next();
  };
};

export default validation;
