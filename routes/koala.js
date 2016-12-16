
var pg = require( 'pg' );
var route = express.Route();
var connectionString = 'postgres://localhost:5432/koala_holla';

// get koalas
app.route( '/getKoalas', function( req, res ){
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
