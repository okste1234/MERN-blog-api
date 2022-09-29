const mongoose = require("mongoose");
const Schema = mongoose.Schema

const post = new Schema({
    title: {
        type: String,
        required: true,
        unique: true ,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: "true",
        default: "Adekunle Stephen",
    },
    categories: {
        type: Array,
        required: false,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Post", post);