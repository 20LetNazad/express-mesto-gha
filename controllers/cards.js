const Card = require("../models/card");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");

module.exports.findCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong ${err}` })
    );
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Incorrect data was transmitted"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Card not found"));
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => next(err));
};

module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Card not found"));
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => next(err));
};

module.exports.delLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Card not found"));
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => next(err));
};
