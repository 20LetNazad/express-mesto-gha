const Card = require("../models/card");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const CastError = require("../errors/CastError");
const DefaultError = require("../errors/DefaultError");

module.exports.findCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(new DefaultError("Something went wrong")));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Incorrect data was transmitted"));
      } else {
        next(err);
      }
    });
};

// module.exports.deleteCard = (req, res, next) => {
//   Card.findOneAndDelete(req.params.cardId)
//     .then((card) => {
//       if (card.owner._id.toString() !== req.user._id) {
//         next(new NotFoundError("Card not found"));
//       } else {
//         res.status(200).send({ data: card });
//       }
//     })
//     .catch((err) => next(err));
// };

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Card not found"));
      } else if (card.owner.toString() === req.user._id) {
        Card.deleteOne().then(() => {
          res.status(200).send({ data: card });
        });
      } else {
        next(new CastError("It's not your post"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Incorrect data was transmitted"));
      } else {
        next(err);
      }
    });
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
