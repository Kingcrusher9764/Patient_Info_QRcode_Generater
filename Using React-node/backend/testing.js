const axios = require("axios")

async function call() {
    const data = {
        name: "Vikrant",
        email: "vikrant@gmail.com",
        address: "koparkhairne",
        date: "14-05-2024",
        mobile: "9876543210",
        gender: "male",
        weight: "56",
        bloodGroup: "A+",
        aadhar: "123412341234",
        prescription: "",
        medicines: "",
        doctorAssigned: ""
    }
    const res = await axios.post("http://localhost:8000/api/user", data)
    console.log(res.data)
    return res
}

try {
    const res = call()
} catch (err) {
    console.log(err.message)
}
