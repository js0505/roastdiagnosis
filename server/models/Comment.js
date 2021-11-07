const mongoose = require("mongoose")
const Schema = mongoose.Schema

//스키마 생성
const commentSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		responseTo: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
		boardId: {
			type: Schema.Types.ObjectId,
			ref: "Board",
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true }
)

//모델 생성
const Comment = mongoose.model("Comment", commentSchema)

module.exports = { Comment }
