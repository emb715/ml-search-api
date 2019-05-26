const { customAuthor, getMostDuplicatesByKey, mapResponse, cleanSearchItemResponse } = require('../../utils/helpers');

const Query = {
  search: async (_source, { query }, { dataSources }) => {
    return dataSources.searchApi.getQuery(query);
  },
  searchByCategory: async (_source, { category }, { dataSources }) => {
    return dataSources.searchApi.getCategory(category);
  },
};

const Types = {
  Search: {
    async author() {
      return customAuthor();
    },
    async items({ results }) {
      // get the category that appeared more on the results and filter by it
      const [categoryId, amountItems] = getMostDuplicatesByKey(results, 'category_id');
      const items = results.filter(item => {
        return item.category_id === categoryId;
      });
      // limit results to 4
      const itemsSliced = items.slice(0, 4);
      return mapResponse(itemsSliced, cleanSearchItemResponse);
    },
    async categories({ results }, args, { dataSources }, info) {
      // get the category that appeared more on the results and filter by it
      const [categoryId, amountItems] = getMostDuplicatesByKey(results, 'category_id');
      const category = await dataSources.categoriesApi.getCategory(categoryId);
      // to resolve the names of all categories, use path_from_root from category data
      const { path_from_root } = category || {};
      const categories = path_from_root.map(({ name }) => (name));
      return categories;
    },
  },
};

module.exports = {
  Query,
  Types
};
