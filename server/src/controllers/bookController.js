const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

class bookController {
    static async createBook(req, res) {
        const title = req.body.title;
        const author = req.body.author;
        const description = req.body.description;
        const image = req.body.image;
        const price = req.body.price;
        const category = req.body.category;
        const quantity = req.body.quantity;
        try {
            const book = await prisma.book.create({
                data: {
                    title: title,
                    author: author,
                    description: description,
                    image: image,
                    price: price,
                    category: category,
                    quantity: quantity
                }
            });
            if (!book) {
                return res.status(401).json({ message: "Something went wrong" });
            }
            res.status(200).json({ message: 'Book created successfully' });
        } catch (err) {
            res.status(500).json({ message: 'An error occurred during book creation' });
        }
    }

    static async getBooks(req, res) {
        try {
            const books = await prisma.book.findMany();
            if (!books) {
                return res.status(401).json({ message: "No books found" });
            }
            res.status(200).json(books);
        } catch (err) {
            res.status(500).json({ message: 'An error occurred during book retrieval' });
        }
    }

    static async updateBook(req, res) {
        const id = req.params.id;
        const title = req.body.title;
        const author = req.body.author;
        const description = req.body.description;
        const image = req.body.image;
        const price = req.body.price;
        const category = req.body.category;
        const quantity = req.body.quantity;
        try {
            const book = await prisma.book.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    title: title,
                    author: author,
                    description: description,
                    image: image,
                    price: price,
                    category: category,
                    quantity: quantity
                }
            });
            if (!book) {
                return res.status(401).json({ message: "Book not found" });
            }
            res.status(200).json({ message: 'Book updated successfully' });
        } catch (err) {
            res.status(500).json({ message: 'An error occurred during book update' });
        }
    }

    static async deleteBook(req, res) {
        const id = req.params.id;
        try {
            const book = await prisma.book.delete({
                where: {
                    id: parseInt(id),
                }
            });
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (err) {
            if (err.code === 'P2025') {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(500).json({ message: 'An error occurred during book deletion' });
        }
    }
}

module.exports = bookController;