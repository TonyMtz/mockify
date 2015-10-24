import monk from 'monk';
import wrap from 'co-monk';
import config from '../config';

let db = monk([config.mongo, config.db].join('/'));
let statuses = wrap(db.get('statuses'));

let instance = null;

class Status {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    * create(record) {
        yield statuses.insert(record);
        return record;
    }

    * getAll() {
        var collection = yield statuses.find({});
        return collection;
    }

    * getById(id) {
        var status = yield statuses.findOne({_id: id});
        return status;
    }

    * update(id, record) {
        yield statuses.updateById(id, record);
        return record;
    }

    * destroy(id) {
        yield statuses.remove({_id: id});
    }
}

export default new Status;
