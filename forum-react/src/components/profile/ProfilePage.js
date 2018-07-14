import React, {Component} from 'react'
import Post from '../../models/postModel'
import {Link} from 'react-router-dom'
import Utilities from '../../utils/utilities'
import {withRouter} from 'react-router-dom'
import toastr from 'toastr'
let postModule = new Post()
let utilities = new Utilities()

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [], username: localStorage.getItem('username')}
        this.bindEventHandlers()
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
        this.onActionResponse = this.onActionResponse.bind(this)
    }

    componentDidMount() {
        if(localStorage.getItem('username') === 'guest'){
            toastr.error('You are currently not logged in!')
            this.props.history.push('/')
        }
        postModule.getPostsByUserId(this.onLoadSuccess)
    }

    onLoadSuccess(response) {
        if(localStorage.getItem('username') !== 'guest') {
            this.setState({posts: response})
        }
    }

    action(post,userId){
        let pathEdit = '/posts/edit/'+post._id
        let pathAddComment = '/comments/'+post._id
        if(post._acl.creator===userId){
            return <td>
                <Link to={pathAddComment} className="btn btn-success">Add Comment</Link>
                <Link to={pathEdit} className="btn btn-default" activeclassname="btn btn-default active">Edit</Link>
                <input className="btn btn-danger" type="button"value="Delete"onClick={
                    ()=>this.onActionHandler(post)}/></td>
        }
        return <td></td>
    }

    onActionHandler(post) {
        postModule.deletePost(post._id,this.onActionResponse)
    }

    onActionResponse(response,id) {
        if (response === true) {
            let index = this.state.posts.findIndex(p=>p._id===id)
            this.state.posts.splice(index,1)
            this.setState({posts:this.state.posts})
        }
    }

    render() {
        let postRows = this.state.posts.map(post =>
            <tr className="btn-custom" key={post._id} onClick={() => {
                this.props.history.push('/posts/details/' + post._id)}}>
                <td>{utilities.showLess(post.title, 20)}</td>
                <td>{utilities.showLess(post.body, 50)}</td>
                <td></td>
                <td></td>
                {this.action(post,localStorage.userId)}
            </tr>
        )
        return (
            <div>
                <h1>{this.state.username}</h1>
                <h4>Your Posts</h4>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th></th>
                        <th></th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postRows}
                    </tbody>
                </table>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(ProfilePage)