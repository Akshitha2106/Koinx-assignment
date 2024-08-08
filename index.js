const express = require("express");
const mongoose = require("mongoose");
const tradesRoute = require("./routes/trades");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tradesdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api", tradesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
