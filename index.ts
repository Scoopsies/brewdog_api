import express from 'express'; 
import cors from 'cors';
import BeerType from './beertype.types';
const punkapi = require('punkapi-db').sort((a : BeerType, b : BeerType) => a.id - b.id)
const port = process.env.PORT || 8080;

const app = express();

app.use(cors({
    origin: ['https://diy-dog.onrender.com', 'http://localhost:5173'],
    methods: ["GET"]
}))

app.get('/', (req, res) => {
    console.log('someone accessed /')
    res.send("Hello from express + ts (not ts yet)")
})

app.get('/beers', (req, res) => {
    console.log('someone accessed /beers')
    res.send(punkapi)
})


app.listen(port, () => {
    console.log('now listening on', port)
})

