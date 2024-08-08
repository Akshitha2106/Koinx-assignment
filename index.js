const express = require("express");
const mongoose = require("mongoose");
const tradesRoute = require("./routes/trades");
const balanceRoute = require("./routes/balance");
const url =
  "mongodb+srv://akshithamittapalli:FCQXU2iSASMOas0i@cluster0.4jwsi.mongodb.net/trades";

const app = express();
app.use(express.json());

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api", tradesRoute);
app.use("/api", balanceRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
