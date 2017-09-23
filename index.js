var Alexa = require('alexa-sdk');
var handlers = {

    'ImHungryIntent': function () {
        this.emit(':tell', 'What the fuck do you want to eat?');
    }

};
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
