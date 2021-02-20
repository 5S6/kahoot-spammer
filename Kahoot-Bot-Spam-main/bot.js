let Kahoot = require("kahoot.js-updated");
let prompt = require('prompt-sync')();
let random = require('random-name')

const pinInput = prompt('Game Pin : ')
if (isNaN(pinInput)) return console.log('The pin needs to be a number')
console.log(`Pin set to "${pinInput}"`)

let bot_name = `${random.first()}`

const randomOrNot = prompt('Should I use a random name? ')
if (randomOrNot.toLowerCase() === 'yes') {
    console.log('Names will be random')
}

if (randomOrNot.toLowerCase() === 'no') {
    const botName = prompt('Bot Name : ')
    console.log(`Bot name set to "${botName}"`)
    bot_name = `${botName}`    
} else if (randomOrNot.toLowerCase() != 'no' && randomOrNot.toLowerCase() != 'yes') {
    console.log('The only options are "yes" or "no"')
    return
}

const botCount = prompt('How many bots would you like to send, (recomended 230) : ')
if (isNaN(botCount)) return console.log('Bot Count needs to be a number')
console.log(`Sending ${botCount} bots!`)


var client = [];
var pin = `${pinInput}`;
var name = `${bot_name}`;
var bot_count = `${botCount}`;
for (var i = 0; i < bot_count; i++) {
    client.push(new Kahoot);


    client[i].join(pin, name + " " + String(i)).catch(error => {
        console.log("Could not join because : " + error.description + " " + error.status)
    }) 

    client[i].on("Joined", () => {
        console.log("A bot successfully joined game")
    });
    client[i].on("QuestionStart", (question) => {
        question.answer(
            Math.floor(
                Math.random() * question.quizQuestionAnswers[question.questionIndex]
            ) + 0
        );
    });
    client[i].on("Disconnect", (reason) => {
        console.log("A bot left because " + reason);
    });
}
