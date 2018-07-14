import React, {Component} from 'react'
import CreateForm from './CreateCommentForm'
import Comment from '../../../models/commentModel'
import {withRouter} from 'react-router-dom'
import toastr from 'toastr'

let comment = new Comment()

class CreateCommentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {body: '', submitDisabled: false}
        this.bindEventHandlers()
    }

    componentDidMount() {
        // Populate form
        if (localStorage.getItem('username') === 'guest') {
            toastr.error('Please login or register first!')
            this.props.history.push('/')
        }
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'content':
                this.setState({body: event.target.value})
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.body.length < 5) {
            toastr.error('Comment must be at least 5 digits long!')
            return
        }
        this.setState({submitDisabled: true})
        comment.createComment(this.state.body, this.props.match.params.postId, localStorage.getItem('username'))
            .then(this.onSubmitResponse)
            .catch(() => {
                toastr.error('Unable to add comment!')
                this.props.history.push('/posts/details/' + this.props.match.params.postId)
            })
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from createPost page
            toastr.success('Comment successfully added!')
            this.props.history.push('/posts/details/' + this.props.match.params.postId)
        } else {
            toastr.error('Unable to add comment!')
            this.props.history.push('/posts/details/' + this.props.match.params.postId)
        }
    }

    render() {
        return (
            <div>
                <div className="page-header text-center">
                    <h2>Create Comment</h2>
                </div>
                <CreateForm
                    content={this.state.body}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }
}

export default withRouter(CreateCommentPage)
