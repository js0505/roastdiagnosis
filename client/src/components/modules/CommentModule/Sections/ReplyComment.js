import React, { useEffect, useState } from "react"
import SingleComment from "./SingleComment"

const ReplyComment = ({
	parentCommentId,
	boardId,
	commentsList,
	refreshCommentFunction,
	writerId,
}) => {
	const [childCommentNumber, setChildCommentNumber] = useState(0)
	const [showReply, setShowReply] = useState(false)

	useEffect(() => {
		let commentNumber = 0
		commentsList.map((comment) => {
			if (comment.responseTo === parentCommentId) {
				commentNumber++
			}
		})
		setChildCommentNumber(commentNumber)
	}, [commentsList, parentCommentId])
	const onClickHandler = () => {
		setShowReply(!showReply)
	}

	return (
		<>
			{childCommentNumber > 0 && (
				<>
					<p
						style={{
							marginLeft: "20px",
							fontSize: "14px",
							margin: 0,
							color: "grey",
							cursor: "pointer",
						}}
						onClick={onClickHandler}
					>
						{childCommentNumber}개의 답글
					</p>
				</>
			)}
			{showReply &&
				commentsList.map(
					(comment, index) =>
						comment.responseTo === parentCommentId && (
							<div style={{ width: "80%", marginLeft: "40px" }}>
								{/* 페이지에 달린 댓글 */}
								<SingleComment
									key={index}
									boardId={boardId}
									comment={comment}
									responseTo={comment._id}
									isResponse={true}
									writerId={writerId}
									refreshCommentFunction={refreshCommentFunction}
								/>
								{/* 페이지에 달린 댓글 밑에 대댓글 */}
								<ReplyComment
									commentsList={commentsList}
									boardId={boardId}
									parentCommentId={comment._id}
									refreshCommentFunction={refreshCommentFunction}
								/>
							</div>
						)
				)}
		</>
	)
}

export default ReplyComment
