var email = require('nodemailer');

var transporter = email.createTransport({
    service: 'gmail',
    auth: {
        user: 'christine@gmail.com',
        pass: 'password'
    }
});

var options = {
    from: 'christine@gmail.com',
    to: 'amy@gmail.com',
    subject: 'Hello!',
    text: 'This is the email content'
};

transporter.sendMail(options,function(error,info){

});