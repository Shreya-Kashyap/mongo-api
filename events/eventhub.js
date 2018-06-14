var events = require('events');
var logger = require('../logger');

var emitter = new events.EventEmitter();

emitter.on("update" , function(data){                       //for subscribing events
logger.info("Number of Employees in " + data+ "is updated");

});

emitter.on("more",function(data){
    logger.info("For pattern search" + "the number of records exceeded 50 and it is "+data);
});

module.exports = emitter;