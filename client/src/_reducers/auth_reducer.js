import { AUTH_USER, GET_EMAIL_NUMBER } from "../_actions/types"

export default function (state = {}, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, userData: action.payload }
		case GET_EMAIL_NUMBER:
			return { ...state, success: action.payload }
		default:
			return state
	}
}
