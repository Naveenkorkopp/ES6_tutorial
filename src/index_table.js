import {app_template, todolist_template} from './templates_table';
import '../static/css/style_table.css';


var storage = JSON.parse(localStorage.getItem("todolist")) || [];

var key = storage.length > 0 ? storage[storage.length-1].id + 1 : 0;

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
            'isCompleted': false,
            'isPending': false
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
                storage.splice(storage.indexOf(todo), 1);
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
    pendingTodo: function(id, flag) {
        storage.map((todo)=> {
          if (todo.id == id) {
              todo.isPending = flag;
          }
      });

      todoapp.updateApp(); // Update the APP
    },
    eventsHandlers : function() {
      // When user add the note
        document.body.addEventListener('click', function(e){
            if(e.target.className === 'addNote') {
                todoapp.addToDo();
            }
        }, true);
        // When user hit enter after adding text
        document.body.addEventListener("keyup", function(event) {
          if (event.target.name == 'addText' &&  event.key === "Enter") {
              document.getElementsByClassName('addNote')[0].click();
            }
        });
        // When user start dragging object
        document.body.addEventListener("dragstart", function(event) {
          event.dataTransfer.setData("Text", event.target.id);
        }, true);
        // When user are in midway of dragging
        document.body.addEventListener("dragover", function(event) {
          event.preventDefault();
        }, true);
        // when user drop the object
        document.body.addEventListener("drop", function(event) {

          event.preventDefault();

          var data = event.dataTransfer.getData("Text");
          var targeted_element = document.getElementById(data);

          if ( event.target.className == 'status_droptarget' && event.target.id == data) {
              event.target.appendChild(targeted_element);
              targeted_element.innerHTML = "PENDING"
              targeted_element.className += " status_dragtarget_yellow";
              todoapp.pendingTodo(data, true); // Calling the logic to make pending
          } else if(event.target.className == 'status_completetarget' && event.target.id == data) {
              event.target.appendChild(targeted_element);
              targeted_element.innerHTML = "COMPLTED"
              targeted_element.className += " status_dragtarget_green";
              todoapp.pendingTodo(data, false); // Calling the logic to remove pending
              todoapp.completeTodo(data); // Calling the logic to make completed
          } else if(['dustbin_col', 'fa fa-trash'].includes(event.target.className) && event.target.id == data) {
              event.target.appendChild(targeted_element);
              todoapp.deleteToDo(data) // Calling the logic to delete
          }
        }, true);
    }
}

todoapp.startapp(); // Starting the App
