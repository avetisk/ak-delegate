module.exports = process.env.TEST_COVERAGE ? require('./lib-cov/delegate') : require('./lib/delegate');
