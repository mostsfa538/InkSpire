const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

class reviewController {
    static async createReview(req, res) {
        const bookId = req.body.bookId;
        const userId = req.body.userId;
        const rating = req.body.rating;
        const body = req.body.body;
        try {
            const review = await prisma.review.create({
                data: {
                    rating: rating,
                    body: body,
                    user: {
                        connect: { id: userId }
                    },
                    book: {
                        connect: { id: bookId }
                    }
                }
            });
            if (!review) {
                return res.status(401).json({ message: "Something went wrong" });
            }
            res.status(200).json({ message: 'Review created successfully' });
        } catch (err) {
            res.status(500).json({ message: 'An error occurred during review creation' });
        }
    }

    static async updateReview(req, res) {
        const id = req.params.id;
        const bookId = req.body.bookId;
        const userId = req.body.userId;
        const rating = req.body.rating;
        const body = req.body.body;
        try {
            const review = await prisma.review.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    rating: rating,
                    body: body,
                    user: {
                        connect: { id: userId }
                    },
                    book: {
                        connect: { id: bookId }
                    }
                }
            });
            if (!review) {
                return res.status(401).json({ message: "Something went wrong" });
            }
            res.status(200).json({ message: 'Review updated successfully' });
        } catch (err) {
            if (err.code === 'P2025') {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(500).json({ message: 'An error occurred during review update' });
        }
    }

    static async deleteReview(req, res) {
        const id = req.params.id;
        try {
            const review = await prisma.review.delete({
                where: {
                    id: parseInt(id),
                }
            });
            if (!review) {
                return res.status(401).json({ message: "Something went wrong" });
            }
            res.status(200).json({ message: 'Review deleted successfully' });
        }
        catch (err) {
            if (err.code === 'P2025') {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(500).json({ message: 'An error occurred during review deletion' });
        }
    }
    
    static async getReviewsByBook(req, res) {
        const bookId = req.params.bookId;
        try {
            const reviews = await prisma.review.findMany({
                where: {
                    book: {
                        id: parseInt(bookId)
                    }
                }
            });
            if (!reviews) {
                return res.status(401).json({ message: "No reviews found" });
            }
            res.status(200).json(reviews);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred during review retrieval' });
        }
    }

    static async getReviewsByUser(req, res) {
        const userId = req.params.userId;
        try {
            const reviews = await prisma.review.findMany({
                where: {
                    user: {
                        id: parseInt(userId)
                    }
                }
            });
            if (!reviews) {
                return res.status(401).json({ message: "No reviews found" });
            }
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'An error occurred during review retrieval' });
        }
    }
}

module.exports = reviewController;