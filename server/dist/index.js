"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var mercurius_1 = __importDefault(require("mercurius"));
var mercurius_codegen_1 = require("mercurius-codegen");
var uuid = __importStar(require("uuid"));
var mongoose_1 = require("mongoose");
var mongoDBconnection = "mongodb+srv://aarsenal:adapt3rCrazy2819@cbcluster1.lit21.mongodb.net/AdapterArsenalDev?retryWrites=true&w=majority";
var BlogPostSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
});
var BlogPostModel = (0, mongoose_1.model)("BlogPost", BlogPostSchema);
var server = (0, fastify_1.default)();
server.register(require("fastify-cors"), {
    // put your options here
    origin: "*",
    methods: "GET",
    credentials: true,
});
var schema = (0, mercurius_codegen_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type BlogPost {\n    id: String\n    title: String\n    description: String\n    content: String\n    date: String\n    author: String\n  }\n\n  input BlogPostInput {\n    title: String\n    description: String\n    content: String\n    author: String\n  }\n\n  input BlogPostUpdateInput {\n    id: String\n    title: String\n    description: String\n    content: String\n    author: String\n  }\n\n  input MessageInput {\n    content: String\n    author: String\n  }\n\n  type Message {\n    id: ID!\n    content: String\n    author: String\n  }\n\n  type Mutation {\n    createMessage(input: MessageInput): Message\n    addBlogPost(input: BlogPostInput): BlogPost\n    updateBlogPost(input: BlogPostUpdateInput): BlogPost\n  }\n\n  type Query {\n    posts: [BlogPost!]!\n    post(id: String!): BlogPost!\n    hello(name: String!): String!\n  }\n"], ["\n  type BlogPost {\n    id: String\n    title: String\n    description: String\n    content: String\n    date: String\n    author: String\n  }\n\n  input BlogPostInput {\n    title: String\n    description: String\n    content: String\n    author: String\n  }\n\n  input BlogPostUpdateInput {\n    id: String\n    title: String\n    description: String\n    content: String\n    author: String\n  }\n\n  input MessageInput {\n    content: String\n    author: String\n  }\n\n  type Message {\n    id: ID!\n    content: String\n    author: String\n  }\n\n  type Mutation {\n    createMessage(input: MessageInput): Message\n    addBlogPost(input: BlogPostInput): BlogPost\n    updateBlogPost(input: BlogPostUpdateInput): BlogPost\n  }\n\n  type Query {\n    posts: [BlogPost!]!\n    post(id: String!): BlogPost!\n    hello(name: String!): String!\n  }\n"])));
var resolvers = {
    Query: {
        hello: function (root, _a, ctx, info) {
            var name = _a.name;
            // root ~ {}
            // name ~ string
            // ctx.authorization ~ string | undefined
            // info ~ GraphQLResolveInfo
            return "hello " + name;
        },
        post: function (root, _a, ctx, info) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var foundPost;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // root ~ {}
                            // name ~ string
                            // ctx.authorization ~ string | undefined
                            // info ~ GraphQLResolveInfo
                            console.log(id);
                            return [4 /*yield*/, getBlogPost(id)];
                        case 1:
                            foundPost = _b.sent();
                            return [2 /*return*/, foundPost];
                    }
                });
            });
        },
        posts: function (root, _a, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
            var foundPosts;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getBlogPosts(0)];
                    case 1:
                        foundPosts = _b.sent();
                        return [2 /*return*/, foundPosts];
                }
            });
        }); },
    },
    Mutation: {
        createMessage: function (root, _a, ctx, info) {
            var input = _a.input;
            // root ~ {}
            // name ~ string
            // ctx.authorization ~ string | undefined
            // info ~ GraphQLResolveInfo
            //return 'a  message ' + input
            console.log(input);
            var newMessage = { id: "123", content: "lj", author: "chris" };
            return newMessage;
        },
        addBlogPost: function (root, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var newPost, addedPost;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //console.dir(BlogPostInput);
                            //console.dir(_);
                            console.dir(input);
                            newPost = new BlogPostModel(input);
                            console.dir(newPost);
                            return [4 /*yield*/, upsertBlogPost(newPost)];
                        case 1:
                            addedPost = _b.sent();
                            return [2 /*return*/, addedPost];
                    }
                });
            });
        },
        updateBlogPost: function (root, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var addedPost;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //console.dir(BlogPostInput);
                            //console.dir(_);
                            //const newPost = new BlogPostModel(input);
                            console.dir(input);
                            return [4 /*yield*/, upsertBlogPost(input)];
                        case 1:
                            addedPost = _b.sent();
                            return [2 /*return*/, addedPost];
                    }
                });
            });
        },
    },
};
var upsertBlogPost = function (newItem) { return __awaiter(void 0, void 0, void 0, function () {
    var newBlogPost, newUUID, query, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newBlogPost = newItem;
                if (!newItem.id) {
                    console.log("new post");
                    newUUID = uuid.v4().toString();
                    newBlogPost.id = newUUID;
                    newBlogPost.date = new Date();
                }
                else {
                    console.log("just updating: " + newBlogPost.title);
                    newBlogPost.date = new Date();
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, mongoose_1.connect)(mongoDBconnection, {})];
            case 2:
                _a.sent();
                query = { 'id': newItem.id };
                //delete newItem.id;
                console.dir(newItem);
                return [4 /*yield*/, BlogPostModel.findOneAndUpdate(query, newBlogPost, { upsert: true })];
            case 3:
                user = _a.sent();
                return [2 /*return*/, newBlogPost];
            case 4:
                error_1 = _a.sent();
                console.log("error");
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, newItem];
        }
    });
}); };
var getBlogPost = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var newBlogPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('looking: ');
                return [4 /*yield*/, (0, mongoose_1.connect)(mongoDBconnection, {})];
            case 1:
                _a.sent();
                return [4 /*yield*/, BlogPostModel.findOne({ id: id }).exec()];
            case 2:
                newBlogPost = _a.sent();
                console.log('found: ');
                console.dir(newBlogPost);
                return [2 /*return*/, newBlogPost];
        }
    });
}); };
var getBlogPosts = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var newBlogPosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('looking: ');
                return [4 /*yield*/, (0, mongoose_1.connect)(mongoDBconnection, {})];
            case 1:
                _a.sent();
                return [4 /*yield*/, BlogPostModel.find({}).sort({ date: 'descending' }).exec()];
            case 2:
                newBlogPosts = _a.sent();
                console.log('found: ');
                console.dir(newBlogPosts);
                return [2 /*return*/, newBlogPosts];
        }
    });
}); };
server.register(mercurius_1.default, {
    schema: schema,
    resolvers: resolvers,
    graphiql: true,
});
server.get("/hellogql", function (req, reply) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = '{ hello(name: "chris") }';
            return [2 /*return*/, reply.graphql(query)];
        });
    });
});
server.post("/hello2", function (request, reply) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(request.body);
            return [2 /*return*/, reply.graphql(String(request.body))];
        });
    });
});
server.get("/pong", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        reply.send({ ping: "pinnnnngggg" });
        return [2 /*return*/];
    });
}); });
server.get("/ping", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        reply.send({ hello: "world" });
        return [2 /*return*/];
    });
}); });
server.get("/api/adapters", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var username;
    return __generator(this, function (_a) {
        username = request.query.username;
        // do something with request data
        return [2 /*return*/, "logged in! " + username];
    });
}); });
server.listen(8080, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Server listening at " + address);
});
function uuidv4() {
    throw new Error("Function not implemented.");
}
var templateObject_1;
