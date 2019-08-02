
export default class ToDo {

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
            throw new Error("Send proper id")
        }
        if (note !== null || note !== undefined || note !== '') {
            this._note = note;
        }else{
            throw new Error("note cannot be null, undefined or empty. Please send a proper value.")
        }
        if (Object.values(ToDo.STATUS_CHOICE).indexOf(status) > -1) {
            this._status = status;
        }else {
            throw new Error("status of a note is not correct ")
        }
    }

    getNote() {
        return this._note;
    }
    setNote(note) {
        if (note !== null || note !== undefined || note !== '') {
            this._note = note;
        }else{
            throw new Error("note cannot be null, undefined or empty. Please send a proper value.")
        }
    }
    getStatus() {
        return this._status;
    }
    setStatus(status) {
        if (Object.values(ToDo.STATUS_CHOICE).indexOf(status) > -1) {
            this._status = status;
        }else {
            throw new Error("status of a note is not correct ")
        }
    }
}