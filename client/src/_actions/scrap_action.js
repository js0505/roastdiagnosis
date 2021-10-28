import axios from "axios"
import { ADD_SCRAP, DELETE_SCRAP, GET_SCRAP } from "./types"

let scrapAPI = ""
if (process.env.NODE_ENV === "production") {
	scrapAPI = "/api/scrap/"
} else {
	scrapAPI = "http://localhost:5000/api/scrap/"
}

export function addScrap(body) {
	const request = axios
		.post(`${scrapAPI}`, body, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: ADD_SCRAP,
		payload: request,
	}
}

export function getScrap(id) {
	const request = axios
		.get(`${scrapAPI}${id}`, { withCredentials: true })
		.then((res) => res)
	return {
		type: GET_SCRAP,
		payload: request,
	}
}

export function deleteScrap(postId) {
	const request = axios
		.delete(`${scrapAPI}${postId}`, { withCredentials: true })
		.then((res) => res)
	return {
		type: DELETE_SCRAP,
		payload: request,
	}
}
