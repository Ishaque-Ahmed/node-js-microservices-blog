const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios
    .post("http://localhost:3001/events", event)
    .catch((err) => console.log("Post:  ", err.message));
  axios
    .post("http://localhost:3002/events", event)
    .catch((err) => console.log("Comment:  ", err.message));
  axios
    .post("http://localhost:3003/events", event)
    .catch((err) => console.log("Query service:  ", err.message));

  res.send({ status: "ok" });
});

app.listen(3005, () => {
  console.log("App running on port 3005...");
});
