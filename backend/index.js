// backend/index.js
const express = require("express");
const mainRouter = require("./routes/index");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", mainRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})