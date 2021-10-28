const express = require("express")
const router = express.Router()
const {
	getBoardByBIndex,
	createBoard,
	getBoardById,
	updateBoardById,
	deleteBoardById,
	searchBoard,
} = require("../controllers/boardController")
const { auth } = require("../middleware/auth")

/////////////////////////////
// api/board/
/////////////////////////////

router.route("/").get(getBoardByBIndex).post(auth, createBoard)
router.route("/search").get(searchBoard)
router
	.route("/:id")
	.get(getBoardById)
	.put(auth, updateBoardById)
	.delete(auth, deleteBoardById)

module.exports = router
