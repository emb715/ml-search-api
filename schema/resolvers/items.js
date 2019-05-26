const { customAuthor, cleanItemResponse } = require('../../utils/helpers');

const handleResponse = (response) => ({
  item: cleanItemResponse(response)
}); 

const Query = {
  item: async (_source, { id }, { dataSources, loaders }) => {
    return dataSources.itemsApi.getItem(id);
  },
  itemDescription: async (_source, { id }, { dataSources }) => {
    return dataSources.itemsApi.getItemDescription(id);
  },
  getItem: async (_source, { id }, { dataSources }) => {
    const response = await dataSources.itemsApi.getItem(id);
    return handleResponse(response);
  },
  items: async (_source, { ids }, { dataSources, loaders }) => {
    return dataSources.itemsApi.getItems(ids);
  },
};

const Types = {
  ItemResponse: {
    async author() {
      return customAuthor();
    },
    async categories({ item }, args, { dataSources }, info) {
      const { category_id } = item || {}; 
      const category = await dataSources.categoriesApi.getCategory(category_id);
      const { path_from_root } = category || {};
      const categories = path_from_root.map(({ name }) => (name));
      return categories;
    },
  },
  Item: {
    async description({ id }, args, { dataSources }, info) {
      const itemDescription = await dataSources.itemsApi.getItemDescription(id);
      const { plain_text } = itemDescription || {};
      return plain_text;
    },
  },
};

module.exports = {
  Query,
  Types
};
