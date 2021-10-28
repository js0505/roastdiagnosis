import { message } from "antd"
import axios from "axios"
import React, { useMemo, useRef } from "react"
import ReactQuill from "react-quill"

const QuillEditor = ({ value, onChange, getS3KeyFunction }) => {
	const quillRef = useRef()
	const imageHandler = () => {
		// 파일을 업로드 하기 위한 input 태그 생성
		const input = document.createElement("input")
		const formData = new FormData()

		input.setAttribute("type", "file")
		input.setAttribute("accept", "image/*")
		input.click()
		// 파일이 input 태그에 담기면 실행 될 함수
		input.onchange = async () => {
			const file = input.files
			if (file !== null) {
				formData.append("image", file[0])
				const config = {
					header: { "content-type": "multipart/form-data" },
					withCredentials: true,
				}

				let uploadAPI = ""
				if (process.env.NODE_ENV === "production") {
					uploadAPI = "/api/upload/"
				} else {
					uploadAPI = "http://localhost:5000/api/upload/"
				}
				await axios
					.post(uploadAPI, formData, config)
					.then((res) => {
						if (res.data.err && res.data.err.code === "LIMIT_FILE_SIZE") {
							message.error("이미지의 사이즈는 1MB 미만으로 업로드 가능합니다.")
							return
						}
						getS3KeyFunction(res.data.file.Key)
						const quill = quillRef.current.getEditor()
						const range = quill.getSelection()?.index
						//getSelection()은 현재 선택된 범위를 리턴한다. 에디터가 포커싱되지 않았다면 null을 반환한다.

						if (typeof range !== "number") return
						/*range는 0이 될 수도 있으므로 null만 생각하고 !range로 체크하면 잘못 작동할 수 있다.
                        따라서 타입이 숫자이지 않을 경우를 체크해 리턴해주었다.*/

						quill.setSelection(range, 1)
						/* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다. 
                        위치 인덱스와 길이를 넣어주면 된다.*/
						quill.insertEmbed(range.index, "image", res.data.url)
					})
					.catch((e) => console.log(e))
				return
			}
		}
	}

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					["bold", "italic", "strike"],
					[{ size: ["small", false, "large", "huge"] }, { color: [] }],
					[{ list: "ordered" }, { list: "bullet" }, { align: [] }],
					["image"],
				],
				handlers: {
					image: imageHandler,
				},
			},
		}),
		[]
	)
	return (
		<ReactQuill
			ref={quillRef}
			value={value}
			onChange={onChange}
			modules={modules}
			placeholder={"내용을 입력하세요"}
			theme="snow"
		/>
	)
}

export default QuillEditor
