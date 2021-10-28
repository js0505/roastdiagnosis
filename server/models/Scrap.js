const mongoose = require("mongoose")
const Schema = mongoose.Schema

//스키마 생성
const scrapSchema = mongoose.Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Board",
		},
	},
	{ timestamps: true }
)

//모델 생성
const Scrap = mongoose.model("Scrap", scrapSchema)

module.exports = { Scrap }
