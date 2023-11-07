"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_ZodValidation_1 = require("./admin.ZodValidation");
const admins_controller_1 = require("./admins.controller");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_ZodValidation_1.AdminValidation.createadminSchema), admins_controller_1.adminContoller.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_ZodValidation_1.AdminValidation.loginadminSchema), admins_controller_1.adminContoller.login);
router.post('/refresh-tocken', (0, validateRequest_1.default)(admin_ZodValidation_1.AdminValidation.refreshTockenValidation), admins_controller_1.adminContoller.refreshTocken);
exports.adminRoute = router;
