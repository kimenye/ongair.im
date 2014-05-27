var express = require('express');
var app = express();
var request = require('request');


var pubnub = require("pubnub").init({
    publish_key   : process.env.PUBLISH_KEY, //"pub-c-d2bcacda-ad1e-4c33-aa0f-77e592c387da",
    subscribe_key : process.env.SUBSCRIBE_KEY //"sub-c-ebfa3f62-71f4-11e2-93fe-12313f022c90"
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

	console.log("Params", req.body); 
	var currTime = new Date().getTime().toString();
    // var token = req.session.token;
    var newToken = req.param('reset');

	// if (req.session.token == null)
	// {
	token =  currTime.substring(currTime.length-5);
		// req.session.token = token;
	// }
	
  	res.json({code: token});
});

app.post('/subscribe', function(req, res) {


	request.post("http://forms.brace.io/trevor@sprout.co.ke", { form: { email: req.param('email') }, headers: { 'referer': "http://ongair.im" }  }, function(err, rsp, body) {
	});
	


	res.json({ success: true });

});

app.post('/api', function(req, res) {

	console.log("Request : ", req.query);
	

	pubnub.publish({
		channel : "ongair_im",
        message : { "data" : req.body }
	});

	res.json({ success: true });
});

app.post('/send', function(req, res) {
	// console.log("Request : ", req.body);
	var url = process.env.API_URL + "/send"

	console.log("Sending request to ", url);

	request.post(url, {form:{phone_number: req.param('phone_number'), text: req.param('message') },  json: true}, 
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