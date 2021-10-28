import React, { useEffect, useState } from "react"
import QueryString from "qs"
import { useLocation } from "react-router"
import { useDispatch } from "react-redux"
import { searchBoard } from "../../../_actions/board_action"
import Post from "../../modules/Post"
import styled from "styled-components"
import { Pagination, PageHeader, Row, Col } from "antd"
import Loader from "../../modules/Loader"

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

const SearchPage = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(10)

	useEffect(() => {
		setLoading(true)
		dispatch(searchBoard(location.search)).then((res) => {
			if (res.payload.status === 200) {
				setPosts(res.payload.data.result)
				setLoading(false)
			}
		})
	}, [dispatch, location.search])

	const query = QueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	})

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
	const paginate = (pageNumber) => setCurrentPage(pageNumber)
	if (loading) {
		return <Loader />
	}
	return (
		<Row justify="center">
			<Col xs={20} md={20} lg={15} xl={15}>
				{posts.length !== 0 ? (
					<Container>
						<PageHeader title={`'${query.keyword}' 검색 결과`} />
						<Post posts={currentPosts} loading={loading} />

						<SPagenation
							defaultCurrent={1}
							total={posts.length}
							defaultPageSize={postsPerPage}
							onChange={paginate}
						/>
					</Container>
				) : (
					<Container>
						<PageHeader title={`검색 결과가 없습니다.`} />
					</Container>
				)}
			</Col>
		</Row>
	)
}

export default SearchPage
