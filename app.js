const
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    ejs = require('ejs');

const port = 8000;

const route = require('./server/routes/routes.js');


const uri = 'mongodb://localhost:27017/likeator-storage';
mongoose.connect(uri);
mongoose.Promise = global.Promise;

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', route);

app.listen(port, () => {
    console.log('We are live on ' + port);
});