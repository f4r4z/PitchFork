var Alexa = require('alexa-sdk');
const handlers = {
    //2 things: take us to options to ask it
    'LaunchRequest': function () {
        this.emit(':tell', 'Lets scarf some burgers');
    }
};

const APP_ID = 'amzn1.ask.skill.ef314947-968e-4afc-8047-8d3908b59470';

exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
