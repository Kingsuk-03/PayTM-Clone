// backend/index.js
const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", mainRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})