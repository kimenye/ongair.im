var express = require('express');
var app = express();
var request = require('request');


var pubnub = require("pubnub").init({
    publish_key   : "pub-c-d2bcacda-ad1e-4c33-aa0f-77e592c387da",
    subscribe_key : "sub-c-ebfa3f62-71f4-11e2-93fe-12313f022c90"
});


pubnub.subscribe({
    channel  : "ongair_im",
    callback : function(message) {
        console.log( " > ", message );
    }
});

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.get('/code', function(req, res){

	var currTime = new Date().getTime().toString();
    var token = req.session.token;


	if (req.session.token == null)
	{
		token =  currTime.substring(currTime.length-5);
		req.session.token = token;
	}
	
  	res.json({code: token});
});

app.post('/api', function(req, res) {

	console.log("Request : ", req.body);
	res.json({ success: true });

	pubnub.publish({
		channel : "ongair_im",
        message : { "data" : req.body }
	})
});

app.post('/send', function(req, res) {
	// console.log("Request : ", req.body);

	request.post('http://localhost:8081/send', {form:{phone_number: req.param('phone_number'), text: req.param('message') },  json: true}, 
		function (error, response, body) {
			// console.log("Response ", response);
			// console.log("Body ", body);
		}
	);

	res.json({success: true});
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});