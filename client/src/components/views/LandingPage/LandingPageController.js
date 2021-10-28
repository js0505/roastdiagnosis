import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import LandingPage from "./LandingPage"
import { getResentBoard } from "../../../_actions/main_action"

const LandingPageController = () => {
	const [getRecentBoards, setGetResentBoards] = useState([])
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getResentBoard()).then((res) =>
			setGetResentBoards(res.payload.result)
		)
	}, [dispatch])

	return <LandingPage recentBoards={getRecentBoards} />
}

export default LandingPageController
