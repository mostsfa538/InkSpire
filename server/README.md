# API Documentation

## users api/user
## Reviews

### Create a Review

- **URL**: `/reviews/:userId/create`
- **Method**: `POST`
- **Description**: Creates a new review for a book.
- **Request Params**:
  - `userId` (path): ID of the user.

### Get Review for a Book

- **URL**: `/reviews/:userId/book/:bookId`
- **Method**: `GET`
- **Description**: Retrieves a specific review of a book by a user.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `bookId` (path): ID of the book.

### Get All Reviews by a User

- **URL**: `/reviews/:userId`
- **Method**: `GET`
- **Description**: Fetches all reviews by a user.
- **Request Params**:
  - `userId` (path): ID of the user.

### Update a Review

- **URL**: `/reviews/:userId/update/:id`
- **Method**: `PUT`
- **Description**: Updates a review by its ID.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `id` (path): ID of the review.

### Delete a Review

- **URL**: `/reviews/:userId/delete/:id`
- **Method**: `DELETE`
- **Description**: Deletes a review by its ID.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `id` (path): ID of the review.

## Favorites

### Add to Favorites

- **URL**: `/favorites/:userId/add`
- **Method**: `POST`
- **Description**: Adds a book to a user's favorite list.
- **Request Params**:
  - `userId` (path): ID of the user.

### Get All Favorites

- **URL**: `/favorites/:userId`
- **Method**: `GET`
- **Description**: Fetches all favorite books by a user.
- **Request Params**:
  - `userId` (path): ID of the user.

### Remove from Favorites

- **URL**: `/favorites/delete/:id`
- **Method**: `DELETE`
- **Description**: Removes a book from favorites by its ID.
- **Request Params**:
  - `id` (path): ID of the favorite record.

## User Search & Upload

### Search by any Term

- **URL**: `/search/:searchTerm`
- **Method**: `GET`
- **Description**: Searches for books by any term.
- **Request Params**:
  - `searchTerm` (path): Search term to filter books.

### Upload a Book

- **URL**: `/:userId/upload`
- **Method**: `POST`
- **Description**: Uploads a book to the user's collection.
- **Request Params**:
  - `userId` (path): ID of the user.

### Update a Book

- **URL**: `/:userId/update/:id`
- **Method**: `PUT`
- **Description**: Updates a book in the user's collection.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `id` (path): ID of the book record.

### Remove from onHold

- **URL**: `/:userId/delete/:id`
- **Method**: `DELETE`
- **Description**: Removes a book from onHold by its ID.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `id` (path): ID of the book.

## User Profile and Status

### Show Books Status

- **URL**: `/:userId/status`
- **Method**: `GET`
- **Description**: Shows the status of all books for the user.
- **Request Params**:
  - `userId` (path): ID of the user.

### Update User Profile

- **URL**: `/:userId/profile`
- **Method**: `POST`
- **Description**: Updates the user's profile.
- **Request Params**:
  - `userId` (path): ID of the user.

## Orders

### Create an Order

- **URL**: `/:userId/create-order`
- **Method**: `POST`
- **Description**: Creates a new order for a user.
- **Request Params**:
  - `userId` (path): ID of the user.

### Complete an Order

- **URL**: `/:userId/complete-order`
- **Method**: `GET`
- **Description**: Completes a user's order.
- **Request Params**:
  - `userId` (path): ID of the user.

### Cancel an Order

- **URL**: `/:userId/cancel-order`
- **Method**: `GET`
- **Description**: Cancels a user's order.
- **Request Params**:
  - `userId` (path): ID of the user.

### Get book
- **URL**: `/:id`
- **Method**: Get book with id.
- **Request Params**:
  - `id` (path): ID of the book.

## Admin Endpoints api/admin

### Create a Book

- **URL**: `/create`
- **Method**: `POST`
- **Description**: Creates a new book entry.
- **Request Body**: The body must include the book details.

### Get All Books

- **URL**: `/admin`
- **Method**: `GET`
- **Description**: Retrieves a list of all books.

### Update a Book

- **URL**: `/update/:id`
- **Method**: `PUT`
- **Description**: Updates a book entry by its ID.
- **Request Params**:
  - `id` (path): ID of the book to be updated.
- **Request Body**: The body must include the updated book details.

### Delete a Book

- **URL**: `/delete/:id`
- **Method**: `DELETE`
- **Description**: Deletes a book entry by its ID.
- **Request Params**:
  - `id` (path): ID of the book to be deleted.

### Get Book Requests

- **URL**: `/requests`
- **Method**: `GET`
- **Description**: Retrieves a list of all book requests.

### Approve a Request

- **URL**: `/approve/:id`
- **Method**: `PUT`
- **Description**: Approves a book request by its ID.
- **Request Params**:
  - `id` (path): ID of the request to be approved.

### Reject a Request

- **URL**: `/reject/:id`
- **Method**: `PUT`
- **Description**: Rejects a book request by its ID.
- **Request Params**:
  - `id` (path): ID of the request to be rejected.

### Get All Orders

- **URL**: `/orders`
- **Method**: `GET`
- **Description**: Retrieves a list of all orders.

### Update an Order

- **URL**: `/update-order/:id`
- **Method**: `PUT`
- **Description**: Updates an order entry by its ID.
- **Request Params**:
  - `id` (path): ID of the order to be updated.
- **Request Body**: The body must include the updated order details.

### Delete an Order

- **URL**: `/delete-order/:id`
- **Method**: `DELETE`
- **Description**: Deletes an order entry by its ID.
- **Request Params**:
  - `id` (path): ID of the order to be deleted.

### Get book
- **URL**: `/:id`
- **Method**: Get book with id.
- **Request Params**:
  - `id` (path): ID of the book.
