const { Board } = require("../models/Board")
const AWS = require("aws-sdk")
const config = require("../config/key")

const s3 = new AWS.S3({
	accessKeyId: config.AWS_ACCESS_KEY,
	secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	region: config.AWS_S3_REGION,
})

const createBoard = (req, res) => {
	const board = new Board(req.body)

	board.save((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

const searchBoard = (req, res) => {
	let options = []
	if (req.query.category == "title") {
		options = [{ title: new RegExp(req.query.keyword) }]
	} else if (req.query.category == "description") {
		options = [{ description: new RegExp(req.query.keyword) }]
	} else if (req.query.category == "name") {
		options = [{ name: new RegExp(req.query.keyword) }]
	} else {
		const err = new Error("검색 옵션이 없습니다.")
		err.status = 400
		throw err
	}
	Board.find({ $or: options })
		.populate("writer")
		.exec((err, result) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, result })
		})
}

const getBoardById = (req, res) => {
	Board.findById(req.params.id)
		.populate("writer")
		.exec((err, result) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, result })
		})
}

const updateBoardById = (req, res) => {
	Board.findByIdAndUpdate(req.params.id, {
		title: req.body.title,
		description: req.body.description,
		s3Key: req.body.s3Key,
	}).exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

const deleteBoardById = (req, res) => {
	Board.findById(req.params.id).exec((err, result) => {
		if (result.s3Key.length !== 0) {
			let params = {
				Bucket: config.AWS_S3_BUCKET,
				Delete: { Objects: [] },
			}
			result.s3Key.forEach((key) => {
				params.Delete.Objects.push({ Key: key })
			})
			s3.deleteObjects(params, (err, data) => {
				if (err) return res.status(400).json({ success: false, err })
			})
		}

		Board.findByIdAndDelete(req.params.id).exec((err, result) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, result })
		})
	})
}

const getBoardByBIndex = (req, res) => {
	Board.find({ bindex: req.query.bindex })
		.sort({ isFixed: -1, createdAt: -1 })
		.populate("writer")
		.exec((err, result) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, result })
		})
}

module.exports = {
	getBoardByBIndex,
	createBoard,
	getBoardById,
	updateBoardById,
	deleteBoardById,
	searchBoard,
}
