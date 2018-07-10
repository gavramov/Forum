export default class AuthenticationService {
    constructor(key, secret) {
        this._appKey = key
        this._appSecret = secret
    }

    getAuthToken() {
        return sessionStorage.getItem('authToken')
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Kinvey ' + this.getAuthToken()
        }

        if (!this.getAuthToken()) {
            headers['Authorization'] = 'Basic ' + btoa(this._appKey + ':' + this._appSecret)
        }

        return headers
    }

    changePassHeaders(username, password) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
        return headers
    }
}
