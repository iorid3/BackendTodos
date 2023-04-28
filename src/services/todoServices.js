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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoServices = void 0;
var dbConnection_1 = require("../db/dbConnection");
var todoServices = /** @class */ (function () {
    function todoServices() {
    }
    todoServices.addTodo = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var title, _a, data, error, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        title = req.body.title;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbConnection_1.supabase
                                .from("todos")
                                .insert([{ title: "".concat(title), completion: false }])
                                .select()];
                    case 2:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            throw error;
                        }
                        console.log(data);
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        throw new Error("Unable to add: ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    todoServices.checkTodo = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, completion, _b, data, error, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, id = _a.id, completion = _a.completion;
                        console.log(req.body);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbConnection_1.supabase
                                .from("todos")
                                .update({ completion: !completion })
                                .eq("id", id)
                                .select()];
                    case 2:
                        _b = _c.sent(), data = _b.data, error = _b.error;
                        if (error) {
                            throw error;
                        }
                        console.log(data);
                        return [2 /*return*/, data];
                    case 3:
                        error_2 = _c.sent();
                        console.log(error_2);
                        throw new Error("Unable to update completion: ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    todoServices.updateTodoTitle = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, title, _b, data, error, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, id = _a.id, title = _a.title;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbConnection_1.supabase
                                .from("todos")
                                .update({ title: title })
                                .eq("id", id)
                                .single()];
                    case 2:
                        _b = _c.sent(), data = _b.data, error = _b.error;
                        if (error) {
                            throw error;
                        }
                        console.log(data);
                        return [2 /*return*/, data];
                    case 3:
                        error_3 = _c.sent();
                        console.log(error_3);
                        throw new Error("Unable to update title: ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    todoServices.searchTodos = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var searchText, _a, data, error, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        searchText = req.body.searchText;
                        console.log(req);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbConnection_1.supabase
                                .from("todos")
                                .select("*")
                                .ilike("title", "%".concat(searchText, "%"))];
                    case 2:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            throw error;
                        }
                        console.log(searchText);
                        return [2 /*return*/, data.map(function (todo) { return ({ id: todo.id, title: todo.title }); })];
                    case 3:
                        error_4 = _b.sent();
                        console.log(error_4);
                        throw new Error("Unable to search: ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    todoServices.deleteAllTodos = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(req);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dbConnection_1.supabase
                                .from("todos")
                                .update({ isActive: false })
                                .eq('isActive', true)
                                .select()];
                    case 2:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            throw error;
                        }
                        return [2 /*return*/, data];
                    case 3:
                        error_5 = _b.sent();
                        console.log(error_5);
                        throw new Error("Unable to search: ".concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    todoServices.sortTodos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, todos, error, sortedTodos, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbConnection_1.supabase
                                .from("todos")
                                .select("*")
                                .eq("isActive", true)
                                .order("title", { ascending: true })];
                    case 1:
                        _a = _b.sent(), todos = _a.data, error = _a.error;
                        if (error) {
                            throw error;
                        }
                        console.log(todos);
                        sortedTodos = todos
                            .map(function (todo) { return ({
                            id: todo.id,
                            title: todo.title,
                            completion: todo.completion,
                        }); })
                            .sort(function (a, b) { return a.title.localeCompare(b.title, undefined); });
                        return [2 /*return*/, sortedTodos];
                    case 2:
                        error_6 = _b.sent();
                        console.log(error_6);
                        throw new Error("Unable to sort todos: ".concat(error_6));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return todoServices;
}());
exports.todoServices = todoServices;
