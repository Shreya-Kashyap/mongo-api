var mongoose = require('mongoose');

var companies = mongoose.model('companies' , new mongoose.Schema(                       //model-collection name
    {
        name:String,
        number_of_employees:Number,
        founded_year:Number,
        overview:String,
        total_money_raised:String,
        offices:{city:String,address1:String,address:String,zip_code:String}
    }
),         
'companies');

module.exports = companies;