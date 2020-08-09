const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(req);
  console.log(res);
  res.sendFile(__dirname + "index.html");
});

userOnline = 0;

io.on("connect", socket => {
  userOnline++;
  socket.broadcast.emit("user connected", userOnline);
});

io.on("connection", socket => {
  console.log("IO ON a user connected");

  socket.on("disconnect", () => {
    userOnline--;
    io.emit("user disconnected", userOnline);
  });

  socket.on("chat message", message => {
    console.log("Socket on message", message);

    socket.broadcast.emit("chat message", message);
    console.log("socket bradcast message", message);

    // socket.broadcast.emit(message);
    // io.emit("chat message", message);
  });
});

http.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
