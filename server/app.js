var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var pg = require( 'pg' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var port = process.env.PORT || 8080;
// static folder
app.use( express.static( 'public' ) );

//create connection string to our database (koala_holla)
var connectionString = 'postgres://localhost:5432/koala_holla';

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );

  //connect to db
  pg.connect( connectionString, function( err, client, done) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected to db');
      var query = client.query('SELECT * FROM koalas');
      var allKoalas = [];
      query.on( 'row' , function(row) {
        allKoalas.push(row);
      }); // end query
      query.on ('end', function(){
        done();
        console.log(allKoalas);

      }); // end end
    }  // end else
  }); // end db connect

  //send a response
  res.send(allKoalas);
});

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from addKoala route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});

// add koala
app.post( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from editKoala route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});
