import express from 'express';
const beerRoute = express.Router()
import BeerType from "../types/Beertype.types";
const punkapi: BeerType[] = require('punkapi-db').sort((a : BeerType, b : BeerType) => a.id - b.id);


beerRoute.get('/:id', (req, res) => {
    const beerId = parseInt(req.params.id)
    res.json(punkapi.find(beer => beer.id === beerId))
})

export default beerRoute;