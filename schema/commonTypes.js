module.exports = `
  scalar JSON
  scalar Date
  scalar Time
  scalar DateTime

  type Author {
    name: String
    lastname: String
  }

  type AuditItem {
    last_updated: DateTime
    date_created: DateTime
  }
`;
