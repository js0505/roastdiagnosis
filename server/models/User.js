const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
//10자리 salt 생성
const saltRounds = 10
const jwt = require("jsonwebtoken")
const config = require("../config/key")

//스키마 생성
const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 10,
	},
	email: {
		type: String,
		// trim = 데이터의 빈칸을 없애준다.
		// ex) shin js0505@naver.com -> shinjs0505@naver.com
		trim: true,
		//unique = 중복금지
		unique: 1,
	},
	password: {
		type: String,
		minlength: 5,
	},
	role: {
		type: Number,
	},
	image: String,
	company: String,
	token: {
		type: String,
	},
	//토큰 사용기간
	tokenExp: {
		type: Number,
	},
})

// 몽구스에서 가져온 메소드 pre
// 값을 save로 해두면 해당 스키마를 저장하기 전에 콜백.
userSchema.pre("save", function (next) {
	let user = this

	//비밀번호가 생성, 수정 때에만 암호화
	if (!user.isModified("password")) {
		next()
	} else {
		//salt를 생성해서 salt를 이용해서 비밀번호를 암호화 해야한다
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) return next(err)

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err)
				//생성된 salt의 길이에 맞는 hash 값을 form에서 받은 password와 변경
				user.password = hash
				next()
			})
		})
	}
})

// 입력받은 비밀번호와 기존 비밀번호를 비교하는 메소드
userSchema.methods.comparePassword = function (plainPassword, callback) {
	// plainPassword = 12345, 암호화된 비밀번호 = 0fj29jf0e029f9
	// plainPassword를 암호화 해서 비교한다.
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
		if (err) return callback(err)
		callback(null, isMatch)
	})
}

userSchema.methods.generateToken = function (callback) {
	let user = this

	// jsonwebtoken을 이용해서 token 생성
	// 두번째 인자값을 넣어서 토큰과 비교하면 id가 다시 나타난다. 기억 해야함.
	let token = jwt.sign(user._id.toHexString(), config.TOKEN)

	//토큰을 데이터베이스에 저장
	user.token = token
	user.save(function (err, user) {
		if (err) return callback(err)
		callback(null, user)
	})
}

// 유저 아이디, 토큰을 이용해서 유저를 찾고
// 클라이언트 에서 가져온 토큰과 데이터베이스 내부의 토큰이 일치하는지 확인
userSchema.statics.findByToken = function (token, callback) {
	let user = this

	// 토큰을 decode하면 userid가 나옴
	jwt.verify(token, config.TOKEN, function (err, decoded) {
		//나온 user id와 토큰을 같이 넣어서 검색
		user.findOne({ _id: decoded, token: token }, function (err, user) {
			if (err) return callback(err)
			callback(null, user)
		})
	})
}

//모델 생성
const User = mongoose.model("User", userSchema)

module.exports = { User }
