var chai = require('chai');
var mocha = require('mocha');
var mroute = require('../mroutes/mroute');
var logger = require('../logger');
var companies = require('../schema/schema');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capgemini');

describe("export checks",function(){
    it('mroute must exist',function(){
        chai.expect(mroute).not.to.be.undefined;
    });

    it("logger must be exported",function(){
        chai.expect(logger).not.to.be.undefined;
    });
});

describe("mongo asynchronous chaeck",function(){
    it('pattern must be returning records',function(done){
        let temp = "z";
        companies.find({name:{$regex:temp,$options:'i'}},{_id:0,name:1},
        function(err,data){
            chai.expect(err).to.equal(null);
            done();
    })
    });


    it('must return exactly one record',function(done){
        let temp = "z";
        companies.find({name:"Wetpaint"},{_id:0,name:1},
        function(err,data){
            chai.expect(data.length).to.equal(1);
            done();
    })
    });
});