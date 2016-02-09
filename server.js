
/*------
Dependencies
------------*/

var express = require('express');
var app = express();



/*------
Loading env.json
------------*/

require('./env')(__dirname + '/env.json', __dirname + '/www/env.js');



/*------
Middleware & Routes
------------*/

app.use('/', express.static(__dirname + '/www'));
app.use('/*', function(req, res) {
	return res.status(200).sendFile(__dirname + '/www/index.html');
});



/*------
Server
------------*/

app.listen(process.env.EXPRESS_PORT, function() {
	console.log('Accelerated/Angular running on port ' + process.env.EXPRESS_PORT);
});
