"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var cors = require('cors');
app.use(cors({
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200
}));
app.listen(3000, function () {
    console.log("Start on port 3000.");
});
app.use("/todo", todoRoutes_1.default);
app.get("/test", function (req, res) {
    res.send("OK");
});
