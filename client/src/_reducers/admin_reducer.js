import {
	ADMISSION_USER,
	GET_ALL_USERS,
	REFUSE_USER,
	UPDATE_USER_ROLE,
	WAITING_REGISTER_USER,
} from "../_actions/types"

export default function (state = {}, action) {
	switch (action.type) {
		case WAITING_REGISTER_USER:
			return { ...state, userData: action.payload }
		case ADMISSION_USER:
			return { ...state, success: action.payload }
		case REFUSE_USER:
			return { ...state, success: action.payload }
		case GET_ALL_USERS:
			return { ...state, userData: action.payload }
		case UPDATE_USER_ROLE:
			return { ...state, success: action.payload }
		default:
			return state
	}
}
