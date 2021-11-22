import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "antd/dist/antd.css"
import "react-quill/dist/quill.snow.css"

import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
import Reducer from "./_reducers"
import GlobalStyles from "./GlobalStyle"
import { ThemeProvider } from "styled-components"
import theme from "./theme"

const createStoreWithMiddelware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk
)(createStore)
ReactDOM.render(
	<Provider
		store={createStoreWithMiddelware(
			Reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)}
	>
		<GlobalStyles />
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
)
