import { ToDo } from './index';
import { config } from './config';

export function app_template(list_initialised, list_pending, list_completed, list_columns) {

    return (`
        <div class="appTitle">Sticky Notes</div>
        <div class="myForm">
            <input  type='text' name='addText' placeholder="add note here..." autofocus>
            <button class='addNote'>ADD NOTE</button>
            <section>
                <span class="trash">
                    <span></span>
                    <i></i>
                </span>
            </section>
        </div>
        <div class="action">
            <div id="scroller"></div>
        </div>
        <div id="toDoListSticks">
            ${Array(config.columns).fill().map( i => `<div class="initialised">${list_columns()}</div>`
                ).join(' ')
            }
        </div>
    `);
}

export function listColumns(storage) {
    return (`
        ${storage.map((todo)=> `
            <div class="sticky ${todo.id}" id="${todo.id}"  draggable="true">
                <p class="message">${todo._note}</p>
            </div>
        `).join(' ')
    }
    `);
}

export function listInitialised(storage) {

    return (`
        ${storage.map((todo) => `
            ${ todo._status == ToDo.STATUS_CHOICE.INITIALISED ? `
                <div class="sticky ${todo.id}" id="${todo.id}"  draggable="true">
                    <p class="message">${todo._note}</p>
                </div>` : ''
            }
        `).join(' ')
    }
    `);
}

export function listPending(storage) {

    return (`
        ${storage.map((todo) => `
            ${ todo._status == ToDo.STATUS_CHOICE.PENDING ? `
                <div class="sticky" id="${todo.id}" draggable="true">
                    <p class="message">${todo._note}</p>
                </div>` : ''
            }
        `).join(' ')
    }
    `);
}

export function listCompleted(storage) {
    return (`
        ${storage.map((todo) => `
            ${ todo._status == ToDo.STATUS_CHOICE.COMPLETED ? `
                <div class="sticky" id="${todo.id}" draggable="true">
                    <p class="message">${todo._note}</p>
                </div>` : ''
            }
        `).join(' ')
    }
    `);
}
