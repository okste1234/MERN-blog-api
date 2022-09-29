const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/newUser/auth");

dotenv.config();
const db = mongoose.connect(process.env.MONGODB_URI,({
    useNewUrlParser: true,
    useUnifiedTopology: true,
}))
    .then(console.log("app connected to MongoDB"))
    .catch(err => console.log(err)
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/auth", authRoute);



app.listen("5000",()=> {
    console.log("app running on PORT 5OOO...");
})
