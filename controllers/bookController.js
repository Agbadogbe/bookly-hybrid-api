import Book from '../models/Book.model.js';

const listBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};


const getBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
};


const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: "Error creating book", error: error.message });
    }
};


const updateBook = async (req, res) => {
    try {
        const [updatedRows] = await Book.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const updatedBook = await Book.findByPk(req.params.id);
        res.json(updatedBook);

    } catch (error) {
        res.status(400).json({ message: "Error updating book", error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const deletedCount = await Book.destroy({
            where: { id: req.params.id },
        });
        if (deletedCount === 0) {
            console.log(`Attempted to delete book ID ${req.params.id}, not found.`);
        }
        res.status(204).end(); 
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
};

export default {
    listBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};