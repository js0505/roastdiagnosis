import axios from "axios"
import {
	DELETE_COMMENT,
	GET_COMMENTS,
	SAVE_COMMENT,
	UPDATE_COMMENT,
} from "./types"

let commentAPI = ""
if (process.env.NODE_ENV === "production") {
	commentAPI = "/api/comment"
} else {
	commentAPI = "http://localhost:5000/api/comment"
}

export function getComments(id) {
	const body = {
		id,
	}
	const request = axios
		.post(`${commentAPI}`, body, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: GET_COMMENTS,
		payload: request,
	}
}

export function saveComment(variables) {
	const request = axios
		.post(`${commentAPI}/save`, variables, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: SAVE_COMMENT,
		payload: request,
	}
}

export function updateComment(id, body) {
	const request = axios
		.put(`${commentAPI}/${id}`, body, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: UPDATE_COMMENT,
		payload: request,
	}
}

export function deleteComment(id) {
	const request = axios
		.delete(`${commentAPI}/${id}`, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: DELETE_COMMENT,
		payload: request,
	}
}
