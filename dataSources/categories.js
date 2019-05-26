const { RESTDataSource } = require('apollo-datasource-rest');
const MELI_API = process.env.MELI_API;

class Categories extends RESTDataSource{
  constructor() {
    super();
    this.baseURL = MELI_API;
  }

  async getCategory(id) {
    return this.get(`categories/${id}`);
  }
}

module.exports = Categories;
