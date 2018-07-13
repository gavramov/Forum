export default class AuthenticationService {
    constructor(appKey, appSecret) {
        this._appKey = appKey
        this._appSecret = appSecret
    }

    getAuthToken() {
        return localStorage.getItem('authToken')
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Kinvey ' + this.getAuthToken()
        }
        if (!this.getAuthToken())
            headers['Authorization'] = 'Basic ' + btoa(this._appKey + ":" + this._appSecret)

        return headers
    }

    changePassHeaders(username, password){
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        }
        return headers
    }

    getAvatarUploadHeaders(file){
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Kinvey ' + this.getAuthToken(),
            'X-Kinvey-Content-Type': file.type
        }
        return headers
    }
}