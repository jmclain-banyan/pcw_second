const mongoose = require("mongoose");

const ScoreEntrySchema = new mongoose.Schema({
  player_id: {
    type: String,
    required: true,
  },
  player_initials: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  play_date: {
    type: Date,
    default: Date.now,
  },
});

const ScoreEntry = mongoose.model("ScoreEntry", ScoreEntrySchema);
module.exports = ScoreEntry;
