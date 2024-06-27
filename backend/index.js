import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  //   console.log(req);
  res.send('HELLO');
});

// Route to add a new Book
app.post('/books', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author & publishYear!',
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
  } catch (error) {
    console.log('error', error);
  }
});

// Route to find all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log('error', error);
  }
});

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
