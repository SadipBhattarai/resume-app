require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const morgan = require("morgan");
const indexRouter = require("./routes");

PORT = process.env.PORT || 8003;

mongoose
  .connect(process.env.DB_URL)
  .then(console.log(`Database Connected Sucessfully.`))
  .catch((e) => console.log(`Something went wrong`, e.toString()));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/", indexRouter);

app.use((error,req,res,next)=>{
    const errMsg = error.toString() || `Something went Wrong`;
    res.status(500).json({data: null, error: errMsg});
})

app.listen(PORT, () =>
  console.log(`App is running at http://localhost:${PORT}`),
);
