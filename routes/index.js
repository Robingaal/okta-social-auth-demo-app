var express = require('express');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  var localStorage = new LocalStorage('./database');
}
var router = express.Router();

var info = '';

var request = require('request');
var oktaBaseUrl = process.env.OKTA_URL || localStorage.getItem('oktaOrgUrl');
var oktaToken = process.env.OKTA_TOKEN || localStorage.getItem('oktaToken');
var redirectUri = process.env.OKTA_REDIRECT || localStorage.getItem('redirectUri');

/* GET home page. */
// FIXME: Run this on every request
router.get('/', function(req, res, next) {
    var viewLocals = {
	'info': info,
	'identityProviders': [],
	'redirectUri': redirectUri,
  	'popup': localStorage.getItem('popup'),
	'hello': "Hello World"
    }
    
    if (!redirectUri) {
	redirectUri = 'http://localhost:3000/social_auth_processing';
	localStorage.setItem('redirectUri', redirectUri);
    }
    var request_options = {
	url: oktaBaseUrl + '/api/v1/idps',
	headers: {
	    'Authorization': 'SSWS ' + oktaToken
	}
    };

    if (oktaBaseUrl && oktaToken) {
	request(request_options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
		viewLocals['identityProviders'] = JSON.parse(body);
		res.render('index', viewLocals);
	    }
	})
    } else {
	res.render('index', viewLocals);
    }
});


router.get('/social_auth_processing', function(req, res, next) {
    var error = req.query['error_description']
    res.render('social_auth_processing', {
	'error': error,
	'oktaBaseUrl': oktaBaseUrl
    });
});

module.exports = router;
