import React, {Component} from 'react'
import './Footer.css'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <section className="col-md-12">
                    <div>
                        &copy; 2018 React Forum
                    </div>
                </section>
            </footer>
        )
    }
}