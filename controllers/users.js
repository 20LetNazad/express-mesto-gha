const User = require("../models/user");

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: "Something went wrong" });
    });
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Incorrect data was transmitted" });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Incorrect data was transmitted" });
      } else {
        res.status(500).send({ message: "Something went wrong" });
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
    }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Incorrect data was transmitted" });
      } else {
        res.status(500).send({ message: "Something went wrong" });
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
    }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Incorrect data was transmitted" });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    });
};
