"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./app/middlewares/auth"));
const globalErrorHandelar_1 = __importDefault(require("./app/middlewares/globalErrorHandelar"));
const admins_router_1 = require("./app/modules/admins/admins.router");
const auth_route_1 = require("./app/modules/auth/auth.route");
const cow_route_1 = require("./app/modules/cow/cow.route");
const order_route_1 = require("./app/modules/order/order.route");
const user_route_1 = require("./app/modules/user/user.route");
const common_1 = require("./enum/common");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
//Auth signup
app.use('/api/v1/auth/', auth_route_1.AurhRouth);
// GEt all User
app.use('/api/v1/users/', (0, auth_1.default)(common_1.USER_ENUM.ADMIN, common_1.USER_ENUM.BUYER), user_route_1.userRoute);
app.use('/api/v1/cow/', cow_route_1.cowRoute);
app.use('/api/v1/order/', order_route_1.OrderRouter);
app.use('/api/v1/admins', admins_router_1.adminRoute);
//Defolt Responce
app.get('/', (req, res) => {
    res.send('Digital Cow Hut Backend API');
});
app.use(globalErrorHandelar_1.default);
exports.default = app;
