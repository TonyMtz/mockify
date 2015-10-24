#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import http from 'http';
import config from '../config';
import colors from 'colors/safe';

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(config.port || process.env.PORT || '3000');

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            displayError(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            displayError(colors.red(bind + ' is already in use'));
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(colors.green('###################################'));
    console.log(colors.yellow('Listening on'), colors.red.bold(bind));
    console.log(colors.yellow('Persisting data on'), colors.cyan(config.mongo) + '/' + colors.white(config.db));
    console.log(colors.green('###################################'));
}

function displayError(msj) {
    console.error(colors.red('******************'));
    console.error([app.name || '', colors.red('ERROR:'), msj].join(' '));
    console.error(colors.red('******************'));
}
