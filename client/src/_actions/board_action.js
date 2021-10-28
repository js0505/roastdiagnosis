import axios from "axios"
import {
	GET_ALL_BOARD,
	GET_DETAIL_BOARD,
	DELETE_BOARD,
	CREATE_BOARD,
	UPDATE_BOARD,
	SEARCH_BOARD,
} from "./types"

let boardAPI = ""
if (process.env.NODE_ENV === "production") {
	boardAPI = "/api/board/"
} else {
	boardAPI = "http://localhost:5000/api/board/"
}

export function getBoardByBIndex(bindex) {
	const request = axios
		.get(`${boardAPI}?bindex=${bindex}`)
		.then((res) => res.data)
	return {
		type: GET_ALL_BOARD,
		payload: request,
	}
}

export function getDetail(id) {
	const request = axios
		.get(`${boardAPI}${id}`, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: GET_DETAIL_BOARD,
		payload: request,
	}
}

export function deleteBoard(id) {
	const request = axios
		.delete(`${boardAPI}${id}`, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: DELETE_BOARD,
		payload: request,
	}
}

export function createBoard(variables) {
	const request = axios
		.post(`${boardAPI}`, variables, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: CREATE_BOARD,
		payload: request,
	}
}

export function updateBoard(id, variables) {
	const request = axios
		.put(`${boardAPI}${id}`, variables, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: UPDATE_BOARD,
		payload: request,
	}
}

export function searchBoard(query) {
	const request = axios.get(`${boardAPI}search${query}`).then((res) => res)
	return {
		type: SEARCH_BOARD,
		payload: request,
	}
}
