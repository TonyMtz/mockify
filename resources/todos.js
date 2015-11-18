import Resource from '../lib/resource';
import Todo from '../models/todo';
import parse from 'co-body';

let todoResource = new Resource('/todos', {
    get: function *() {
        let collection = yield Todo.getAll();
        if (Array.isArray.call(collection)) {
            collection = [collection];
        }
        this.body = {todos: collection};
    },
    getById: function *() {
        this.body = yield {todo: Todo.getById(this.params.id)};
    },
    post: function *() {
        var record = yield parse(this);
        this.body = yield {todo: Todo.create(record.todo)};
    },
    put: function *() {
        var record = yield parse(this);
        this.body = yield {todo: Todo.update(this.params.id, record.todo)};
    },
    delete: function *() {
        this.body = yield Todo.destroy(this.params.id);
    }
});

export default function (api) {
    todoResource.mount(api);
};
