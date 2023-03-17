const mongoose = require('mongoose')

const usersSchame = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        ref: "Role",
    },
}, { timestamps: true });

module.exports = mongoose.model("Joineds", usersSchame);