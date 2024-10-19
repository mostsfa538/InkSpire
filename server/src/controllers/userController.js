const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

class userController {
    static async getBooks(req, res) {
        try {
            const books = await prisma.book.findMany();
            if (!books) {
                return res.status(404).json({ message: "No books found" });
            }
            res.status(200).json(books);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred' });
        }
    }

    static async searchByCategory(req, res) {
        const { searchTerm } = req.params;
        try {
            const books = await prisma.book.findMany({
                where: {
                    OR: [
                    {
                        title: {
                            contains: searchTerm
                        },
                    },
                    {
                        author: {
                            contains: searchTerm
                        },
                    },
                    {
                        category: {
                            contains: searchTerm
                        },
                    },
                    ],
                },
            });
            if (!books) {
                return res.status(404).json({ message: "No books found" });
            }
            res.status(200).json(books);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred during search' });
        }
    }

    static async uploadBook(req, res) {
        const { title, author, image, price, description } = req.body;
        const userId = req.params.userId;
        try {
            const book = await prisma.onHold.create({
                data: {
                    title: title,
                    author: author,
                    image: image,
                    price: price,
                    description: description,
                    status: "pending",
                    user: {
                        connect: {
                            id: parseInt(userId)
                        }
                    }
                }
                
            });
            res.status(201).json(book);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred during upload' });
        }
    }

    static async updateBook(req, res) {
        const { title, author, image, price, description } = req.body;
        const bookId = req.params.id;
        try {
            const book = await prisma.onHold.update({
                where: {
                    id: parseInt(bookId)
                },
                data: {
                    title: title,
                    author: author,
                    image: image,
                    price: price,
                    description: description
                }
            });
            res.status(200).json(book);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred during update' });
        }
    }

    static async deleteBook(req, res) {
        const bookId = req.params.id;
        try {
            const book = await prisma.onHold.delete({
                where: {
                    id: parseInt(bookId)
                }
            });
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json({ message: 'An error occurred during delete' });
        }
    }

    static async showBooksStatus(req, res) {
        const userId = req.params.userId;
        try {
            const books = await prisma.onHold.findMany({
                where: {
                    id: parseInt(userId)
                }
            });
            if (!books) {
                return res.status(404).json({ message: "No books found" });
            }
            res.status(200).json(books);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred' });
        }
    }

    static async updateProfile(req, res) {
        const { f_name, l_name, image } = req.body;
        const userId = req.params.userId;
        try {
            const user = await prisma.user.update({
                where: {
                    id: parseInt(userId)
                },
                data: {
                    f_name: f_name,
                    l_name: l_name,
                    image: image,
                }
            });
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred during update' });
        }
    }
}

module.exports = userController;