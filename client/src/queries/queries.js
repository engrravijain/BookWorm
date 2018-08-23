import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation AddBook($name: String!, $domain: String!, $authorId: ID!) {
    addBook (name: $name, domain: $domain, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query ($id: ID) {
      book(id: $id) {
        id
        name
        domain
        author {
          id
          name
          age
          books {
            id
            name
          }
        }
      }
    }
`;

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};
