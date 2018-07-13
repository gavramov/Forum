import React, {Component} from 'react'

export default class RequirementMessage extends Component {
    constructor(props) {
        super(props)
        this.color = "red"
        this.class = ""
        this.message = ""
    }

    componentDidMount() {
        this.message = this.props.message

        if (this.props.class !== undefined)
            this.class = this.props.class
        if (this.props.color !== undefined)
            this.color = this.props.color
    }

    render() {
        let toggle = this.props.fieldOnFocus ? "block" : "none"
        if (toggle === undefined)
            toggle = "block"
        return (
            <div className={this.class} style={{color: this.color, display: toggle}}>
                <p>{this.message}</p>
            </div>
        )
    }
}