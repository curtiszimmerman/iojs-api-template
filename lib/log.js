/**
 * @file log.js
 * Log wrapper utility functions.
 * @version 0.0.1
 */

module.exports = exports = __log = (function() {
	"use strict";

	var _config = function( loglevel ) {
		var $log = new Log(loglevel);
		$log.notice('initializing log object with verbosity:'+$log.prefix[loglevel]+'('+loglevel+')');
		return $log;
	};

	class Log {
		constructor( loglevel ) {
			this.quiet = loglevel === false ? true : false;
			this.loglevel = loglevel;
			this.prefix = [' [EROR] ',' [WARN] ',' [LOG ] ',' [INFO] ',' [DBUG] '];
		}
		_con( data, loglevel ) { return console.log(this._time()+this.prefix[loglevel]+data);}
		_time() { return new Date().toJSON();}
		debug( data ) { this.log(data, 4);}
		error( data ) { this.log(data, 0);}
		info( data ) { this.log(data, 3);}
		log( data, loglevel ) {
			loglevel = typeof(loglevel) !== 'number' ? 2 : loglevel;
			if (loglevel > 4) loglevel = 4;
			return this.quiet ? false && this._con(data, 0) : loglevel <= this.loglevel && this._con(data, loglevel);
		}
		notice( data ) { return this.quiet ? false : console.log(this._time()+' [NOTC] '+data);}
		warn( data ) { this.log(data, 1);}
	};

	return {
		config: _config
	};
})();
