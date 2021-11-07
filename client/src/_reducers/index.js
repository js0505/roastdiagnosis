import { combineReducers } from "redux"
import user from "./user_reducer"
import board from "./board_reducer"
import scrap from "./scrap_reducer"
import admin from "./admin_reducer"
import auth from "./auth_reducer"
import comment from "./comment_reducer"
const rootReducer = combineReducers({
	user,
	board,
	scrap,
	admin,
	auth,
	comment,
})

export default rootReducer
