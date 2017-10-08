import express from 'express';
import expressGraphQL from 'express-graphql';
import {buildSchema} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import {port, host, api, database} from './config.json';
import mongoose, {connection} from 'mongoose';
import cors from 'cors';
import {schema} from "./schema";
import Context from './context'

mongoose.Promise = require('bluebird');

const app = express();

app.get('/schema', (req, res) => {
    res.send(printSchema(schema));
});


app.use(api, cors(),
    expressGraphQL(req => ({
        schema,
        context: new Context(req),
        graphiql: true,
    })),
);


let server = app.listen(port, () => {
    mongoose.connect(database, {useMongoClient: true}, (err) => {
        if (err) throw err;
    });
    console.log('App is running. Navigate to http://' + host + ':' + port + api);
});
