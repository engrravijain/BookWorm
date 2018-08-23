const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin requests
app.use(cors());

mongoose.connect('mongodb://admin:admin123@ds113452.mlab.com:13452/geek_books_gql');
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});

// middleware
app.use('/graphql', graphqlHTTP({
  schema, // due to ES6 else schema: schema
  graphiql: true
}));

app.listen(5050, () => {
  console.log('Now listening to port 5050');
});
