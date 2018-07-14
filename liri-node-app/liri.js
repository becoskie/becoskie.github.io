require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var userChoice = process.argv.slice(2);
var option = userChoice.shift();
var query = userChoice.toString().replace(/,/g, ' ');
var filename = './logFile.txt';
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

if(userChoice) {
    getSearchChoice(option)
}

function getSearchChoice(choice) {
    switch (choice) {
        case "my-tweets":
            getTwitter();
            break;
        case "spotify-this-song":
            getSpotify();
            break;
        case "movie-this":
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
                name: "songTitle"
            },
            {
                type: "confirm",
                message: "Are you sure:",
                name: "search_song",
                default: true
            }
        ])
        .then(function (inquirerResponse) {

            if (inquirerResponse.search_song) {
                var song_query = inquirerResponse.songTitle;
                spotify.search({ type: 'track', query: song_query, limit: 5}, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    var name = [];
                    name.push(data.tracks.items[1].album.artists[1].name);
                    var nameString = name.join(", ");

                    logItem(nameString);
                    //console.log(data.tracks.items[0].album.artists);
                });
            }
            else {
                logItem(error);
            }

        });
}

function getMovie() {
    console.log("It's movie");
    menu();
}

function logItem(textItem) {
    log.info(textItem);
    console.log(textItem);
}