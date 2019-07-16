import { ToDo } from './index_stick';

export function app_template(list_initialised, list_pending, list_completed) {

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
            <div class="initialised">${list_initialised()}</div>
            <div class="pending">${list_pending()}</div>
            <div class="completed">${list_completed()}</div>
        </div>
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
