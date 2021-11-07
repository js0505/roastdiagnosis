import axios from "axios"
import { AUTH_USER, GET_EMAIL_NUMBER } from "./types"

let userAPI = ""
if (process.env.NODE_ENV === "production") {
	userAPI = "/api/users"
} else {
	userAPI = "http://localhost:5000/api/users"
}

export function emailNumber(email) {
	const body = {
		email,
	}

	const request = axios
		.post(`${userAPI}/auth`, body)
		.then((res) => res.data)
		.catch((e) => console.log(e))
	return {
		type: GET_EMAIL_NUMBER,
		payload: request,
	}
}

export function auth() {
	const request = axios
		.get(`${userAPI}/auth`, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: AUTH_USER,
		payload: request,
	}
}
