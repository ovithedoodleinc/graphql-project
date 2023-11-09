const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const typeSchema = require("./schema/type-schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: typeSchema,
  })
);

app.listen(4000, () => {
  console.log("app is listening on 4000");
});
