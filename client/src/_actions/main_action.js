import axios from "axios"
import { GET_RESENT_BOARD } from "./types"

let mainPageAPI = ""
if (process.env.NODE_ENV === "production") {
	mainPageAPI = "/api/main/"
} else {
	mainPageAPI = "http://localhost:5000/api/main/"
}

export function getResentBoard() {
	const request = axios.get(`${mainPageAPI}`).then((res) => res.data)
	return {
		type: GET_RESENT_BOARD,
		payload: request,
	}
}
