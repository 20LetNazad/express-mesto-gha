const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { tokenKey = 'secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return next(new UnauthorizedError('Authorization required'));
  }

  let payload;

  try {
    payload = jwt.verify(token, tokenKey);
  } catch (err) {
    return next(new UnauthorizedError('Authorization required'));
  }

  req.user = payload;

  next();
};
