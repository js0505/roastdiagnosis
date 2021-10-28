import axios from "axios"
import {
	ADMISSION_USER,
	REFUSE_USER,
	WAITING_REGISTER_USER,
	GET_ALL_USERS,
	UPDATE_USER_ROLE,
} from "./types"

let adminAPI = ""
if (process.env.NODE_ENV === "production") {
	adminAPI = "/api/admin"
} else {
	adminAPI = "http://localhost:5000/api/admin"
}
export function waitingRegisterUser() {
	const request = axios
		.get(`${adminAPI}/admission`, { withCredentials: true })
		.then((res) => res.data)
	return {
		type: WAITING_REGISTER_USER,
		payload: request,
	}
}

export function admissionUser(id) {
	const variables = {
		id,
	}
	const request = axios
		.put(`${adminAPI}/admission`, variables, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: ADMISSION_USER,
		payload: request,
	}
}

export function refuseUser(id) {
	const variables = {
		id,
	}
	const request = axios
		.delete(`${adminAPI}/admission`, variables, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: REFUSE_USER,
		payload: request,
	}
}

export function getAllUsers() {
	const request = axios
		.get(`${adminAPI}/role`, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: GET_ALL_USERS,
		payload: request,
	}
}

export function changeUserRole(id, role) {
	const variables = {
		id,
		role
	}
	const request = axios
		.put(`${adminAPI}/role`, variables, {
			withCredentials: true,
		})
		.then((res) => res.data)
	return {
		type: UPDATE_USER_ROLE,
		payload: request,
	}
}
