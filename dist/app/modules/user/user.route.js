"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_zodValidation_1 = __importDefault(require("./user.zodValidation"));
const router = express_1.default.Router();
router.get('/', user_controller_1.userController.getAlluser);
router.get('/:id', user_controller_1.userController.getUserById);
router.patch('/:id', (0, validateRequest_1.default)(user_zodValidation_1.default), user_controller_1.userController.UpdateUser);
router.delete('/:id', user_controller_1.userController.DeleteUser);
exports.userRoute = router;
