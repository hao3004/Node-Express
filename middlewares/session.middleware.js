const db = require('../db');
const shortid = require('shortid');

module.exports = {
   hasCookie: (req, res, next) => {
        if (!req.signedCookies.sessionID) {
            var sessionID = shortid.generate();
            res.cookie('sessionID', sessionID, {
                signed: true
            });
            db.get('sessions').push({
                id: sessionID
            }).write();
        }
        next();
   } 
}