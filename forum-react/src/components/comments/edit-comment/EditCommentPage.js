import React, {Component} from 'react'
import EditCommentForm from './EditCommentForm'
import Comment from '../../../models/commentModel'
import User from '../../../models/userModel'
import toastr from 'toastr'
import {withRouter} from 'react-router-dom'

let comment = new Comment()
let user = new User()

class EditCommentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {text: '', submitDisabled: true}
        this.bindEventHandlers()
    }

    componentDidMount() {
        user.checkUser().then(username => {
            if (username === 'guest') {
                toastr.error('Please login first!')
                this.props.history.push('/')
                return
            }
            else {
                comment.loadCommentDetails(this.props.match.params.commentId, this.onLoadSuccess)
            }
        })
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
    }

    onLoadSuccess(response) {
        this.setState({
            text: response.text,
            postId: response.postId,
            author: response.author,
            submitDisabled: false
        })
    }

    onChangeHandler(event) {
        event.preventDefault()
        let newState = {}
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    onSubmitHandler(event) {
        event.preventDefault()
        this.setState({submitDisabled: true})
        if (this.state.text.length < 5) {
            toastr.error('Comment must be at least 5 letter long!')
            this.setState({
                submitDisabled: false
            })
        }
        else {
            comment.editComment(this.props.match.params.commentId
                , this.state.text
                , this.state.postId
                , this.state.author
                , this.onSubmitResponse)
        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            this.props.history.push('/posts/details/' + this.state.postId)
            toastr.info('Comment successfully edited!')
        }
        this.setState({submitDisabled: false})
    }

    render() {
        return (
            <div>
                <div className="page-header text-center">
                    <h2>Edit Comment</h2>
                </div>
                <EditCommentForm
                    text={this.state.text}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }
}

export default withRouter(EditCommentPage)
