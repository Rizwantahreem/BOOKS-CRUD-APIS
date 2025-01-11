const {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
} = require("./controllers/controller.js");

const notFound = require("./middleware/notFound.middleware.js");

const handleRequests = (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url === "/books") {
        getBooks(req, res);
      } else if (req.url.includes("book/")) {
        getBook(req, res);
      } else {
        notFound(req, res, "request url not found");
      }
      break;

    case "POST":
      if (req.url === "/book") {
        addBook(req, res);
      } else {
        notFound(req, res, "request url not found");
      }
      break;

    case "DELETE":
      if (req.url?.includes("book/")) {
        deleteBook(req, res);
      } else {
        notFound(req, res, "request url not found");
      }
      break;

    case "PUT":
      if (req.url?.includes("book/")) {
        updateBook(req, res);
      } else {
        notFound(req, res, "request url not found");
      }
      break;

    default:
      notFound(req, res, "request url not found");
  }
};

module.exports = { handleRequests };
