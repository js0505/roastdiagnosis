const { Scrap } = require("../models/Scrap")

const addScrap = (req, res) => {
	Scrap.find({ post: req.body.post }).exec((err, result) => {
		if (result.length === 1) {
			return res.json({ success: false, message: "이미 등록되어 있습니다." })
		} else {
			const scrap = new Scrap(req.body)
			scrap.save((err, result) => {
				if (err) return res.status(400).json({ success: false, err })
				return res.status(200).json({ success: true, result })
			})
		}
	})
}

const deleteScrap = (req, res) => {
	Scrap.findByIdAndDelete(req.params.id).exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

const getScrap = (req, res) => {
	Scrap.find({ user: req.user })
		.sort({ createdAt: -1 })
		.populate("user")
		.populate("post")
		.exec((err, result) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, result })
		})
}

module.exports = {
	addScrap,
	getScrap,
	deleteScrap,
}
