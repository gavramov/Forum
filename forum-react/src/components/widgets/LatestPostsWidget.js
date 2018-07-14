import React, {Component} from 'react'
import Post from '../../models/postModel'
import View from '../../models/viewsModel'
import {Link} from 'react-router-dom'
import Utilities from '../../utils/utilities'

let utils = new Utilities()
let postModule = new Post()
let viewModule = new View()

export default class LatestPostsWidget extends Component {
    constructor(props) {
        super(props)
        this.bindEventHandlers()
        this.state = {
            latestPosts: []
        }
    }

    bindEventHandlers() {
        this.onFetchDataSuccess = this.onFetchDataSuccess.bind(this)
    }

    componentDidMount() {
        let requests = [
            postModule.query('{}', `sort={"_kmd":-1}&limit=12`),
            viewModule.getAllViews()
        ]
        Promise.all(requests).then(this.onFetchDataSuccess)
    }


    onFetchDataSuccess([posts, views]) {
        for (let post of posts)
            post.rating = views.filter(view => view.postId === post._id)[0].rating
        this.setState({latestPosts: posts})
    }

    render() {
        // prep posts
        let postsForRender = Array.from(this.state.latestPosts)
            .map(function (post) {
                let rating = Math.floor(post.rating / 10)
                let ratingRender = []
                let timestamp = ''

                if (rating > 5)
                    rating = 5

                // takes the time
                for (let prop in post._kmd)
                    if (prop.localeCompare('ect'))
                        timestamp = utils.ConvertTime(post._kmd[prop])
                let i = 0
                for (; i < rating; i++)
                    ratingRender.push(<span key={i} className="glyphicon glyphicon-star"></span>)
                while (ratingRender.length < 5)
                    ratingRender.push(<span key={i++} className="glyphicon glyphicon-star-empty"></span>)

                return (
                    <div key={post._id} className="col-sm-4 col-lg-4 col-md-4">

                        <Link style={{textDecoration: "none"}} to={`/posts/details/${post._id}`}>
                            <div className="card card-body btn-custom">
                                <div className="figure post-body">
                                    <div className="text-center">
                                        <h3>
                                            {utils.showLess(post.title, 30)}
                                        </h3>
                                    </div>
                                    <div>{utils.showLess(post.body, 50)}</div>
                                </div>
                                <div className="post-views">
                                    <p className="float-right views">{post.rating} views</p>
                                    <p>{timestamp}</p>
                                    <div className="post-rating text-center">
                                        {ratingRender}
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                )
            })

        return (
            <div className="row">
                <div className="col-md-12 row">
                    <div className="page-header text-center offset-4 col-4">
                        <h1>Latest Posts</h1>
                    </div>
                </div>
                <div className="col-md-12 row">
                    {postsForRender}
                </div>
            </div>
        )
    }
}