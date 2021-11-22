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
	display: flex;
	flex-direction: column;
	width: 100%;
`

const SListItem = styled(List.Item)`
	width: 100%;
`

const MetaTitle = styled.div`
	font-size: 1.2rem;
	@media ${(props) => props.theme.xs} {
		font-size: 1rem;
	}
`
const Writer = styled.div`
	@media ${(props) => props.theme.xs} {
		font-size: 0.8rem;
	}
`
const SMoment = styled(Moment)`
	color: rgba(0, 0, 0, 0.45);
	font-size: 0.8rem;
	@media ${(props) => props.theme.xs} {
		font-size: 0.7rem;
	}
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
					<SListItem key={index}>
						{!isScrap ? (
							<List.Item.Meta
								title={
									<MetaTitle>
										<a href={`/board/${post._id}?bindex=${bindex}`}>
											{post.isFixed ? `고정글 - ${post.title}` : post.title}
										</a>
									</MetaTitle>
								}
								description={
									<>
										<Writer>
											{post.writer ? post.writer.name : "탈퇴한 회원"} (
											{post.writer.company})
										</Writer>
										<SMoment format={"YYYY-MM-DD"}>{post.createdAt}</SMoment>
									</>
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
					</SListItem>
				))}
			</SList>
		</Container>
	)
}

export default Post
