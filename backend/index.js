import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware to parse json body
app.use(express.json());

//Middleware to handle CORS policy
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

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
