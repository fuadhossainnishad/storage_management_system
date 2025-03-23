"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const port = process.env.PORT;
(0, database_1.default)();
app_1.default.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
