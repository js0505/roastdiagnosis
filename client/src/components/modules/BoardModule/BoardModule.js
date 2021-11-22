import React, { useEffect, useState } from "react"
import QueryString from "qs"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import {
	Pagination,
	Button,
	Form,
	Input,
	Select,
	PageHeader,
	Row,
	Col,
} from "antd"
import { SearchOutlined } from "@ant-design/icons"
import Post from "../Post"
import Loader from "../Loader"
import { getBoardByBIndex } from "../../../_actions/board_action"

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
`

const SearchAndButton = styled.div`
	display: flex;
`

const SForm = styled(Form)`
	display: flex;
	/* @media ${(props) => props.theme.xs} {
		flex-direction: column;
	} */
`

const SFormItem = styled(Form.Item)`
	margin-right: 10px;
	@media ${(props) => props.theme.xs} {
		margin-right: 5px;
	}
`

const SPagenation = styled(Pagination)`
	margin-top: 20px;
	margin-bottom: 20px;
`

const BoardModule = () => {
	const { Option } = Select
	// posts는 전체 데이터,
	// currentPage는 현재 페이지,
	// postsPerPage는 한 페이지에서 보여줄 post의 수 를 나타냅니다.
	const [posts, setPosts] = useState([])
	const [keyword, setKeyword] = useState("")
	const [category, setCategory] = useState("title")
	const [loading, setLoading] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(10)

	const user = useSelector((state) => state.user.userData)
	const dispatch = useDispatch()
	const location = useLocation()
	const query = QueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	})
	useEffect(() => {
		setLoading(true)
		dispatch(getBoardByBIndex(query.bindex)).then((res) => {
			setPosts(res.payload.result)
			setLoading(false)
		})
	}, [dispatch, query.bindex])

	// indexOfLastPost는 해당 페이지에서 마지막 post의 index 번호를 가르킵니다.
	// indexOfFirstPost는 해당 페이지에서 첫번째 post의 index 번호를 가르킵니다.
	// currentPosts는 각 페이지에서 보여질 포스트 배열입니다.
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	if (loading) {
		return <Loader />
	}
	return (
		<Row justify="center">
			<Col xs={23} md={20} lg={15} xl={15}>
				<Container>
					<PageHeader
						title={
							{
								1: "공지 사항",
								2: "자유 게시판",
								3: "정보 게시판",
								4: "질문 게시판",
							}[query.bindex]
						}
					/>
					<Post posts={currentPosts} loading={loading} bindex={query.bindex} />
					<SearchAndButton>
						<SForm>
							<SFormItem>
								<Select defaultValue="title" onChange={(e) => setCategory(e)}>
									<Option value="title">제목</Option>
									<Option value="description">내용</Option>
									<Option value="name">작성자</Option>
								</Select>
							</SFormItem>
							<SFormItem>
								<Input
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
							</SFormItem>
							<SFormItem>
								<Button>
									<a href={`/search?category=${category}&keyword=${keyword}`}>
										<SearchOutlined />
									</a>
								</Button>
							</SFormItem>
						</SForm>
						<Button disabled={query.bindex === "1" && user?.isAdmin !== true}>
							<a href={`/board/create?bindex=${query.bindex}`}>글쓰기</a>
						</Button>
					</SearchAndButton>
					<SPagenation
						defaultCurrent={1}
						total={posts.length}
						defaultPageSize={postsPerPage}
						onChange={paginate}
					/>
				</Container>
			</Col>
		</Row>
	)
}

export default BoardModule
