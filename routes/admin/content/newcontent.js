var Content = require('../../../models/content');

module.exports = function (req, res) {
    var content = new Content(req.body);
    content.date = new Date();
//    breach.publish = false;
    content.save(function (err, item) {
        if (err) {
            console.log(err, 'errrr');
            res.json(500, {error: 'error'});
        }
        res.json({ status: 0 });
    });
};