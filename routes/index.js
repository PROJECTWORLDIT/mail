var express = require('express');
var nodemailer = require("nodemailer");
var router = express.Router();
var fs = require('fs');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
      user: "insindia123@gmail.com",
      pass: "ekuuwueihsxfsrtw"
  }
});
// router.get('/testing', function(req,res, next){
//     fs.readFile('/home/abhishekp/Desktop/mail/routes/test.html', function(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         return res.end();
       
//     });
// });        

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send',function(req,res){
   


  var mailOptions={
      to : req.query.to,
      subject : req.query.subject,
      html:"<h1 align='center'>Welcome to nodejs</h1><div style='text-align:center'>Embedded image: <img src='cid:123'  width='200px;' height='200px;' />",
      attachments: [{
        filename: '1.jpg',
        path: 'http://localhost:3000/images/',
        cid: 'cid:123' //same cid value as in the html img src
    }]
     
  }
  
  console.log('here is my data='+JSON.stringify(mailOptions));
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
       }
});
});

module.exports = router;




/* curl 'https://api.authy.com/protected/json/phones/verification/start' \
-d api_key=z3el9plVLy477PDEfYXhI1FYVdGWJLCL \
-d via=sms \
-d phone_number= \
-d country_code=91 */




/* curl -GET 'https://api.authy.com/protected/json/phones/verification/check' \
-d api_key=z3el9plVLy477PDEfYXhI1FYVdGWJLCL \
-d verification_code= \
-d phone_number=9987098069 \
-d country_code=91 */