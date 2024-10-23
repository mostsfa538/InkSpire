# API Documentation

## signup

### get signup page

- **URL**: `/signup`
- **Method**: `GET`
- **Description**: get signup page
- **Request Params**: None

### post to signup

- **URL**: `/signup`
- **Method**: `POST`
- **Description**: creating new user
- **Request Params**: None

## login

### get login
- **URL**: `/login`
- **Method**: `GET`
- **Description**: get login page
- **Request Params**: None

### post to login
- **URL**: `/login`
- **Method**: `POST`
- **Description**: login to user account
- **Request Params**: None

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

- **URL**: `/:user_id/favorites/:book_id/add`
- **Method**: `POST`
- **Description**: Adds a book to a user's favorite list.
- **Request Params**:
  - `user_id` (path): ID of the user.
  - `book_id` (path): ID of the book.

### Get All Favorites

- **URL**: `/favorites/:userId`
- **Method**: `GET`
- **Description**: Fetches all favorite books by a user.
- **Request Params**:
  - `userId` (path): ID of the user.

### Remove from Favorites

- **URL**: `/:user_id/favorites/:id/delete`
- **Method**: `DELETE`
- **Description**: Removes a book from favorites by its ID.
- **Request Params**:
  - `id` (path): ID of the favorite record.
  - `user_id` (path): ID of the user.

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
- **Method**: `GET`
- **Description**: Get book with id.
- **Request Params**:
  - `id` (path): ID of the book.

## cart

### add new cart

- **URL**: `/:user_id/carts/:cart_name/add`
- **Method**: `POST`.
- **Request Params**:
  - `user_id`: session user id
  - `cart_name`: user give cartName to each cart

### updating cart name

- **URL**: `/:user_id/carts/:cart_id/name/:cart_name`
- **Method**: `PUT`.
- **Request Params**:
  - `user_id`: session user 
  - `cart_id`: the cart id to change its name
  - `cart_name`: user give cartName to each cart

### get all user carts

- **URL**: `/:user_id/carts/`
- **Method**: `GET`.
- **Request Params**:
  - `user_id`: session user id

### get one cart by id

- **URL**: `/:user_id/carts/:cart_id`
- **Method**: `GET`.
- **Request Params**:
  - `user_id`: session user id
  - `cart_id`: cart id to be retreived

### empty cart

- **URL**: `/:user_id/cart/:cart_id/empty`
- **Method**: `PUT`.
- **Request Params**:
  - `user_id`: session user id
  - `cart_id`: cart id to be emptied

### delete cart

- **URL**: `/:user_id/carts/:cart_id`
- **Method**: `DELETE`.
- **Request Params**:
  - `user_id`: session user id
  - `cart_id`: cart id to be emptied

### add item to cart

- **URL**: `/:user_id/carts/:cart_id/book/:book_id/:quantity`
- **Method**: `POST`.
- **Request Params**:
  - `user_id`: session user id
  - `cart_id`: cart to add the item to
  - `book_id`: the book to create item from
  - `quantity`: quantity of book wanted

### update cart item quantity

- **URL**: `/:user_id/cart/:cart_id/cartItem/:cartItem_id/:quantity`
- **Method**: `PUT`.
- **Request Params**:
  - `user_id`: session user id
  - `cart_id`: cart in which item lives
  - `cartItem_id`: the cart item to update its quanttiy
  - `quantity`: new quantity

### delete cart item from cart

- **URL**: `/:user_id/cart/:cart_id/cartItem/:cartItem_id/`
- **Method**: `DELETE`.
- **Request Params**:
  - `user_id`: session user id
  - `cart_id`: cart in which item lives
  - `cartItem_id`: the cart item to update its quanttiy

## Order

### get all user orders

- **URL**: `/:user_id/orders`
- **Method**: `GET`.
- **Request Params**:
  - `user_id`: session user id

### get order by id

- **URL**: `/:user_id/order/:order_id`
- **Method**: `GET`.
- **Request Params**:
  - `user_id`: session user id
  - `order_id`: order to be retrieved

### add new order

- **URL**: `/:user_id/order/carts/:address/:number/:payement`
- **Method**: `POST`.
- **Request Params**:
  - `user_id`: session user id
  - `address`: order address
  - `number`: phone number
  - `payement`: (cash, visa, paypal)

### add new cart to order

- **URL**: `/:user_id/order/:order_id/cart/:cart_id`
- **Method**: `PUT`.
- **Request Params**:
  - `user_id`: session user id
  - `order_id`: order to add cart to 
  - `cart_id`: cart id to add to order

### delete cart from order

- **URL**: `/:user_id/order/:order_id/cart/:cart_id`
- **Method**: `DELETE`.
- **Request Params**:
  - `user_id`: session user id
  - `order_id`: order to add cart to 
  - `cart_id`: cart id to add to order

### add item to order

- **URL**: `/:user_id/order/:order_id/cart/:cart_id/book/:book_id/:quantity`
- **Method**: `PUT`.
- **Request Params**:
  - `user_id`: session user id
  - `order_id`: order to add cart to 
  - `cart_id`: cart id to add to order
  - `book_id`: book to add to order
  - `quantity`: quantity of book

### update order item quantity

- **URL**: `/:user_id/order/:order_id/cart/:cart_id/cartItem/:cartItem_id/:quantity`
- **Method**: `PUT`.
- **Request Params**:
  - `user_id`: session user id
  - `order_id`: order to add cart to 
  - `cart_id`: cart id to add to order
  - `cartItem_id`: book to update
  - `quantity`: new quantity of book

### delete item from order

- **URL**: `/:user_id/order/:order_id/cart/:cart_id/cartItem/:cartItem_id`
- **Method**: `DELETE`.
- **Request Params**:
  - `user_id`: session user id
  - `order_id`: order to add cart to 
  - `cart_id`: cart id to add to order
  - `cartItem_id`: book to update

### cancel order

- **URL**: `/:user_id/order/:order_id`
- **Method**: `DELETE`.
- **Request Params**:
  - `user_id`: session user id
  - `order_id`: order to add cart to 
