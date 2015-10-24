let config = {
    dev: {
        logger: true,
        port: '3000',
        mongo: '192.168.1.200',
        db: 'wall-dev'
    },
    test: {
        logger: false,
        port: '3000',
        mongo: '192.168.1.200',
        db: 'wall-test'
    }
};

let env = process.env.NODE_ENV || 'dev';
//let config = require('./config/config.' + env);

export default config[env];
