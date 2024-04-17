import BeerType from "./types/Beertype.types";
import Query from "./types/Query.types";

const filterByName = (beerData: BeerType[], nameQuery: string) => {
  return beerData.filter((beer) =>
    beer.name.toLowerCase().includes(nameQuery.toLowerCase())
  );
};

const filterByAbvGreaterThan = (beerData: BeerType[], query: string) => {
  return beerData.filter((beer) => beer.abv > parseFloat(query));
};

const filterByAbvLessThan = (beerData: BeerType[], query: string) => {
  return beerData.filter((beer) => beer.abv < parseFloat(query));
};

const filterByIbuGreaterThan = (beerData: BeerType[], query: string) => {
  return beerData.filter((beer) => beer.ibu > parseFloat(query));
};

const filterByIbuLessThan = (beerData: BeerType[], query: string) => {
  return beerData.filter((beer) => beer.ibu < parseFloat(query));
};

const queryFilter = (beerData: BeerType[], query: Query) => {
  const { beer_name, abv_gt, abv_lt, ibu_gt, ibu_lt } = query;
  if (beer_name) beerData = filterByName(beerData, beer_name);
  if (abv_gt) beerData = filterByAbvGreaterThan(beerData, abv_gt);
  if (abv_lt) beerData = filterByAbvLessThan(beerData, abv_lt);
  if (ibu_gt) beerData = filterByIbuGreaterThan(beerData, ibu_gt);
  if (ibu_lt) beerData = filterByIbuLessThan(beerData, ibu_lt);

  return beerData;
};

export default queryFilter;
