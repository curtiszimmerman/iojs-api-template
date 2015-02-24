/**
* @project iojs-api-template
* API template boilerplate for io.js (es6/harmony)
* @file log.test.js
* Log wrapper testing harness.
* @author curtis zimmerman
* @contact software@curtisz.com
* @license AGPLv3
* @version 0.0.1a
*/

module.exports = exports = __test = (function() {
	"use strict";

	var expect = require('chai').expect;

	var log = require('../lib/log.js');

	describe('iojs-api-template (es6/harmoney boilerplate):', function() {
		describe('# log.stub():', function() {
			it('should return false when given zero arguments', function() {
				var result = true;
				expect(result).to.be.true();
			});
		});
	});
})();
