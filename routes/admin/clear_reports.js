var Report = require('../../models/report');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;

    if(adminStatus){
        Report.find({checked: false}, function(err, data){

            data.forEach(function(record) {
				
				if (record.accepted) { record.checked = true; record.save() }	
				else if ( record.wrong ) { record.checked = true; record.save() }
				else { record.remove() }						
			});

        })
    } 
    

    res.end('OOOOOOOOOK');
};
