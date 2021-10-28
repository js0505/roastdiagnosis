const mongoose = require("mongoose")
const Schema = mongoose.Schema

const autoIncrement = require("mongoose-auto-increment")
autoIncrement.initialize(mongoose.connection)

//스키마 생성
const boardSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		seq: {
			type: Number,
			default: 0,
		},
		bindex: {
			type: Number,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		category: {
			type: String,
		},
		views: {
			type: Number,
			default: 0,
		},
		filePath: {
			type: String,
		},
		isFixed: {
			// 고정글 여부
			type: Boolean,
			default: false,
		},
		s3Key: {
			type: Array,
		},
	},
	{ timestamps: true }
)

boardSchema.plugin(autoIncrement.plugin, {
	model: "Board",
	field: "seq",
	atartAt: 1,
	increment: 1,
})

//모델 생성
const Board = mongoose.model("Board", boardSchema)

module.exports = { Board }
