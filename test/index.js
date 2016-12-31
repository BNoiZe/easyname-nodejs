var should = require('chai').should();
var EasynameApi = require('../index');
var api = new EasynameApi('30917', 'roman@schmerold.at', 'iZWIYTakfU0X', 'taWQC5%s0kus0n%szjazv06D', 'A610NJEqvOYyCFadjt7X3v7i');

//api.listDomain();
//api.getDomain(197790);
//api.listDomain(1, 3); // limit, offset
//api.listContact(1, 1);
//api.listDns(359680, 1, 1);
api.getUserBalance(30917);
