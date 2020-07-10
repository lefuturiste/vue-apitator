"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const vue_1 = __importDefault(require("vue"));
exports.default = {
    install(context, options) {
        vue_1.default.prototype.$apitator = new client_1.default(options);
    }
};
