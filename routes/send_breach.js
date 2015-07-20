
var Breach = require('../models/breach');
var fs = require('fs');

module.exports = function (req, res) {
    console.log(req.body, 'req');
    console.log(req.files.file, 'req');

    var breach = new Breach(JSON.parse(req.body.form));
    if(req.files.file){
        var oldPath = req.files.file.path;
        var newPath = 'public/uploads/'+Date.now()+req.files.file.originalFilename;
        fs.readFile(oldPath , function(err, data) {
            fs.writeFile(newPath, data, function(err) {
                fs.unlink(oldPath, function(){
                    if(err) throw err;
                    res.send("File uploaded to: " + newPath);
                });
            });
        });
        breach.file = newPath.substr(6);
    }
    breach.date = new Date();
    breach.publish = false;
    breach.fixed = false;
    breach.save(function (err, item) {
        if (err) {
            console.log(err, 'errrr');
            res.json(500, {error: 'error'});
        }
        res.json({ status: 0 });
    });
};