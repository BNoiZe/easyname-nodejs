var should = require('chai').should();
var config = require('./config.json');
var EasynameApi = require('../index');
var api = new EasynameApi(config.apiId, config.apiMail, config.apiKey, config.apiAuthSalt, config.apiSignSalt);

//console.log(api.listDomain());
//api.getDomain(197790);
//api.listDomain(1, 3); // limit, offset
//api.listContact(1, 1);
//api.listDns(359680, 1, 1);
//api.getUserBalance(30917);

// creating a domain
//api.createDomain('thetestdomain', 1, 2, 3, 4, ['ns1.nameserver.com', 'ns2.nameserver.com', 'ns3.nameserver.com']);

// list domains
api.listDomain();

api.listDns(359680);
