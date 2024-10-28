const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class bookController {
	static async getAllUsers(req, res) {
		try {
			const users = await prisma.user.findMany({
				where: {
					isAdmin: false,
				},
				include: {
					orders: true,
				},
			});
			res.status(200).json(users);
		} catch (err) {
			res
				.status(500)
				.json({ message: "An error occurred during user retrieval" });
		}
	}

	static async createAdmin(req, res) {
		const id = parseInt(req.body.id);
		try {
			const admin = await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					isAdmin: true,
				},
			});
			if (!admin) {
				return res.status(401).json({ message: "Admin not found" });
			}
			res.status(200).json({ message: "Admin created successfully" });
		} catch (err) {
			console.log(err);
			if (err.code === "P2025") {
				return res.status(404).json({ message: "Admin not found" });
			}
			res
				.status(500)
				.json({ message: "An error occurred during admin creation" });
		}
	}
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
					available: 10,
				},
			});
			if (!book) {
				return res.status(401).json({ message: "Something went wrong" });
			}
			res.status(200).json({ message: "Book created successfully" });
		} catch (err) {
			console.log(err);
			res
				.status(500)
				.json({ message: "An error occurred during book creation" });
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
			res
				.status(500)
				.json({ message: "An error occurred during book retrieval" });
		}
	}

	static async getBook(req, res) {
		const id = req.params.id;
		try {
			const book = await prisma.book.findFirst({
				where: {
					id: parseInt(id),
				},
			});
			if (!book) {
				return res.status(401).json({ message: "Book not found" });
			}
			res.status(200).json(book);
		} catch (err) {
			res
				.status(500)
				.json({ message: "An error occurred during book retrieval" });
		}
	}

	static async updateBook(req, res) {
		const id = parseInt(req.params.id);
		const title = req.body.title;
		const author = req.body.author;
		const description = req.body.description;
		const image = req.body.image;
		const price = parseInt(req.body.price);
		const category = req.body.category;
		const available = parseInt(req.body.available);
		try {
			const book = await prisma.book.update({
				where: {
					id: id,
				},
				data: {
					title: title,
					author: author,
					description: description,
					image: image,
					price: price,
					category: category,
					available: available,
				},
			});
			if (!book) {
				return res.status(401).json({ message: "Book not found" });
			}
			res.status(200).json({ message: "Book updated successfully" });
		} catch (err) {
			res.status(500).json({ message: "An error occurred during book update" });
		}
	}

	static async deleteBook(req, res) {
		const id = req.params.id;
		try {
			const book = await prisma.book.delete({
				where: {
					id: parseInt(id),
				},
			});
			res.status(200).json({ message: "Book deleted successfully" });
		} catch (err) {
			if (err.code === "P2025") {
				return res.status(404).json({ message: "Book not found" });
			}
			res
				.status(500)
				.json({ message: "An error occurred during book deletion" });
		}
	}

	static async getRequests(req, res) {
		try {
			const requests = await prisma.onHold.findMany({
				where: {
					status: "pending",
				},
			});
			if (!requests.length)
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
				},
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
					quantity: 1,
					available: request.available,
				},
			});
			if (book) {
				await prisma.onHold.update({
					where: {
						id: parseInt(id),
					},
					data: {
						status: "accepted",
					},
				});
			}
			res.status(200).json({ message: "Request approved successfully" });
		} catch (err) {
			console.log(err);
			res
				.status(500)
				.json({ message: "An error occurred during request approval" });
		}
	}

	static async rejectRequest(req, res) {
		const id = req.params.id;
		try {
			const request = await prisma.onHold.findFirst({
				where: {
					id: parseInt(id),
				},
			});
			if (!request) {
				return res.status(401).json({ message: "Request not found" });
			}
			await prisma.onHold.update({
				where: {
					id: parseInt(id),
				},
				data: {
					status: "cancelled",
				},
			});
			res.status(200).json({ message: "Request rejected successfully" });
		} catch (err) {
			console.log(err);
			res
				.status(500)
				.json({ message: "An error occurred during request rejection" });
		}
	}

	static async getOrders(req, res) {
		try {
			const orders = await prisma.order.findMany();
			res.status(200).json(orders);
		} catch {
			if (err.code === "P2025") {
				return res.status(404).json({ message: "No orders" });
			}
			res.status(500).json({ message: "An error occurred during show" });
		}
	}

	static async updateOrder(req, res) {
		const id = parseInt(req.params.id);
		const status = req.body.status;
		try {
			const order = await prisma.Order.update({
				where: {
					id: id,
				},
				data: {
					order_status: status,
				},
			});
			if (!order) {
				return res.status(401).json({ message: "Order not found" });
			}
			res.status(200).json({ message: "Order updated successfully" });
		} catch (err) {
			console.log(err);
			if (err.code === "P2025") {
				return res.status(404).json({ message: "Order not found" });
			}
			res
				.status(500)
				.json({ message: "An error occurred during order update" });
		}
	}

	static async deleteOrder(req, res) {
		const id = req.params.id;
		try {
			const order = await prisma.Order.delete({
				where: {
					id: parseInt(id),
				},
			});
			res.status(200).json({ message: "Order deleted successfully" });
		} catch (err) {
			if (err.code === "P2025") {
				return res.status(404).json({ message: "Order not found" });
			}
			res
				.status(500)
				.json({ message: "An error occurred during order deletion" });
		}
	}
}

module.exports = bookController;
