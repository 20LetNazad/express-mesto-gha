const router = require('express').Router();

const { cardSearchByIdValidate, cardValidate } = require('../utils/validate');

const {
  findCards,
  createCard,
  deleteCard,
  setLike,
  delLike,
} = require('../controllers/cards');

router.get('/', findCards);
router.post('/', cardValidate, createCard);
router.put('/:cardId/likes', cardSearchByIdValidate, setLike);
router.delete('/:cardId', cardSearchByIdValidate, deleteCard);
router.delete('/:cardId/likes', cardSearchByIdValidate, delLike);

module.exports = router;
