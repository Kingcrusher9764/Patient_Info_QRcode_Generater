var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required: true,
    },
    Email:{
        type:String,
        required: true,
    },
    Address:{
        type: String,
        required: true,
    },
    Date:{
        type: String,
        required: true,
    },
    Mobile_No:{
        type: String,
        required: true,
        unique:true,
    },
    Gender:{
        type: String,
        required: true,
    },
    Weight:{
        type: String,
        required: true,
    },
    BloodGroup:{
        type: String,
        required: true,
    },
    Aadhar:{
        type: String,
        required: true,
        unique: true,
    },
    Prescription:{
        type: String,
    },
    Medicines:{
        type: String,
    },
    DoctorAssigned:{
        type:String,
    },
},
)

const User = mongoose.model("user", userSchema);

module.exports = User;

