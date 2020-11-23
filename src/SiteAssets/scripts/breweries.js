// import {axios} from './axios/dist/axios.js';

const restHeaders = {
    method: "GET",
    credentials: "include",
    mode: "no-cors",
    headers: {
        "Accept": "application/json; odata=verbose"
    }
};

getBreweries();

function getBreweries() {
    axios.get(`https://api.openbrewerydb.org/breweries/search?query=Maine`, restHeaders)
    .then(resp => {
        let _data = resp.data;
        console.log(_data)
    })
}