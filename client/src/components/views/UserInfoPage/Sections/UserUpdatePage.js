import {
	Col,
	Row,
	Input,
	Form,
	Popconfirm,
	Button,
	message,
	PageHeader,
} from "antd"
import { useHistory, useLocation } from "react-router"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import QueryString from "qs"
import { getUserById, updateUser } from "../../../../_actions/user_action"
import Loader from "../../../modules/Loader"
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`

const SForm = styled(Form)`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const SInput = styled(Input)`
	width: 100%;
	height: 3rem;
	border-radius: 10px;
`

const SButton = styled(Button)`
	width: 100%;
	margin-bottom: 10px;
	height: 3rem;
	border-radius: 10px;
`
const UserUpdatePage = () => {
	const [name, setName] = useState("")
	const [company, setCompany] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [loading, setLoading] = useState(null)

	const history = useHistory()
	const dispatch = useDispatch()
	const location = useLocation()
	const query = QueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	})

	useEffect(() => {
		dispatch(getUserById(query.id))
			.then((res) => {
				setLoading(true)
				setName(res.payload.result.name)
				setCompany(res.payload.result.company)
				setLoading(false)
			})
			.catch((e) => console.log(e))
	}, [query.id, dispatch])

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			return message.error("비밀번호가 일치하지 않습니다.")
		} else {
			let body = {
				id: query.id,
				name,
				company,
				password,
			}
			dispatch(updateUser(body)).then((res) => {
				if (res.payload.success) {
					message.success("정보가 변경 되었습니다.")
					history.push("/userinfo")
				}
			})
		}
	}

	if (loading) {
		return <Loader />
	}

	return (
		<Row justify="center">
			<Col xs={20} md={8} lg={5} xl={5}>
				<Container>
					<PageHeader title={"프로필 수정"} />
					<SForm layout="vertical" onFinish={onSubmitHandler}>
						<Form.Item
							rules={[
								{
									required: true,
									max: 10,
									message: "이름은 10글자 이하로 입력 해주세요.",
								},
							]}
						>
							<SInput
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								placeholder="이름"
							/>
						</Form.Item>

						<Form.Item
							rules={[
								{
									required: true,
									message: "소속을 입력 해주세요.",
								},
							]}
						>
							<SInput
								value={company}
								onChange={(e) => setCompany(e.target.value)}
								type="text"
								placeholder="소속"
							/>
						</Form.Item>

						<Form.Item
							rules={[
								{
									required: true,
									min: 5,
									message: "비밀번호는 5글자 이상 입력 해주세요.",
								},
							]}
						>
							<SInput
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="비밀번호"
							/>
						</Form.Item>

						<Form.Item
							rules={[
								{
									required: true,
									validator: (_, err) =>
										password === confirmPassword
											? Promise.resolve()
											: Promise.reject(
													new Error("비밀번호가 일치하지 않습니다.")
											  ),
								},
							]}
						>
							<SInput
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								type="password"
								placeholder="비밀번호 확인"
							/>
						</Form.Item>
						<br />
					</SForm>
				</Container>

				<SButton htmlType="submit" onClick={onSubmitHandler}>
					<Popconfirm title={"수정 하시겠습니까?"} onConfirm={onSubmitHandler}>
						수정
					</Popconfirm>
				</SButton>
				<SButton onClick={() => history.push("/userinfo")}>취소</SButton>
			</Col>
		</Row>
	)
}

export default UserUpdatePage
