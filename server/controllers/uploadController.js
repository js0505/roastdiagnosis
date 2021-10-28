const multer = require("multer")
const multerS3 = require("multer-sharp-s3")
const AWS = require("aws-sdk")

const config = require("../config/key")

const s3 = new AWS.S3({
	accessKeyId: config.AWS_ACCESS_KEY,
	secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	region: config.AWS_S3_REGION,
})

let storage = multerS3({
	s3: s3,
	Bucket: config.AWS_S3_BUCKET,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	ACL: "public-read",
	// resize: {
	// 	width: 800,
	// },
	max: 100,

	Key: function (req, file, cb) {
		cb(null, `images/${Date.now()}_${file.originalname}`)
	},
})

const upload = multer({
	storage: storage,
	limits: { fileSize: 1 * 1024 * 1024 },
}).single("image")

const uploadImage = (req, res) => {
	upload(req, res, (err) => {
		if (err) return res.json({ success: false, err })
		return res.json({
			success: true,
			url: res.req.file.Location,
			fileName: res.req.file.key,
			file: res.req.file,
		})
	})
}

module.exports = { uploadImage }
