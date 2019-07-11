
export function app_template(todoapp) {
    return  (`
        <div class="appTitle">EVERNOTE</div>
        <div class="myForm">
            <input  type='text' name='addText' placeholder="add note here...">
            <button class='addNote'>ADD NOTE</button>
        </div>
        <div>
            <table id="toDoListTable">
            <tr>
                <th>To Do List</th>
                <th>In-progress</th>
                <th>Completed</th>
                <th>Delete</th>
            </tr>
                ${todoapp.listTodos()}
            </table>
        </div>
    `);
}

export function todolist_template(storage) {
    return (`
        ${storage.map((todo)  => 
        `<tr>
            <td>
                <p class="note_todo">${todo.todo}</p>
                ${ todo.isPending || todo.isCompleted ? 
                        ''
                    : `<div class="status_dragtarget" id="${todo.id}" draggable="true" data-key="${todo.id}">DRAG</div>`
                }
            </td>
            <td id=${todo.id} class="status_droptarget">
                ${ todo.isPending ? 
                    `<div class="status_dragtarget_yellow" id="${todo.id}" draggable="true" data-key="${todo.id}">PENDING</div>`
                    : ''
                }
            </td>
            <td id=${todo.id} class="status_completetarget">
                ${ todo.isCompleted ? 
                    `<div class="status_dragtarget_green" id="${todo.id}" data-key="${todo.id}">COMPLTED</div>`
                    : ''
                }
            </td>
            <td id="${todo.id}" class="dustbin_col">
                ${
                    todo.isCompleted ?
                    '':
                    `<i id="${todo.id}" class="fa fa-trash dustbin" aria-hidden="true"></i>`
                }
            </td>
        </tr>
        `).join(' ')
        }
        `);
}
