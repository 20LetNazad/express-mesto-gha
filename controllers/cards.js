const Card = require("../models/card");

module.exports.findCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong ${err}` })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong ${err}` })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong ${err}` })
    );
};
