const express = require("express")
const router = express.Router()

const {
	getComments,
	saveComment,
	deleteComment,
	updateComment,
} = require("../controllers/commentController")
const { auth } = require("../middleware/auth")

/////////////////////////////
// api/comment/
/////////////////////////////
router.route("/").post(auth, getComments)
router.route("/:id").put(updateComment).delete(deleteComment)
router.route("/save").post(auth, saveComment)

module.exports = router
