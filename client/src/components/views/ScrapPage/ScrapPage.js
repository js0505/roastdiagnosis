import { PageHeader, Pagination, Row, Col } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import styled from "styled-components"
import { getScrap } from "../../../_actions/scrap_action"
import Loader from "../../modules/Loader"
import Post from "../../modules/Post"

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
`
const SPagenation = styled(Pagination)`
	margin-top: 20px;
	margin-bottom: 20px;
`
const ScrapPage = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(10)

	useEffect(() => {
		setLoading(true)
		dispatch(getScrap(id)).then((res) => {
			if (res.payload.status === 200) {
				setPosts(res.payload.data.result)
				setLoading(false)
			}
		})
	}, [dispatch, id])

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	const refreshScrapFunction = (refreshScrap) => {
		if (refreshScrap) {
			setLoading(true)
			dispatch(getScrap(id)).then((res) => {
				if (res.payload.status === 200) {
					setPosts(res.payload.data.result)
					setLoading(false)
				}
			})
		}
	}
	if (loading) {
		return <Loader />
	}
	return (
		<Row justify="center">
			<Col xs={20} md={20} lg={15} xl={15}>
				<Container>
					{posts.length !== 0 ? (
						<>
							<PageHeader title={"스크랩 리스트"} />
							<Post
								posts={currentPosts}
								isScrap={true}
								refreshScrapFunction={refreshScrapFunction}
								loading={loading}
							/>

							<SPagenation
								defaultCurrent={1}
								total={posts.length}
								defaultPageSize={postsPerPage}
								onChange={paginate}
							/>
						</>
					) : (
						<PageHeader title={`데이터가 없습니다.`} />
					)}
				</Container>
			</Col>
		</Row>
	)
}

export default ScrapPage
