import React, { useCallback, useEffect, useState } from "react"
import Loader from "../../../modules/Loader"
import { useDispatch } from "react-redux"
import { Table, Button, Popconfirm, message, PageHeader, Row, Col } from "antd"
import {
	admissionUser,
	refuseUser,
	waitingRegisterUser,
} from "../../../../_actions/admin_action"
import styled from "styled-components"
import { useHistory } from "react-router"

const SButton = styled(Button)`
	margin-right: 20px;
`
const SPageHeader = styled(PageHeader)`
	justify-content: center;
`
const UserAdmissionEdit = () => {
	const { Column } = Table
	const dispatch = useDispatch()
	const history = useHistory()
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)

	const getUsers = useCallback(() => {
		setLoading(true)
		dispatch(waitingRegisterUser()).then((res) => {
			setUsers(res.payload.result)
			setLoading(false)
		})
	}, [dispatch])

	useEffect(() => {
		getUsers()
	}, [getUsers])

	const onAdmissionHandler = (id) => {
		dispatch(admissionUser(id)).then(() => {
			message.success("승인 완료")
			getUsers()
		})
	}

	const onRefuseHandler = (id) => {
		dispatch(refuseUser(id)).then((res) => {
			message.success("거절 완료")
			getUsers()
		})
	}

	return (
		<Row justify="center">
			<Col xs={20} md={20} lg={15} xl={15}>
				<SPageHeader
					title={"회원가입 승인 대기 리스트"}
					onBack={() => history.push("/admin")}
				/>
				<Table
					size="small"
					dataSource={users}
					loading={loading ? <Loader /> : false}
				>
					<Column title="이름" key="name" dataIndex="name" align="center" />
					<Column title="이메일" key="email" dataIndex="email" align="center" />
					<Column
						title="가입 여부"
						key="action"
						align="center"
						render={(text, user) => (
							<>
								<SButton>
									<Popconfirm
										title="가입을 승인 하시겠습니까?"
										onConfirm={() => onAdmissionHandler(user._id)}
									>
										승인
									</Popconfirm>
								</SButton>
								<Button>
									<Popconfirm
										title="가입을 거절 하시겠습니까?"
										onConfirm={() => onRefuseHandler(user._id)}
									>
										거절
									</Popconfirm>
								</Button>
							</>
						)}
					/>
				</Table>
			</Col>
		</Row>
	)
}

export default UserAdmissionEdit
