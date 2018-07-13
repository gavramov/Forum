import React, {Component} from 'react'
import RegisterForm from './RegisterForm'
import User from '../../models/userModel'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'

import $ from 'jquery'
import {withRouter} from 'react-router-dom'

let user = new User()

class RegisterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            repeat: '',
            submitDisabled: false,
            showModal: true
        }
        this.bindEventHandlers()
    }

    componentDidMount() {
        $('#error').hide()
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
        this.close = this.close.bind(this)
    }

    close() {
        this.setState({showModal: false})
        this.props.history.push('/')
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({username: event.target.value})
                break
            case 'password':
                this.setState({password: event.target.value})
                break
            case 'repeat':
                this.setState({repeat: event.target.value})
                break
            default:
                break
        }
    }

    onSubmitHandler(event) {
        event.preventDefault()
        if (this.state.password !== this.state.repeat) {
            $('#error').show().text("Passwords don't match!")
            return
        } else if (this.state.password.length < 3) {
            $('#error').show().text("Passwords must consist at least 3 symbols")
            return
        }
        $('#error').hide()
        this.setState({submitDisabled: true})
        try {
            user.register(this.state.username, this.state.password, this.onSubmitResponse)
        } catch (err) {

        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from register page
            $('#error').hide()
            this.close()
            this.props.history.push('/posts')
        } else {
            $('#error').show().text("User with that name already exists!")
            user.loginDefaultUser()
            this.setState({submitDisabled: false})
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.showModal} onClosed={this.close} className={this.props.className}>
                <ModalHeader className="text-center">
                    Register
                </ModalHeader>
                <ModalBody>
                    <RegisterForm
                        username={this.state.username}
                        password={this.state.password}
                        repeat={this.state.repeat}
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

export default withRouter(RegisterPage)
