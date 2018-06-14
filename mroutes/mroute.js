var express = require('express');
var route = express.Router();
var companies = require('../schema/schema');

route.get('/companies/:name',function(request,response){            //:name--specifies parameter
  let name = request.params.name;
  companies.find({name:name},function(err,data){
        if(err)
            response.json({});
        else
            response.json(data);
  });
});

module.exports = route;

//Emit json array of names of comapnies matching a pattern(passing regular expression as parameter)

route.get("/cnames/:pattern",function(request,response){
    companies.find({name:{$regex:request.params.pattern,$options:'i'}},{_id:0,name:1},
    function(err,data){
        if(err)
            response.json([]);
        response.json(data);
    })
});