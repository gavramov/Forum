import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Comment from '../../models/commentModel'
import Post from '../../models/postModel'
import View from '../../models/viewsModel'
import {withRouter} from 'react-router-dom'
import toastr from 'toastr'

let postModule = new Post()
let commentModule = new Comment()
let viewModule = new View()

class DetailsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {
                _acl: {
                    creator: ''
                }
            }
            , postComments: {}
        }
        this.bindEventHandlers()
    }


    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
        this.onActionHandler = this.onActionHandler.bind(this)
        this.onDeleteCommentActionHandler = this.onDeleteCommentActionHandler.bind(this)
        this.commentActions = this.commentActions.bind(this)
        this.onDeleteCommentResponse = this.onDeleteCommentResponse.bind(this)
        this.onDeleteResponse = this.onDeleteResponse.bind(this)
    }

    onLoadSuccess([view, post, comments]) {
        viewModule.increaseViewCount(view[0])
        post.rating = view[0].rating
        this.setState({post: post})
        this.setState({postComments: comments})
    }

    componentDidMount() {
        let id = this.props.match.params.postId
        let that = this
        processRequests()

        async function processRequests() {
            try {
                let postReq = await postModule.getPostById(id)
                let viewReq = await viewModule.getViewByPostId(id)
                let commentReq = await commentModule.getPostComments(id)
                that.onLoadSuccess([viewReq, postReq, commentReq])
            }
            catch (err) {
                toastr.error('Invalid post!')
                that.props.history.push('/posts')
            }
        }
    }

    showComments(comments) {
        let commentsToPrint = []
        if (comments.length > 0) {
            commentsToPrint.push(<h2 key={-1}>Comments</h2>)
            for (let i in comments) {
                if (comments !== []) {
                    commentsToPrint.push(<div key={i} className="media mb-4">
                        <div className="media-body"><h5 className="mt-0">by <strong
                            key={i}>{comments[i].author}</strong></h5>
                            on {new Date(Date.parse(comments[i]._kmd.lmt)).toLocaleString()}
                            <div>
                                {comments[i].text}
                            </div>
                        </div>
                        {this.commentActions(comments[i], localStorage.userId)}
                    </div>)

                }
            }
        }
        else {
            commentsToPrint.push(<h2 key={-1}>No comments</h2>)
        }
        return commentsToPrint
    }

    onActionHandler(post) {
        postModule.deletePost(post._id, this.onDeleteResponse)
        commentModule.deleteCommentsByPostId(post._id, this.onDeleteResponse)
    }

    onDeleteResponse(response, id) {
        if (response === true) {
            this.props.history.push('/posts')
        }
    }

    onDeleteCommentActionHandler(comment) {
        commentModule.deleteComment(comment._id, this.onDeleteCommentResponse)
    }

    onDeleteCommentResponse(response, id) {
        if (response === true) {
            let index = this.state.postComments.findIndex(c => c._id === id)
            this.state.postComments.splice(index, 1)
            this.setState({postComments: this.state.postComments})
        }
    }

    commentActions(comment, userId) {
        let commentEditPath = '../../comments/edit/' + comment._id
        if (comment._acl.creator === userId || localStorage.getItem('Admin') === 'true') {
            return <div><input className="btn btn-danger" type="button" value="Delete my comment"
                               onClick={() => this.onDeleteCommentActionHandler(comment)}/>
                <Link to={commentEditPath} className="btn btn-warning" activeclassname="btn btn-warning active">Edit my
                    comment</Link>
            </div>
        }
    }

    action(post, userId) {
        let pathEdit = '/posts/edit/' + post._id
        let pathAddComment = '/comments/' + post._id
        if (post._acl.creator === userId || localStorage.getItem('Admin') === 'true') {
            return (
                <div>
                    <Link to={pathAddComment} className="btn btn-success">Add Comment</Link>
                    <Link to={pathEdit} className="btn btn-default" activeclassname="btn btn-default active">Edit</Link>
                    <input className="btn btn-danger" type="button" value="Delete"
                           onClick={() => this.onActionHandler(post)}/>
                </div>
            )
        }
        return (
            <div>
                <Link to={pathAddComment} className="btn btn-success">Add Comment</Link>
            </div>
        )
    }

    render() {
        if (this.state.post._acl.creator === '') {
            return (<h1>Loading..</h1>)
        }
        return (
            <div>
                <h1 className="mt-4">{this.state.post.title}</h1>
                <p className="lead">published by <strong>{this.state.post.author}</strong></p>
                <div>Views : {this.state.post.rating}</div>
                <div><p className="lead">{this.state.post.body}</p></div>
                <div>{this.action(this.state.post, localStorage.userId)}</div>
                {this.showComments(this.state.postComments)}
            </div>
        )
    }
}

export default withRouter(DetailsPage)
