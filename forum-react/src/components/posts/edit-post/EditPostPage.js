import React, {Component} from 'react'
import EditForm from './EditPostForm'
import Post from '../../../models/postModel'
import Category from '../../../models/categoryModel'
import User from '../../../models/userModel'
import toastr from 'toastr'

let category = new Category()
let post = new Post()
let user = new User()

export default class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', body: '', category: '', categories: [], submitDisabled: true}
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
                let requests = [
                    post.getPostById(this.props.match.params.postId),
                    category.getAllCategories()
                ]
                Promise.all(requests).then(this.onLoadSuccess)
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

    onLoadSuccess([post, categories]) {
        if (localStorage.getItem('username') !== 'guest') {
            this.setState({
                title: post.title,
                body: post.body,
                author: post.author,
                category: post.category,
                categories: categories,
                submitDisabled: false
            })
        }
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
        if (this.state.title.length < 5 && this.state.body.length < 5) {
            toastr.error('Post title and body must be at least 5 digits long')
            this.setState({
                submitDisabled: false
            })
        } else if (this.state.category === '') {
            toastr.error('Please select a category!')
            this.setState({
                submitDisabled: false
            })
        } else {
            post.editPost(this.props.match.params.postId, this.state.title, this.state.body, this.state.author, this.state.category)
                .then(this.onSubmitResponse)
                .catch(() => {
                    toastr.error('Unable to edit post!')
                    this.props.history.push('/posts')
                })
        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from edit page
            this.props.history.push('/posts')
            toastr.success('Post successfully edited!')
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true})
            toastr.error('Unable to edit post!')
            this.props.history.push('/posts')
        }
    }

    render() {
        return (
            <div>
                <h3>Edit Post Page</h3>
                <EditForm
                    title={this.state.title}
                    body={this.state.body}
                    submitDisabled={this.state.submitDisabled}
                    categories={this.state.categories}
                    category={this.state.category}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }
}