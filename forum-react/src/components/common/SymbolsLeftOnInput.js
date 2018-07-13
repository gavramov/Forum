import React, {Component} from 'react'
/*
 * Displays the maximum symbols
 * that the user can input into given form.
 * Give this a properties of maxSymbols={integer}
 * and an input property containing the form input
 * You can also set a class to the div containing
 * the counter eg. - "col-md-5"
 * This counter can also hide if it is given
 * a boolean property named fieldOnFocus which
 * is managed by the onFocus on the input field
 */

export default class SymbolsLeft extends Component {
    constructor(props) {
        super(props)
        this.symbolsLeft = 0
        this.boldness = "inherit"
        this.class = ''
        this.color = "inherit"
    }

    componentDidMount() {
        this.symbolsLeft = this.props.maxSymbols - this.props.input.length

        if (this.props.class !== undefined)
            this.class = this.props.class

        if (this.props.color !== undefined)
            this.color = this.props.color
    }

    render() {
        let toggle = this.props.fieldOnFocus ? "block" : "none"
        let value = this.props.maxSymbols - this.props.input.length
        if (toggle === undefined)
            toggle = "block"

        this.symbolsLeft = value < 0 ? 0 : value

        if (this.symbolsLeft <= 20)
            this.color = "red"

        if (this.symbolsLeft > 20)
            this.color = "inherit"

        if (this.symbolsLeft === 0)
            this.boldness = "bold"
        else
            this.boldness = "inherit"

        return (
            <div className={this.class}
                 style={
                     {
                         display: toggle,
                         color: this.color,
                         fontWeight: this.boldness
                     }
                 }>
                <p>{this.symbolsLeft}</p>
            </div>
        )
    }
}