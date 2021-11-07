import {
	SAVE_COMMENT,
	GET_COMMENTS,
	UPDATE_COMMENT,
	DELETE_COMMENT,
} from "../_actions/types"

export default function (state = {}, action) {
	switch (action.type) {
		case SAVE_COMMENT:
			return { ...state, result: action.payload }
		case GET_COMMENTS:
			return { ...state, result: action.payload }
		case UPDATE_COMMENT:
			return { ...state, result: action.payload }
		case DELETE_COMMENT:
			return { ...state, result: action.payload }
		default:
			return state
	}
}
