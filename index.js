var express = require('express');
var app = express();
var port = 9080
var userRoute = require('./routers/user.route');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//response:  Trả về cái gì đấy
//request: Yêu cầu cái gì đấy
app.set('view engine', 'pug')
app.set('views', './views')
app.get('/',function(req , res)
{
	res.render('index');
});

app.use('/users',userRoute);
app.listen(port, function() {
    console.log("Server dang chay port: " + port);
});