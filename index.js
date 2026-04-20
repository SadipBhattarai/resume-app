require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const PORT = process.env.PORT || 8005;
const app = express();
const indexRouter = require("./routes");

mongoose
  .connect(process.env.DB_URL)
  .then(console.log(`Database Connected Sucessfully`))
  .catch((e) => console.log("Database Error", e.toString()));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/assets", express.static("public"));

app.use("/", indexRouter);

app.use((error, req, res, next) => {
  const errMsg = error.toString() || "Something went wrong";
  res.status(500).json({ data: null, error: errMsg });
});

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}`);
});
