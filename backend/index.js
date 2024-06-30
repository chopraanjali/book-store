import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

//Middleware to parse json body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  res.send('HELLO');
});

// Middleware to handle express routing
app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(
    app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
