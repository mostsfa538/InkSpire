const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server');

describe('adminController', () => {
    describe('PUT /api/admin/approve/:id', () => {
        it('should approve a request', async () => {
            const requestId = 5;
            const res = await request(app).post(`/api/admin/approve/${requestId}`);
            expect(res.status).to.equal(200);
        });
    });

    describe('PUT /api/admin/reject/:id', () => {
        it('should reject a request', async () => {
            const requestId = 6;
            const res = await request(app).post(`/api/admin/reject/${requestId}`);
            expect(res.status).to.equal(200);
        });
    });

    describe('GET /api/admin/requests', () => {
        it('should return a list of requests', async () => {
            const res = await request(app).get('/api/admin/requests');
            console.log(res.body);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('POST /api/admin/create', () => {
        it('should create a new book', async () => {
            const newBook = {
                title: 'Test Book',
                author: 'Author Name',
                image: 'image.jpg',
                category: 'Science',
                price: 10.99,
                description: 'Sample book description',
                available: 10
            };
            const res = await request(app)
                .post('/api/admin/create')
                .send(newBook);
            expect(res.status).to.equal(200);
        });
    });

    describe('PUT /api/admin/update/:id', () => {
        it('should update a book', async () => {
            const bookId = 22;
            const updatedBook = {
                title: 'Updated Book Title',
                author: 'Author Name',
                image: 'image.jpg',
                category: 'Science',
                price: 10.99,
                description: 'Sample book description',
                available: 10
            };
            const res = await request(app)
                .put(`/api/admin/update/${bookId}`)
                .send(updatedBook);
            console.log(res.body);
            expect(res.status).to.equal(200);
        });
    });

    describe('DELETE /api/admin/delete/:id', () => {
        it('should delete a book', async () => {
            const bookId = 23;
            const res = await request(app).delete(`/api/admin/delete/${bookId}`);
            expect(res.status).to.equal(200);
        });
    });

    describe('GET /api/admin/:id', () => {
        it('should return a book by ID', async () => {
            const bookId = 1;
            const res = await request(app).get(`/api/admin/${bookId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', bookId);
        });
    });

    describe('GET /api/admin/orders', () => {
        it('should return a list of orders', async () => {
            const res = await request(app).get('/api/admin/orders');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('POST /api/admin/create-admin', () => {
        it('should create a new admin', async () => {
            const newAdmin = {
                id: 3,
            }
            const res = await request(app)
                .post('/api/admin/create-admin')
                .send(newAdmin);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id', newAdmin.id);
        });
    });

    describe('PUT /api/admin//update-order/:id', () => {
        it('should update an order', async () => {
            const orderId = 3;
            const updatedOrder = {
                status: 'Delivered'
            }
            const res = await request(app)
                .put(`/api/admin/update-order/${orderId}`)
                .send(updatedOrder);
            expect(res.status).to.equal(200);
        });
    });

    describe('DELETE /api/admin/delete-order/:id', () => {
        it('should delete an order', async () => {
            const orderId = 3;
            const res = await request(app).delete(`/api/admin/delete-order/${orderId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Order deleted successfully');
        });
    });
});