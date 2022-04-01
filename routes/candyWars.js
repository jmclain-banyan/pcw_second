const router = require("express").Router();
const User = require("../models/User");
const ScoreEntry = require("../models/ScoreEntry");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// @route   POST /candywars/newscore
// @desc    creates a new score entry
// @access  private
router.post("/newscore", auth, (req, res) => {
  const { player_id, player_initials, score } = req.body;

  User.findById({ _id: player_id })
    .then((user) => {
      const newScoreEntry = new ScoreEntry({
        player_id,
        player_initials,
        score,
      });
      newScoreEntry.save();
      user.play_record.push(newScoreEntry);
      user.save().then((user) => {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                play_record: user.play_record,
              },
            });
          }
        );
      });
    })
    .catch((err) => console.log(err));
});

// @route   GET /candywars/getscores
// @desc    gets top scores
// @access  public
router.get("/getscores", (req, res) => {
  ScoreEntry.find()
    .sort({ score: -1 })
    .then((scores) => {
      let topTen = [];
      for (let i = 0; i < 10; i++) {
        topTen.push(scores[i]);
      }
      res.json(topTen);
    });
});

module.exports = router;
