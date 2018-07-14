require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Twitter = require("twitter");
//var spotify = new Spotify(keys.spotify);
var filename = './logFile.txt';
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

menu();


function menu() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to search?",
                choices: ["Twitter", "Spotify", "Look for a Movie"],
                name: "liri_choice"
            },
            {
                type: "confirm",
                message: "Are you sure:",
                name: "search_item",
                default: true
            },

        ])
        .then(function (inquirerResponse) {

            if (inquirerResponse.search_item) {
                getSearchChoice(inquirerResponse.liri_choice);
            }
            else {
                console.log("Sorry I only can help with those choices");
            }

        });
}


function getSearchChoice(choice) {
    switch (choice) {
        case "Twitter":
            getTwitter();
            break;
        case "Spotify":
            getSpotify();
            break;
        case "Look for a Movie":
            getMovie();
            break;
    }
}

function getTwitter() {
    var client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', { screen_name: "Margret Twain", count: 20 }, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (item) {
                logItem("Tweet: " + item.text);
                logItem("Tweet Date: " + item.created_at);
            })

        } else {
            logItem(error);
        }
    });
}

function getSpotify() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What song do you want to look up?",
                name: "username"
            }
        ])
}

function getMovie() {
    console.log("It's movie");
    menu();
}

function logItem(textItem) {
    log.info(textItem);
    console.log(textItem);
}