const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
/* 'path' is a NATIVE module that is included in Node.js(so we didn't need 
to install any library for it) */
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

/* Here below we're making sure to convert ANY request(the 'body' part of each request specifically)
that comes in(to THIS Server) to JSON */
app.use(bodyParser.json());
/* With this 'bodyParser.urlencoded({ extended: true })' code below we're making sure that ANY Url
string that comes is or that we're passing OUT doesn't contain INVALID characters(like symbols and so on).
So we're pretty much making validating the url string */
app.use(bodyParser.urlencoded({ extended: true }));

/* The 'cors' library(that stands for "Cross origin requests") will enable us to make REQUEST from or client
that uses the port 3000 to or Server that users port 5000. By DEFAULT we're not allowed to make request from
a specific ORIGIN(let's say our client with port 3000) to ANOTHER Origin(let's say our server with port 5000),
because by default they get BLOCKED. So by using the 'cors' libary we enable this feature so that we're now
able to make request between DIFFERENT Origins/Ports */
app.use(cors());

/* Here below we're saying to 'express' that IF we're in 'production' we want to SERVE 
all the static files(html,css and js files) from the 'client/build' directory */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  /* But for 'express' to be able to SERVE these files we have to also specify for WHAT Routes
  we want to use them. So here below we're saying that when the user send a GET request to ANY 
  of our URLS(expept those that will be covered) the Server will respond by sending him the 
  'index.html' file that contains ALL our Client code(Webpack will do that for us when we build
  our app by BUNDLING all the files). So this is how we're going to SERVE our Application for 
  our final PRODUCTION build(so when we're in production on heroku) */
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

/* After ALL the code above is been run we're going to LISTEN on the 'process.env.PORT'(if 
we're in production, and this PORT gets automatically set by Heroku) OR on port 5000 if we're 
in development */
app.listen(port, error => {
  if (error) throw error;
  console.log(`Server running on port ${port}`);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
