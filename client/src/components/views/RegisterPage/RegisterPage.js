import React, { useState } from "react"
import { Button, Form, Input, PageHeader, message, Row, Col } from "antd"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerUser } from "../../../_actions/user_action"

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
	height: 3rem;
	border-radius: 10px;
`
const RegisterPage = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [company, setCompany] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const onSubmitHandler = () => {
		if (password !== confirmPassword) {
			return message.error("비밀번호가 일치하지 않습니다.")
		} else {
			let body = {
				name,
				email,
				company,
				password,
			}
			dispatch(registerUser(body)).then((res) => {
				if (res.payload.err) {
					if (res.payload.err.code === 11000) {
						return message.error("해당 이메일이 이미 존재합니다.")
					}
				}

				if (res.payload.success) {
					history.push("/login")
				}
			})
		}
	}

	return (
		<Row justify="center">
			<Col xs={20} md={8} lg={5} xl={5}>
				<Container>
					<PageHeader title={"회원가입"} />
					<SForm layout="vertical" onFinish={onSubmitHandler}>
						<Form.Item
							name="username"
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
							name="email"
							rules={[
								{
									required: true,
									message: "이메일을 입력 해주세요.",
								},
							]}
						>
							<SInput
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								placeholder="이메일"
							/>
						</Form.Item>
						<Form.Item
							name="company"
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
							name="password"
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
							name="confirmPassword"
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
						<SButton htmlType="submit">회원가입</SButton>
					</SForm>
				</Container>
			</Col>
		</Row>
	)
}

export default RegisterPage
