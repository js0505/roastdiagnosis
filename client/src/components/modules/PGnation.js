import { Pagination } from "antd"
import React, { useState } from "react"
import styled from "styled-components"

const SPagenation = styled(Pagination)`
	margin-top: 20px;
	margin-bottom: 20px;
`

const PGnation = ({ posts }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(2)

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
	const paginate = (pageNumber) => setCurrentPage(pageNumber)
	return (
		<>
			<SPagenation
				defaultCurrent={1}
				total={posts.length}
				// defaultPageSize={postsPerPage}
				onChange={paginate}
			/>
		</>
	)
}

export default PGnation
