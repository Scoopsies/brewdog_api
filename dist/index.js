"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const punkapi = require('punkapi-db').sort((a, b) => a.id - b.id);
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['https://diy-dog.onrender.com', 'http://localhost:5173'],
    methods: ["GET"]
}));
app.get('/', (req, res) => {
    console.log('someone accessed /');
    res.send("Hello from express + ts (not ts yet)");
});
app.get('/beers', (req, res) => {
    console.log('someone accessed /beers');
    res.send(punkapi);
});
app.listen(port, () => {
    console.log('now listening on', port);
});
