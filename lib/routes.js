/**
 * @project iojs-api-template
 * API template boilerplate for io.js (es6/harmony)
 * @file routes.js
 * API routes collection.
 * @author curtis zimmerman
 * @contact software@curtisz.com
 * @license AGPLv3
 * @version 0.0.1
 */

module.exports = [
	$router.get('/', function *(next) {
		// default route
		this.body = '<html><body><a href="https://github.com/curtiszimmerman/iojs-api-template">iojs-api-template</a> by <a href="http://curtisz.com">curtisz</a></body></html>';
	}),
	$router.get('/about', function *(next) {
		// get about information
	})
];
