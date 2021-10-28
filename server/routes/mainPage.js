const express = require("express")
const { getRecentBoards } = require("../controllers/mainPageController")
const router = express.Router()

const { auth } = require("../middleware/auth")

/////////////////////////////
// api/main/
/////////////////////////////

router.route("/").get(getRecentBoards)

module.exports = router
