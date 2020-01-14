// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://root:root@ds131546.mlab.com:31546/rznu';
//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });
//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     dbo.createCollection("customers", function(err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });
//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });
//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var query = { address: "Park Lane 38" };
//     dbo.collection("customers").find(query).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });
getWeatherForecastZagreb();
getWeatherForecastLondon();

$(document).ready(() => {
    $('#searchForm' ).on('submit', (e) => {
        let searchText = ($('#searchText').val());
        getMovies(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=f8b623cc')
        .then( (response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="movie">Movie Details</a>
                        </div>
                    </div>
                `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getWeatherForecastZagreb() {
    axios.get('https://openweathermap.org/data/2.5/weather?q=Zagreb&appid=b6907d289e10d714a6e88b30761fae22')
        .then( (response) => {
            console.log(response);
            let weather = response.data.main;
            console.log(weather);
            let output = `
                        <h2>Zagreb</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Temperature:</strong> ${weather.temp}</li>
                            <li class="list-group-item"><strong>Temperature max:</strong> ${weather.temp_max}</li>
                            <li class="list-group-item"><strong>Temperature min:</strong> ${weather.temp_min}</li>
                        </ul>
                 `;

             $('#weatherZagreb').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getWeatherForecastLondon() {
    axios.get('https://openweathermap.org/data/2.5/weather?q=London&appid=b6907d289e10d714a6e88b30761fae22')
        .then( (response) => {
            console.log(response);
            let weather = response.data.main;
            console.log(weather);
            let output = `
                        <h2>London</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Temperature:</strong> ${weather.temp}</li>
                            <li class="list-group-item"><strong>Temperature max:</strong> ${weather.temp_max}</li>
                            <li class="list-group-item"><strong>Temperature min:</strong> ${weather.temp_min}</li>
                        </ul>
                 `;

             $('#weatherLondon').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    windows.location = 'movie.ejs';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=f8b623cc')
        .then( (response) => {
            let movie = response.data;
            console.log(movie);
            let output = `
                <div class = "row">
                    <div class = "col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class = "col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>ImdbRating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
                            <li class="list-group-item"><strong>Metascore:</strong> ${movie.Metascore}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                    <div class="row">
                        <div class="well" style="margin-top: 1rem">
                            <h3>Plot</h3>
                            ${movie.Plot}
                            <hr>
                            <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">Check on Imdb</a>
                            <a href="/home" class="btn btn-default">Go back to search</a>
                        </div>
                    </div>
                 </div>
            `;

            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}