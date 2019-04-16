switch (process.argv[2]) {
    case "concert-this":
        bitRequest();
        break;
    case "spotify-this-song":
        spotifyRequest();
        break;

    case "movie-this":
        omdbRequest();
        break;

    case "do-what-it-says":
        dwis();
        break;

    default:
        console.log("awww heck you didn't enter that quite right")
}

//Spotify song request
function spotifyRequest(songSearch) {

    var Spotify = require('node-spotify-api');
    var spotify = require("./keys.js")
    var spotify = new Spotify(spotify.spotify);

    var songSearch = process.argv[3];


    spotify
        .search({
            type: 'track',
            query: songSearch
        })
        .then(function (data) {
            for (let i = 0; i < 5; i++) {
                console.log("----------------------------");
                console.log("Artists name: " + data.tracks.items[i].artists[0].name);
                console.log("Album name: " + data.tracks.items[i].album.name);
                console.log("Track Name " + data.tracks.items[i].name);
                console.log("Spotify link: " + data.tracks.items[i].external_urls.spotify)
                // console.log(data.track.items[i].name)
                // console.log(data);
                console.log("----------------------");
            }
        })
        .catch(function (err) {
            console.log(err);


            // console.log(data.tracks.items[2].artists[0].name);
        });

}

//Bands In Town request
function bitRequest() {
    var axios = require("axios");
    var artist = process.argv[3];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (data, error) {
            for (let i = 0; i < 5; i++) {
                console.log("----------------------------");
                console.log("Venue name: " + data.data[i].venue.name);
                console.log("Venue country: " + data.data[i].venue.country);
                console.log("Venue city: " + data.data[i].venue.city);
                console.log("Date: " + data.data[i].datetime);
                console.log("----------------------------");

            }
            // console.log(data.data);
        })

        .catch(function (error) {
            console.log(error);
        });
}

//OMDB movie request
function omdbRequest() {
    var axios = require("axios");
    var searchTerm = process.argv[3];

    axios.get('http://www.omdbapi.com/?apikey=94fb48c6&t=' + searchTerm + '')
        .then(function (response, error) {
            console.log("----------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("MetaScore: " + response.data.Metascore);
            console.log("Country: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Actors: " + response.data.Actors);
            console.log("----------------------------");
        })

        .catch(function (error) {
            console.log(error);
        });
}

//do what it says
function dwis() {
    var fs = require("file-system");

    fs.readFile("./random.txt", "utf8", function (err, data) {

        if (err) {
            console.log(err)
        }
    })
    spotifyRequest(data);
    console.log(data);

}