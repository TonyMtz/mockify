import koa from 'koa';
import mount from 'koa-mount';
import Router from 'koa-router';
import logger from 'koa-logger';
import render from 'koa-render';
import cors from 'koa-cors';
import views from 'co-views';
import json from './lib/json';
import config from './config';

let app = koa();
let pages = new Router;
let api = new Router;

if ('development' === app.env) {
    app.use(logger());
}

app.use(cors());
app.use(json());
app.use(mount('/v1', api.middleware()));

require('./resources/statuses')(api);
require('./resources/todos')(api);

api.get('/test', function *() {
    this.body = "Hello, World";
});

export default app;
