
const typeDefs = `
  type Search {
    site_id: String
    query: String
    paging: Paging
    results: [Item]
    categories: [String]
    items: [Item]
    author: Author
  }

  type Paging {
    total: Int
    offset: Int
    limit: Int
    primary_results: Int
  }
`;

const query = `
  search(query: String!): Search
  searchByCategory(category: String!): Search
`;

const mutations = ``;

module.exports = {
  typeDefs,
  query,
  mutations,
};
