const MainErrorHandler = (err, req, res, next) => {
  const errorCode = err.errorCode || 500;
  const message = errorCode === 500 ? 'Something went wrong' : err.message;
  res.status(errorCode).send({ message });
  next();
};

module.exports = MainErrorHandler;
