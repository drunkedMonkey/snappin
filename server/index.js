const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.BBDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log("Connection error!!", err);
      return;
    }
    server();
  }
);

function server() {
  const serverApollo = new ApolloServer({ typeDefs, resolvers });

  serverApollo.listen().then(({ url }) => {
    console.log("Server ready in URL", url);
  });
}
