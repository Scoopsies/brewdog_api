import express from 'express'; 
import cors from 'cors';
import BeerType from './types/Beertype.types';
import queryFilter from './queryFilter';
const punkapi: BeerType[] = require('punkapi-db').sort((a : BeerType, b : BeerType) => a.id - b.id);
const port = process.env.PORT || 8080;
import beersRoute from './routes/Beers';
import beerRoute from './routes/Beer';

const app = express();

app.use(cors({
    origin: ['https://diy-dog.onrender.com', 'http://localhost:5173'],
    methods: ["GET"]
}))

app.use('/beers', beersRoute)
app.use('/beer', beerRoute)

app.listen(port, () => {
    console.log('now listening on', port)
})

