import { Button, Input, Popconfirm, message, Row, Col } from "antd"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import QueryString from "qs"
import QuillEditor from "../../../modules/QuillEditor"
import { createBoard } from "../../../../_actions/board_action"

const Container = styled.div`
	max-width: 85%;
	min-width: 85%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const SInput = styled(Input)`
	margin-bottom: 20px;
	height: 50px;
	font-size: 20px;
	padding-left: 30px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
`
const SButton = styled(Button)`
	margin-right: 10px;
`

const CreateBoard = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [s3Key, setS3Key] = useState([])
	const user = useSelector((state) => state.user)
	const history = useHistory()
	const dispatch = useDispatch()
	const location = useLocation()
	const query = QueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	})

	const onSubmitHandler = async () => {
		if (title === "" || description === "") {
			message.error("제목과 내용을 입력 해주세요.")
			return
		}
		const variables = {
			writer: user.userData._id,
			title,
			description,
			s3Key,
			bindex: query.bindex,
		}

		dispatch(createBoard(variables))
			.then((res) => {
				message.success("작성 되었습니다.")
				history.push(`/board/${res.payload.result._id}?bindex=${query.bindex}`)
			})
			.catch((e) => console.log(e))
	}
	const getS3KeyFunction = (value) => {
		setS3Key((s3Key) => [...s3Key, value])
	}

	return (
		<Row justify="center">
			<Col xs={24} md={22} lg={16} xl={16}>
				<Container>
					<Form onSubmit={onSubmitHandler}>
						<SInput
							type="text"
							value={title}
							placeholder={"제목을 입력하세요"}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<QuillEditor
							value={description}
							onChange={setDescription}
							getS3KeyFunction={getS3KeyFunction}
						/>
						<br />
						<ButtonContainer>
							<SButton type="submit">
								<Popconfirm
									title={"작성 하시겠습니까?"}
									onConfirm={onSubmitHandler}
								>
									작성
								</Popconfirm>
							</SButton>
							<Button onClick={() => history.goBack()}>취소</Button>
						</ButtonContainer>
					</Form>
				</Container>
			</Col>
		</Row>
	)
}

export default CreateBoard
