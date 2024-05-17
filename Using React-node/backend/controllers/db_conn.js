const mongoose = require("mongoose")

function ConnectDB() {
    try {
        mongoose.connect(process.env.DB_URI).then(() => {
            console.log("Database Connected Successfully!")
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = ConnectDB