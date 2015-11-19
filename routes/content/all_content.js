module.exports = function(req, res){
	console.log("ALL CONTENT")
    if(req.user)
        var adminStatus = req.user.level === 1;
    res.render('content/all_content', {
            title: 'Захисти свої права',
            admin: adminStatus,
            currentPage:{content:true},
        });
};

