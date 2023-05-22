const { celebrate, Joi } = require('celebrate');

const urlScheme = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const registerValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlScheme),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const avatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlScheme),
  }),
});

const userSearchByIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const cardSearchByIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlScheme),
  }),
});

module.exports = {
  urlScheme,
  registerValidate,
  loginValidate,
  userValidate,
  avatarValidate,
  userSearchByIdValidate,
  cardSearchByIdValidate,
  cardValidate,
};
