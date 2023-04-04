const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function findUserById(req, res, userId) {
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
}

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(500).send({ message: 'Something went wrong' });
    });
};

module.exports.getMyUser = (req, res, next) => {
  findUserById(req.user._id, res, next);
};

module.exports.getUser = (req, res, next) => {
  findUserById(req.params.userId, res, next);
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
};

module.exports.editUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  let userId;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'Incorrect password or email' });
      }

      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        res.status(401).send({ message: 'Incorrect password or email' });
      }

      const token = jwt.sign({ _id: userId }, 'secret-key', {
        expiresIn: '3d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        sameSite: true,
        httpOnly: true,
      });
    })
    .catch(() => {
      res.status(500).send({ message: 'Something went wrong' });
    });
};
