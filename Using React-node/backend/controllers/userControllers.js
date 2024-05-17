const User = require("../models/userModel")

const RegisterUser = async (req, res) => {

    const { aadhar, email } = req.body

    const check = await User.findOne({
        "$or": [
            { aadhar: aadhar },
            { email: email },
        ]
    })

    if (check) {
        return res.status(403).json({ msg: "User already exists! with same aadhar or email!" })
    }

    try {
        const user = await User.create({
            ...req.body,
            medicines: "",
            prescription: "",
            doctorAssigned: "",
        })
        user.save()
        res.status(201).json({ msg: "User registered successfully!" })
    } catch (err) {
        res.status(400).json({ msg: "Failed to register!", errmsg: `${err.message}` })
    }

}

const getUsersList = async (req, res) => {
    const users = await User.find({})
    res.json({ users })
}

const getUser = async (req, res) => {
    const { aadhar, mobile } = req.body
    console.log(req.body)
    try {
        const user = await User.findOne({ aadhar: aadhar, mobile: mobile })
        if (!user) {
            return res.json({ msg: "User doesn't exists" })
        }
        res.json({ user: user })
    } catch (err) {
        res.json({ msg: "Failed to fetch data!" })
    }
}

const updateUser = async (req, res) => {
    const { prescription, medicines, doctorAssigned, mobile } = req.body
    try {
        var user = await User.findOneAndUpdate({
            mobile: mobile,
        }, {
            prescription: prescription,
            medicines: medicines,
            doctorAssigned: doctorAssigned,
        })
        if (!user) {
            return res.json({ msg: "User doesn't exists!" })
        }
        res.json({ msg: "Data updated successfully!" })
    } catch (err) {
        res.json({ msg: "Failed to update the data!" })
    }
}

module.exports = { RegisterUser, getUser, updateUser, getUsersList }