"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const http = require("http");
const debug = require("debug");
const App_1 = require("./App");
debug('permaculture:server');
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    //console.log(connection)
    const port = normalizePort(process.env.PORT || 3000);
    App_1.default.set('port', port);
    const server = http.createServer(App_1.default);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    function normalizePort(val) {
        let port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    }
    function onError(error) {
        if (error.syscall !== 'listen')
            throw error;
        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    function onListening() {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
    }
})).catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=index.js.map