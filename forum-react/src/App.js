import React, {Component} from 'react'
import observer from './models/observer'
import userModel from './models/userModel'
import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import Register from './components/register/RegisterPage'
import Login from './components/login/LoginPage'
import CreatePostPage from './components/posts/create-post/CreatePostPage'
import EditPostPage from "./components/posts/edit-post/EditPostPage"
import AllPostsPage from './components/posts/AllPostsPage'
import CreateCommentPage from './components/comments/create-comment/CreateCommentPage'
import EditCommentPage from './components/comments/edit-comment/EditCommentPage'
import NotFoundPage from './components/notFound/NotFoundPage'
import HomePage from './components/home/HomePage'
import NavigationBar from './components/common/Navbar'
import Footer from './components/common/Footer'
import AboutPage from './components/about/AboutPage'

let session = new userModel()

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {loggedIn: false, username: ''}
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
            this.setState({loggedIn: true, username: localStorage.getItem("username")})
        } else {
            this.setState({loggedIn: false, username: ''})
        }
    }

    logout() {
        this.setState({loggedIn: false})
        session.loginDefaultUser()
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="wrapper clearfix">
                <NavigationBar loggedIn={this.state.loggedIn}
                               user={this.state.username}
                               href="/profile"
                               logout={this.logout}
                />
                <div className="container mt-5">
                    <Switch>
                        <Route exact={true} path="/" component={HomePage}/>
                        <Route exact path="/about" component={AboutPage}/>
                        <Route exact path="/account/register" component={Register}/>
                        <Route exact path="/account/login" component={Login}/>
                        <Route exact path="/posts/create" component={CreatePostPage}/>
                        <Route exact path="/posts/edit/:postId" component={EditPostPage}/>
                        <Route exact path="/posts" component={AllPostsPage}/>
                        <Route path="/comments/:postId" component={CreateCommentPage}/>
                        <Route path="/comments/edit/:commentId" component={EditCommentPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
                <hr/>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(App)
