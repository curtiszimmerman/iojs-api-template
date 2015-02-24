/**
 * @file log.js
 * Log wrapper utility functions.
 * @version 0.0.1
 */

module.exports = exports = __log = (function() {
	"use strict";

	var _config = function( loglevel ) {
		return new Log(loglevel);
	};

	class Log {
		constructor( loglevel ) {
			this.quiet = loglevel === false ? true : false;
			this.loglevel = loglevel;
		}
		_con( data, loglevel ) {
			var pre = [' [EROR] ',' [WARN] ',' [LOG ] ',' [INFO] ',' [DBUG] '];
			return console.log(this._time()+pre[loglevel]+data);
		}
		_time() { return new Date().toJSON();}
		debug( data ) { this.log(data, 4);}
		error( data ) { this.log(data, 0);}
		info( data ) { this.log(data, 3);}
		log( data, loglevel ) {
			loglevel = typeof(loglevel) !== 'number' ? 2 : loglevel;
			if (loglevel > 4) loglevel = 4;
			return this.quiet ? false && this._con(data, 0) : loglevel <= this.loglevel && this._con(data, loglevel);
		}
		warn( data ) { this.log(data, 1);}
	};

	return {
		config: _config
	};
})();
