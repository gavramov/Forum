import Requester from './requestModel'
import Kinvey from '../services/kinveyService'
import AuthenticationService from '../services/authService'
import observer from './observer'
import Avatar from './avatarModel'
import toastr from 'toastr'

let requester = new Requester()
let kinvey = new Kinvey()
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret())
let avatar = new Avatar()

export default class User {
    login(username, password, callback) {
        let userData = {
            username: username,
            password: password
        }
        requester.post(kinvey.getUserModuleUrl() + '/login', auth.getHeaders(), userData)
            .then((response) => {
                this.saveSession(response)
                observer.onSessionUpdate()
                toastr.success('Login successful.')
                callback(true)
            })
            .catch((err)=> callback(false))
    }

    register(username, password, callback) {

        this.logout(reg)

        let userData = {
            username: username,
            password: password
        }

        let that = this
        function reg() {
            requester.post(kinvey.getUserModuleUrl(), auth.getHeaders(), userData)
                .then((response) => {
                    that.saveSession(response)
                    observer.onSessionUpdate()
                    toastr.success('Registration successful')
                    callback(true)
                })
                .catch((err) => callback(false))
        }
    }
    changePassword (username, currentPass, password, callback) {
        let url = kinvey.getUserModuleUrl() + `/${localStorage.getItem('userId')}`
        let userData = {
            username,
            password
        }
        requester.put(url, auth.changePassHeaders(username, currentPass), userData)
            .then(respose => {
                localStorage.clear()
                this.saveSession(respose)
                toastr.success('Password successfully changed')
                callback(true)})
            .catch(() => callback(false))
    }
    logout(callback) {
        requester.post(kinvey.getUserModuleUrl() + '/_logout', auth.getHeaders())
            .then(response => {
                localStorage.clear()
                observer.onSessionUpdate()
                toastr.success('Logout successful')
                callback(true)
            })
    }

    checkAdmin(callback){
        requester.get(kinvey.getUserModuleUrl() + `/${localStorage.getItem('userId')}`, auth.getHeaders())
            .then((response) => {
                callback(response.Admin)
            })
            .catch((err) => {callback(false)})
    }

    getUsers(callback, id) {
        requester.get(kinvey.getUserModuleUrl(), auth.getHeaders())
            .then((response) => {
                requester.get(kinvey.getCollectionModuleUrl('bannedUsers'), auth.getHeaders())
                    .then((res)=>{
                        callback(response, res, id)
                    })
            })
    }

    getUserById(callback) {
        let url = kinvey.getUserModuleUrl() + `/${localStorage.getItem('userId')}`
        if (callback === undefined)
            return requester.get(url, auth.getHeaders())

        requester.get(url, auth.getHeaders())
            .then(user => callback(user))
    }

    loginDefaultUser(){
        let userData = {
            username: 'guest',
            password: 'guest'
        }
        requester.post(kinvey.getUserModuleUrl() + '/login', auth.getHeaders(), userData)
            .then((response) => {
                this.saveSession(response)
                observer.onSessionUpdate()
            })
            .catch((err)=> console.log(err))
    }

    banUser(user, callback) {
        let data = {
            user:user.username
        }
        requester.post(kinvey.getCollectionModuleUrl('bannedUsers'), auth.getHeaders(), data)
            .then((res)=> {
                callback('ban', user._id)
            })
    }

    unBanUser(user, callback) {
        requester.get(kinvey.getCollectionModuleUrl('bannedUsers')+`?query={"user":"${user.username}"}`, auth.getHeaders())
            .then((res) => {
                requester.delete(kinvey.getCollectionModuleUrl('bannedUsers')+'/'+res[0]._id, auth.getHeaders())
                    .then((resp)=> callback('unBan', user._id))

            })
    }

    //
    // Makes localStorage items for the authtoken, userId, and username
    //

    saveSession(userInfo) {
        localStorage.setItem('Admin', userInfo.Admin)
        let userAuth = userInfo._kmd.authtoken
        localStorage.setItem('authToken', userAuth)
        let userId = userInfo._id
        localStorage.setItem('userId', userId)
        let username = userInfo.username
        localStorage.setItem('username', username)
        avatar.setAvatarInSession()

        observer.onSessionUpdate()
    }
}
