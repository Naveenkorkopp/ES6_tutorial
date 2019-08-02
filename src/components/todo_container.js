import React, { Component } from 'react';
import ToDoAction from './action_component';
import ToDoList from './todoList_component';
import ToDo from '../todo_bean';

class ToDoContainer extends Component {

    constructor(props) {
        super(props)
        this.storage = props.storage
    }

    addToDo = () => {
        const value = document.querySelector('input[name="addText"]').value;
        if (value === '') {
            alert("Please add some text !")
            return
        }
        this.storage.updateStorage(new ToDo(this.storage.getKey(), value, ToDo.STATUS_CHOICE.INITIALISED));
    }

    pendingToDo = todo => {
        this.storage._modifyStorage(todo.id, ToDo.STATUS_CHOICE.PENDING);
    }

    render() {
        return (
            <div className="app">
                <div class="appTitle">Sticky Notes</div>
                    <ToDoAction addToDo={ this.addToDo } />
                    <ToDoList storage={ this.storage.getStorage() } pendingToDo={this.pendingToDo} />
            </div>
        );
    }
}

export default ToDoContainer;