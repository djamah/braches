var Report = require('../../models/report');

module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }
    

Report.findById(req.param('id'), function(err, report) {
  if (err) throw err;

  if (report.accepted) {
	  report.accepted = false
  } else {
	  report.accepted = true
  }
 
  report.save(function(err) {
    if (err) throw err;

    console.log('Report successfully updated!');
  });

})
}
