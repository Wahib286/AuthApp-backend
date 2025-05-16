const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");


require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cookieparser());

require("./config/database").dbconnect();

//Mount
const user = require("./routes/user");
app.use("/api/v1",user);

app.listen(PORT, ()=>{
    console.log(`App is ruunning at ${PORT}`);
})