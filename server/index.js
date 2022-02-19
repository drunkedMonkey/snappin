const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.BBDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log("Connection error!!", err);
      return;
    }
    console.log("Connected!!");
  }
);
