const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect('mongodb://viktar:pokemon17@ds155132.mlab.com:55132/pokemon-db')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.static(path.join(__dirname, '..','public')));
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
