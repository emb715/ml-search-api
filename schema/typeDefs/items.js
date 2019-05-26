
const typeDefs = `

  type ItemResponse {
    author: Author
    item: Item!
    categories: [String]
  }

  type Item {
    id: String!
    title: String
    price: ItemPrice
    picture: String
    condition: String
    free_shipping: Boolean
    sold_quantity: Int
    description: String


    site_id: String
    subtitle: String
    seller_id: Int
    category_id: String
    official_store_id: String
    base_price: Float
    original_price: Float
    currency_id: String
    initial_quantity: Int
    available_quantity: Int
    sale_terms: [String]
    buying_mode: String
    listing_type_id: String

    permalink: String
    thumbnail: String
    secure_thumbnail: String
    pictures: [Pictures]
    video_id: String
    descriptions: [JSON]
    accepts_mercadopago: Boolean

    shipping: JSON
    international_delivery_mode: String
    seller_address: JSON
    seller_contact: String
    location: JSON
    gelocation: JSON
    
    attributes: [JSON]
    tags: [String]
    warranty: String
    catalog_product_id: String
    domain_id: String
    parent_item_id: String
    automatic_relist: Boolean

    date_created: String
    last_updated: String
    health: Float
  }

  type ItemPrice {
    currency: String
    amount: Int
    decimals: Int
  }

  type Pictures {
    id: String!
    url: String
    secure_url: String
    size: String
    max_size: String
    quality: String
  }

  type Description {
    text: String
    plain_text: String
    date_created: String
    last_updated: String
    snapshot: JSON
  }
`;

const query = `
  item(id: String!): Item
  itemDescription(id: String!): Description
  getItem(id: String!): ItemResponse
  items(id: String!): Item
`;

const mutations = ``;

module.exports = {
  typeDefs,
  query,
  mutations,
};
