import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDoContainer from './components/todo_container';
import { myStorage } from './store';


class App extends React.Component {

    render() {
        return (
            <div className="App">
                <ToDoContainer storage={ myStorage } />
            </div>
        );
    } 
}

ReactDOM.render(<App />, document.getElementById('root'));