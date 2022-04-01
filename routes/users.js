const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route   POST /user/register
// @desc    register a new user
// @access  public
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

  if (name == "admin" && email == "admin@admin") {
    User.findOne({ email })
      .then((user) => {
        if (user)
          return res.status(400).json({ msg: "Admin account already exists" });

        const adminUser = new User({ name, email, password, isAdmin: true });

        bcrypt.genSalt(14, (err, salt) => {
          bcrypt.hash(adminUser.password, salt, (err, hash) => {
            adminUser.password = hash;
            adminUser
              .save()
              .then((user) => {
                if (err) throw err;

                jwt.sign(
                  { id: user.id },
                  config.get("jwtSecret"),
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) throw err;
                    return res.json({
                      token,
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        play_record: user.play_record,
                      },
                    });
                  }
                );
              })
              .catch((err) => console.log(err));
          });
        });
      })
      .catch((err) => console.log(err));
  }

  if (!name || !email || !password || !password2)
    return res.status(400).json({ msg: "Please fill in all fields" });
  if (password !== password2)
    return res.status(400).json({ msg: "Passwords do not match" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ msg: "Password needs to be at least 6 characters long" });
  if (!regEx.test(password))
    return res.status(400).json({
      msg:
        "Password needs to contain at least one uppercase, one number, and one special character",
    });

  User.findOne({ email })
    .then((user) => {
      if (user)
        return res
          .status(400)
          .json({ msg: "That email is already registered" });

      const newUser = new User({ name, email, password });

      bcrypt.genSalt(14, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
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
                    isAdmin: user.isAdmin,
                    play_record: user.play_record,
                  },
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => console.log(err));
});

// @route   POST /user/login
// @desc    authenticate a user
// @access  public
router.post("/login", (req, res) => {
  
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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
              isAdmin: user.isAdmin,
              play_record: user.play_record,
            },
          });
        }
      );
    });
  });
});

router.use("/update", require("./updates"));

module.exports = router;
