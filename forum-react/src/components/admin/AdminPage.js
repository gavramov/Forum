import React, {Component} from 'react'
import Users from './UsersPage'
import User from '../../models/userModel'
import AllPosts from '../posts/AllPostsPage'
import Categories from './CategoriesPage'
import toastr from 'toastr'

let user = new User()

export default class AdminPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            response: false,
            publications: false,
            users: false,
            categories: false
        }
        this.allowAccess = this.allowAccess.bind(this)
        this.loadPublications = this.loadPublications.bind(this)
        this.loadUsers = this.loadUsers.bind(this)
        this.loadCategories = this.loadCategories.bind(this)
    }

    componentDidMount() {
        user.checkAdmin(this.allowAccess)
    }

    allowAccess(access) {
        this.setState({
            response: true
        })
        if (!access) {
            toastr.error('Sorry this page is only for Admins!')
            this.props.history.push('/')
        }
    }

    loadPublications() {
        this.setState({
            publications: true,
            categories: false,
            users: false
        })
    }

    loadUsers() {
        this.setState({
            publications: false,
            categories: false,
            users: true
        })
    }

    loadCategories() {
        this.setState({
            publications: false,
            users: false,
            categories: true
        })
    }

    render() {
        let basis = (
            <div className="col-md-8">
                <h1>Admin panel</h1>
                <div>
                    <button className="btn btn-success" onClick={this.loadPublications}>Manage Publications</button>
                    <button className="btn btn-success" onClick={this.loadUsers}>Manage Users</button>
                    <button className="btn btn-success" onClick={this.loadCategories}>Manage Categories</button>
                </div>
            </div>
        )

        if (this.state.response && this.state.publications === false && this.state.users === false && this.state.categories === false) {
            return basis
        } else if (this.state.response && this.state.publications) {
            return (
                <div>
                    {basis}
                    <br/>
                    <div style={{marginTop: 100}}>
                        <AllPosts/>
                    </div>
                </div>
            )
        } else if (this.state.response && this.state.users) {
            return (
                <div>
                    {basis}
                    <div style={{paddingTop: 100}}>
                        <Users/>
                    </div>
                </div>
            )
        } else if (this.state.response && this.state.categories) {
            return (
                <div>
                    {basis}
                    <div style={{paddingTop: 100}}>
                        <Categories/>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}