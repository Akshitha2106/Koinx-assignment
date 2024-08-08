const express = require("express");
const Trade = require("../models/Trade");

const router = express.Router();

router.post("/balance", async (req, res) => {
  const { timestamp } = req.body;

  if (!timestamp) {
    return res.status(400).json({ error: "Timestamp is required" });
  }

  try {
    const date = new Date(timestamp);

    const trades = await Trade.aggregate([
      { $match: { utc_time: { $lte: date } } },
      {
        $group: {
          _id: "$base_coin",
          balance: {
            $sum: {
              $cond: [
                { $eq: ["$operation", "buy"] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
    ]);

    const balance = trades.reduce((acc, trade) => {
      acc[trade._id] = trade.balance;
      return acc;
    }, {});

    res.status(200).json(balance);
  } catch (error) {
    console.error("Error calculating balance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
