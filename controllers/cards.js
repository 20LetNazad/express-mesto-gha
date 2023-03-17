const Card = require('../models/card');

module.exports.findCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      res.status(500).send({ message: 'Something went wrong' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      } else if (card.owner.toString() === req.user._id) {
        Card.deleteOne()
          .then(() => {
            res.status(200).send({ data: card });
          })
          .catch(() => {
            res.status(500).send({ message: 'Something went wrong' });
          });
      } else {
        res.status(403).send({ message: "It's not your post" });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
};

module.exports.delLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(500).send({ message: 'Something went wrong' });
      }
    });
};
