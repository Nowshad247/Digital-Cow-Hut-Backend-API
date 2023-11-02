"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AurhRouth = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_zodValidation_1 = __importDefault(require("./auth.zodValidation"));
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(auth_zodValidation_1.default), auth_controller_1.authController.signup);
exports.AurhRouth = router;
