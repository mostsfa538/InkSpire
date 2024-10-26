const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

class reviewController {
    static async createReview(req, res) {
        const bookId = parseInt(req.body.bookId);
        const userId = parseInt(req.body.userId);
        const rating = parseInt(req.body.rating);
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

            const reviews = await prisma.review.findMany({
                where: {
                    book: {
                        id: bookId
                    },
                },
                include: {
                    user: {
                        select: {
                            f_name: true,
                            l_name: true
                        }
                    }
                }
            });

            res.status(200).json({ message: 'Review created successfully', reviews: reviews });
        } catch (err) {
            res.status(500).json({ message: 'An error occurred during review creation' });
        }
    }

    static async updateReview(req, res) {
        const id = parseInt(req.params.id);
        const userId = parseInt(req.params.user_id);
        const bookId = parseInt(req.body.bookId);
        const rating = parseInt(req.body.rating);
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

            const reviews = await prisma.review.findMany({
                where: {
                    book: {
                        id: bookId
                    },
                },
                include: {
                    user: {
                        select: {
                            f_name: true,
                            l_name: true
                        }
                    }
                }
            });

            res.status(200).json({ message: 'Review updated successfully', reviews: reviews });
        } catch (err) {
            if (err.code === 'P2025') {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(500).json({ message: 'An error occurred during review update' });
        }
    }

    static async deleteReview(req, res) {
        const id = parseInt(req.params.id);

        try {
            const review = await prisma.review.delete({
                where: {
                    id: id,
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
        const bookId = parseInt(req.params.id);
        try {
            const reviews = await prisma.review.findMany({
                where: {
                    book: {
                        id: bookId
                    }
                },
                include: {
                    user: {
                        select: {
                            f_name: true,
                            l_name: true
                        }
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

    static async getReviewsByUser(req, res) {
        const userId = parseInt(req.params.userId);
        try {
            const reviews = await prisma.review.findMany({
                where: {
                    user: {
                        id: userId
                    }
                },
                include: {
                    book: {
                        select: {
                            title: true,
                        }
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