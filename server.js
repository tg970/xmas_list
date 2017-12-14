// DEPENDENCIES
const express    = require('express');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const app        = express();
//const session    = require('express-session');
require('pretty-error').start();

// CONFIG
const PORT       = process.env.PORT || 3000;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/books_users_api'

// Connect to Mongo
mongoose.connect ( mongoURI , { useMongoClient: true});
const db = mongoose.connection;
db.on( 'error', ( err ) => console.log( err.message + ' is Mongod not running?' ));
db.on( 'connected', () => console.log( 'Mongo OK: ', mongoURI ));
db.on( 'disconnected', () => console.log( 'Mongo Disconnected' ));
mongoose.Promise = global.Promise;

// open the connection to mongo
db.on( 'open' , ()=>{});

// Controllers
// const wbinfoController = require( './controllers/wbinfoController' );
// const seedController = require( './controllers/seedController' );

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use( express.static( 'public' ));
app.use(morgan('dev'));
// app.use( '/wbinfo', wbinfoController );
// app.use( '/seed', seedController );

app.get('/', (req, res) => res.send('Welcome to Your Xmas List'));

app.listen(PORT, () => {
   console.log('Server OK: ' + PORT);
});
