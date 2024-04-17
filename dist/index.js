"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const punkapi = require('punkapi-db').sort((a, b) => a.id - b.id);
const punkapiLib = require('punkapi-lib');
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
const queryFilter = (beerData, query) => {
    let filteredBeerData = beerData;
    if (query.beer_name) {
        const name = query.beer_name.toLowerCase();
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.name.toLowerCase().includes(name);
        });
    }
    if (query.abv_gt) {
        const abvLow = parseInt(query.abv_gt);
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.abv > abvLow;
        });
    }
    if (query.abv_lt) {
        const abvHigh = parseInt(query.abv_lt);
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.abv < abvHigh;
        });
    }
    if (query.ibu_gt) {
        const ibuLow = parseInt(query.ibu_gt);
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.ibu > ibuLow;
        });
    }
    if (query.ibu_lt) {
        const ibuHigh = parseInt(query.ibu_lt);
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.ibu < ibuHigh;
        });
    }
    console.log('filtered beer data', filteredBeerData);
    return filteredBeerData;
};
app.use((0, cors_1.default)({
    origin: ['https://diy-dog.onrender.com', 'http://localhost:5173'],
    methods: ["GET"]
}));
app.get('/', (req, res) => {
    console.log('someone accessed /');
    res.send("Hello from express + ts (not ts yet)");
});
app.get('/beers', (req, res) => {
    console.log(req.query);
    console.log('someone accessed /beers');
    res.json(queryFilter(punkapi, req.query));
});
app.get('/beer/:id', (req, res) => {
    console.log('someone accessed /beer/:id');
    const beerId = parseInt(req.params.id);
    const singleBeer = punkapi.find(beer => beer.id === beerId);
    res.json(singleBeer);
});
app.listen(port, () => {
    console.log('now listening on', port);
});
