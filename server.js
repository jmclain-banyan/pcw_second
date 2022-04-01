require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const helmet = require('helmet');

const port = process.env.PORT || 3000;
const db = config.get("mongoURI");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", require("./routes/users"));
app.use("/candywars", require("./routes/candyWars"));
app.use("/admin", require("./routes/admin"));

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0'}));

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Someone has let the goose loose..."))
  .catch((err) => console.log(err));

app.listen(port, () =>
  console.log(`Alphabet soup groups are listening in on port ${port}`)
);
