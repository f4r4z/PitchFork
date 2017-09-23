var Alexa = require('alexa-sdk');

const languageStrings = {
    'en': {
        translation: {
            RESTAURANT_NAMES: 'Starbucks, Saffron Grill, Kushi Tsuru',
            SKILL_NAME: 'Space Facts',
            GET_LOCATION_MESSAGE: "As a robot I never go hungry but here are some restaurants that are open near you: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    //2 things: take us to options to ask it
    'getLocations': function () {
        const speechOutput = this.t('GET_LOCATION_MESSAGE') + this.t('RESTAURANT_NAMES');
        this.emit(':ask', speechOutput);
    },

    'getMerchantInfo': function () {
        this.emit(':tell', 'yo mamas house');
    }
};

//start time formatter
var timeGet = function() {
    var options = {
        hour: "2-digit",
        minute: "2-digit"
    }
    var rawTime = new Date();
    var timeString = rawTime.toLocaleTimeString("en-us",options);
    var spaceless = timeString.split(" ");
    var timeToGetLit = spaceless[0];
    return timeToGetLit
};

const APP_ID = 'amzn1.ask.skill.ef314947-968e-4afc-8047-8d3908b59470';

exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;

    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
