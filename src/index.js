import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './schema';
import {port,host,api} from './config.json';


const app = express();

app.use(api, graphqlHTTP({
  schema: schema,
  graphiql: true
}));

let server = app.listen(port, () => {
	console.log('App is running. Navigate to http://'+host+':'+port +api);
});