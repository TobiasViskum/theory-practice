import express from "express";
import webPush from "web-push";

const PORT = 3000;
const app = express();

const publicKey =
  "BP-eGQbl1IhWyoQbIMvDOQj30_zVT78tD8pcSQ4vQlr6oWYVb8dZ8gQGlorKt40KJ_iKgIC7uJBX9wb3XKSOxn4";
const privateKey = "DkTg7U5KQMQTata6l8GdIwoBE2qBcdlHhHLZyQcw8Jc";

app.use(express.json());
app.use(express.static("dist"));

app.post("/sendNotification", (req, res) => {
  webPush.setVapidDetails("https://dev04.reactprojects.mywire.org", publicKey, privateKey);

  const body = req.body;
  const subscription = body.subscription;

  const payload = body.payload;
  const options = {
    TTL: 3600,
  };
  const delaySec = 10;
  setTimeout(() => {
    webPush
      .sendNotification(subscription, payload, options)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }, delaySec * 1000);
});

app.get("/*", function (req, res) {
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
