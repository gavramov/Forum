import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../common/Header'
import CategoriesWidget from '../widgets/CategoriesWidget'
import LatestPostsWidget from '../widgets/LatestPostsWidget'

export default class HomePage extends Component {
    render() {
        let message = ""
        if (localStorage.getItem('username') === "guest") {
            message =
                <p>You are currently not a member of this forum. Click <Link to="/account/register">here</Link> to join
                    us.</p>
        }
        return (
            <div className="homepage row">
                <div className="col-md-8">
                    <Header/>
                    {message}
                </div>
                <CategoriesWidget/>
                <LatestPostsWidget/>
            </div>
        )
    }
}