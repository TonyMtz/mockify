import Resource from '../lib/resource';
import User from '../models/user';
import parse from 'co-body';

let userResource = new Resource('/users', {
    get: function *() {
        let collection = yield User.getAll();
        if (Array.isArray.call(collection)) {
            collection = [collection];
        }
        this.body = {users: collection};
    },
    getById: function *() {
        this.body = yield {user: User.getById(this.params.id)};
    },
    post: function *() {
        var record = yield parse(this);
        this.body = yield {user: User.create(record.user)};
    },
    put: function *() {
        var record = yield parse(this);
        this.body = yield {user: User.update(this.params.id, record.user)};
    },
    delete: function *() {
        this.body = yield User.destroy(this.params.id);
    }
});

export default function (api) {
    userResource.mount(api);
};
