const express = require("express")
const appRouter = express.Router();
const bcrypt = require("bcrypt");

const User = require("../../models/User");

// SIGNUP
appRouter.post("/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = hashedPassword;

        const NewUser = await newUser.save();
        res.status(200).send(NewUser);
    } catch (err) {
        res.status(500).send(err);
    }
});

// LOGIN
appRouter.post("/login", async (req, res) => {
    try {
        const user = await new User.findOne({
            username: req.body.username
        });
        !user && res.status(400).send("Wrong credentials : check username");
        
        const validatePass = await bcrypt.compare(req.body.password, user.password);
        !validatePass && res.status(400).send("Wrong credentials : check your password");

        const { password, ...otherDetails } = user._id;
        res.status(200).send(otherDetails);
    } catch (error) {
        res.status(500).send(error);
    }
    
});

module.exports = appRouter
