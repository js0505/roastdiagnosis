import React from "react"
import { Col, List, PageHeader, Row } from "antd"

const AdminPage = () => {
	return (
		<Row justify="center">
			<Col xs={20} md={20} lg={15} xl={10}>
				<PageHeader title="관리자 기능" />
				<List bordered>
					<List.Item>
						<List.Item.Meta
							title={<a href="/admin/admission">회원가입 승인</a>}
							description="가입 대기 상태의 회원을 관리합니다."
						/>
					</List.Item>
					<List.Item>
						<List.Item.Meta
							title={<a href="/admin/role">회원등급 관리</a>}
							description="회원의 등급을 관리합니다."
						/>
					</List.Item>
				</List>
			</Col>
		</Row>
	)
}

export default AdminPage
