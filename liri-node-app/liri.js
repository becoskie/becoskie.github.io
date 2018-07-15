require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var userChoice = process.argv.slice(2);
var option = userChoice.shift();
var query = userChoice.toString().replace(/,/g, ' ');
var filename = './logFile.txt';
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

if (userChoice) {
    getSearchChoice(option)
}

function getSearchChoice(choice) {
    switch (choice) {
        case "my-tweets":
            getTwitter();
            break;
        case "spotify-this-song":
            var title = query;
            if (title == "") {
                getDefaultSong();
            } else {
                getSpotify(query);
            }
            break;
        case "movie-this":
            var title = query;
            if (title == "") {
                getDefaultMovie();
            } else {
                getMovie(query);
            }
            break;
        case "do-what-it-says":
            doWhatItSays()
            break;
    }
}

function getTwitter() {
    var client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', { screen_name: "Margret Twain", count: 20 }, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (item) {
                logItem("Tweet: " + item.text);
                //logItem("Tweet Date: " + item.created_at);
            })

        } else {
            logItem(error);
        }
    });
}

function getSpotify(query) {
    spotify.search({ type: 'track', query: query, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < 5; i++) {
            logItem(`Artists: ${data.tracks.items[i].album.artists[0].name}`);
            logItem(`Song Name: ${data.tracks.items[i].name}`);
            logItem(`Preview Link: ${data.tracks.items[i].album.external_urls.spotify}`);
            logItem(`Album: ${data.tracks.items[i].album.name}`);
        }
    });
}

function getDefaultSong() {
    spotify.search({ type: 'track', query: 'The Sign' }, function (err, data) {
        if (err) {
            return logItem('Error occurred: ' + err);
        }
        logItem(data.tracks.items[5].album.artists[0].name);
        logItem(data.tracks.items[5].name);
        logItem(data.tracks.items[5].album.external_urls.spotify);
        logItem(data.tracks.items[5].album.name);
    });
}

function getDefaultMovie() {
    var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var item = JSON.parse(body);
            churnMovieInfo(item)
        }
    });

}

function getMovie(query) {
    var title = query.replace(/\s/g, '+');
    var queryUrl = `http://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=trilogy`;
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var item = JSON.parse(body);
            churnMovieInfo(item)
        }
    });
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            logOutput.error(err);
        } else {

            // Creates array with data.
            var randomArray = data.split(",");

            // Sets action to first item in array.
            action = randomArray[0];

            // Sets optional third argument to second item in array.
            argument = randomArray[1];

            // Calls main controller to do something based on action and argument.
            doSomething(action, argument);
        }
    });
}

function churnMovieInfo(item) {
    logItem("Title: " + item.Title);
    logItem("Year: " + item.Year);
    logItem("IMDB Rating: " + item.imdbRating);
    logItem("Rotten Tomatoes Rating: " + item.Ratings[1].Value);
    logItem("Country: " + item.Country);
    logItem("Language: " + item.Language);
    logItem("Plot: " + item.Plot);
    logItem("Actors: " + item.Actors);
}

function logItem(textItem) {
    log.info(textItem);
    console.log(textItem);
}