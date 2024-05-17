var express = require("express");
var nodemailer = require("nodemailer");
var path = require("path");
var bodyParser = require("body-parser");

var username = "jairo.frami6@ethereal.email";
var password = "5sErWP6dk431SdzwKV";

var app = express();
var initialPath = path.join(__dirname,"");
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get("/", (req,res)=>{
  res.send("Email server")
})


const sendMail = async (req,res)=>{
  var testAccount = await nodemailer.createTestAccount();

  var transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: username,
        pass: password
      }
    });
    
    var info = await transporter.sendMail({
      from: '" QuickCare " <quickcare@gmail.com>',
      to: "killingmachine9764@gmail.com",
      subject:" QrCode image ",
      text:"Hello, this is your QrCode. ",
      html: 'Embedded image: <img src="cid:unique@nodemailer.com"/>',
      attachments:[{
        filename:"file.png",
        path: "./output-file-path/file.png",
        cid: "unique@nodemailer.com"
      },{
        filename:"file.png",
        path:"./output-file-path/file.png"
      }]
  });
  console.log("Message sent: %s", info.messageId);

  res.json(info)
};

app.get("/mail", sendMail);

app.listen(5000,()=>{
  console.log("Listening....");
});



// var QRCode = require("qrcode");
// var path = require("path");

// let data = {
//     name:"Employee Name",
//     age:27,
//     department:"Police",
//     id:"aisuoiqu3234738jdhf100223"
// }
// // Converting into String data
// let stringdata = JSON.stringify(data)

// QRCode.toFile(path.join(__dirname, '/output-file-path/file.png'), stringdata, {
//     errorCorrectionLevel: 'H'
//   }, function(err) {
//     if (err) throw err;
//     console.log('QR code saved!');
//   });

// // Print the QR code to terminal
// // QRCode.toString(stringdata,{type:'terminal'}, function (err, url) {
// //     if(err) return console.log("error occurred")
// //     console.log(url)
// //   })

// // Get the base64 url
// // QRCode.toDataURL(stringdata, function (err, url) {
// //     if(err) return console.log("error occurred")
// //     console.log(url)
// // })



// // var mongoose = require("mongoose");

// // mongoose.connect("mongodb://127.0.0.1:27017/quickcaredb");

// // console.log("done");