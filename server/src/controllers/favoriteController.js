const { PrismaClient } = require('@prisma/client');
const { connect } = require('../routes/adminBookRoutes');
const prisma = new PrismaClient;

class favoriteController {
    static async createFavorite(req, res) {
        const userId = req.body.userId;
        const bookId = req.body.bookId;
        try {
            const book = await prisma.favorite.findFirst({
                where: {
                    id: bookId
                }
            });
            if (book) {
                return res.status(409).json({ message: "Favorite entry for this book already exists" });
            }

            const favorite = await prisma.favorite.create({
                data: {
                    user: {
                        connect: { id: userId }
                    },
                    book: {
                        connect: {id: bookId}
                    }
                }
            });
            if (!favorite) {
                return res.status(401).json({ message: "Something went wrong" });
            }
            res.status(200).json({ message: 'Favorite created successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred during favorite creation' });
        }
    }

    static async getFavoritesByUser(req, res) {
        const userId = req.body.userId;
    
        try {
            const favorites = await prisma.favorite.findMany({
                where: {
                    user: {
                        id: userId
                    }
                },
                include: {
                    book: true,
                }
            });
            if (!favorites) {
                return res.status(401).json({ message: "No favorites found" });
            }
            res.status(200).json(favorites);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'An error occurred during favorite retrieval' });
        }
    }

    static async deleteFavorite(req, res) {
        const id = req.params.id;
        try {
            const favorite = await prisma.favorite.delete({
                where: {
                    id: parseInt(id),
                }
            });
            if (!favorite) {
                return res.status(401).json({ message: "Something went wrong" });
            }
            res.status(200).json({ message: 'Favorite deleted successfully' });
        } catch (err) {
            if (err.code === 'P2025') {
                return res.status(404).json({ message: "Favorite not found" });
            }
            res.status(500).json({ message: 'An error occurred during favorite deletion' });
        }
    }
}

module.exports = favoriteController;