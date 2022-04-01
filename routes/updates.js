const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// @route   POST /user/update/name
// @desc    update a user's name
// @access  private
router.post("/name", auth, (req, res) => {
  // console.log('body', req.body)
  const { id, name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ msg: "Field left blank, name was not updated" });
  User.findById({ _id: id })
    .then((user) => {
      user.name = name;
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
                play_record: user.play_record
              },
              msg: "Name was successfully updated",
            });
          }
        );
      });
    })
    .catch((err) => console.log(err));
});

// @route   POST /user/update/email
// @desc    update a user's email
// @access  private
router.post("/email", auth, (req, res) => {
  const { id, email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ msg: "Field left blank, email was not updated" });

  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "That email is already registered" });

    User.findById({ _id: id }).then((user) => {
      user.email = email;
      user
        .save()
        .then((user) => {
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
                  play_record: user.play_record
                },
                msg: "Email was successfully updated",
              });
            }
          );
        })
        .catch((err) => console.log(err));
    });
  });
});

// @route   POST /user/update/password
// @desc    update a user's password
// @access  private
router.post("/password", auth, (req, res) => {
  // console.log('req.body', req.body)
  const { id, oldPassword, newPassword, newPassword2 } = req.body;
  const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

  if (!oldPassword || !newPassword || !newPassword2)
    return res.status(400).json({ msg: "Please fill out all fields" });
  if (newPassword.length < 6)
    return res
      .status(400)
      .json({ msg: "Password needs to be at least 6 characters long" });
  if (!regEx.test(newPassword))
    return res.status(400).json({
      msg:
        "Password needs to have at least one uppercase, one number, and one special character",
    });
  if (newPassword !== newPassword2)
    return res.status(400).json({ msg: "Passwords do not match" });

  User.findById({ _id: id })
    .then((user) => {
      bcrypt.compare(newPassword, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        bcrypt.genSalt(14, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
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
                      play_record: user.play_record
                    },
                    msg: "Password was successfully updated",
                  });
                }
              );
            });
          });
        });
      });
    })
    .catch((err) => console.log(err));
});

// @route   POST /user/update/delete
// @desc    delete a user's profile
// @access  private
// router.post('/delete/:id', auth, (req, res) => {
//   // console.log(req.params)
//   const id = req.params.id
//   User.findByIdAndRemove({ _id: id }).then(user => {
//     console.log('user', user)
//     res.json({ msg: 'Your profile has been deleted'})
//   }).catch(err => console.log(err))
// })

// @route   POST /user/update/delete
// @desc    delete a user's profile
// @access  private
router.post("/delete/:id", auth, (req, res) => {
  let password = req.body.confirmationPassword;
  const id = req.params.id;

  if (!password)
    return res
      .status(400)
      .json({ msg: "Please enter password to confirm account removal" });

  User.findById({ _id: id })
    .then((user) => {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        User.findByIdAndRemove({ _id: id }).then((user) => {
          console.log("user", user);
          res.json({ msg: "Your account has been removed" });
        });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
