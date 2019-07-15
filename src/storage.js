import { ToDo } from './index_stick';

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

    function _setStorage(storage) {

        var myToDoList = []
        if(storage !== null || storage !== undefined) {
            storage.forEach((todo) => {
                myToDoList.push({
                    'id': todo.id,
                    'note': todo._note,
                    'isCompleted': todo._status === ToDo.STATUS_CHOICE.COMPLETED ? true : false,
                    'isPending': todo._status === ToDo.STATUS_CHOICE.PENDING ? true : false,
                })
            });

            instance.setItem('todolist', JSON.stringify(myToDoList));

        }else{
            throw "Illegal argument"
        }
    }
    return {
        getStorage: _getStorage,
        updateStorage: _setStorage,
        getKey: _getKey
   };
})();
