import monk from 'monk';
import wrap from 'co-monk';
import config from '../config';

let db = monk([config.mongo, config.db].join('/'));
let todos = wrap(db.get('todos'));

let instance = null;

class Todo {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    * create(record) {
        yield todos.insert(record);
        return record;
    }

    * getAll() {
        let collection = yield todos.find({});
        return collection;
    }

    * getById(id) {
        let status = yield todos.findOne({_id: id});
        return status;
    }

    * update(id, record) {
        yield todos.updateById(id, record);
        let todo = yield this.getById(id);
        return todo;
    }

    * destroy(id) {
        yield todos.remove({_id: id});
    }
}

export default new Todo;
