const { RESTDataSource } = require('apollo-datasource-rest');
const MELI_API = process.env.MELI_API;

class Items extends RESTDataSource{
  constructor() {
    super();
    this.baseURL = MELI_API;
  }

  async getItem(id) {
    return this.get(`items/${id}`);
  }
  
  async getItems(ids) {
    return this.get(`items/?ids=${ids}`);
  }

  async getItemDescription(id) {
    return this.get(`items/${id}/description`);
  }
}

module.exports = Items;
