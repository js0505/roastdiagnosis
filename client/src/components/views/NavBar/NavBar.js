import React from "react"
import { useHistory } from "react-router-dom"
import { Layout, Menu } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../../_actions/user_action"
import styled from "styled-components"
const { SubMenu } = Menu
const { Header } = Layout
const SMenu = styled(Menu)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px 5px 5px -1px rgba(0, 0, 0, 0.2);
`

const SHeader = styled(Header)`
	margin-top: 15px;
	margin-bottom: 15px;
	background-color: #f0f2f5;
	/* 모바일 들어가면 패딩값 조절 */
	/* padding: 0; */
`

const SLayout = styled(Layout)`
	margin-bottom: 20px;
`

// const LeftMenu = styled.div`
// 	width: 100%;
// 	display: flex;
// 	font-size: 16px;
// 	margin-left: 20px;
// `

// const RightMenu = styled.div`
// 	font-size: 16px;
// 	margin-right: 20px;
// `

const NavBar = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	const onLogoutHandler = () => {
		dispatch(logoutUser()).then((res) => {
			if (res.payload.status === 200) {
				history.push("/login")
			} else {
				alert("logout error")
			}
		})
	}

	return (
		<SLayout>
			<SHeader>
				<SMenu mode="horizontal">
					<Menu.Item key="home">
						<a href="/">Roast Diagnosis</a>
					</Menu.Item>
					<Menu.Item key="board1">
						<a href="/board?bindex=1">공지</a>
					</Menu.Item>
					<Menu.Item key="board2">
						<a href="/board?bindex=2">자유</a>
					</Menu.Item>
					<Menu.Item key="board3">
						<a href="/board?bindex=3">정보</a>
					</Menu.Item>
					<Menu.Item key="board4">
						<a href="/board?bindex=4">질문</a>
					</Menu.Item>

					{user.userData && !user.userData.isAuth ? (
						<Menu.Item>
							<a href="/login">Login</a>
						</Menu.Item>
					) : (
						<>
							<SubMenu
								key="SubMenu"
								title={user.userData && user.userData.name}
								icon={<UserOutlined />}
							>
								{user.userData && user.userData.isAdmin && (
									<Menu.Item>
										<a href="/admin">관리자 페이지</a>
									</Menu.Item>
								)}
								<Menu.Item>
									<a href={user.userData && `/userinfo`}>내 프로필</a>
								</Menu.Item>
								<Menu.Item>
									<a href={user.userData && `/scrap/${user.userData._id}`}>
										스크랩
									</a>
								</Menu.Item>
								<Menu.Item onClick={onLogoutHandler}>로그아웃</Menu.Item>
							</SubMenu>
						</>
					)}
				</SMenu>
			</SHeader>
		</SLayout>
	)
}

export default NavBar
