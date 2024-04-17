import express from 'express'; 
import cors from 'cors';
import BeerType from './beertype.types';
const punkapi: BeerType[] = require('punkapi-db').sort((a : BeerType, b : BeerType) => a.id - b.id);
const port = process.env.PORT || 8080;

type Query = {
    beer_name?: string,
    abv_lt?: string,
    abv_gt?: string,
    ibu_lt?: string,
    ibu_gt?: string
}
const app = express();

const queryFilter = (beerData : BeerType[], query : Query)  => {
    let filteredBeerData = beerData
    if (query.beer_name) {
        const name = query.beer_name.toLowerCase()
        filteredBeerData = filteredBeerData.filter(beer => {
           return beer.name.toLowerCase().includes(name)
        }) 
    }
    if (query.abv_gt) {
        const abvLow = parseInt(query.abv_gt)
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.abv > abvLow
        })
    }
    if (query.abv_lt) {
        const abvHigh = parseInt(query.abv_lt)
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.abv < abvHigh
        })
    }
    if (query.ibu_gt) {
        const ibuLow = parseInt(query.ibu_gt)
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.ibu > ibuLow
        })
    }
    if (query.ibu_lt) {
        const ibuHigh = parseInt(query.ibu_lt)
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.ibu < ibuHigh
        })
    }
    console.log('filtered beer data',filteredBeerData)
    return filteredBeerData
}

app.use(cors({
    origin: ['https://diy-dog.onrender.com', 'http://localhost:5173'],
    methods: ["GET"]
}))

app.get('/', (req, res) => {
    console.log('someone accessed /')
    res.send("Hello from express + ts (not ts yet)")
})

app.get('/beers', (req, res) => {
    console.log(req.query)
    console.log('someone accessed /beers')
    res.json(queryFilter(punkapi, req.query))
})

app.get('/beer/:id', (req, res) => {
    console.log('someone accessed /beer/:id')
    const beerId = parseInt(req.params.id)
    const singleBeer = punkapi.find(beer => beer.id === beerId)
    res.json(singleBeer)
})


app.listen(port, () => {
    console.log('now listening on', port)
})

