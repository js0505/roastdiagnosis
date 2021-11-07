const { Comment } = require("../models/Comment")
/////////////////////////////
// '/'
/////////////////////////////
const getComments = (req, res) => {
	Comment.find({ boardId: req.body.id })
		.populate("writer")
		.exec((err, comments) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, comments })
		})
}

const saveComment = (req, res) => {
	const comment = new Comment(req.body)
	comment.save((err, comment) => {
		if (err) return res.status(400).json({ success: false, err })

		// populate를 한 정보를 가져오기 위해 바로 find 실행
		// 댓글 저장과 동시에 저장한 댓글과 작성자의 상세정보를 client로 전송.
		Comment.find({
			_id: comment._id,
		})
			.populate("writer")
			.exec((err, result) => {
				if (err) return res.status(400).json({ success: false, err })
				return res.status(200).json({ success: true, result })
			})
	})
}

const updateComment = (req, res) => {
	Comment.findByIdAndUpdate(req.params.id, {
		description: req.body.description,
	}).exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

const deleteComment = (req, res) => {
	Comment.findByIdAndDelete(req.params.id).exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

module.exports = { getComments, saveComment, updateComment, deleteComment }
