/**
* @project es6-api-template
* API template boilerplate for io.js (es6/harmony)
* @file app.js
* Primary application driver.
* @author curtis zimmerman
* @contact software@curtisz.com
* @license AGPLv3
* @version 0.0.1a
*/

module.exports = exports = __api = (function() {
	"use strict";

	// third-party modules
	var events = require('events');
	var koa = require('koa');
	var pm2 = require('pm2');
	var yargs = require('yargs');

	// local modules
	var log = require('./lib/log.js');

	// additional init
	var $app = koa();
	var $data = {
		cache: {},
		settings: {
			argv: null,
			logs: {
				level: 2
			}
		},
		server: {
			address: '127.0.0.1',
			port: 4488
		}
	};
	var $log = null;
	var $pubsub = new events.EventEmitter();

	var init = (function() {
		$data.server.argv = yargs
			.usage('Usage: $0 [OPTIONS]\n\nNote:\nThis application requires the following es6/harmony flags:\n--harmony --harmony_arrow_functions --harmony_classes')
			.option('a', {
				alias: 'address',
				describe: 'server address to listen on. default localhost.',
				type: 'string'
			})
			.option('h', {
				alias: 'help',
				describe: 'this help message.'
			})
			.option('l', {
				alias: 'loglevel',
				describe: 'output loglevel (0-5). default 2.',
				type: 'number'
			})
			.option('p', {
				alias: 'port',
				describe: 'tcp port to listen on. default 80.',
				type: 'number'
			})
			.option('v', {
				alias: 'version',
				describe: 'display version information.'
			})
			.help('help')
			.version(() => require('./package').version)
			.epilog('For more information, visit:\n https://github.com/curtiszimmerman/iojs-api-template')
			.argv;

		$log = log.config( $data.settings.logs.level );
	})();

	var server = function() {
		var handler = function* (next) {
			// handle req
		};

		$app.use(function*(next) {
			var start = new Date();
			yield next;
			var respTime = new Date() - start;
			this.set('X-Response-Time', respTime+'ms');
		});

		$app.use(function*(next) {
			var start = new Date();
			yield next;
			var respTime = new Date() - start;
			$log.log('<'+this.method+'> for ['+this.url+'] ('+respTime+'ms)');
		});

		$app.use(function*() {
			this.body = {'Aloha': 'universe!'};
			this.status = 200;
			this.type = 'json';
		});

		$app.on('error', err => $log.error('server error: '+err));

		$app.listen( $data.server.port, $data.server.address );
		$log.log('listening on '+$data.server.address+':'+$data.server.port);
	};

	// if we're called as a module, it's testing time!
	return require.main === module ? server() : this;
})();
