const fetch = require("node-fetch");

const host = "https://swapi.dev";
const path = "api";
const queryParameter = "format=json";

class SwapiApi {
    
    constructor() {

    }

    fetchPeople() {
        return fetch(`${host}/${path}/people?${queryParameter}`);
    }

    fetchStarShip() {
        return fetch(`${host}/${path}/starships/9?${queryParameter}`);
    }
}

module.exports = new SwapiApi();