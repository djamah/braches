var Breach = require('../../models/breach');

module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }

     var email;
     var id;
     
     Breach.findOne({_id: req.param('id')}, function(err, item){
	    email = item.email;
	    id = item.id;
     });

    Breach.update({_id: req.body.id}, {$set:req.body}, function (err, numberAffected, data) {

        if (err) throw err;

        res.json({status: 'ok'});
        console.log('ok');
        console.log(data);
        
        var api_key = 'key-f12bbfd36a3aa991e1fb33419d68f7fc';
        var domain = 'profrights.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
        var url = req.get('host')+"/breach/"+id;
        var data = {
          from: 'profrights <postmaster@profrights.org>',
          to: email,
          subject: "Ваше повідомлення опубліковане на Profrights.org",
          html: 'Доброго дня.<br>Ваше повідомлення опубліковане на сайті <a href="http://profrights.org.">Profrights.org</a>. <br> Ви можете переглянути його за адресою: <a href="'+url+'">'+url+'</a>'
        };

        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });

    })
     
    
};
