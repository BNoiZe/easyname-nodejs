/**
 * index.js
 */

// Private
var vsprintf = require('sprintf-js').vsprintf;
var crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');

const GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE';


// Public
module.exports = EasynameApi;

function EasynameApi(id, mail, apiKey, apiAuthSalt, apiSignSalt) {
    this.id = id;
    this.mail = mail;
    this.apiKey = apiKey;
    this.apiAuthSalt = apiAuthSalt;
    this.apiSignSalt = apiSignSalt;

    this.createApiAuthentication = function() {
        var authentication = vsprintf(this.apiAuthSalt, [this.id, this.mail]);
        authentication = crypto.createHash('md5').update(authentication).digest("hex");
        authentication = new Buffer(authentication).toString('base64');
        return authentication;
    };
}

EasynameApi.prototype.doRequest = function(method, resource, id = null, subResource = null, subId = null, data = null, perform = null, limit = null, offset = null, filter = null) {
    var path = '/' + resource;
    if (id) {
        path += '/' + id;
    }
    if (subResource) {
        path += '/' + subResource;
    }
    if (subId) {
        path += '/' + subId;
    }
    if (perform) {
        path += '/' + perform;
    }

    var parameters = [];
    if (method === GET) {
        if (limit !== null) {
            parameters['limit'] = limit;
        }

        if (offset !== null) {
            parameters['offset'] = offset;
        }

        if (filter !== null) {
            if (Array.isArray(filter)) {
                parameters['filter'] = filter.join();
            } else {
                parameters['filter'] = filter;
            }
        }

        if (Object.keys(parameters).length > 0) {
            path = path + "?" + querystring.stringify(parameters);
        }
    }

    var options = {
        hostname: 'api.easyname.com',
        port: 443,
        path: path,
        method: method,
        headers: {
            'X-User-ApiKey': this.apiKey,
            'X-User-Authentication': this.createApiAuthentication(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    console.log('options:', options);

    var req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
            console.log('\n\n');
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.end();
};

/**
 * DOMAIN
 */
EasynameApi.prototype.getDomain = function(id) {
    return this.doRequest(GET, 'domain', id);
};

EasynameApi.prototype.listDomain = function(limit = null, offset = null, filter = null) {
    console.log("listDomain");
    return this.doRequest(GET, 'domain', null, null, null, null, null, limit, offset, filter);
};

EasynameApi.prototype.createDomain = function(domain, registrantContact, adminContact, techContact, zoneContact, nameservers, trustee = false) {
    var tmpNameservers = [];
    for (var i = 0; i < 6; i++) {
        if (nameservers[i]) {
            tmpNameservers['nameserver' + (i + 1)] = nameservers[i];
        }
    }

    var data = {
        domain: domain,
        registrantContact: registrantContact,
        adminContact: techContact,
        techContact: techContact,
        zoneContact: zoneContact,
        trustee: (trustee ? 1 : 0),
        transferIn: 0
    };
    data.concat(tmpNameservers);

    return this.doRequest(POST, 'domain', null, null, null, data);
};

EasynameApi.prototype.transferDomain = function(domain, registrantContact, adminContact, techContact, zoneContact, nameservers, trustee = false, transferAuthcode = null) {
    var tmpNameservers = [];
    for (var i = 0; i < 6; i++) {
        if (nameservers[i]) {
            tmpNameservers['nameserver' + (i + 1)] = nameservers[i];
        }
    }

    var tmpTransferAuthcode = [];
    if (tmpTransferAuthcode) {
        //tmpTransferAuthcode[''];
    }
};

EasynameApi.prototype.deleteDomain = function(id) {
    return;
};

EasynameApi.prototype.restoreDomain = function(id) {
    return;
};

EasynameApi.prototype.expireDomain = function(id) {
    return;
};

EasynameApi.prototype.unexpireDomain = function(id) {
    return;
};

EasynameApi.prototype.changeOwnerOfDomain = function(id, registrantContact) {
    return;
};

EasynameApi.prototype.changeContactOfDomain = function(id, adminContact, techContact, zoneContact) {
    return;
};

EasynameApi.prototype.changeNameserverOfDomain = function(id, nameservers) {
    return;
};

/**
 * CONTACT
 */
EasynameApi.prototype.getContact = function(id) {
    return this.doRequest(GET, 'contact', id);
};

EasynameApi.prototype.listContact = function(limit = null, offset = null, filter = null) {
    return this.doRequest(GET, 'contact', null, null, null, null, null, limit, offset, filter);
};

EasynameApi.prototype.createContact = function(type, alias, name, address, zip, city, country, phone, email, additionalData) {
    return;
};

EasynameApi.prototype.updateContact = function(id, alias, address, zip, city, phone, email, additionalData) {
    return
};

EasynameApi.prototype.deleteContact = function(id) {
    return;
};

/**
 * DNS
 */
EasynameApi.prototype.getDns = function(domainId, id) {
    return this.doRequest(GET, 'domain', domainId, 'dns', id);
};

EasynameApi.prototype.listDns = function(domainId, limit, offset) {
    return this.doRequest(GET, 'domain', domainId, 'dns', null, null, null, limit, offset);
};

EasynameApi.prototype.createDns = function(domainId, id, name = '', type, content, priority = null, ttl = null) {
    return;
};

EasynameApi.prototype.updateDns = function(domainId, id, name = '', type, content, priority = null, ttl = null) {
    return;
};

EasynameApi.prototype.deleteDns = function(domainId, id) {
    return;
};

/**
 * DATABASE
 */
EasynameApi.prototype.getDatabase = function(id) {
    return this.doRequest(GET, 'database', id);
};

EasynameApi.prototype.listDatabase = function(limit, offset) {
    return this.doRequest(GET, 'database', null, null, null, null, null, limit, offset);
};

EasynameApi.prototype.createDatabase = function(password, type = null, notice = null) {
    return;
};

EasynameApi.prototype.updateDatabase = function(password, type = null, notice = null) {
    return;
};

/**
 * FTP
 */
EasynameApi.prototype.getFtpAccount = function(id) {
    return this.doRequest(GET, 'ftp-account', id);
};

EasynameApi.prototype.listFtpAccount = function(limit, offset) {
    return this.doRequest(GET, 'ftp-account', null, null, null, null, null, limit, offset);
};

EasynameApi.prototype.createFtpAccount = function(password, path, notice = null) {
    return;
};

EasynameApi.prototype.updateFtpAccount = function(password, path, notice = null) {
    return;
};

/**
 * MAIL
 */
EasynameApi.prototype.getMailBox = function(id) {
    return this.doRequest(GET, 'email-box', id);
};

EasynameApi.prototype.listMailBox = function(limit, offset) {
    return this.doRequest(GET, 'email-box', null, null, null, null, null, limit, offset);
};

EasynameApi.prototype.createMailBox = function(size, password, note = '', antispam = null, antivirus = null, deleteSpam = null) {
    return;
};

EasynameApi.prototype.updateMailBox = function(size, password, note = null, antispam = null, antivirus = null, deleteSpam = null) {
    return;
};

/**
 * USER
 */
EasynameApi.prototype.getUserBalance = function(id) {
    return this.doRequest(GET, 'user', id, 'balance');
}
