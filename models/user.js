import monk from 'monk';
import wrap from 'co-monk';
import config from '../config';

let db = monk([config.mongo, config.db].join('/'));
let users = wrap(db.get('users'));

let instance = null;

class Todo {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    * create(record) {
        yield users.insert(record);
        return record;
    }

    * getAll() {
        let collection = yield users.find({});
        return collection;
    }

    * getById(id) {
        let status = yield users.findOne({_id: id});
        return status;
    }

    * update(id, record) {
        yield users.updateById(id, record);
        let todo = yield this.getById(id);
        return todo;
    }

    * destroy(id) {
        yield users.remove({_id: id});
    }
}

export default new Todo;
