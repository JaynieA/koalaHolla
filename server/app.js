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
        //send a response
        res.send(allKoalas);
      }); // end end
    }  // end else
  }); // end db connect


});

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit' );
  console.log(req.body);
  pg.connect( connectionString, function(err, client, done){
    if (err) {
      console.log(err);
    } else {
      console.log('connected to db');
      client.query('INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ( $1, $2, $3, $4, $5)', [ req.body.name, req.body.sex, req.body.age, req.body.ready_for_transfer, req.body.notes]);
// COPIED FROM getKoalas
      var query = client.query('SELECT * FROM koalas');
      var allKoalas = [];
      query.on( 'row' , function(row) {
        allKoalas.push(row);
      }); // end query 'row'
      query.on ('end', function(){
        done();
        console.log(allKoalas);
        //send a response
        res.send(allKoalas);
//      done();
//      res.send( 'koala noise' );
      }); // end query 'end'
    } // end if/else
  }); // end connect
}); // end addKoala

// edit koala
app.post( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  console.log(req.body);
  pg.connect( connectionString, function(err, client, done){
    if (err) {
      console.log(err);
    } else {
      console.log('connected to db');
      client.query('UPDATE koalas SET name=$1, sex=$2, age=$3, ready_for_transfer=$4, notes=$5 WHERE id=$6', [req.body.name, req.body.sex, req.body.age, req.body.ready_for_transfer, req.body.notes, req.body.id]);
      // COPIED FROM getKoalas
      var query = client.query('SELECT * FROM koalas');
      var allKoalas = [];
      query.on( 'row' , function(row) {
        allKoalas.push(row);
      }); // end query 'row'
      query.on ('end', function(){
        done();
        console.log(allKoalas);
        //send a response
        res.send(allKoalas);
      }); // end query 'end'
    } // end if/else
  }); // end connect
}); // end editKoala
