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

	var koa = require('koa');

	var log = require('lib/log.js').config( 5 );

	var app = koa();

	var $data = {
		server: {
			port: 4488
		}
	};

	app.use(function*(next) {
		var start = new Date();
		yield next;
		var respTime = new Date() - start;
		this.set('X-Response-Time', respTime+'ms');
	});

	app.use(function*(next) {
		var start = new Date();
		yield next;
		var respTime = new Date() - start;
		log.log('<%s> for [%s] (%s)', this.method, this.url, respTime);
	});

	app.use(function*() {
		this.body = 'Aloha universe!';
	});

	app.listen( $data.server.port );
})();
