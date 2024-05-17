var express = require("express");
var QRCode = require("qrcode");
var path = require("path");
var User = require("./userModel");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// connect with mongodb database
mongoose.connect("mongodb://127.0.0.1:27017/quickcaredb", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Database connected") )
.catch((err)=>console.log("Error: ", err));

// Server handling
var app = express();
var port = 8000;

// file path handling
var initialPath = path.join(__dirname,"");
app.use(bodyParser.json());
app.use(express.static(initialPath));

// main page server get response
app.get("/",(req,res)=>{
    res.sendFile(path.join(initialPath, "index.html"));
})

// qrcode generation page get response
app.get("/index1",(req,res)=>{
    res.sendFile(path.join(initialPath, "index1.html"));
})

// app.get("/users", async (req,res)=>{
//     const allUsers = await User.find({});
//     const html = `<html><body><ul>${allUsers.map((user)=> `<li>${user.Name}</li>`).join("")}</ul></body></html>`;
//     res.send(html);
// })

// qrcode generation post response
app.post("/register-user", async (req, res)=>{
    var exists = 0;
    const {name, email, address, dob, mobile, gender, weight, bloodGroup, aadhar} = req.body;
    if(!name.length || !email.length || !address.length || !dob.length || !mobile.length || !gender.length || !weight.length || !bloodGroup.length || !aadhar.length){
        // user hasn't filled the data
        res.json({msg:"fill in the fields"});
    }else{
        // save the data in database
        await User.create({
            Name: name,
            Email: email,
            Address: address,
            Date: dob,
            Mobile_No: mobile,
            Gender: gender,
            Weight: weight,
            BloodGroup: bloodGroup,
            Aadhar: aadhar,
            Prescription: " ",
            Medicines: " ",
            DoctorAssigned: " ",
        }).catch(err=>{
            // if error occured
            if(err){
                res.status(201).json({msg:"Already exist"});
                exists += 1;
            }
        });
        // data for qrcode generation
        var data = {
            name: name,
            email: email,
            address: address,
            date: dob,
            mobile: mobile,
            gender: gender,
            weight: weight,
            bloodGroup: bloodGroup,
            aadhar: aadhar
        }

        // conversion of data to string
        var stringdata = JSON.stringify(data);

        // saving the qrcode to the file.png file
        QRCode.toFile(path.join(__dirname, '/output_file/file.png'), stringdata, {
            errorCorrectionLevel: 'H'
          }, function(err) {
            if (err) throw err;
            console.log('QR code saved!');
          });
          if(exists==0){
              res.status(201).json({msg: "Success"});
              exists-=1;
          }
        }
})

// post method to get the user info
app.post("/get-user",async (req, res)=>{
    var {aadhar, mobile} = req.body;
    var result = await User.findOne({Aadhar:aadhar, Mobile_No:mobile}, "Prescription Medicines DoctorAssigned").catch(err=>console.error(err));
    console.log(result);
    res.status(200).json({result:result});
})

// post method to update the user info
app.post("/update-user",async (req,res)=>{
  var {mobile, key, value} = req.body;
  if(key=="pres"){
    // update prescription 
    await User.updateOne({Mobile_No:mobile}, {Prescription:value}).then(res.status(201).json({msg:"Success"}))
    .catch(err=>{
        console.log(err);
    })
  }else if(key=="med"){
    // update the medicines list
    await User.updateOne({Mobile_No:mobile}, {Medicines:value}).then(res.status(201).json({msg:"Success"}))
    .catch(err=>{
        console.log(err);
    })
  }else if(key=="doctor"){
    // update the doctor name
    await User.updateOne({Mobile_No:mobile}, {DoctorAssigned:value}).then(res.status(201).json({msg:"Success"}))
    .catch(err=>{
        console.log(err);
    })
  }
})

// running the server
app.listen(port,(req, res)=>{
    console.log("Connected to port 8000.....")
})