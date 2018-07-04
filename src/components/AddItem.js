import React from 'react'
import ReactDOM from "react-dom";

class Add extends React.Component {
    constructor(props) {
        super(props)
        // this.addButton = this.addButton.bind(this)
        // this.rulesAccepter = this.rulesAccepter.bind(this)
        this.state = {
            agree: false
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.author).focus()
    }

    addButton() {
        let author = ReactDOM.findDOMNode(this.refs.author).value, book = ReactDOM.findDOMNode(this.refs.book).value
        let item = [{
            author: author,
            book: book
        }]
        window.ee.emit('List.add', item)
    }

    rulesAccepter(e) {
        this.setState({agree: e.target.checked})
    }

    render() {
        return (
            <div>
                <label>adding form</label>
                <input className="test-input" type="text" defaultValue=""
                       placeholder='author' ref="author"/>
                <input type="text" ref="book" placeholder="book" defaultValue=""/>
                <label htmlFor="">
                    <input onChange={(e) => this.rulesAccepter(e)} type="checkbox" defaultChecked={false}
                           ref="checkrule"/>
                </label>
                <button disabled={!this.state.agree} onClick={() => this.addButton()}>value</button>
            </div>
        )
    }
}
export default Add;