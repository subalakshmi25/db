var express = require('express');
var app = express();
var passport = require('passport');
var session  = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();

//For bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session()); 

//For Handlebars
var exphbs = require('express-handlebars');
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Models
var models = require("./app/models"); 

var authRoute = require('./app/routes/auth.js')(app, passport);

require('./app/config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine') 
  }).catch(function(err) {
      console.log(err, "Something went wrong with the Database Update!")
  });
app.listen(6700, function(err) {
    if (!err)
        console.log("Site is live on http://localhost:2400");
    else console.log(err)
});