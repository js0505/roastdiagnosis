const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const {
	registerUser,
	loginUser,
	authInfo,
	logoutUser,
	updateUserInfo,
	emailCheck,
	getUserById,
} = require("../controllers/userController")

/////////////////////////////
// api/users/
/////////////////////////////
router.route("/").get(getUserById).post(registerUser).put(auth, updateUserInfo)

router.route("/login").post(loginUser)

router.route("/auth").get(auth, authInfo).post(emailCheck)

router.route("/logout").get(auth, logoutUser)

module.exports = router
