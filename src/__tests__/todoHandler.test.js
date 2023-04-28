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
var todoServices_1 = require("../services/todoServices");
var dbConnection_1 = require("../db/dbConnection");
require('dotenv').config();
describe("todoServices", function () {
    beforeAll(function () {
        process.env.SUPABASE_URL = "https://dummy-url.com";
        process.env.SUPABASE_KEY = "dummy-key";
    });
    describe("addTodo", function () {
        it("should add a todo", function () { return __awaiter(void 0, void 0, void 0, function () {
            var req, insertMock, fromMock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = {
                            body: {
                                title: "test todo",
                            },
                        };
                        insertMock = jest.fn().mockReturnValue({
                            data: {
                                id: "test-id",
                                title: "test todo",
                                completion: false,
                            },
                        });
                        fromMock = jest.fn().mockReturnValue({
                            insert: insertMock,
                        });
                        dbConnection_1.supabase.from = fromMock;
                        return [4 /*yield*/, todoServices_1.todoServices.addTodo(req)];
                    case 1:
                        _a.sent();
                        expect(fromMock).toHaveBeenCalledWith("todos");
                        expect(insertMock).toHaveBeenCalledWith([
                            { title: "test todo", completion: false },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("checkTodo", function () {
    it("should update a todo's completion status", function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, updateMock, eqMock, fromMock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        body: {
                            id: 1,
                            completion: false,
                        },
                    };
                    updateMock = jest.fn().mockReturnValue({
                        data: {
                            id: 1,
                            title: "test todo",
                            completion: true,
                        },
                    });
                    eqMock = jest.fn().mockReturnValue({
                        update: updateMock,
                        // single: jest.fn(),
                    });
                    fromMock = jest.fn().mockReturnValue({
                        eq: eqMock,
                        update: updateMock
                    });
                    dbConnection_1.supabase.from = fromMock;
                    console.log(eqMock());
                    console.log(updateMock());
                    return [4 /*yield*/, todoServices_1.todoServices.checkTodo(req)];
                case 1:
                    _a.sent();
                    expect(fromMock).toHaveBeenCalledWith("todos");
                    expect(eqMock).toHaveBeenCalledWith("id", 1);
                    expect(updateMock).toHaveBeenCalledWith({ completion: true });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("todoServices", function () {
    beforeAll(function () {
        process.env.SUPABASE_URL = "https://dummy-url.com";
        process.env.SUPABASE_ANON_KEY = "dummy-key";
    });
    describe("searchTodos", function () {
        it("should search for todos", function () { return __awaiter(void 0, void 0, void 0, function () {
            var searchText, req, todos, selectMock, fromMock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchText = "test";
                        req = {
                            body: {
                                searchText: searchText,
                            },
                        };
                        todos = [
                            { id: "test-id-1", title: "Test todo 1" },
                            { id: "test-id-2", title: "Test todo 2" },
                        ];
                        selectMock = jest.fn().mockReturnValue({
                            textSearch: jest.fn().mockReturnValue({
                                data: todos,
                            }),
                        });
                        fromMock = jest.fn().mockReturnValue({
                            select: selectMock,
                        });
                        dbConnection_1.supabase.from = fromMock;
                        return [4 /*yield*/, todoServices_1.todoServices.searchTodos(req)];
                    case 1:
                        result = _a.sent();
                        expect(fromMock).toHaveBeenCalledWith("todos");
                        expect(selectMock).toHaveBeenCalledWith("*");
                        expect(selectMock().textSearch).toHaveBeenCalledWith("title", searchText);
                        expect(result).toEqual(todos);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error if Supabase returns an error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var searchText, req, error, selectMock, fromMock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchText = "test";
                        req = {
                            body: {
                                searchText: searchText,
                            },
                        };
                        error = new Error("Something went wrong");
                        selectMock = jest.fn().mockReturnValue({
                            textSearch: jest.fn().mockReturnValue({
                                error: error,
                            }),
                        });
                        fromMock = jest.fn().mockReturnValue({
                            select: selectMock,
                        });
                        dbConnection_1.supabase.from = fromMock;
                        return [4 /*yield*/, expect(todoServices_1.todoServices.searchTodos(req)).rejects.toThrow("Unable to search: ".concat(error))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("sortTodos", function () {
    it("should return todos sorted by title in ascending order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var todos, mockFrom, sortedTodos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todos = [{ id: 1, title: "c" }, { id: 2, title: "a" }, { id: 3, title: "b" }];
                    mockFrom = jest.fn().mockReturnValue({
                        select: jest.fn().mockReturnValue({
                            order: jest.fn().mockReturnValue({
                                data: todos,
                                error: null,
                            }),
                        }),
                    });
                    dbConnection_1.supabase.from = mockFrom;
                    return [4 /*yield*/, todoServices_1.todoServices.sortTodos()];
                case 1:
                    sortedTodos = _a.sent();
                    expect(sortedTodos).toEqual([
                        { id: 2, title: "a" },
                        { id: 3, title: "b" },
                        { id: 1, title: "c" },
                    ]);
                    expect(mockFrom).toHaveBeenCalledWith("todos");
                    expect(mockFrom("todos").select).toHaveBeenCalledWith("*");
                    expect(mockFrom("todos").select("*").order).toHaveBeenCalledWith("title", { ascending: true });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error if supabase returns an error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error, mockFrom;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = new Error("supabase error");
                    mockFrom = jest.fn().mockReturnValue({
                        select: jest.fn().mockReturnValue({
                            order: jest.fn().mockReturnValue({
                                data: null,
                                error: error,
                            }),
                        }),
                    });
                    dbConnection_1.supabase.from = mockFrom;
                    return [4 /*yield*/, expect(todoServices_1.todoServices.sortTodos()).rejects.toThrow("Unable to sort todos: ".concat(error))];
                case 1:
                    _a.sent();
                    expect(mockFrom).toHaveBeenCalledWith("todos");
                    expect(mockFrom("todos").select).toHaveBeenCalledWith("*");
                    expect(mockFrom("todos").select("*").order).toHaveBeenCalledWith("title", { ascending: true });
                    return [2 /*return*/];
            }
        });
    }); });
});
