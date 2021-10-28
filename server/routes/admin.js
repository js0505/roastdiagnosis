const express = require("express")
const router = express.Router()
const { auth, admin } = require("../middleware/auth")

const {
	getWaitingRegisterUser,
	admissionUser,
	refuseUser,
	getAllUserInfo,
	changeUserRole,
} = require("../controllers/adminController")

/////////////////////////////
// api/admin/
/////////////////////////////
router
	.route("/admission")
	.get(auth, admin, getWaitingRegisterUser)
	.put(auth, admin, admissionUser)
	.delete(auth, admin, refuseUser)

router
	.route("/role")
	.get(auth, admin, getAllUserInfo)
	.put(auth, admin, changeUserRole)
module.exports = router
