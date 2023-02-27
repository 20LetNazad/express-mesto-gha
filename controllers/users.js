const User = require("../models/user");

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong ${err}` })
    );
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong ${err}` })
    );
};

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong ${err}` })
    );
};
