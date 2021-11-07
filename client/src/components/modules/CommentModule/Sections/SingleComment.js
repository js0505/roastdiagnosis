import { Button, Comment, Form, Input, message, Popconfirm } from "antd"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import {
	deleteComment,
	saveComment,
	updateComment,
} from "../../../../_actions/comment_action"

const { TextArea } = Input

const UpdateCommentContainer = styled.div`
	margin-top: 20px;
`

const UpdateButtonContainer = styled(Form.Item)`
	text-align: right;
`

const SButton = styled(Button)`
	margin-right: 5px;
`

const SingleComment = ({
	boardId,
	comment,
	responseTo,
	refreshCommentFunction,
	isResponse,
	writerId,
}) => {
	const user = useSelector((state) => state.auth.userData)
	const dispatch = useDispatch()

	const [inputComment, setInputComment] = useState("")
	const [editComment, setEditComment] = useState(comment.description)
	const [showReply, setShowReply] = useState(false)
	const [showEdit, setShowEdit] = useState(false)

	const onSaveComment = (e) => {
		e.preventDefault()

		let variables = {
			writer: user._id,
			boardId,
			responseTo,
			description: inputComment,
		}

		dispatch(saveComment(variables))
			.then((res) => {
				refreshCommentFunction("create", res.payload.result)
				setInputComment("")
				setShowReply(!showReply)
			})
			.catch((e) => console.log(e))
	}

	const onDeleteComment = (e) => {
		e.preventDefault()
		dispatch(deleteComment(responseTo)).then((res) => {
			message.success("삭제 되었습니다")
			refreshCommentFunction("delete", res.payload.result._id)
		})
	}

	const onUpdateComment = (e) => {
		e.preventDefault()
		const body = {
			description: editComment,
		}
		dispatch(updateComment(comment._id, body)).then((res) => {
			setShowEdit(!showEdit)
			message.success("수정 되었습니다")
			refreshCommentFunction("update", res.payload.result._id)
		})
	}
	const actions = [
		<>
			{!isResponse && (
				<span
					onClick={() => setShowReply(!showReply)}
					key="comment-basic-reply-to"
				>
					답글 달기
				</span>
			)}
			{writerId === user._id && (
				<>
					<span onClick={() => setShowEdit(!showEdit)}>수정</span>
					<span>
						<Popconfirm
							title="댓글을 삭제 하시겠습니까?"
							onConfirm={onDeleteComment}
						>
							삭제
						</Popconfirm>
					</span>
				</>
			)}
		</>,
	]
	return (
		<>
			{!showEdit && (
				<Comment
					author={`${comment.writer.name} (${comment.writer.company})`}
					content={<p>{comment.description}</p>}
					actions={actions}
				/>
			)}

			{showReply && (
				<>
					<Form.Item>
						<TextArea
							rows={2}
							onChange={(e) => setInputComment(e.target.value)}
							value={inputComment}
						/>
					</Form.Item>
					<Form.Item>
						<Button onClick={onSaveComment} loading={false} type="primary">
							댓글 등록
						</Button>
					</Form.Item>
				</>
			)}
			{showEdit && (
				<UpdateCommentContainer>
					<Form.Item>
						<TextArea
							rows={2}
							onChange={(e) => setEditComment(e.target.value)}
							value={editComment}
						/>
					</Form.Item>
					<UpdateButtonContainer>
						<SButton onClick={onUpdateComment} loading={false} type="primary">
							댓글 수정
						</SButton>
						<Button type="primary" onClick={() => setShowEdit(!showEdit)}>
							취소
						</Button>
					</UpdateButtonContainer>
				</UpdateCommentContainer>
			)}
		</>
	)
}

export default SingleComment
