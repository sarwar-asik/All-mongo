"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const config_ts_1 = __importDefault(require("./config.ts"));
require("colors");
const logger_1 = require("./shared/logger");
const app_1 = __importDefault(require("./app"));
process.on('uncaughtException', err => {
    logger_1.errorLogger.error('UnCaught rejection is detected from serve.ts', err);
    process.exit(1);
});
let server;
// console.log(config.data_url, 'config file'.red.bold);
function mainFUnction() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_ts_1.default.data_url, {
                dbName: 'Cow-hut',
            });
            logger_1.logger.info('db Connected successfully '.green.underline.bold);
            server = app_1.default.listen(config_ts_1.default.port, () => {
                logger_1.logger.info(`server app listening on port ${config_ts_1.default.port}`.green.bold);
            });
        }
        catch (error) {
            // const  {name,message,stack}=error;
            logger_1.errorLogger.error('failed to connect '.red.underline, error);
        }
        process.on('unhandledRejection', error => {
            // eslint-disable-next-line no-console
            console.log('UnHandle rejection is detected and closing the main() in serve.ts');
            if (server) {
                server.close(() => {
                    logger_1.errorLogger.error(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM is received ');
    if (server) {
        server.close();
    }
});
// console.log(config.port,"url".green.bold);
mainFUnction();
