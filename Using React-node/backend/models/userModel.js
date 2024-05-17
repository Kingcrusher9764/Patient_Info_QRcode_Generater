var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    aadhar: {
        type: String,
        required: true,
        unique: true,
    },
    prescription: {
        type: String,
    },
    medicines: {
        type: String,
    },
    doctorAssigned: {
        type: String,
    },
},
)

const User = mongoose.model("user", userSchema);

module.exports = User;

