import React, { useEffect, useState } from "react"
import QueryString from "qs"
import { useLocation } from "react-router"
import { useParams, useHistory } from "react-router-dom"
import ReactHtmlParser from "react-html-parser"
import { useDispatch, useSelector } from "react-redux"
import { deleteBoard, getDetail } from "../../../../_actions/board_action"
import { addScrap } from "../../../../_actions/scrap_action"
import { Button, message, Popconfirm, Row, Col } from "antd"
import Loader from "../../../modules/Loader"
import Moment from "react-moment"
import styled from "styled-components"
import "react-quill/dist/quill.snow.css"
import { getComments } from "../../../../_actions/comment_action"
import Comments from "../../CommentModule/Comments"

const Container = styled.div`
	width: 100%;
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	@media ${(props) => props.theme.xs} {
		flex-direction: column;
	}
`

const TitleWriterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`

const Title = styled.div`
	width: 100%;
	margin-left: 10%;
	font-size: 1.5rem;
	margin-bottom: 10px;

	@media ${(props) => props.theme.xs} {
		margin-left: 0;
		font-size: 1rem;
	}
`
const Writer = styled.div`
	width: 100%;
	margin-left: 10%;
	opacity: 0.5;
	display: flex;
	flex-direction: row;

	@media ${(props) => props.theme.xs} {
		margin-left: 0;
	}
`

const WriterSpan = styled.span`
	margin-bottom: 5px;
	margin-right: 10px;
`

const Description = styled.div`
	width: 100%;
`
const SButton = styled(Button)`
	margin-right: 10px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: right;
	margin-top: 10px;
`
const BoardDetail = () => {
	const user = useSelector((state) => state.auth.userData)
	const [detailItem, setDetailItem] = useState({})
	const [commentsList, setCommentsList] = useState([])
	const [loading, setLoading] = useState(null)

	const { id } = useParams()
	const history = useHistory()
	const dispatch = useDispatch()
	const location = useLocation()
	const query = QueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	})

	useEffect(() => {
		setLoading(true)
		dispatch(getDetail(id)).then((res) => {
			setDetailItem(res.payload.result)
		})
		setLoading(false)
		dispatch(getComments(id))
			.then((res) => {
				setCommentsList(res.payload.comments)
			})
			.catch((e) => console.log(e))
	}, [dispatch, id])

	const onDeleteBoardHandler = async () => {
		await dispatch(deleteBoard(id))
			.then(() => {
				message.success("삭제 되었습니다.")
				history.push(`/board?bindex=${query.bindex}`)
			})
			.catch((e) => console.log(e))
	}
	const onScrapHandler = async () => {
		const body = {
			user: user._id,
			post: id,
		}
		await dispatch(addScrap(body)).then((res) => {
			if (!res.payload.success) {
				message.warning(res.payload.message)
				return
			} else {
				message.success("스크랩 성공")
			}
		})
	}

	// 대댓글은 따로

	const refreshCommentFunction = (method, value) => {
		if (method === "create") {
			setCommentsList(commentsList.concat(value))
		} else if (method === "delete") {
			setCommentsList(commentsList.filter((item) => item._id !== value))
		} else if (method === "update") {
			dispatch(getComments(id))
				.then((res) => {
					setCommentsList(res.payload.comments)
				})
				.catch((e) => console.log(e))
		}
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				detailItem.writer && (
					<Row justify="center">
						<Col xs={22} md={22} lg={16} xl={16}>
							<Container>
								<Header>
									<TitleWriterContainer>
										<Title>
											<p>{detailItem.title}</p>
										</Title>
										<Writer>
											<WriterSpan>
												{detailItem.writer.name} ({detailItem.writer.company}){" "}
											</WriterSpan>
											<WriterSpan>| </WriterSpan>
											<WriterSpan>
												<Moment format={"YY-MM-DD"}>
													{detailItem.writer.createdAt}
												</Moment>
											</WriterSpan>
										</Writer>
									</TitleWriterContainer>
									<ButtonContainer>
										{detailItem.writer._id !== user?._id ? (
											<>
												<SButton onClick={onScrapHandler}>스크랩</SButton>
											</>
										) : (
											<>
												<SButton href={`/board/update/${id}`}>수정</SButton>
												<SButton>
													<Popconfirm
														title={"삭제 하시겠습니까?"}
														onConfirm={onDeleteBoardHandler}
													>
														삭제
													</Popconfirm>
												</SButton>
											</>
										)}
									</ButtonContainer>
								</Header>
								<hr style={{ opacity: "0.4" }} />
								<br />

								<div className="ql-snow">
									<Description className="ql-editor">
										{ReactHtmlParser(detailItem.description)}
									</Description>
								</div>
								<hr style={{ opacity: "0.4" }} />
								<br />
								{/* Comment */}
								<Comments
									boardId={id}
									commentsList={commentsList}
									refreshCommentFunction={refreshCommentFunction}
								/>
							</Container>
						</Col>
					</Row>
				)
			)}
		</>
	)
}

export default BoardDetail
