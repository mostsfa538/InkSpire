const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const utils = require("../utils/utils");

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
			res.status(500).json({ message: "An error occurred" });
		}
	}

	static async getBookById(req, res) {
		const bookId = req.params.id;
		try {
			const book = await prisma.book.findUnique({
				where: {
					id: parseInt(bookId),
				},
			});
			if (!book) {
				return res.status(404).json({ message: "No book found" });
			}
			res.status(200).json(book);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "An error occurred" });
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
								contains: searchTerm,
							},
						},
						{
							author: {
								contains: searchTerm,
							},
						},
						{
							category: {
								contains: searchTerm,
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
			res.status(500).json({ message: "An error occurred during search" });
		}
	}

	static async uploadBook(req, res) {
		const { title, author, image, price, category, description } = req.body;
		const userId = req.params.user_id;
		try {
			const book = await prisma.onHold.create({
				data: {
					title: title,
					author: author,
					image: image,
					price: price,
					category: category,
					description: description,
					status: "pending",
					user: {
						connect: {
							id: parseInt(userId),
						},
					},
				},
			});
			res.status(201).json(book);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "An error occurred during upload" });
		}
	}

	static async updateBook(req, res) {
		const { title, author, image, price, category, description } = req.body;
		const bookId = req.params.id;
		try {
			const book = await prisma.onHold.update({
				where: {
					id: parseInt(bookId),
				},
				data: {
					title: title,
					author: author,
					image: image,
					price: price,
					category: category,
					description: description,
				},
			});
			res.status(200).json(book);
		} catch (err) {
			if (err.code === "P2025") {
				return res.status(404).json({ message: "Book not found" });
			}
			res.status(500).json({ message: "An error occurred during update" });
		}
	}

	static async deleteBook(req, res) {
		const bookId = req.params.id;
		try {
			const book = await prisma.onHold.delete({
				where: {
					id: parseInt(bookId),
				},
			});
			res.status(200).json(book);
		} catch (err) {
			if (err.code === "P2025") {
				return res.status(404).json({ message: "Book not found" });
			}
			res.status(500).json({ message: "An error occurred during delete" });
		}
	}

	static async showBooksStatus(req, res) {
		const userId = req.params.user_id;
		try {
			const books = await prisma.onHold.findMany({
				where: {
					id: parseInt(userId),
				},
			});
			if (!books) {
				return res.status(404).json({ message: "No books found" });
			}
			res.status(200).json(books);
		} catch (err) {
			console.log(err);

			res.status(500).json({ message: "An error occurred" });
		}
	}

	static async updateProfile(req, res) {
		const { f_name, l_name, image, email } = req.body;
		const userId = parseInt(req.params.user_id);
		try {
			const user = await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					f_name: f_name,
					l_name: l_name,
					image: image,
					email: email,
				},
			});
			res.status(200).json({ user: await utils.getUpdatedUser(userId) });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "An error occurred during update" });
		}
	}

	static async getPopularBooks(req, res) {
		try {
			const favCount = await prisma.favorite.groupBy({
				by: ["id_book"],
				_count: {
					id_book: true,
				},
			});

			const allBooks = await prisma.book.findMany();

			const books = allBooks.map((book) => {
				const fav = favCount.find((f) => f.id_book === book.id);
				return {
					...book,
					favCount: fav ? fav._count.id_book : 0,
				};
			});

			books.sort((a, b) => b.favCount - a.favCount);

			if (!books) {
				return res.status(404).json({ message: "No books found" });
			}

			res.status(200).json(books);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "An error occurred" });
		}
	}
}

module.exports = userController;
