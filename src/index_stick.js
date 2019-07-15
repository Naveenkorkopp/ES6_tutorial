import { myStorage } from "./storage";
import { app_template, listInitialised, listPending, listCompleted } from './templates_stick';
import '../static/css/style_stick.css';


export class ToDo {

    static get STATUS_CHOICE() {
        return {
            INITIALISED : 'initialised',
            PENDING : 'pending',
            COMPLETED : 'completed'
        };
    }

    constructor(id, note, status=ToDo.STATUS_CHOICE.INITIALISED) {
        if (!isNaN(id)){
            this.id = id
        }else {
            throw "Send proper id"
        }
        if (note !== null || note !== undefined || note !== '') {
            this._note = note;
        }else{
            throw "note cannot be null, undefined or empty. Please send a proper value."
        }
        if (Object.values(ToDo.STATUS_CHOICE).indexOf(status) > -1) {
            this._status = status;
        }else {
            throw "status of a note is not correct "
        }
    }

    getNote() {
        return this._note;
    }
    setNote(note) {
        if (note !== null || note !== undefined || note !== '') {
            this._note = note;
        }else{
            throw "note cannot be null, undefined or empty. Please send a proper value."
        }
    }
    getStatus() {
        return this._status;
    }
    setStatus(status) {
        if (Object.values(ToDo.STATUS_CHOICE).indexOf(status) > -1) {
            this._status = status;
        }else {
            throw "status of a note is not correct "
        }
    }
}


var myNotePad = (function() {

    var storage = myStorage.getStorage();
    
    function addToDo() {

        const value = document.querySelector('input[name="addText"]').value;

        if (value == '') {
            alert("Please add some text !")
            return
        }
        storage.push(new ToDo(myStorage.getKey(), value, ToDo.STATUS_CHOICE.INITIALISED));

        updateApp(); // Update the app
    }
    
    function list_initialised() {
        return listInitialised(storage);
    }
    function list_pending() {
        return listPending(storage);
    }
    function list_completed() {
        return listCompleted(storage);
    }

    function update_status_todo(id, status) {
        storage.map((todo) => {

            if(todo.id == id) {
                todo._status = status;
            }
        });

        updateApp(); // Update the app
    }

    function deleteToDo(id) {
        const data = storage;

        data.map((todo)=> {
            if (todo.id == id) {
                storage.splice(storage.indexOf(todo), 1);
            }
        });

        updateApp(); // Update app
    }

    function updateApp() {
        const app = document.querySelector("#toDoApp");

        app.innerHTML = app_template(list_initialised, list_pending, list_completed);

        // Update storage
        myStorage.updateStorage(storage);

    }

    function startApp() {
        updateApp();
    }

    function eventsHandlers() {
        // When user add the note
        document.body.addEventListener('click', function(e){
            if(e.target.className === 'addNote') {
                addToDo();
            }
        }, true);
        // When user hit enter after adding text
        document.body.addEventListener("keyup", function(event) {
            
            if (event.target.name == 'addText' &&  event.key === "Enter") {
                document.getElementsByClassName('addNote')[0].click();
                document.getElementsByName("addText")[0].focus();
              }
          });
        // When user start dragging object
        document.body.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("Text", event.target.id);
          }, true);
        // When user are in midway of dragging 
        document.body.addEventListener("dragover", function(event) {
            event.preventDefault();

            var scroller = document.getElementById('scroller');
            var action = document.getElementsByClassName('action')[0];
            const parent_ele = document.getElementById(event.target.id);
            const parent_class = parent_ele === null ? '' : parent_ele.parentElement.className;
            
            if(parent_class == 'initialised') {
                scroller.innerText = 'MAKE IT PENDING...';
                scroller.style.marginLeft = '40%';
                action.style.background = '#d4cb33';
            }else if (parent_class == 'completed') {
                scroller.innerText = 'MAKE IT COMPLETING...';
                scroller.style.marginLeft = '70%';
                action.style.background = '#2a8c0e8f';
            } else if (event.target.className == 'trash') {
                scroller.innerText = 'DELETING...';
                scroller.style.marginLeft = '70%';
                action.style.background = '#ef0707';
            }

        }, true);
        // When user drop the item
        document.body.addEventListener("drop", function(event) {

            event.preventDefault();
  
            var data = event.dataTransfer.getData("Text");
            var targeted_element = document.getElementById(data);

            const parent_ele = document.getElementById(event.target.id);
            const parent_class = parent_ele === null ? '' : parent_ele.parentElement.className;

            if(event.target.className == 'pending' || parent_class == 'pending') {
                event.target.appendChild(targeted_element);
                update_status_todo(data, ToDo.STATUS_CHOICE.PENDING);
            }else if(event.target.className == 'completed' || parent_class == 'completed') {
                event.target.appendChild(targeted_element);
                update_status_todo(data, ToDo.STATUS_CHOICE.COMPLETED);
            } else if (event.target.className == 'trash') {
                deleteToDo(data);
            }

            var scroller = document.getElementById('scroller');
            var action = document.getElementsByClassName('action')[0];

            scroller.innerText = 'START DRAGGING..';
            scroller.style.marginLeft = '10%';
            action.style.background = '#cccccc';

        }, true);
    }

    return {
        startApp: startApp(),
        eventsHandlers: eventsHandlers()
    }

})();
