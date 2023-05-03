const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const { registerValidate, loginValidate } = require('./utils/validate');
const NotFoundError = require('./errors/NotFoundError');
const MainErrorHandler = require('./errors/MainErrorHandler');

mongoose.set('strictQuery', false);

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signup', registerValidate, createUser);
app.post('/signin', loginValidate, login);

app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});
app.use(errors());
app.use(MainErrorHandler);

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
