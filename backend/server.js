const config = require('config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = config.get('port') || 8000;

// import the routes
const routes = require('./routes');

// use the middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(
    express.urlencoded({
      extended: true
    })
  )  

// use the routes
app.use('/', routes);

// start the server
app.listen(port, () => console.log(`Edcred Sever is running on ${port}!`));
