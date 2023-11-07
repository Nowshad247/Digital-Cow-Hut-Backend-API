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
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const apiErrors_1 = __importDefault(require("./errors/apiErrors"));
process.on('uncaughtException', error => {
    console.log('uncaughtException');
    console.error(error);
    process.exit(1);
});
let server;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(index_1.default.database_url);
            console.log(`🛢   Database is connected successfully`);
            server = app_1.default.listen(index_1.default.port, () => {
                console.log(`Application  listening on port ${index_1.default.port}`);
            });
        }
        catch (err) {
            console.log('Failed to connect database', err);
        }
        process.on('unhandledRejection', error => {
            if (server) {
                server.close(() => {
                    console.log(error);
                    process.exit(1);
                });
                bootstrap();
            }
            else {
                process.exit(1);
            }
            throw new apiErrors_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Somthing Went wrong');
        });
    });
}
bootstrap();
process.on('SIGTERM', () => {
    if (server) {
        server.close();
    }
});
// E90MjTq1GDFx6Wdv
// mdnowshad9
