# alexa-ethereum
AWS Lambda for an Alexa Skill for getting up-to-date information about the Ethereum cryptocurrency

Followed Amazon SpaceFacts Alexa tutorial to create basic Alexa Skill in NodeJS [here](https://github.com/alexa/skill-sample-nodejs-fact).

### Modules used: 
request, alexa

[API provided by Cryptonator](https://www.cryptonator.com/api?utm_referrer=)

## To Do: 
* add slots for other currencies(GBP, INR, BTC) to convert to
* adjust interaction model for better conversation ability
* cards would include graphs that also include the current price
* clearly reject commands that might not be supported by the skill
* lots and lots of code cleanup...

### Learnings: 
* interaction model is very intuitive and robust for interpreting information
* JavaScript scope(functions in functions in functions in functions...)
* forgetting to add `var` one too many times...  _thanks Python_.
