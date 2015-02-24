# iojs-api-template
An API template/boilerplate for io.js and es6/harmony.

## Prerequisites
This package requires [io.js](https://iojs.org/) and uses special ES6/Harmony flags to run.

## Installing
```sh
git clone https://github.com/curtiszimmerman/iojs-api-template.git
cd iojs-api-template
npm install
```

## Executing
It's possible to run this application using iojs with special flags:
```sh
iojs --harmony --harmony_arrow_functions --harmony_classes ./app.js
```

Additionally, this package includes a simple shell script that serves as an alias:
```sh
./iojs-api-template.sh
```

Help information is available with the `--help` flag:
```sh
iojs --harmony --harmony_arrow_functions --harmony_classes ./app.js --help
```
... Or ...
```sh
./iojs-api-template.sh --help
```

## Options
This application supports the following command-line options:
```sh
-a, --address [address]      server address to listen on. default localhost.
-c, --certificate [cert]     SSL certificate to use. implies -k.
-k, --key [key]              SSL private key to use. implies -c.
-l, --loglevel [loglevel]    output loglevel (0-5). default 2.
-p, --port [port]            tcp port to listen on. default 80.
-v, --version                display version information.
```

## Contributing
Contributions are welcome, but some standard guidelines apply. Pull requests that are
simply stylistic or semantic changes will not be accepted. Pull requests that do not
conform to existing code style will not be accepted. I am a busy person, and I will
try my best to get to your pull request, but please understand that it may be some
time before this happens. If it's urgent (bug/security fix), please drop me a line
at software -at- curtisz -dot- com. Thanks!

## License
This source is (C) 2015 curtis zimmerman and released under the AGPLv3. The full  
license is in the `LICENSE` file, and also at: http://www.gnu.org/licenses/agpl.html
