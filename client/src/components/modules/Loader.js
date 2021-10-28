import React from "react"
import styled from "styled-components"
import { Spin } from "antd"

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
	margin: 0 auto;
`

const Loader = () => {
	return (
		<Container>
			<Spin tip="Loading..." size="large" />
		</Container>
	)
}

export default Loader
