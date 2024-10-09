# API Documentation

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

- **URL**: `/:userId/search/:searchTerm`
- **Method**: `GET`
- **Description**: Searches for books by any Term.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `searchTerm` (path): Search term to filter books by any Term.

### Upload a Book

- **URL**: `/:userId/upload`
- **Method**: `POST`
- **Description**: Uploads a book to the user's collection.
- **Request Params**:
  - `userId` (path): ID of the user.

### Update a book

- **URL**: `/:userId/update/:id`
- **Method**: `PUT`
- **Description**: Update a book to the user's collection.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `id` (path): ID of the book record.

### Remove from onHold

- **URL**: `/:userId/delete/:id`
- **Method**: `DELETE`
- **Description**: Removes a book from onHold by its ID.
- **Request Params**:
  - `userId` (path): ID of the user.
  - `id` (path): ID of the favorite record.

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
