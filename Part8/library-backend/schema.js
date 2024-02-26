const typeDefs = `
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Book {
        title: String!,
        published: Int!,
        author: Author!,
        id: ID!,
        genres: [String!]!
    }

    type Author {
        name: String!,
        id: ID!,
        born: Int,
        books: [Book!]!
    }

    type Query {
      bookCount: Int!,
      authorCount: Int!,
      allBooks(author: String, genre: String): [Book!]!,
      allAuthors: [Author!]!
      me: User
      allGenres: [String!]!
    }

    type Mutation {
      addBook(
          title: String!,
          published: Int!,
          author: String!,
          genres: [String!]!
      ): Book
      editAuthor(
          author: String!,
          born: Int!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`;

module.exports = typeDefs;
