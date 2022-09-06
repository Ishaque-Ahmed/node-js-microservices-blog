const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/post/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/post/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ commentId, content });

  commentsByPostId[req.params.id] = comments;
  await axios.post("http://localhost:3005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("received events: ", req.body.type);
  res.send({});
});

app.listen(3002, () => {
  console.log(`App running on port 3002.......`);
});
