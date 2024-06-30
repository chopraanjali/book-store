import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to add a new Book
router.post('/', async (req, res) => {
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
    return res.status(200).send({ message: 'Book added successfully!' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: error.message });
  }
});

// Route to find all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: error.message });
  }
});

// Route to find a book by ObjectID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json(book);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: error.message });
  }
});

// Route to update a book by ObjectID
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send('Please add all fields to proceed!');
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id);
    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    } else {
      return res.status(200).send({ message: 'Book updated successfully!' });
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: error.message });
  }
});

// Route to delete a book by ObjectID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.send({ message: 'Book not found!' });
    }
    return res.status(200).send({ message: 'Book deleted successfully!' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
