const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    console.log("Moderation", data);
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios
      .post("http://event-bus-srv:3005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => console.log(err.message));
  }

  res.send({});
});

app.listen(3004, () => {
  console.log(`App running on port 3004.......`);
});
