import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div className="side">
                    <ListOfTasks list={list}></ListOfTasks>
                </div>
            </div>
        );
    }
}

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
    constructor(props){
        super(props)
        this.state = {
            value: true
        }
    }
    render() {
        let data = this.props.list, newTemplate
        if (data.length > 0) {
            newTemplate = data.map((item, index) => {
                return (
                    <li key={index}>{item.author}: {item.book}</li>
                )
            })
        } else {
            newTemplate = <strong> data is empty</strong>
        }
        return (
            <div className="ListOfTasks">
                <p>table</p>
                <button onClick={()=>{
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
                <p className={this.state.value ? '': 'empty'}>General count: {data.length}</p>
            </div>
        )
    }
}

export default App;
