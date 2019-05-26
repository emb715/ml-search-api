
const typeDefs = `
  type Category {
    id: String!
    name: String
    picture: String
    permalink: String
    total_items_in_this_category: Int
    path_from_root: [CategoryParent]
    settings: JSON
    meta_categ_id: Int
  }

  type CategoryParent {
    id: String!
    name: String
  }
`;

const query = `
  category(id: String!): Category
`;

const mutations = ``;

module.exports = {
  typeDefs,
  query,
  mutations,
};
