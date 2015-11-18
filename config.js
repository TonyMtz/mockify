let config = {
    dev: {
        logger: true,
        port: '3000',
        mongo: '192.168.2.200',
        db: 'wall-dev'
    },
    test: {
        logger: false,
        port: '3000',
        mongo: '192.168.2.200',
        db: 'wall-test'
    },
    prod: {
        logger: false,
        port: 1337,
        mongo: '127.0.0.1',
        db: 'mylistio-prod'
    }
};

let env = process.env.NODE_ENV || 'dev';

export default config[env];
