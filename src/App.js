import React, {Component} from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom'
import './App.css';
import EventEmitter from 'event-emitter'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div className="side">
                    <Add></Add>
                    <ListOfTasks list={list}></ListOfTasks>
                </div>
            </div>
        );
    }
}

window.ee = new EventEmitter()

let list = [
    {
        author: 'a1',
        book: 'book from a1'
    },
    {
        author: 'a2',
        book: 'book from a2'
    },
    {
        author: 'sgh',
        book: 'bookj from domething'
    }
]

class ListOfTasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: true,
            data: []
        }
    }

    componentDidMount() {
        this.setState({data: list})
        window.ee.on('List.add', (item) => {
        let added = item.concat(this.state.data)
            this.setState({data: added})
        })
    }

    render() {
        let  newTemplate
        if (this.state.data.length > 0) {
            newTemplate = this.state.data.map((item, index) => {
                return (
                    <li key={index}>{item.author}: {item.book}</li>
                )
            })
        } else {
            newTemplate = <strong> this.state.data is empty</strong>
        }
        return (
            <div className="ListOfTasks">
                <p>table</p>
                <button onClick={() => {
                    let current = this.state.value
                    console.log(current, this.state.value)
                    this.setState({
                        value: !current
                    })
                }}>
                    click
                </button>
                <ul className="table">
                    {newTemplate}
                </ul>
                <p className={this.state.value ? '' : 'empty'}>General count: {this.state.data.length}</p>
            </div>
        )
    }
}

class Add extends React.Component {
    constructor(props) {
        super(props)
        this.addButton = this.addButton.bind(this)
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

    render() {
        return (
            <div>
                <label>adding form</label>
                <input className="test-input" type="text" defaultValue=""
                       placeholder='author' ref="author"/>
                <input type="text" ref="book" placeholder="book" defaultValue=""/>
                <label htmlFor="">
                <input type="checkbox" defaultChecked={false} ref="checkrule"/>
                </label>
                <button onClick={this.addButton}>value</button>
            </div>
        )
    }
}

export default App;
