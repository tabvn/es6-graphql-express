import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './schema';
import {port,host,api, database} from './config.json';
import mongoose, {connection} from 'mongoose';

const app = express();

app.use(api, graphqlHTTP({
  schema: schema,
  graphiql: true
}));

let server = app.listen(port, () => {
	mongoose.connect(database, {useMongoClient: true});
	console.log('App is running. Navigate to http://'+host+':'+port +api);
});