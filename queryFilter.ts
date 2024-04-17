import BeerType from "./types/Beertype.types"
import Query from "./types/Query.types"

const filterByName = (beerData : BeerType[], nameQuery : string) => {
    return beerData.filter(beer => beer.name.toLowerCase().includes(nameQuery.toLowerCase()))
}
const filterByAbvGreaterThan = (beerData : BeerType[], query: string ) => {
    return beerData.filter(beer => beer.abv > parseFloat(query))
}
const filterByAbvLessThan = (beerData : BeerType[], query: string ) => {
    return beerData.filter(beer => beer.abv < parseFloat(query))
}
const filterByIbuGreaterThan = (beerData : BeerType[], query: string ) => {
    return beerData.filter(beer => beer.ibu > parseFloat(query))
}
const filterByIbuLessThan = (beerData : BeerType[], query: string ) => {
    return beerData.filter(beer => beer.ibu < parseFloat(query))
}

const queryFilter = (beerData : BeerType[], query : Query)  => {
    const {beer_name, abv_gt, abv_lt, ibu_gt, ibu_lt} = query

    let filteredBeerData = beerData

    if (beer_name) {
        filteredBeerData = filterByName(filteredBeerData, beer_name)
    }
    if (abv_gt) {
        filteredBeerData = filterByAbvGreaterThan(filteredBeerData, abv_gt)
    }
    if (abv_lt) {
        filteredBeerData = filterByAbvLessThan(filteredBeerData, abv_lt)
    }
    if (ibu_gt) {
        const ibuLow = parseInt(ibu_gt)
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.ibu > ibuLow
        })
    }
    if (ibu_lt) {
        const ibuHigh = parseInt(ibu_lt)
        filteredBeerData = filteredBeerData.filter(beer => {
            return beer.ibu < ibuHigh
        })
    }
    console.log('filtered beer data',filteredBeerData)
    return filteredBeerData
}

export default queryFilter;