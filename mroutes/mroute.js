var express = require('express');
var route = express.Router();
var companies = require('../schema/schema');
//var logger = require('../logger');
var emitter = require('../events/eventhub');

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
        if(data.length>=50)
            emitter.emit("more",data.length);               //emitting event more
        response.json(data);
    })
});



//update the employee count

route.put("/empcount/:name",function(request,response){
    let cname = request.params.name;

    companies.update({name:cname},{$set:request.body},function(err,data){                //emitting event update
        if(err)
         response.send({result:"Not Updated"});
         emitter.emit("update",cname);
    response.send({result:"Successfully updated"});
    })
});