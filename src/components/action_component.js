import React, { Component } from 'react';

class ToDoAction extends Component {

    render() {
        return (
            <div className="myForm">
                <div className="input_box">
                    <input  type='text' name='addText' placeholder="add note here..." />
                </div>
                <div className="add_button">
                    <button class='addNote' onClick={this.props.addToDo} >ADD NOTE</button>
                </div>
            </div>
        );
    }
}

export default ToDoAction;