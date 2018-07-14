import Requester from './requestModel'
import Kinvey from '../services/kinveyService'
import AuthenticationService from '../services/authService'
import toastr from 'toastr'

let requester = new Requester()
let kinvey = new Kinvey()
let auth =
    new AuthenticationService(kinvey.getKinveyAppKey(), kinvey.getKinveySecret())

export default class Comment {

    createComment(text, postId, author, callback) {
        let commentData = {text, postId, author}
        return requester.post(kinvey.getCollectionModuleUrl('comments'), auth.getHeaders(), commentData)
            .then(resp => {
                return true;
            })
            .catch(err=> {
                return false
            })
    }

    deleteComment(commentId, callback) {
        requester.delete(kinvey.getCollectionModuleUrl('comments') + '/' + commentId, auth.getHeaders())
            .then(() => {
                toastr.error('Comment deleted successfully!')
                callback(true, commentId)
            })
    }

    getPostComments(postId, callback) {
        if (callback === undefined)
            return requester.get(kinvey.getCollectionModuleUrl('comments') + `?query={"postId":"${postId}"}`, auth.getHeaders())

        requester.get(kinvey.getCollectionModuleUrl('comments') + `?query={"postId":"${postId}"}`, auth.getHeaders())
            .then((comments) => {
                callback(comments)
            })
            .catch(err => callback(false))
    }

    loadCommentDetails(commentId, onPostSuccess) {
        requester.get(kinvey.getCollectionModuleUrl('comments') + '/' + commentId, auth.getHeaders())
            .then(onPostSuccess)
    }

    editComment(commentId, text, postId, author, callback) {
        let commentData = {
            text: text,
            postId: postId,
            author: author
        }
        requester.put(kinvey.getCollectionModuleUrl('comments') + '/' + commentId, auth.getHeaders(), commentData)
            .then(callback(true))
            .catch(callback(false))
    }

    deleteCommentsByPostId(postId, callback) {
        requester.delete(kinvey.getCollectionModuleUrl('comments') + `?query={"postId":"${postId}"}`, auth.getHeaders())
            .then(callback(true))
    }
}