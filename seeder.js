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
  fs.readFileSync(`${__dirname}/_data/categories.json`, "utf-8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    console.log("Data Imported".green.inverse);
    // neu thanh cong thi ket thuc terminal
    process.exit(); // tham so mac dinh la 0
  } catch (err) {
    console.log(error.err);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.error);
  }
};

switch (process.argv[2]) {
  case "-id":
    importData();
    break;
  case "-dd":
    deleteData();
    break;
  default:
    console.log("\n-id\t Import Data");
    console.log("-dd\t Delete Data");
    process.exit();
}
