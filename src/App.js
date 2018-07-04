import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import EventEmitter from 'event-emitter'
import Add from "./components/AddItem";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div className="side">
                    <Add />
                    <ListOfTasks list={list}/>
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

    componentWillUnmount() {
        window.ee.off('List.add')
    }

    render() {
        let newTemplate
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



export default App;
