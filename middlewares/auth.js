const jwt = require('jsonwebtoken');

const { tokenKey = 'secret-key' } = process.env;
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).send({ message: 'Authorization required' });
  }

  let payload;

  try {
    payload = jwt.verify(token, tokenKey);
  } catch (err) {
    res.status(401).send({ message: 'Authorization required' });
  }

  req.user = payload;

  next();
};
