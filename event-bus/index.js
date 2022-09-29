const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);

  axios
    .post("http://posts-clusterip-srv:3001/events", event)
    .catch((err) => console.log("Post:  ", err.message));
  axios
    .post("http://comments-srv:3002/events", event)
    .catch((err) => console.log("Comment:  ", err.message));
  axios
    .post("http://query-srv:3003/events", event)
    .catch((err) => console.log("Query service:  ", err.message));
  axios
    .post("http://moderation-srv:3004/events", event)
    .catch((err) => console.log("Moderation service:  ", err.message));

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(3005, () => {
  console.log("App running on port 3005...");
});
