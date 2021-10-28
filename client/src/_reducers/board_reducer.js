import {
	GET_ALL_BOARD,
	GET_DETAIL_BOARD,
	CREATE_BOARD,
	DELETE_BOARD,
	UPDATE_BOARD,
	SEARCH_BOARD,
} from "../_actions/types"

export default function (state = {}, action) {
	switch (action.type) {
		case GET_ALL_BOARD:
			return { ...state, result: action.payload }
		case GET_DETAIL_BOARD:
			return { ...state, result: action.payload }
		case CREATE_BOARD:
			return { ...state, result: action.payload }
		case DELETE_BOARD:
			return { ...state, result: action.payload }
		case UPDATE_BOARD:
			return { ...state, result: action.payload }
		case SEARCH_BOARD:
			return { ...state, result: action.payload }
		default:
			return state
	}
}
