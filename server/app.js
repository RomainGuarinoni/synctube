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

app.get("/info/:roomID", (req, res, next) => {
  History.find({ roomID: req.params.roomID })
    .sort({ date: -1 })
    .limit(5)
    .exec(function (err, data) {
      if (err) {
        throw new Error(err);
      }
      res.status(200).json(data);
    });
});
app.get("/moreinfo/:roomID", (req, res) => {
  History.find({ roomID: req.params.roomID })
    .sort({ data: -1 })
    .limit(20)
    .exec(function (err, data) {
      if (err) {
        console.log("erreur" + e);
      }

      res.status(200).json(data);
    });
});
var connected = 0;
io.on("connection", function (socket) {
  connected++;
  socket.emit("connexion", {
    number: connected,
  });
  socket.on("LOAD", (data) => {
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
    var history = new History({
      id: data.id,
      titre: data.titre,
      img: data.img,
      date: data.date,
      roomID: data.roomID,
    });
    history.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
  socket.on("DELETE_HISTORY", (data) => {
    History.deleteOne({ _id: data._id })
      .then(() => {
        History.find({ roomID: data.roomID })
          .limit(5)
          .sort({ date: -1 })
          .exec(function (err, data) {
            if (err) {
              throw new Error(console.error());
            }
            socket.emit("NEW_HISTORY", { history: data });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on("disconnect", () => {
    connected--;
    socket.emit("disconnected", {
      number: connected,
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
