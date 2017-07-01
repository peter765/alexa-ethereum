'use strict';
var request = require('request');
var Alexa = require('alexa-sdk');
//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.c4ca877c-8651-4e5f-a815-6cbb36951899";
var API_URL = "https://api.cryptonator.com/api/ticker/eth-usd";

var SKILL_NAME = "Ether Price Check";
var GET_PRICE_MESSAGE = "Here's you go: ";
var HELP_MESSAGE = "You can say tell me the current price, tell me the hourly change, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//Options to call API/Helper Functions
//=========================================================================================================================================
var options = {
    uri: 'http://api.cryptonator.com/api/ticker/eth-usd',
    method: 'GET',
    json:true
}


//=========================================================================================================================================
//Handlers for the Alexa Skill
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        console.log("Launch Request");
        this.emit('GetEthPriceIntent');
    },
    'GetEthPriceIntent': function () {
        var self = this;
        request(options, function(error, response, body){
            if(error) console.log(error);
            else {
                console.log("Eth Price Called");
                var price = parseFloat(body.ticker.price).toFixed(2);
                var target = body.ticker.target;
                var speechOutput = "The current price of ether is " + price + target + " per unit of Ether. "
                var cardTitle = "Ether Price Report"
                var date = new Date(body.timestamp * 1000);
                var cardContent = speechOutput + "Updated on " + date.toISOString();
                self.emit(':tellWithCard', speechOutput, cardTitle, cardContent);
                console.log(body.ticker);
            }
        });
    },
    'GetEthChangeIntent': function () {
        var self = this;
        request(options, function(error, response, body){
            if(error) console.log(error);
            else {
                console.log("Eth Change Called");
                var change = parseFloat(body.ticker.change).toFixed(2);
                var price = parseFloat(body.ticker.price).toFixed(2);
                var target = body.ticker.target;
                var cardTitle = "Ether Price Change";
                //Time String

                console.log(body.ticker);
                console.log("Change positive? " + (change > 0))
                if(change < 0) {
                    var speechOutput = "The value of ether has dropped by " + change + target + " in the past hour. "
                } else if (change > 0){
                    var speechOutput = "The value of ether has risen by " + change + target + " in the past hour. "
                } else {
                    var speechOutput = "The value of ether has not changed in the past hour!"
                }
                speechOutput += "The current price of ether is " + price + target + ". ";
                var date = new Date(body.timestamp * 1000);
                var cardContent = speechOutput + "Updated on " + date.toISOString();
                self.emit(':tellWithCard', speechOutput, cardTitle, cardContent);
                console.log(body.ticker);
            }
        });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
