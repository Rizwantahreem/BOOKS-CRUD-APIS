1. **Create a .env file**
  In the root directory of the project, create a .env file.
  Add the following environment variables
  Add the following to the .env file:
    PORT=<port_number>
    MONGO_CONNECTION_STRING=<connection_string_from_mongodb>

2. Install dependencies
    Run the following command to install the necessary dependencies:
     npm i

**Database Schema**
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
});

**API Routes**
1. GET
    /books -   Retrieves a list of all books.
    /book/:id - Retrieves a single book by its ID.
2. POST
    /book - Creates a new book entry in the database.
3. PUT
    /book/:id - Updates an existing book entry by its ID.
4. DELETE
    /book/:id  - Deletes a book entry by its ID.
