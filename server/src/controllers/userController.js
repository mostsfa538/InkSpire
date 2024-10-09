const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

class userController {
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
}

module.exports = userController;