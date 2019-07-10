
export function app_template(todoapp) {
    return  (`
        <div class="myForm">
            <input  type='text' name='addText'>
            <button class='addNote'>ADD NOTE</button>
        </div>
        <br><br>
        <div>
            <table id="toDoListTable">
            <tr>
                <th>To Do List</th>
                <th>Status</th>
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
            <p>${todo.todo}</p>
            <button class="sayCompleted" data-key="${todo.id}">complete</button>
            <button class="sayDelete" data-key="${todo.id}">delete</button>
        </td>
        ${
            todo.isCompleted ? 
            '<td style="background:#3acc3a">Completed</td>': 
            '<td style="background:yellow">Pending</td>'
        }
        </tr>
        `).join(' ')
        }
        `);
}
