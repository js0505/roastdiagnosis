import React from "react"
import Moment from "react-moment"
import { List, message, Popconfirm } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { deleteScrap } from "../../_actions/scrap_action"
import Loader from "./Loader"

const Container = styled.div`
	width: 100%;
	display: flex;
`

const SList = styled(List)`
	width: 100%;
`

const MetaTitle = styled.a`
	font-size: 1.2rem;
`

const SMoment = styled(Moment)`
	color: rgba(0, 0, 0, 0.45);
`

const SDeleteOutlined = styled(DeleteOutlined)`
	font-size: 1.5rem;
	color: rgba(0, 0, 0, 0.7);
	margin-left: 10px;
	cursor: pointer;
`

const Post = ({ posts, isScrap, refreshScrapFunction, loading, bindex }) => {
	const dispatch = useDispatch()
	const onScrapDeleteHandler = (postId) => {
		dispatch(deleteScrap(postId)).then((res) => {
			refreshScrapFunction(true)
			message.success("삭제 완료")
		})
	}
	if (loading) {
		return <Loader />
	}
	return (
		<Container>
			<SList size="small" itemLayout="horizontal" dataSource={posts}>
				{posts.map((post, index) => (
					<List.Item key={index}>
						{!isScrap ? (
							<List.Item.Meta
								title={
									<MetaTitle href={`/board/${post._id}?bindex=${bindex}`}>
										{post.isFixed ? `고정글 - ${post.title}` : post.title}
									</MetaTitle>
								}
								description={
									<p>
										{post.writer ? post.writer.name : "탈퇴한 회원"} (
										{post.writer.company})
									</p>
								}
							/>
						) : (
							<List.Item.Meta
								title={
									<MetaTitle href={`/board/${post.post._id}`}>
										{post.post.title}
									</MetaTitle>
								}
							/>
						)}
						<div>
							<SMoment format={"YY-MM-DD"}>{post.createdAt}</SMoment>
						</div>
						{isScrap && (
							<>
								<Popconfirm
									title={"스크랩을 삭제 하시겠습니까?"}
									onConfirm={() => onScrapDeleteHandler(post._id)}
								>
									<SDeleteOutlined />
								</Popconfirm>
							</>
						)}
					</List.Item>
				))}
			</SList>
		</Container>
	)
}

export default Post
