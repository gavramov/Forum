import React, {Component} from 'react'
import observer from './models/observer'
import userModel from './models/userModel'
import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import Register from './components/register/RegisterPage'
import Login from './components/login/LoginPage'
import CreatePostPage from './components/posts/create-post/CreatePostPage'
import EditPostPage from "./components/Posts/edit-post/EditPostPage";
import AllPostsPage from './components/posts/AllPostsPage'
import NotFoundPage from './components/NotFound/NotFoundPage'

let session = new userModel()

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { loggedIn: false, username: '' }
        observer.onSessionUpdate = this.onSessionUpdate.bind(this)
        observer.componentDidMount = this.componentDidMount.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        this.onSessionUpdate()
        session.loginDefaultUser()
    }

    onSessionUpdate() {
        console.log(localStorage)
        let name = localStorage.getItem("username")
        if (name) {
            this.setState({ loggedIn: true, username: localStorage.getItem("username") })
        } else {
            this.setState({ loggedIn: false, username: '' })
        }
    }

    logout() {
        this.setState({loggedIn: false})
        session.loginDefaultUser()
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <Switch>
                        <Route exact path="/account/register" component={Register} />
                        <Route exact path="/account/login" component={Login}/>
                        <Route path="/posts/create" component={CreatePostPage}/>
                        <Route exact path="/posts" component={AllPostsPage}/>
                        <Route exact path="/posts/edit/:postId" component={EditPostPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
                <hr/>
            </div>
        )
    }
}

export default withRouter(App)
