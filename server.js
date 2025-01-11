const http = require("http");
const routes = require("./routes");
const connection = require("./Connection/mongo-connection.js");

const PORT = process.env.PORT || 8080;
let isDBConnected = false;

const server = http.createServer((req, res) => {
  if (!isDBConnected) {
    res.writeHead(503, { "Content-Type": "text/plain" });
    return res.end("Database is not connected yet");
  }

  routes.handleRequests(req, res);
});

server.listen(PORT, async () => {
  console.log(`server is listening... at ${PORT}`);

  try {
    await connection();
    isDBConnected = true;
  } catch (error) {
    console.error("Failed to connext with database", error);
  }
});
