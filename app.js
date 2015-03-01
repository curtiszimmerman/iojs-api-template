/**
* @project es6-api-template
* API template boilerplate for io.js (es6/harmony)
* @file app.js
* Primary application driver.
* @author curtis zimmerman
* @contact software@curtisz.com
* @license AGPLv3
* @version 0.0.2
*/

module.exports = exports = __api = (function() {
	"use strict";

	// third-party modules
	var events = require('events');
	var koa = require('koa');
	var pm2 = require('pm2');
	var router = require('koa-router');
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
		},
		stats: {
			processed: 0,
			version: '0.0.2'
		}
	};
	var $log = null;
	var $pubsub = new events.EventEmitter();

	var init = (function() {
		$data.settings.argv = yargs
			.usage('Usage: $0 [OPTIONS]\n\nNote:\nThis application requires the following es6/harmony flags:\n--harmony --harmony_arrow_functions --harmony_classes')
			.option('a', {
				alias: 'address',
				describe: 'server address to listen on. default localhost.',
				type: 'string'
			})
			.option('c', {
				alias: 'certificate',
				describe: 'SSL certificate to use. implies -k.',
				implies: 'k',
				type: 'string'
			})
			.option('k', {
				alias: 'key',
				describe: 'SSL private key to use. implies -c.',
				implies: 'c',
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
			.option('q', {
				alias: 'quiet',
				describe: 'quiet mode. no output except catastrophic errors.',
				type: 'boolean'
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
		//
		//
		// you gotta sort this shit out with Log (0-4? 1-5? 0-5? wtf)
		//
		//
		if (typeof($data.settings.argv.loglevel) !== 'undefined') $data.settings.logs.level = $data.settings.argv.loglevel;
		if (typeof($data.settings.argv.quiet) !== 'undefined' && $data.settings.argv.quiet === true) $data.settings.logs.quiet = true, $data.settings.logs.level = false;
		$log = log.config( $data.settings.logs.level );
		if (typeof($data.settings.argv.port) !== 'undefined') $data.server.port = $data.settings.argv.port;
		if (typeof($data.settings.argv.address) !== 'undefined') $data.server.address = $data.settings.argv.address;
		$log.notice('initialization complete');
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
		$log.notice('listening on '+$data.server.address+':'+$data.server.port);
	};

	// if we're called as a module, it's testing time!
	return require.main === module ? server() : this;
})();
