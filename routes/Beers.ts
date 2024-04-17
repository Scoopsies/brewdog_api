import express from "express";
const beersRoute = express.Router()
import queryFilter from "../queryFilter";
import BeerType from "../types/Beertype.types";
const punkapi: BeerType[] = require('punkapi-db').sort((a : BeerType, b : BeerType) => a.id - b.id);

beersRoute.get('/', (req, res) => {
    console.log('someone accessed /beers')
    res.json(queryFilter(punkapi, req.query))
})

export default beersRoute