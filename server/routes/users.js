const express = require("express")
const router = express.Router()
const { auth, admin } = require("../middleware/auth")
const {
	registerUser,
	loginUser,
	authInfo,
	logoutUser,
	updateUserInfo,
} = require("../controllers/userController")

/////////////////////////////
// api/users/
/////////////////////////////
router.route("/").post(registerUser).put(auth, updateUserInfo)

router.route("/login").post(loginUser)

router.route("/auth").get(auth, authInfo)

router.route("/logout").get(auth, logoutUser)

module.exports = router
