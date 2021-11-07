import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { auth } from "../_actions/auth_action"

export default function (SpecificComponent, option, adminRoute = null) {
	// option 설명
	// null -> 아무나 출입 가능
	// true -> login한 유저 출입 가능
	// false -> login한 유저는 출입 불가능
	function AuthenticationCheck(props) {
		const dispatch = useDispatch()
		const history = useHistory()
		useEffect(() => {
			dispatch(auth()).then((res) => {
				//로그인 하지 않은 상태
				if (!res.payload.isAuth) {
					//로그인 한 유저만 접근 가능한 페이지 라면
					if (option) {
						history.push("/login")
					}
				} else {
					//로그인 한 상태
					// 어드민 페이지 인데 어드민계정이 아니면
					if (adminRoute && !res.payload.isAdmin) {
						history.push("/")
					} else {
						//로그인 한 유저는 접근하지 말아야 할 페이지 라면
						if (option === false) {
							history.push("/")
						}
					}
				}
			})
		}, [dispatch, history])

		return <SpecificComponent />
	}
	return AuthenticationCheck
}
