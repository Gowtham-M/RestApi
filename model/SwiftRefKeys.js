const { json } = require("express/lib/response");
const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    bic:String,
    institute_name:String,
    br_info:String,
    address:{
        add_line:String,
        town_name:String,
        country_subdiv:String,
        post_code:Number,
        cntry_name:String,
        cntry_code:String,

    },
    ofc_type:String,
})
const paymentTypes = mongoose.model('Swift Ref Keys', paymentSchema)
// paymentTypes.renameCollection('Swift Ref Keys');
module.exports = paymentTypes
    