import React from "react"
import { useSelector } from "react-redux"
import { Col, Row, Button, Descriptions, PageHeader } from "antd"
import styled from "styled-components"

const TopContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`

const SButton = styled(Button)`
	width: 15%;
	margin-top: 20px;
	height: 2rem;
	border-radius: 10px;
`

const UserInfoPage = () => {
	const userState = useSelector((state) => state.auth)
	const userinfo = userState.userData

	return (
		<Row justify="center">
			<Col xs={20} md={18} lg={16} xl={14}>
				<TopContainer>
					<PageHeader title={"내 프로필"} />
					<SButton>
						<a href={`/changeuserinfo?id=${userinfo?._id}`}>프로필 수정</a>
					</SButton>
				</TopContainer>

				<Descriptions bordered>
					<Descriptions.Item label="이름">{userinfo?.name}</Descriptions.Item>
					<Descriptions.Item label="소속">
						{userinfo?.company}
					</Descriptions.Item>
					<Descriptions.Item label="이메일">
						{userinfo?.email}
					</Descriptions.Item>
					<Descriptions.Item label="등급">
						{
							{
								1: "관리자",
								2: "가입대기",
								3: "일반회원",
							}[userinfo?.role]
						}
					</Descriptions.Item>
				</Descriptions>
			</Col>
		</Row>
	)
}

export default UserInfoPage
