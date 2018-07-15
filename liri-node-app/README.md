# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
## Installs

Listed below are the dependent node packages, these will need to be installed.

### dotenv
`npm install dotenv`

### Twitter

`npm install twitter`

### Spotify

`npm install --save node-spotify-api`

### Request

`npm install request`

### FS

`npm install fs`

### Simple Node Logger

`npm install simple-node-logger`

## Get Started

List of commands you can use in LIRI.

### Get Tweets

Grabs your latest tweets, limit 20:

`node liri.js my-tweets`

### Get Song Info

Pulls down song information for a track, artist or album, limit set to 5:
Pulls "The Sign" by Ace of Base if left blank.

`node liri.js spotify-this-song "Talent Show"`

### Get Movie Info

Gets the movie information for a movie:
"Mr Nobody" if left blank.

`node liri.js movie-this "Star Wars"`

### Get Random Data

Grabs the random text from inside a file and converts it to a command:

`node liri.js do-what-it-says`
