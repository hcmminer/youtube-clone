const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const Category = require("./models/category");

mongoose.connect(process.env.MONGO_URI, {}).then(
  (result) => {
    console.log(`MongoDb connected: ${result.connection.host}`.bgYellow.black);
  },
  (err) => console.log(`error conection to Mongodb`.red.bgYellow, err)
);

const categories = JSON.parse(
  fs.readFileSync(`${__dirname / _data / categories.json}`, utf - 8)
);




