const express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('../config/webpack/dev.config');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { createServer } = require('http');
const cors = require('cors');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const PORT = 4000;

const app = express();

app.use(cors());

// connect to mlab database
mongoose.connect('mongodb://viktar:pokemon17@ds155132.mlab.com:55132/pokemon-db')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

if (process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });
} else {
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
  const compiler = webpack(config);
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
  // Serve the files on port 5000.

  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, '/index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      return res.end();
    });
  });
}

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(app);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});

// app.listen(process.env.PORT || 4000, () => {
//   console.log('now listening for requests on port 4000');
// });
