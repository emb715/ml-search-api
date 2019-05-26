
const Query = {
  category: async (_source, { id }, { dataSources }) => {
    return dataSources.categoriesApi.getCategory(id);
  },
};

module.exports = {
  Query,
};
