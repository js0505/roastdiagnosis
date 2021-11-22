import React from "react"
import styled from "styled-components"
import { Col, Divider, List, Row, Typography } from "antd"

const Container = styled.div`
	width: 100%;
`
const SListItem = styled(List.Item)`
	display: flex;
	justify-content: space-between;
`
const ResentContainer = styled.div`
	/* width: 30%;
	margin-left: 10%; */
`

const ResentTitle = styled(Typography.Text)`
	overflow-x: hidden;
`
const ResentName = styled.div`
	display: inline-block;
	width: 10%;

	@media ${(props) => props.theme.xs} {
		width: 20%;
	}
`

const LandingPage = ({ recentBoards }) => {
	return (
		<Row justify="center">
			<Col xs={22} md={20} lg={15} xl={15}>
				<Container>
					<ResentContainer>
						<Divider orientation="left">최근 업로드 게시물</Divider>
						<List
							dataSource={recentBoards}
							renderItem={(item) => (
								<SListItem>
									<div style={{ display: "inline-block" }}>
										<Typography.Text mark={true} style={{ marginRight: "8px" }}>
											{
												{
													1: "공지",
													2: "자유",
													3: "정보",
													4: "질문",
												}[item.bindex]
											}
										</Typography.Text>{" "}
										<ResentTitle>
											<a href={`/board/${item._id}?bindex=${item.bindex}`}>
												{item.title.length < 19
													? item.title
													: item.title.slice(0, 17) + " ..."}
											</a>
										</ResentTitle>
									</div>
									<ResentName>
										<List.Item.Meta description={item.writer.name} />
									</ResentName>
								</SListItem>
							)}
						/>
					</ResentContainer>
				</Container>
			</Col>
		</Row>
	)
}

export default LandingPage
