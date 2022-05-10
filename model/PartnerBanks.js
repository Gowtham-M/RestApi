const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema({
    bic:String,
    institute_name:String,
    host_bank:String,
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
    currency: Array,
    paymentRails:Array,
    // status:CharacterData,
    // modified:{
    // }
})
const partnerBanks = mongoose.model('Partner Banks', bankSchema)
// paymentTypes.renameCollection('Swift Ref Keys');
module.exports = partnerBanks
    