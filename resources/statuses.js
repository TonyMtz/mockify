import Resource from '../lib/resource';
import Status from '../models/status';
import parse from 'co-body';

let statusResource = new Resource('/status', {
    get: function *() {
        let collection = yield Status.getAll();
        if (Array.isArray.call(collection)) {
            collection = [collection];
        }
        this.body = {posts: collection};
    },
    getById: function *() {
        this.body = yield {post: Status.getById(this.params.id)};
    },
    post: function *() {
        var record = yield parse(this);
        this.body = yield {post: Status.create(record)};
    },
    put: function *() {
        var record = yield parse(this);
        this.body = yield Status.update(this.params.id, record);
    },
    delete: function *() {
        this.body = yield Status.destroy(this.params.id);
    }
});

export default function (api) {
    statusResource.mount(api);
};
