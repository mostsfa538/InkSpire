const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server');

describe('userController', () => {
    describe('GET /', () => {
        it('should return a list of books', async () => {
            const res = await request(app).get('/');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('GET /:id', () => {
        it('should return a book by ID', async () => {
            const bookId = 1; 
            const res = await request(app).get(`/${bookId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', bookId);
        });
    });

    describe('GET /search/:searchTerm', () => {
        it('should return books matching the search term', async () => {
            const searchTerm = 'science';
            const res = await request(app).get(`/search/${searchTerm}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('POST /api/user/:user_id/upload/', () => {
        it('should upload a new book', async () => {
            const newBook = {
                title: 'Test Book',
                author: 'Author Name',
                image: 'image.jpg',
                category: 'Science',
                price: 10.99,
                description: 'Sample book description'
            };
            const res = await request(app)
                .post('/api/user/8/upload/')
                .send(newBook);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('title', newBook.title);
        });
    });

    describe('PUT /api/user/:user_id/update/:id', () => {
        it('should update a book', async () => {
            const bookId = 2;
            const userId = 8;
            const updatedBook = {
                title: 'Updated Book Title',
                author: 'Updated Author',
                image: 'updated_image.jpg',
                price: 15.99,
                description: 'Updated book description'
            };
            const res = await request(app)
                .put(`/api/user/${userId}/update/${bookId}`)
                .send(updatedBook);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('title', updatedBook.title);
        });
    });

    describe('DELETE /api/user/:user_id/delete/:id', () => {
        it('should delete a book by ID', async () => {
            const bookId = 3;
            const userId = 8;
            const res = await request(app).delete(`/api/user/${userId}/delete/${bookId}`);
            expect(res.status).to.equal(200);
        });
    });
    
    describe('GET /api/user/:user_id/status/', () => {
        it('should show books status for a user', async () => {
            const userId = 1;
            const res = await request(app).get(`/api/user/${userId}/status/`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
    
    describe('POST /api/user/8/profile', () => {
        it('should update the user profile', async () => {
            const userId = 8;
            const updatedProfile = {
                f_name: 'UpdatedFirstName',
                l_name: 'UpdatedLastName',
                image: 'updated_image.jpg',
                email: 'updated@example.com'
            };
    
    
            const res = await request(app)
                .post(`/api/user/${userId}/profile`)
                .send(updatedProfile);
    
            expect(res.status).to.equal(200);
            expect(res.body.user).to.have.property('email', updatedProfile.email);
        });
    });
});
