import React, {Component} from 'react'
import CreateForm from './CreatePostForm'
import Post from '../../../models/postModel'
import Category from '../../../models/categoryModel'
import {withRouter} from 'react-router-dom'
import toastr from 'toastr'

let post = new Post()
let categoryModule = new Category()

class CreatePostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', body: '', category: '', categories: [], submitDisabled: false}
        this.bindEventHandlers()
    }

    componentDidMount() {
        if (localStorage.getItem('username') === 'guest' || (!localStorage.getItem('username'))) {
            toastr.error('Please register or login first!')
            this.props.history.push('/')
        }
        categoryModule.getAllCategories(this.loadCategories)
    }

    loadCategories(data) {
        if (localStorage.getItem('username') !== 'guest') {
            this.setState({
                categories: data
            })
        }
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.loadCategories = this.loadCategories.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'title':
                this.setState({title: event.target.value})
                break
            case 'content':
                this.setState({body: event.target.value})
                break
            case 'category':
                this.setState({category: event.target.value})
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.title.length < 5 || this.state.body < 5) {
            toastr.error('Title and content must consist at least 5 digits!')
            return
        } else if (this.state.category === '') {
            toastr.error('Please select a category!')
            return
        } else if (this.state.title.length > 50) {
            toastr.error('Post title cannot be more than 50 characters long!')
            return
        }
        else if (this.state.body.length >= 2000) {
            toastr.error('Too much content there!')
            return
        }

        this.setState({submitDisabled: true})
        post.createPost(this.state.title, this.state.body, localStorage.getItem('username'), this.state.category, this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from createPost page
            this.props.history.push('/posts')
        } else {
            if (localStorage.getItem('username') === 'guest') {
                toastr.error('Please register or login first!')
            } else {
                toastr.error('Sorry, you are banned, please contact administrator for more information!')
            }
            // Something went wrong, let the user try again
            this.setState({submitDisabled: false})
        }
    }

    render() {
        return (
            <div className="container">
                <div className="page-header text-center">
                    <h2>Create Post</h2>
                </div>
                <CreateForm
                    title={this.state.title}
                    content={this.state.body}
                    categories={this.state.categories}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }
}

export default withRouter(CreatePostPage)
