import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap'

export default class NavigationBar extends Component {
    constructor(props) {
        super(props)
        this.toggleNavBar = this.toggleNavBar.bind(this)
        this.state = {
            collapsed: true
        }

    }

    toggleNavBar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        let navbar = []
        let navbarRight = []
        if (!this.props.loggedIn || localStorage.getItem('username') === 'guest') {
            navbar = (
                <Nav navbar>
                    <NavItem className="btn-nav nav-item" to="/about" key="about"><NavLink className="nav-link"
                                                                                           to="/about">About</NavLink>
                    </NavItem>
                    <NavItem className="btn-nav" to="/posts" key="allPosts"><NavLink className="nav-link"
                                                                                     to="/posts">All Posts</NavLink>
                    </NavItem>
                </Nav>
            )
            navbarRight = (
                <Nav className="ml-auto" navbar>
                    <NavItem className="btn-nav nav-item" to="/account/login" key="login">
                        <NavLink className="nav-link" to="/account/login" key="login">Login</NavLink>
                    </NavItem>
                    <NavItem className="btn-nav nav-item" to="/account/register" key="register"><NavLink
                        className="nav-link"
                        to="/account/register">Register</NavLink>
                    </NavItem>
                </Nav>
            )
        } else {
            if (localStorage.getItem('Admin') === 'true') {
                navbar = (
                    <Nav navbar>
                        <NavItem className="btn-nav nav-item" to="/posts/create" key="create">
                            <NavLink className="nav-link" to="/posts/create">Create post</NavLink>
                        </NavItem>
                        <NavItem className="btn-nav nav-item" to="/posts" key="posts">
                            <NavLink className="nav-link" to="/posts">All posts</NavLink>
                        </NavItem>
                        <NavItem className="btn-nav nav-item" to="/about" key="about">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </NavItem>
                        <NavItem className="btn-nav nav-item" to="/admin" key="admin">
                            <NavLink className="nav-link" to="/admin">Admin panel</NavLink>
                        </NavItem>
                    </Nav>
                )
            } else {
                navbar = (
                    <Nav navbar>
                        <NavItem className="btn-nav" to="/posts/create" key="create">
                            <NavLink className="nav-link" to="/posts/create">Create post</NavLink>
                        </NavItem>
                        <NavItem className="btn-nav" to="/posts" key="posts">
                            <NavLink className="nav-link" to="/posts">All posts</NavLink>
                        </NavItem>
                        <NavItem className="btn-nav" to="/about" key="about">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </NavItem>
                    </Nav>
                )
            }

            navbarRight = (
                <Nav navbar className="ml-auto">
                    <NavItem className="nav-item" to="/account/profile" key="profile">
                        <NavLink className="nav-link" to="/account/profile">{this.props.user}</NavLink>
                    </NavItem>
                    <NavItem className="nav-item" to="/" key="logout">
                        <a className="nav-link" href="javascript:void(0)" onClick={this.props.logout}>Logout</a>
                    </NavItem>
                </Nav>
            )
        }
        return (
            <Navbar color="dark" dark expand="md">
                <Link to="/" className="nav-link">Home</Link>
                <NavbarToggler onClick={this.toggleNavBar} className="mr-2"/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    {navbar}
                    {navbarRight}
                </Collapse>
            </Navbar>
        )
    }
}