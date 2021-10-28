const { User } = require("../models/User")

let auth = (req, res, next) => {
	//인증처리 하는 부분.

	// 1. 클라이언트 쿠키에서 토큰을 가져온다.
	let token = req.cookies.x_auth
	// 2. 토큰 복호화, 유저를 찾기
	User.findByToken(token, (err, user) => {
		// 아이디, 토큰으로 찾지 못했을 때 리턴
		if (err) throw err
		if (!user) return res.json({ isAuth: false, error: true })

		if (user.role === 2) {
			return res.json({ isAuth: false, message: "가입 승인 대기중 입니다." })
		}

		//req.*** 로 사용할 수 있도록 req에 데이터 입력.
		req.token = token
		req.user = user
		// 미들웨어 에서 다음 콜백으로 넘어가도록.

		next()
	})

	// 3. 유저가 있으면 인증 성공, 아니면 실패
}

let admin = (req, res, next) => {
	if (req.user.role !== 1) {
		return res.send("관리자만 사용 할수 있는 기능입니다.")
	}

	next()
}
module.exports = { auth, admin }
