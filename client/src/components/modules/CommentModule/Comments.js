import React, { useState } from "react"
import { Button, Input, Form } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { saveComment } from "../../../_actions/comment_action"
import SingleComment from "./Sections/SingleComment"
import ReplyComment from "./Sections/ReplyComment"
import styled from "styled-components"

const SButtonContainer = styled(Form.Item)`
	width: 100%;
	text-align: right;
`

const { TextArea } = Input
const Comments = ({ boardId, commentsList, refreshCommentFunction }) => {
	const user = useSelector((state) => state.auth.userData)
	const dispatch = useDispatch()
	const [inputComment, setInputComment] = useState("")

	const onSaveComment = (e) => {
		e.preventDefault()

		let variables = {
			writer: user._id,
			boardId,
			description: inputComment,
		}

		dispatch(saveComment(variables))
			.then((res) => {
				refreshCommentFunction("create", res.payload.result)
				setInputComment("")
			})
			.catch((e) => console.log(e))
	}

	return (
		<div>
			{commentsList &&
				commentsList.map(
					(comment, index) =>
						!comment.responseTo &&
						comment.writer && (
							<>
								<br />
								<SingleComment
									key={index}
									isResponse={false}
									boardId={boardId}
									writerId={comment.writer._id}
									responseTo={comment._id}
									comment={comment}
									refreshCommentFunction={refreshCommentFunction}
								/>
								<ReplyComment
									writerId={comment.writer._id}
									parentCommentId={comment._id}
									boardId={boardId}
									commentsList={commentsList}
									refreshCommentFunction={refreshCommentFunction}
								/>
								<hr style={{ opacity: "0.4" }} />
							</>
						)
				)}
			<Form.Item>
				<TextArea
					rows={2}
					onChange={(e) => setInputComment(e.target.value)}
					value={inputComment}
					placeholder={"댓글을 작성하세요."}
				/>
			</Form.Item>
			<SButtonContainer>
				<Button onClick={onSaveComment} loading={false} type="primary">
					댓글 등록
				</Button>
			</SButtonContainer>
		</div>
	)
}

export default Comments
