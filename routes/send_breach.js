
var Breach = require('../models/breach');

module.exports = function (req, res) {
    var breach = new Breach(req.body);
    breach.date = new Date();
    breach.publish = false;
    breach.save(function (err, item) {
        if (err) {
            console.log(err, 'errrr');
            res.json(500, {error: 'error'});
        }
        res.json({ status: 0 });
    });
};