const { RESTDataSource } = require('apollo-datasource-rest');
const MELI_API = process.env.MELI_API;

class Search extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = MELI_API;
  }

  async getQuery(query) {
    return this.get(`sites/MLA/search?q=${query}`);
  }

  async getCategory(category) {
    return this.get(`sites/MLA/search?category=${category}`);
  }
}

module.exports = Search;
