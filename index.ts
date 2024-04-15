import express from 'express'; 
import cors from 'cors';
import BeerType from './beertype.types';
const punkapi = require('punkapi-db').sort((a : BeerType, b : BeerType) => a.id - b.id)
const port = 8080;

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET"]
}))

app.get('/', (req, res) => {
    res.send("Hello from express + ts (not ts yet)")
})

app.get('/punkapi', (req, res) => {
    const query = req.query
    const page = query.page
    console.log(page)
    res.send(punkapi)
})

app.get('/hi', (req, res) => {
    res.send('The fuck you want?')
})

app.listen(port, () => {
    console.log('now listening on', port)
    console.log('This is the change.')
})

