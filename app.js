const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const morgan = require("morgan");
const DBconection = require("./db.js");
const ErrorHanler = require("./middleware/errorhadler");

const app = express();

app.use(express.json()); // convert request to JSON

DBconection();

const categoryRoutes = require("./routes/categories.js");

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// tranh viet lai api/v1/categories trong categoryRoutes nhieu lan
app.use("/api/v1/categories/", categoryRoutes);
app.use(ErrorHanler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Backend app listening at http://localhost:${port}`.bgBlack.brightBlue
  );
});
