const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");
const Trade = require("../models/Trade");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload_csv", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const trades = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (row) => {
      try {
        const utc_time = new Date(row["UTC_Time"]);
        const operation = row["Operation"].toLowerCase();
        const market = row["Market"];
        const [base_coin, quote_coin] = market.split("/");
        const amount = parseFloat(row["Buy/Sell Amount"]);
        const price = parseFloat(row["Price"]);

        trades.push({
          utc_time,
          operation,
          market,
          base_coin,
          quote_coin,
          amount,
          price,
        });
      } catch (error) {
        console.error("Error parsing row:", error);
      }
    })
    .on("end", async () => {
      try {
        await Trade.insertMany(trades);
        fs.unlinkSync(req.file.path);
        res.status(200).json({ message: "CSV file processed successfully" });
      } catch (error) {
        console.error("Error saving trades:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
});

module.exports = router;
