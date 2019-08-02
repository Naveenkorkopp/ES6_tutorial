import React, { Component } from 'react';
import ToDo from '../todo_bean';

class ToDoList extends Component {


    onDragStart = (event, taskName) => {
        
        console.log('dragstart on div: ', taskName);
        event.dataTransfer.setData("taskName", taskName);
    }

    onDragOver = (event) => {
        debugger
	    event.preventDefault();
	}

    onDrop = (event, cat) => {
        debugger
	    
	}


    render() {

        var myArray = []
        const status = ToDo.STATUS_CHOICE;

        for(var key in status) {
            myArray.push(status[key])
        }

        const data = this.props.storage;
        debugger
        return (
            <div className="todo_list" onDrop={this.onDrop}> 
                { myArray.map(i =>  
                    <div className="draggable">
                        {
                            data.map((todo, index) => todo._status === i ? <div onDragStart={ this.onDragStart } draggable="true" className={index}>{ todo._note }</div> : '' )
                        }
                    </div>)
                }
            </div>
        );
    }
}

export default ToDoList;