var Alexa = require('alexa-sdk');

const languageStrings = {
    'en': {
        translation: {
            RESTAURANT_NAMES: 'Starbucks, Saffron Grill, Kushi Tsuru',
            SKILL_NAME: 'Space Facts',
            GET_LOCATION_MESSAGE: "As a robot I never get the munchies but here are some restaurants that are open near you: ",
            HELP_MESSAGE: 'You can say I am hungry, or, you can say I have the munchies... What can I help you with?',
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
        var speechOutput = whatsLit(test) + " is poppin right now!"
        this.emit(':ask', speechOutput);
    },

    'getMoreMerchants': function () {
        var speechOutput = whatElseIsLit(test) + " is also poppin right now!"
        this.emit(':tell', speechOutput);
    },

    'getMoreDetails': function () {
        this.emit(':tell', getDetails(getNextHourPopularity(test)[0].data));
    },

    'getDiscounts': function () {
        var speechOutput = "you can get" + freeDrinks(discounts) + "there right now";
        this.emit(':tell', speechOutput);
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },

};


//start time formatter
var timeGet = function() {
    var options = {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }
    var rawTime = new Date();
    var timeString = rawTime.toLocaleTimeString("en-us",options);
    var spaceless = timeString.split(" ");
    var day = spaceless[0];
    var time = spaceless[1];
    var timeToGetLit = {
        "day": day,
        "time": time
    }
    return timeToGetLit;
};
var compare = function (a,b) {
    if (a.popularity < b.popularity)
        return 1;
    if (a.popularity > b.popularity)
        return -1;
    return 0;
};

var getNextHourPopularity = function(arr) {
    var currentDay = timeGet().day;
    var currentHour = timeGet().time.split(":")[0];
    var popularityArray = arr.map(function(merch) {
        for(let i=0; i< merch.popularHours.length; i++) {
            if(merch.popularHours[i].dayOfWeek === currentDay) {
                if(merch.popularHours[i].startHour.split(":")[0] === currentHour) {
                    return {
                        "data": merch,
                        "popularity": merch.popularHours[i].popularity
                    }
                }
            }
        }
    });
    return popularityArray.sort(compare);
};

var whatsLit = function(arr) {
    var popArray =  getNextHourPopularity(arr);
    var topMerchData = popArray[0].data;
    return topMerchData.merchantName;
};

var freeDrinks = function(arr) {
    var discount = discounts[0].title;
    return discount;
};

var whatElseIsLit = function(arr) {
    var popArray =  getNextHourPopularity(arr);
    var topMerchData = popArray[1].data;
    return topMerchData.merchantName;
}

var getDetails = function(data) {
    // get median bin and show lower limit
    // expect to spend about
    var medianPriceBinNumber = data.medianPriceBin.merchantMedianPriceBinNumber;
    var lowerLimit = 0;
    for( var i = 0; i< data.medianPriceBin.priceBins.length; i++ ) {
        if(data.medianPriceBin.priceBin[i].binNumber == medianPriceBinNumber) {
            lowerLimit = data.medianPriceBin.priceBin[i].lowerLimit;
        }
    }
    return "Expect to spend on average a little over " + lowerLimit;

}

var discounts = [
    {
        "couponId": "1506191674217",
        "chainName": "Kushi Tsuru",
        "chainContact": {
            "phoneNumber": "8555645705",
            "webSiteUrl": "https://www.google.com/"
        },
        "title": "FREE DRINKS 4 Capital One Customers",
        "description": "100% ANYWHERE",
        "expirationDate": "2100-12-31",
        "disclosures": [
            {
                "title": "Details and Exclusions",
                "disclosureText": "Yes it's lit. 100% OFF"
            }
        ],
        "redemption": {
            "couponImageUrl": "http://i.forbesimg.com/media/2009/12/16/1216_cash-dollars_650x455.jpg",
            "couponCode": "Barcode - 850737209241916"
        },
        "callbacks": {
            "couponClickedUrl": "https://google.com",
            "couponPresentedUrl": "https://google.com"
        },
        "storeWide": true,
        "redeemableInStore": true
    }
]

var test = [
    {
        "merchantId": "1997544",
        "matchScore": 1,
        "merchantName": "STARBUCKS",
        "city": "SAN FRANCISCO",
        "stateCode": "CA",
        "postalCode": "94103",
        "mostRecentTransactionMonth": "2017-08",
        "medianPriceBin": {
            "categoryName": "Dining & Entertainment",
            "currencyCode": "USD",
            "priceBins": [
                {
                    "binNumber": 1,
                    "lowerLimit": 0,
                    "upperLimit": 9.99
                },
                {
                    "binNumber": 2,
                    "lowerLimit": 10,
                    "upperLimit": 14.99
                },
                {
                    "binNumber": 3,
                    "lowerLimit": 15,
                    "upperLimit": 19.99
                },
                {
                    "binNumber": 4,
                    "lowerLimit": 20,
                    "upperLimit": 99.99
                }
            ],
            "merchantMedianPriceBinNumber": 3
        },
        "openHours": [
            {
                "dayofWeek": "Monday",
                "start": "11:00",
                "end": "15:00"
            },
            {
                "dayofWeek": "Monday",
                "start": "19:00",
                "end": "23:00"
            },
            {
                "dayofWeek": "Tuesday",
                "start": "11:30",
                "end": "16:00"
            },
            {
                "dayofWeek": "Tuesday",
                "start": "18:00",
                "end": "22:00"
            }
        ],
        "popularHours": [
            {
                "dayofWeek": "Monday",
                "startHour": "10:00",
                "endHour": "11:00",
                "popularity": 0.12
            },
            {
                "dayofWeek": "Monday",
                "startHour": "11:00",
                "endHour": "12:00",
                "popularity": 0.24
            },
            {
                "dayofWeek": "Monday",
                "startHour": "12:00",
                "endHour": "13:00",
                "popularity": 0.38
            },
            {
                "dayofWeek": "Monday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 1
            },
            {
                "dayofweek": "Monday",
                "start": "14:00",
                "endHour": "15:00",
                "popularity": 0.6
            }
        ]
    },
    {
        "merchantId": "1010315410",
        "matchScore": 1,
        "merchantName": "SAFFRON GRILL",
        "city": "SAN FRANCISCO",
        "stateCode": "CA",
        "postalCode": "94117",
        "mostRecentTransactionMonth": "2017-08",
        "merchantPriceBin": {
            "categoryName": "Dining and Entertainment",
            "currencyCode": "USD",
            "priceBins": [
                {
                    "binNumber": 1,
                    "lowerLimit": 0,
                    "upperLimit": 9.99
                },
                {
                    "binNumber": 2,
                    "lowerLimit": 10,
                    "upperLimit": 19.99
                },
                {
                    "binNumber": 3,
                    "lowerLimit": 20,
                    "upperLimit": 29.99
                },
                {
                    "binNumber": 4,
                    "lowerLimit": 30,
                    "upperLimit": 999999.99
                }
            ],
            "merchantMedianPriceBinNumber": 4
        },
        "openHours": [
            {
                "dayOfWeek": "Monday",
                "openTime": "16:00",
                "closeTime": "22:30"
            },
            {
                "dayOfWeek": "Tuesday",
                "openTime": "11:30",
                "closeTime": "22:30"
            },
            {
                "dayOfWeek": "Wednesday",
                "openTime": "15:00",
                "closeTime": "22:30"
            },
            {
                "dayOfWeek": "Thursday",
                "openTime": "11:30",
                "closeTime": "23:00"
            },
            {
                "dayOfWeek": "Friday",
                "openTime": "12:00",
                "closeTime": "23:30"
            },
            {
                "dayOfWeek": "Saturday",
                "openTime": "14:30",
                "closeTime": "23:00"
            },
            {
                "dayOfWeek": "Sunday",
                "openTime": "12:00",
                "closeTime": "22:30"
            }
        ],
        "popularHours": [
            {
                "dayOfWeek": "Sunday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.4
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.6
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.8
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.8
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.4
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "23:00",
                "endHour": "00:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.6
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.6
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.6
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "23:00",
                "endHour": "00:00",
                "popularity": 1
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.8
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.4
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.4
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.4
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.8
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.2
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.2
            }
        ]
    },
    {
        "merchantId": "1007720935",
        "matchScore": 1,
        "merchantName": "KUSHI TSURU",
        "city": "SAN FRANCISCO",
        "stateCode": "CA",
        "postalCode": "94115",
        "mostRecentTransactionMonth": "2017-08",
        "merchantPriceBin": {
            "categoryName": "Dining and Entertainment",
            "currencyCode": "USD",
            "priceBins": [
                {
                    "binNumber": 1,
                    "lowerLimit": 0,
                    "upperLimit": 9.99
                },
                {
                    "binNumber": 2,
                    "lowerLimit": 10,
                    "upperLimit": 19.99
                },
                {
                    "binNumber": 3,
                    "lowerLimit": 20,
                    "upperLimit": 29.99
                },
                {
                    "binNumber": 4,
                    "lowerLimit": 30,
                    "upperLimit": 999999.99
                }
            ],
            "merchantMedianPriceBinNumber": 4
        },
        "openHours": [
            {
                "dayOfWeek": "Monday",
                "openTime": "11:00",
                "closeTime": "22:00"
            },
            {
                "dayOfWeek": "Tuesday",
                "openTime": "11:00",
                "closeTime": "22:30"
            },
            {
                "dayOfWeek": "Wednesday",
                "openTime": "11:00",
                "closeTime": "22:30"
            },
            {
                "dayOfWeek": "Thursday",
                "openTime": "11:00",
                "closeTime": "22:30"
            },
            {
                "dayOfWeek": "Friday",
                "openTime": "11:00",
                "closeTime": "22:00"
            },
            {
                "dayOfWeek": "Saturday",
                "openTime": "11:00",
                "closeTime": "22:30"
            },
            {
                "dayOfWeek": "Sunday",
                "openTime": "11:30",
                "closeTime": "22:00"
            }
        ],
        "popularHours": [
            {
                "dayOfWeek": "Sunday",
                "startHour": "12:00",
                "endHour": "13:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.375
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "16:00",
                "endHour": "17:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "17:00",
                "endHour": "18:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.75
            },
            {
                "dayOfWeek": "Sunday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "12:00",
                "endHour": "13:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.5
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "16:00",
                "endHour": "17:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "17:00",
                "endHour": "18:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Monday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "11:00",
                "endHour": "12:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "16:00",
                "endHour": "17:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "17:00",
                "endHour": "18:00",
                "popularity": 0.5
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Tuesday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "12:00",
                "endHour": "13:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "16:00",
                "endHour": "17:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Wednesday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.375
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "16:00",
                "endHour": "17:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "17:00",
                "endHour": "18:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.375
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Thursday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.75
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 0.375
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "16:00",
                "endHour": "17:00",
                "popularity": 0.5
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "17:00",
                "endHour": "18:00",
                "popularity": 0.375
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.75
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.375
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.5
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Friday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.125
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "12:00",
                "endHour": "13:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "13:00",
                "endHour": "14:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "14:00",
                "endHour": "15:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "15:00",
                "endHour": "16:00",
                "popularity": 1
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "16:00",
                "endHour": "17:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "17:00",
                "endHour": "18:00",
                "popularity": 0.25
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "18:00",
                "endHour": "19:00",
                "popularity": 0.75
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "19:00",
                "endHour": "20:00",
                "popularity": 0.75
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "20:00",
                "endHour": "21:00",
                "popularity": 0.625
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "21:00",
                "endHour": "22:00",
                "popularity": 0.75
            },
            {
                "dayOfWeek": "Saturday",
                "startHour": "22:00",
                "endHour": "23:00",
                "popularity": 0.25
            }
        ]
    }
];

const APP_ID = 'amzn1.ask.skill.ef314947-968e-4afc-8047-8d3908b59470';

exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;

    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
