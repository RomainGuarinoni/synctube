const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const cors = require("cors");
const mongoose = require("mongoose");
const History = require("./models/history");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.jsei0.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log(e));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/info", (req, res, next) => {
  History.find({})
    .sort({ date: -1 })
    .exec(function (err, data) {
      if (err) {
        console.log("erreur" + e);
      }
      let tab = [];
      for (i = 0; i < 5; i++) {
        tab[i] = data[data.length - (i + 1)];
      }
      res.status(200).json(tab);
    });
});
app.get("/moreinfo", (req, res) => {
  console.log("yeaah");
  History.find({}).exec(function (err, data) {
    if (err) {
      console.log("erreur" + e);
    }
    let tab = [];
    for (i = 0; i < 20; i++) {
      tab[i] = data[data.length - (i + 1)];
    }
    res.status(200).json(tab);
  });
});

io.on("connection", function (socket) {
  console.log("user connected : " + socket.id);
  socket.on("LOAD", (data) => {
    console.log("id : " + data.id);
    socket.broadcast.emit("LOAD_URL", {
      id: data.id,
    });
  });
  socket.on("PLAYING", () => {
    socket.broadcast.emit("PLAY", {});
  });
  socket.on("PAUSE", () => {
    socket.broadcast.emit("PAUSE", {});
  });
  socket.on("SEEK", (data) => {
    socket.broadcast.emit("SEEK", {
      time: data.time,
    });
  });
  socket.on("HISTORY", (data) => {
    console.log("history" + data.titre);
    var history = new History({
      id: data.id,
      titre: data.titre,
      img: data.img,
    });
    history.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
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
