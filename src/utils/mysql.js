"use strict";
// This file is for server-side use only
// In a Vue.js SPA, database connections are handled by the backend API
// This file serves as a reference for the backend implementation
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.db = void 0;
var promise_1 = require("mysql2/promise");
// MySQL connection pool
var pool = promise_1.default.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'project_bolt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Database methods
exports.db = {
    // Categories
    getCategories: function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM categories ORDER BY name')];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    },
    getCategoryById: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM categories WHERE id = ?', [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        categories = rows;
                        return [2 /*return*/, categories.length > 0 ? categories[0] : null];
                }
            });
        });
    },
    // Projects
    getProjects: function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM projects ORDER BY created_at DESC')];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    },
    getProjectById: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, projects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM projects WHERE id = ?', [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        projects = rows;
                        return [2 /*return*/, projects.length > 0 ? projects[0] : null];
                }
            });
        });
    },
    getProjectsByCategory: function (categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM projects WHERE category_id = ? AND published = TRUE ORDER BY created_at DESC', [categoryId])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    },
    // Pages
    getPages: function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM pages ORDER BY sort_order')];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    },
    getPageById: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM pages WHERE id = ?', [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        pages = rows;
                        return [2 /*return*/, pages.length > 0 ? pages[0] : null];
                }
            });
        });
    },
    getPageBySlug: function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT * FROM pages WHERE slug = ?', [slug])];
                    case 1:
                        rows = (_a.sent())[0];
                        pages = rows;
                        return [2 /*return*/, pages.length > 0 ? pages[0] : null];
                }
            });
        });
    }
};
exports.default = exports.db;
