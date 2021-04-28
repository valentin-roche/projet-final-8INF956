var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getPerson(p_name : String!) : Person
  }

  type Mutation {
    addPerson(person : PersonInput!) : Person
  }

  type Person {
    name : String,
    age: Int,
    height: Float
  }

  input PersonInput {
    name : String,
    age: Int,
    height: Float
  }
`);
 
class Person {
  constructor(name, age, height) {
    this.name = name
    this.age = age
    this.height = height
  }
}

var persons = {
  "Valentin" : new Person("Valentin", 23, 1.83),
  "Florent" : new Person("Florent", 22, 1.92)
}

// The root provides a resolver function for each API endpoint
var root = {
  getPerson: ({p_name}) => {
    return persons[p_name]
  },
  addPerson: ({person}) => {
    persons[person.name] = person
    return persons[person.name]
  }
};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');