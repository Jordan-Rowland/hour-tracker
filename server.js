const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const sanitize = require("sanitize-html");
const tasks = require("./routes/api/tasks");

const app = express();
app.use(express.json());
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err))

app.use("/api/tasks", tasks);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server started on port ${port}`));
