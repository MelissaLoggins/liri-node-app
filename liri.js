// Requirements and global variables.
var keys = require('./keys.js') 
var Twitter = require('twitter'); 
var spotify = require('spotify'); 
var request = require('request'); 
var fs = require('fs'); 

var getArtistNames = function(artist){
	return artist.name;
}

var SpotifyCall = function(songName){

	if (songName === undefined){
		songName = 'The Sign, Ace of Base';
	}
	 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error: ' + err);
	        return;
	    }

	    var songs = data.tracks.items;

	    for(var i = 0; i < songs.length; i++){
	    	console.log(i);
	    	console.log('Artist: ' + songs[i].artists.map(getArtistNames));
	    	console.log('Song Name: ' + songs[i].name);
	    	console.log('Preview Song: ' + songs[i].preview_url);
	    	console.log('Album: ' + songs[i].album.name);
	    	console.log('-----------------------------------');
	    }
	});
}

function getTweets(){
    console.log("tweets mission accomplished");

    var client = new Twitter(
        keys.twitterKeys
    );

    var parameters = {
        screen_name: 'MelissaLoggins',
        count: 20
    };

    client.get('statuses/user_timeline', parameters, function(error, tweets, response){
        if (!error) {
            for (i=0; i<tweets.length; i++) {
                var logData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log(logData);
                console.log("-------------------------");
            }
        };
    });
};

var MovieCall = function(movieTitle){

	if (movieTitle === undefined){
		movieTitle = 'Donnie Darko';
	}

	var urlHit = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=full&tomatoes=true&r=json";

	request(urlHit, function (error, response, body) {
	  if (!error && response.statusCode === 200) {
	  	var jsonData = JSON.parse(body);

	    console.log('Title: ' + jsonData.Title);
	    console.log('Year: ' + jsonData.Year);
	    console.log('IMDB Rating: ' + jsonData.imdbRating);
	    console.log('Country: ' + jsonData.Country);
	    console.log('Language: ' + jsonData.Language);
	    console.log('Plot: ' + jsonData.Plot);
	    console.log('Actors: ' + jsonData.Actors);
	   	console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
	    console.log('Rotton Tomatoes URL: ' + jsonData.tomatoURL);
	  }
	});
}

var ISaid = function(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		console.log(data);
		
		var dataArr = data.split(',')

		if (dataArr.length === 2){
			pick(dataArr[0], dataArr[1]);
		}else if (dataArr.length === 1){
			pick(dataArr[0]);
		}
		
	});
}

var pick = function(caseData, functionData){
	switch(caseData) {
	    case 'my-tweets':
	        getTweets();
	        break;
	    case 'spotify-this-song':
	        SpotifyCall(functionData);
	        break;
	    case 'movie-this':
	    	MovieCall(functionData);
	    	break;
	    case 'do-what-it-says':
	    	ISaid();
	    	break;
	    default:
	        console.log('LIRI doesn\'t know that');
	}
}

var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

