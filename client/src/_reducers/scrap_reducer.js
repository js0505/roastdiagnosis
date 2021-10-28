import { ADD_SCRAP, DELETE_SCRAP, GET_SCRAP } from "../_actions/types"

export default function (state = {}, action) {
	switch (action.type) {
		case ADD_SCRAP:
			return { ...state, result: action.payload }
		case GET_SCRAP:
			return { ...state, result: action.payload }
		case DELETE_SCRAP:
			return { ...state, result: action.payload }
		default:
			return state
	}
}
