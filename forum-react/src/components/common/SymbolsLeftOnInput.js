import React, {Component} from 'react'

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