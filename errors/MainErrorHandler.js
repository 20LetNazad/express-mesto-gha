const MainErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = MainErrorHandler;
