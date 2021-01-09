const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

io.on("connection", function (socket) {
  console.log(socket.id);
});

if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}
http.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
