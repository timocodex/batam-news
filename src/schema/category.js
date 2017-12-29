  export default `
    type Category{
      id:ID!
      name:String!
      news:[News]
    }
    type Query {
      categories :[Category]
    }
    type Mutation {
      addCategory(name:String!): Category
    }
    `;