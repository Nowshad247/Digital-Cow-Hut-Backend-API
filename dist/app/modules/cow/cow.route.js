"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cow_controller_1 = require("./cow.controller");
const cow_validation_1 = require("./cow.validation");
const router = express_1.default.Router();
router.post('/', cow_controller_1.cowController.listAcow);
router.get('/', cow_controller_1.cowController.showCow);
router.get('/:id', cow_controller_1.cowController.showSingelCow);
router.patch('/:id', (0, validateRequest_1.default)(cow_validation_1.zodCowValidation.UpdateZodCowValidation), cow_controller_1.cowController.UpdateCow);
router.delete('/:id', cow_controller_1.cowController.DeleteCow);
exports.cowRoute = router;
