const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
app.use(express.json());
connectDB();

// Route imports
app.use("/api/tasks", require("./routes/api/tasks"));
app.use("/api/users", require("./routes/api/users"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server started on port ${port}`));
