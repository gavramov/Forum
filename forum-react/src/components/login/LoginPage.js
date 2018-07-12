import React, {Component} from 'react'
import LoginForm from './LoginForm'
import User from '../../models/userModel'
// import Modal from 'react-bootstrap/lib/Modal'
// import Button from 'react-bootstrap/lib/Button'

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
let user = new User();

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitDisabled: false,
            showModal: true }
        this.bindEventHandlers()
    }

    componentDidMount() {
        $('#error').hide()
    }

    close() {
        this.setState({ showModal: false });
        if (this.state.username === '')
            this.props.history.push('/')
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
        this.close = this.close.bind(this)
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({ username: event.target.value })
                break
            case 'password':
                this.setState({ password: event.target.value })
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        this.setState({ submitDisabled: true })
        user.login(this.state.username, this.state.password, this.onSubmitResponse)
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.close()
            if(localStorage.getItem('Admin') === 'true'){
                this.props.history.push('/admin')
            } else {
                this.props.history.push('/posts')
            }
        } else {
            // Something went wrong, let the user try again
            console.clear()
            $('#error').show()
            this.setState({ submitDisabled: false })
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.showModal} onClosed={this.close} className={this.props.className}>
                <ModalHeader className="text-center">Login</ModalHeader>
                <ModalBody>
                    <LoginForm
                        username={this.state.username}
                        password={this.state.password}
                        submitDisabled={this.state.submitDisabled}
                        onChangeHandler={this.onChangeHandler}
                        onSubmitHandler={this.onSubmitHandler}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.close} className="btn-block btn-danger">Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default withRouter(LoginPage);
