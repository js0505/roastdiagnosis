// 로컬 개발 환경인지 프로덕션 상태인지 확인
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./production')
} else {
    module.exports = require('./dev')
}