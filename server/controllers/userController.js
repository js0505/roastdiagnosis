const { User } = require("../models/User")
const nodemailer = require("nodemailer")
const config = require("../config/key")

/////////////////////////////
// '/'
/////////////////////////////
const registerUser = (req, res) => {
	const user = new User(req.body)

	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err })
		return res.status(200).json({
			success: true,
		})
	})
}

const updateUserInfo = (req, res) => {
	User.findById(req.body.id, (err, result) => {
		result.name = req.body.name
		result.company = req.body.company
		result.password = req.body.password
		result.save().then((result) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, result })
		})
	})
}

/////////////////////////////
// '/login'
/////////////////////////////

const loginUser = (req, res) => {
	// 요청된 이메일을 데이터베이스에서 찾는다.
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: "이메일에 해당하는 유저가 없습니다.",
			})
		}
		// 이메일을 찾으면 비밀번호가 맞는지 확인한다.
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({
					loginSuccess: false,
					message: "비밀번호가 틀렸습니다.",
				})

			if (user.role === 2) {
				return res.json({
					loginSuccess: false,
					message: "가입 승인 대기중 입니다.",
				})
			}
			// 모두 맞으면 토큰 생성.
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err)
				// token을 저장한다. 쿠키, 로컬스토리지 등에.
				// 여기선 쿠키로 저장.
				res
					.cookie("x_auth", user.token)
					.status(200)
					.json({ loginSuccess: true, userId: user._id, token: user.token })
			})
		})
	})
}

/////////////////////////////
// '/auth'
/////////////////////////////

const authInfo = (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 1 ? true : false,
		isAuth: true,
		email: req.user.email,
		password: req.user.password,
		company: req.user.company,
		name: req.user.name,
		role: req.user.role,
		image: req.user.image,
	})
}

const emailCheck = (req, res) => {
	let userMail = req.body.email
	if (userMail === "") return res.json({ success: false, err })

	let authNumber = Math.floor(Math.random() * 1000000) + 100000
	if (authNumber > 1000000) {
		authNumber = authNumber - 100000
	}

	let transporter = nodemailer.createTransport({
		service: "gmail",
		prot: 587,
		host: "smtp.gmlail.com",
		secure: false,
		requireTLS: true,
		auth: {
			user: config.GMAIL_ID,
			pass: config.GMAIL_PASSWORD,
		},
	})
	let message = {
		from: "roastdiagnosis0@gmail.com",
		to: userMail,
		subject: "roastdiagnosis 이메일 인증번호 입니다",
		html: `
			<div style='text-align: center; width: 50%; height: 60%; margin: 15%; padding: 20px; box-shadow: 1px 1px 3px 0px #999;'>
				<h2>Roastdiagnosis 인증번호</h2>
				<h3>${authNumber}</h3>
			</div>`,
	}
	transporter.sendMail(message, (err) => {
		if (err) return res.json({ success: false, err })
		return res.status(200).send({
			success: true,
			authNumber,
		})
	})
}

/////////////////////////////
// '/logout'
/////////////////////////////

const logoutUser = (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
		if (err) return res.json({ success: false, err })
		return res.status(200).send({
			success: true,
		})
	})
}

module.exports = {
	registerUser,
	loginUser,
	authInfo,
	logoutUser,
	updateUserInfo,
	emailCheck,
}
