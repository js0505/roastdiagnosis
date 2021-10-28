import { Button, Input, Popconfirm, message, Row, Col } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import styled from "styled-components"
import QuillEditor from "../../../modules/QuillEditor"
import { getDetail, updateBoard } from "../../../../_actions/board_action"

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
	flex-direction: row;
	justify-content: center;
`

const UpdateBoard = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [s3Key, setS3Key] = useState([])
	const user = useSelector((state) => state.user)
	const history = useHistory()
	const { id } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getDetail(id))
			.then((res) => {
				setTitle(res.payload.result.title)
				setDescription(res.payload.result.description)
				setS3Key(res.payload.result.s3Key)
			})
			.catch((e) => console.log(e))
	}, [dispatch, history, id])

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (title === "" || description === "") {
			message.error("제목과 내용을 입력 해주세요.")
			return
		}

		const variables = {
			writer: user.userData._id,
			title,
			description,
			s3Key,
		}

		dispatch(updateBoard(id, variables)).then(() => {
			message.success("작성 완료")
			history.push(`/board/${id}`)
		})
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
							<Button type="submit">
								<Popconfirm
									title={"작성 하시겠습니까?"}
									onConfirm={onSubmitHandler}
								>
									작성
								</Popconfirm>
							</Button>
							<Button onClick={() => history.goBack()}>취소</Button>
						</ButtonContainer>
					</Form>
				</Container>
			</Col>
		</Row>
	)
}

export default UpdateBoard
