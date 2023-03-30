const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');

mongoose.set('strictQuery', false);

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6409afc73e2fbf352dfa8ab8',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signup', createUser);
app.post('/signin', login);

app.use((_, res) => {
  res.status(404).send({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
