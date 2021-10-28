import React, { useCallback, useEffect, useState } from "react"
import Loader from "../../../modules/Loader"
import { useDispatch } from "react-redux"
import { Table, Button, message, PageHeader, Row, Col, Select } from "antd"
import { changeUserRole, getAllUsers } from "../../../../_actions/admin_action"
import styled from "styled-components"
import { useHistory } from "react-router"
const { Option } = Select

const SButton = styled(Button)`
	margin-right: 20px;
`
const SPageHeader = styled(PageHeader)`
	justify-content: center;
`

const UserRoleEdit = () => {
	const { Column } = Table
	const dispatch = useDispatch()
	const history = useHistory()
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)

	const getUsers = useCallback(() => {
		setLoading(true)
		dispatch(getAllUsers()).then((res) => {
			setUsers(res.payload.result)
			setLoading(false)
		})
	}, [dispatch])

	useEffect(() => {
		getUsers()
	}, [getUsers])

	const onRoleChangeHandler = (id, value) => {
		let question = window.confirm("선택된 등급으로 변경 하시겠습니까?")
		if (!question) {
			return
		} else {
			dispatch(changeUserRole(id, value)).then((res) => {
				message.success("등급이 변경 되었습니다.")
			})
		}
	}
	return (
		<Row justify="center">
			<Col xs={24} md={24} lg={15} xl={15}>
				<SPageHeader
					title={"회원 등급 관리"}
					onBack={() => history.push("/admin")}
				/>

				<Table
					dataSource={users}
					size="small"
					loading={loading ? <Loader /> : false}
				>
					<Column title="이름" key="name" dataIndex="name" align="center" />

					<Column
						title="소속"
						key="company"
						dataIndex="company"
						align="center"
					/>
					<Column title="이메일" key="email" dataIndex="email" align="center" />
					<Column
						title="등급"
						key="role"
						align="center"
						filters={[
							{ text: "관리자", value: 1 },
							{ text: "가입대기", value: 2 },
							{ text: "일반회원", value: 3 },
						]}
						onFilter={(value, record) => {
							console.log(record)
							return record.role === value
						}}
						render={(value, record) => {
							return (
								<Select
									defaultValue={
										{
											1: "관리자",
											2: "가입대기",
											3: "일반회원",
										}[record.role]
									}
									onChange={(value) => onRoleChangeHandler(record._id, value)}
								>
									<Option value="1">관리자</Option>
									<Option value="2">가입대기</Option>
									<Option value="3">일반회원</Option>
								</Select>
							)
						}}
					/>
				</Table>
			</Col>
		</Row>
	)
}

export default UserRoleEdit
