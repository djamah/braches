module.exports = function(req, res){

  var api_key = 'key-f12bbfd36a3aa991e1fb33419d68f7fc';
        var domain = 'profrights.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
        var data = {
          from: 'profrights <postmaster@profrights.org>',
          to: "estadniy@gmail.com",
          subject: "Профрайтс: Повідомлення від користувача "+req.body.name,
          html: "<p>"+req.body.message+"<p><p>Мейл: "+req.body.email+"</p>"
        };

        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        
        res.end('OOOOOOOOOK');
};
