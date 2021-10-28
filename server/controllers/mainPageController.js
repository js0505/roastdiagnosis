const { Board } = require("../models/Board")

const getRecentBoards = (req, res) => {
	Board.find()
		.limit(10)
		.sort({ createdAt: -1 })
		.populate("writer")
		.exec((err, result) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, result })
		})
}
module.exports = { getRecentBoards }
