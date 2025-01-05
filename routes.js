const {
  getBooks,
  getBook,
  addBook,
  notFound,
  deleteBook,
  updateBook,
} = require("./controller");

function handleRequests(req, res) {
  switch (req.method) {
    case "GET":
      if (req.url === "/books") {
        getBooks(req, res);
      } else if (req.url.includes("books/")) {
        getBook(req, res);
      } else {
        notFound(req, res);
      }
      break;

    case "POST":
      if (req.url === "/book") {
        addBook(req, res);
      } else {
        notFound(req, res);
      }
      break;

    case "DELETE":
      if (req.url?.includes("books/")) {
        deleteBook(req, res);
      }
      break;

    case "PUT":
      if (req.url?.includes("books/")) {
        updateBook(req, res);
      }
      break;
  }
}

module.exports = { handleRequests };
