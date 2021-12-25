const mongoose = require("mongoose");

function DBconection() {
  mongoose.connect(process.env.MONGO_URI, {}).then(
    (result) => {
      console.log(
        `MongoDb connected: ${result.connection.host}`.bgYellow.black
      );
    },
    (err) => console.log(`error conection to Mongodb`.red.bgYellow, err)
  );
}

module.exports = DBconection;
