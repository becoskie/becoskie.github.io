require("dotenv").config();
var inquirer = require("inquirer");
//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
var tweets;
var song;
var movie;

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
    console.log("It's twitter");
    menu();
}

function getSpotify() {
    console.log("It's Spotify");
    menu();
}

function getMovie() {
    console.log("It's movie");
    menu();
}