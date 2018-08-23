const graphql = require ('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

// diferent object types from graphQL
const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
  } = graphql;

// user created object type for book
const BookType = new GraphQLObjectType ({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    domain: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve (parent, args) {
        // code to query the db / other sources
        return Author.findById(parent.authorId);
      }
    }
  })
});

// user created object type for author
const AuthorType = new GraphQLObjectType ({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        // code to query the db / other sources
        return Book.find({authorId: parent.id});
      }
    }
  })
});

// root query, this defines how we jump initially in the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID} },
      resolve (parent, args) {
        // code to query the db / other source
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID} },
      resolve (parent, args) {
        // code to query the db / other source
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList (BookType),
      resolve (parent, args) {
        // code to query the db / other source
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList (AuthorType),
      resolve (parent, args) {
        // code to query the db / other source
        return Author.find({});
      }
    }
  }
});

// mutations are used for C.U.R.D operations on the data
const Mutation = new GraphQLObjectType ({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve (parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        }); // object of author model
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        domain: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve (parent, args) {
        let book = new Book({
          name: args.name,
          domain: args.domain,
          authorId: args.authorId
        }); // object of book model
        return book.save();
      }
    }
  }
});

// query that the user is allowed to make
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
