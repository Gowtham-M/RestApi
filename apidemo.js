
//importing express module and object-to-csv module
const express = require('express');
const ObjectsToCsv = require('objects-to-csv')
const csv = require('csv-parse');
const fs = require('fs');
const app = express();
const mongoose = require("mongoose");
const paymentTypes = require("./model/SwiftRefKeys")
const partnerBanks = require("./model/PartnerBanks")
const dbUrl = "mongodb+srv://gowtham:sirasia@cluster0.pudoe.mongodb.net/BankPayments?retryWrites=true&w=majority";
app.use(express.json());

 const connectionParams  = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
//Connecting to mongodb atlas database    
mongoose
.connect(dbUrl, connectionParams)
.then( () => {
    console.info('Connected to the db');
}).catch((e)=>{
    console.log('Error', e);
});

//add partner api
app.post("/addpartner",(req, res)=>{
    var pd = new partnerBanks();
    pd.bic = req.body.bic;
    pd.institute_name = req.body.institute_name;
    pd.host_bank = "ICICI"
    pd.br_info = req.body.br_info;
    pd.address={
        add_line : req.body.address.add_line,
        town_name : req.body.address.town_name,
        country_subdiv : req.body.address.country_subdiv,
        post_code : req.body.address.post_code,
        cntry_name : req.body.address.cntry_name,
        cntry_code : req.body.address.cntry_code,
    };
    pd.ofc_type = req.body.ofc_type;
    pd.currency = req.body.currency;
    pd.paymentRails = req.body.paymentTypes;
    console.log(req.body)
    
     pd.save((err,data)=>{
        if (err){
            console.error(err)
        }else{
            res.status(200).send({"msg":"Inserted to partner DB"})
        }
    })
})

//insert 
app.post("/insert",(req, res)=>{
    var bankDetails = new paymentTypes();
    bankDetails.bic = req.body.bic;
    bankDetails.institute_name = req.body.institution_name;
    bankDetails.br_info = req.body.branch_information;
    bankDetails.address = {
        add_line : req.body.address_line,
        town_name : req.body.town_name,
        country_subdiv : req.body.country_subdivision,
        post_code : req.body.post_code,
        cntry_name : req.body.country_name,
        cntry_code : req.body.country_code,
    };
    bankDetails.ofc_type = req.body.office_type;

    bankDetails.save((err,data)=>{
        if (err){
            console.error(err)
        }else{
            res.status(200).send({"msg":"Inserted to DB"})
        }
    })
});

//code to read values from a database
app.post("/search",(req, res)=>{
    
    console.log("Request:",req.body.bid)
    paymentTypes.findOne({bic:req.body.bid},(err, data)=>{
        console.log(data)
        if (err){
            return res.status(500).send(err)
        }else{
            // console.log("REQUEST",[req.body])
            return res.status(200).send(data)
        }
    })
})
//code to update values from database
app.get("/update",(req, res)=>{
    paymentTypes.findByIdAndUpdate("626c0c9347da6e11f122462e",{ofc_type:"HO"}, (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.status(200).send(data)
        }
    })
})
//code to delete values from database
app.get("/delete",(req, res)=>{
    paymentTypes.findByIdAndDelete({_id:""},(err,data)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.status(200).send(data)
        } 
    })
    partnerBanks.remove((err,data)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.status(200).send(data)
        }
    })
})
//get api for future reference 
app.get('/getdata', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // writingToCsv([req.body])
    // res.json(list)
});

//reading login.csv file to load into csv_list[] variable for future reference
// var csv_list = [];
// try{
//     fs.createReadStream('login.csv')
//     .pipe(csv.parse())
//     .on('data', (row) => {
//         csv_list.push(row)
//     })
//     .on('end', () => {
//         console.log('CSV file successfully processed');
//     });
// } catch (err){
//     console.log(err);
// }

  //login post api to authenticate user credentials during login
app.post('/login', (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.body)
    writingToCsv([req.body])
    var1 = req.body
    if (csv_list[1][0] == var1.name && csv_list[1][1] == var1.pass){
        res.send(true)
    }
    else{
        res.send(false)
    } 
})

//reading bank to print into console
// try{
// fs.createReadStream('bank-register.csv')
//   .pipe(csv.parse())
//   .on('data', (row) => {
//     console.log(row)
//   })
//   .on('end', () => {
//     console.log('Bank CSV file successfully processed');
//   });
// } catch(err){
//     console.log(err)
// }
//post api to register bank details into csv file
app.post('/register-banks', (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // writingToBankCsv([req.body]) 
    // console.log(req.body)
    res.send(true)
})

app.post('/payment-types', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // writingToPaymentsCsv([req.body])
    // console.log(req.body)
    res.send(true)
})


app.listen(3000, (req, res) => {console.log('Listening on port 3000....')});

//function to write into login.csv file

// async function writingToCsv (data){
//     console.log(data)
//     const csv = new ObjectsToCsv(data);
//     console.log('csv', csv);
//     await csv.toDisk('./login.csv', { append: true })
// } 

//function to write into bank-register.csv file

// async function writingToBankCsv (data){
//     console.log(data);
//     const csv = new ObjectsToCsv(data);
//     console.log('csv', csv);
//     await csv.toDisk('./bank-register.csv', { append: true })
// }

// async function writingToPaymentsCsv (data){
//     console.log(data);
//     const csv = new ObjectsToCsv(data);
//     console.log('csv', csv);
//     await csv.toDisk('./payment-types.csv', { append: true })
// }


// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.end();
// });