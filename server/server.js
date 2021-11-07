const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 5000

const config = require("./config/key")

// Routes
const userRoute = require("./routes/users")
const boardRoute = require("./routes/board")
const scrapRoute = require("./routes/scrap")
const uploadRoute = require("./routes/upload")
const adminRoute = require("./routes/admin")
const mainPageRoute = require("./routes/mainPage")
const commentRoute = require("./routes/comment")

// CORS
const cors = require("cors")
app.use(
	cors({
		origin: true,
		credentials: true,
	})
)

//각 주석의 형태의 데이터들을 가져올 수 있게 body-parser 옵션 설정
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// application/json
app.use(express.json())
// body-parser 옵션 설정 끝

app.use(cookieParser())

//몽구스 이용해서 몽고db와 연결
const mongoose = require("mongoose")
mongoose
	.connect(config.mongoURI)
	.then(() => {
		console.log("MongoDB Connected..")
	})
	.catch((err) => console.log(err))
//몽구스 연결 끝

// Route
app.use("/api/users", userRoute)
app.use("/api/board", boardRoute)
app.use("/api/scrap", scrapRoute)
app.use("/api/upload", uploadRoute)
app.use("/api/admin", adminRoute)
app.use("/api/main", mainPageRoute)
app.use("/api/comment", commentRoute)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
