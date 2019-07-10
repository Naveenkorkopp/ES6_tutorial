import {app_template, todolist_template} from './templates';
import '../static/css/style.css';


var storage = JSON.parse(localStorage.getItem("todolist")) || [];

var key = 0;

var todoapp = {
    startapp : function(){
        this.updateApp();
        this.eventsHandlers();
    },
    updateApp: function() {
        const app = document.querySelector("#toDoApp");

        app.innerHTML = app_template(todoapp);

        // UPDATE THE LOCAL STORAGE
        localStorage.setItem("todolist", JSON.stringify(storage));
    },
    addToDo: function() {
        const value = document.querySelector('input[name="addText"]').value;
        
        if (value == '') {
            alert("Please add some text !")
            return
        }
        storage.push({
            'id': key++,
            'todo': value,
            'isCompleted': false
        });

        todoapp.updateApp(); // Update the APP
    },
    listTodos: function(){
        return todolist_template(storage);
    },
    deleteToDo: function(id){
        const data = storage;

        data.map((todo)=> {
            if (todo.id == id) {
                storage.pop(todo)
            }
        });

        todoapp.updateApp(); // Update the APP
    },
    completeTodo: function(id){
        storage.map((todo)=> {
            if (todo.id == id) {
                todo.isCompleted = true;
            }
        });

        todoapp.updateApp(); // Update the APP

    },
    eventsHandlers : function() {
        document.body.addEventListener('click', function(e){
            if(e.target.className === 'addNote') {
                todoapp.addToDo();
            }else if(e.target.className === 'sayCompleted') {
                const key = e.target.getAttribute('data-key');
                todoapp.completeTodo(key);
            }else if(e.target.className === 'sayDelete') {
                const key = e.target.getAttribute('data-key');
                todoapp.deleteToDo(key);
            }
        }, true);
    }
}

todoapp.startapp();