const express = require("express")
const { RegisterUser, getUser, updateUser, getUsersList } = require("../controllers/userControllers")

const router = express.Router()

router.get("/users", getUsersList)
router.post("/user", getUser)
router.post("/user/register", RegisterUser)
router.put("/user/update", updateUser)

module.exports = router