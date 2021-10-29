import React from "react"
import ReactGa from "react-ga"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import Auth from "./hoc/auth"
import LandingPage from "./components/views/LandingPage/"
import LoginPage from "./components/views/LoginPage/LoginPage"
import NavBar from "./components/views/NavBar/NavBar"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import BoardModule from "./components/modules/BoardModule/BoardModule"
import CreateBoard from "./components/modules/BoardModule/Sections/CreateBoard"
import BoardDetail from "./components/modules/BoardModule/Sections/BoardDetail"
import UpdateBoard from "./components/modules/BoardModule/Sections/UpdateBoard"
import SearchPage from "./components/views/SearchPage/SearchPage"
import ScrapPage from "./components/views/ScrapPage/ScrapPage"
import AdminPage from "./components/views/AdminPage/AdminPage"
import UserInfoPage from "./components/views/UserInfoPage/UserInfoPage"
import UserUpdatePage from "./components/views/UserInfoPage/Sections/UserUpdatePage"
import UserAdmissionEdit from "./components/views/AdminPage/Sections/UserAdmissionEdit"
import UserRoleEdit from "./components/views/AdminPage/Sections/UserRoleEdit"

import config from "./config/key"

const App = () => {
	console.log("Welcome")
	const history = createBrowserHistory()
	const TRACKING_ID = config.REACT_APP_TRACKING_ID

	ReactGa.initialize(TRACKING_ID)
	ReactGa.pageview(history.location.pathname + history.location.search)

	return (
		<Router history={history}>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Auth(LandingPage, null)} />
				<Route exact path="/admin" component={Auth(AdminPage, true, true)} />
				<Route
					exact
					path="/admin/admission"
					component={Auth(UserAdmissionEdit, true, true)}
				/>
				<Route
					exact
					path="/admin/role"
					component={Auth(UserRoleEdit, true, true)}
				/>
				<Route exact path="/login" component={Auth(LoginPage, false)} />
				<Route exact path="/register" component={Auth(RegisterPage, false)} />
				<Route exact path="/userinfo" component={Auth(UserInfoPage, true)} />
				<Route exact path="/changeuserinfo" component={UserUpdatePage} />
				<Route exact path="/search" component={Auth(SearchPage, null)} />
				<Route exact path="/scrap/:id" component={Auth(ScrapPage, true)} />
				<Route exact path="/board" component={Auth(BoardModule, null)} />
				<Route exact path="/board/create" component={Auth(CreateBoard, true)} />
				<Route exact path="/board/:id" component={Auth(BoardDetail, true)} />
				<Route
					exact
					path="/board/update/:id"
					component={Auth(UpdateBoard, true)}
				/>
			</Switch>
		</Router>
	)
}

export default App
