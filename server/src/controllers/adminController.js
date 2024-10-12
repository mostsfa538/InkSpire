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

    static async getRequests(req, res) {
        try {
            const requests = await prisma.onHold.findMany({
                where: {
                    status: 'pending'
                }
            })
            if (!requests)
                return res.status(401).json({ message: "No books found" });
            return res.status(200).json(requests);
        } catch (err) {
            res.status(500).json({ message: "An error occurred" });
        }
    }

    static async approveRequest(req, res) {
        const id = req.params.id;
        try {
            const request = await prisma.onHold.findFirst({
                where: {
                    id: parseInt(id),
                }
            });
            if (!request) {
                return res.status(401).json({ message: "Request not found" });
            }

            const book = await prisma.book.create({
                data: {
                    title: request.title,
                    author: request.author,
                    description: request.description,
                    image: request.image,
                    price: request.price,
                    category: request.category,
                    quantity: 1
                }
            });
            if (book) {
                await prisma.onHold.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        status: 'accepted'
                    }
                });
            }
            res.status(200).json({ message: 'Request approved successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred during request approval' });
        }
    }

    static async rejectRequest(req, res) {
        const id = req.params.id;
        try {
            const request = await prisma.onHold.findFirst({
                where: {
                    id: parseInt(id),
                }
            });
            if (!request) {
                return res.status(401).json({ message: "Request not found" });
            }
            await prisma.onHold.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    status: 'cancelled'
                }
            });
            res.status(200).json({ message: 'Request rejected successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred during request rejection' });
        }
    }



}

module.exports = bookController;