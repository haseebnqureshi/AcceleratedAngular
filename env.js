
module.exports = function(envFilepath, angularEnvFilepath) {
	
	var fs = require('fs');

	var data = fs.readFileSync(envFilepath);
	if (!data) { 
		throw 'Could not read env.json at ' + envFilepath; 
	}

	//Load env.json as object
	try {
		var config = JSON.parse(data);
	}
	catch(err) { 
		throw err; 
	}

	//Absorb default environment variables into node process
	for (var key in config.ENV_DEFAULT) {
		process.env[key] = config.ENV_DEFAULT[key];
	}

	//We may have environment overrides for each mode
	try {
		var override = config.ENV_OVERRIDE;
		var overrides = config.ENV_OVERRIDES;
		for (var key in overrides[override]) {
			process.env[key] = overrides[override][key];
		}
	}
	catch(err) { 

		//But any error here is non-fatal
		console.error(err); 
	}

	//Rendering any ANGULAR_ prefixed variables into angularDir
	var lines = [];
	for (var key in process.env) {
		if (key.match(/angular\_/i)) {
			var value = process.env[key];
			var line = 'window.' + key + ' = "' + value + '";';
			lines.push(line);
		}
	}
	
	//Writing our lines into angularDir
	fs.writeFileSync(angularEnvFilepath, lines.join("\n"));

};