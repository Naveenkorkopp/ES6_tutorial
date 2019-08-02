import ToDo  from './todo_bean';

export var myStorage = (function(){
    var instance = localStorage;

    function _getKey() {
        const storage = _getStorage(); 
        return storage.length > 0 ? storage[storage.length-1].id + 1 : 0;
    }

    function _getStorage() {
        const store = JSON.parse(instance.getItem("todolist") || '[]');
        const myToDoStore = [];
        store.forEach((todo) => {
    
            let status = ToDo.STATUS_CHOICE.INITIALISED;

            if(todo.isCompleted){
                status = ToDo.STATUS_CHOICE.COMPLETED;
            }else if(todo.isPending){
                status = ToDo.STATUS_CHOICE.PENDING;
            }

            myToDoStore.push(new ToDo(todo.id, todo.note, status))
        })

        return myToDoStore;
    }

    function form_data(todo) {
        return {
            'id': todo.id,
            'note': todo._note,
            'isCompleted': todo._status === ToDo.STATUS_CHOICE.COMPLETED ? true : false,
            'isPending': todo._status === ToDo.STATUS_CHOICE.PENDING ? true : false,
        }
    }

    function _setStorage(todo) {

        var storage = _getStorage();

        var myStorage = []

        if(todo !== null || todo !== undefined) {
            storage.forEach((pre_todo) => {
                myStorage.push(form_data(pre_todo));
            })

            myStorage.push(form_data(todo));

            instance.setItem('todolist', JSON.stringify(myStorage));

        }else{
            throw new Error("Illegal argument")
        }
    }

    function _modifyStorage(todo_id, new_status) {
        var storage = _getStorage();

        var myStorage = []

        if(todo_id !== null || todo_id !== undefined) {
            storage.forEach((pre_todo) => {
                debugger
                if(pre_todo.id === todo_id) {
                    
                }
                myStorage.push(form_data(pre_todo));
            })

            instance.setItem('todolist', JSON.stringify(myStorage));

        }else{
            throw new Error("Illegal argument")
        }

    }
   
    return {
        getStorage: _getStorage,
        updateStorage: _setStorage,
        getKey: _getKey
   };
})();