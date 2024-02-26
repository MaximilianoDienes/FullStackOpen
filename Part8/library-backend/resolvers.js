const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (parent, { author, genre }) => {
      if (author && !genre) {
        return await Book.find({ author });
      } else if (!author && genre) {
        return await Book.find({ genres: { $in: [genre] } });
      } else if (author && genre) {
        return await Book.find({ author, genres: { $in: [genre] } });
      } else return Book.find({});
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate("books");
      console.log("HOLAAAAAAAAA", authors);
      return authors;
    },
    me: async (root, args, context) => {
      const user = await User.findById(context.decodedToken.id);
      if (user) {
        return user;
      } else return null;
    },
    allGenres: async () => {
      const books = await Book.find({});
      const allGenres = books.flatMap((book) => book.genres);
      const uniqueGenres = [...new Set(allGenres)];
      return uniqueGenres;
    }
  },
  Book: {
    author: async (parent) => {
      const author = await Author.findById(parent.author);
      return { ...author.toObject(), id: author.id.toString() };
    }
  },
  Mutation: {
    addBook: async (root, args, { decodedToken }) => {
      if (!decodedToken) {
        throw new GraphQLError("user isn't logged in", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (args.title.length < 5) {
        throw new GraphQLError("title is too short", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }

      if (!author) {
        if (args.author.length < 4) {
          throw new GraphQLError("author name is too short", {
            extensions: { code: "BAD_USER_INPUT" }
          });
        }
        author = new Author({ name: args.author, books: [] });
        await author.save();
      }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      });

      const result = await newBook.save();

      author.books.push(newBook._id);
      await author.save();

      pubsub.publish("BOOK_ADDED", { bookAdded: result });

      return result;
    },
    editAuthor: async (root, args, { decodedToken }) => {
      if (!decodedToken) {
        throw new GraphQLError("user isn't logged in", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      const author = await Author.findOne({ name: args.author });
      if (author) {
        if (!args.born) {
          throw new GraphQLError("no born date specified", {
            extensions: { code: "BAD_USER_INPUT" }
          });
        }
        author.born = args.born;
        return await author.save();
      } else {
        throw new GraphQLError("no author found", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }
    },
    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }

      const token = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(token, process.env.JWT_SECRET) };
    },
    createUser: async (root, args, context) => {
      if (args.username.length < 3 || args.favoriteGenre.length < 3) {
        throw new GraphQLError(
          "name and genre cannot be shorter than 3 characters",
          {
            extensions: { code: "BAD_USER_INPUT" }
          }
        );
      }

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

      await user.save();
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
    }
  }
};

module.exports = resolvers;
