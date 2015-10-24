import koa from 'koa';
import mount from 'koa-mount';
import Router from 'koa-router';
import logger from 'koa-logger';
import render from 'koa-render';
import views from 'co-views';
import json from './lib/json';
import config from './config';

let app = koa();
let pages = new Router;
let api = new Router;
//let render = views(__dirname + '/views');
//let render = views(__dirname + '/views', { map : {html : 'ejs'}}),
//app.use(views('./views', 'jade'));

if ('development' === app.env) {
    app.use(logger());
}

app.use(json());
app.use(mount('/api', api.middleware()));

//app.use(mount('/', pages.middleware()));
//app.use()

require('./resources/statuses')(api);

//app.use(route.get('/', function *() {
//    this.body = yield render('index.html', {
//        siteName: 'wall',
//        /* helper: list of routes and methods */
//        routes: route.routes
//    });
//}));

api.get('/test', function *() {
    this.body = "Hello, World";
});

export default app;
