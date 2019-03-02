$(document).ready(() =>{
    $('#searchForm').on('submit', (e) =>{
        e.preventDefault();
        let movie = $('#Search_movies').val();
        searchMovie(movie);
        e.preventDefault();
    })
})


function searchMovie(movie){
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=36161aa9&s='+movie)
    .then((response) =>{
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        
        $.each(movies, (index,movie) => {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                          <img src="${movie.Poster}">
                          <h5>${movie.Title}</h5>
                          <a onclick="movieinfo('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((err) =>{
        alert('oops!!');
    });
}

function movieinfo(id){
    sessionStorage.setItem('movieID',id);
    window.location = 'Movie.html';
}

function getMovie(){
    let movieID = sessionStorage.getItem('movieID');
    
    axios.get('http://www.omdbapi.com/?apikey=36161aa9&i='+movieID)
    .then((response) =>{
        console.log(response);
        let movie = response.data;
        let output = `
        <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" alt="${movie.Title}" class="thumbnail mt-4 mb-4" style="height:390px;">
                </div>
                <div class="col-md-8">
                     <h2 class="text-center display-4">${movie.Title}</h2>
                     <ul class="list-group">
                        <li class="list-groupt-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-groupt-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-groupt-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-groupt-item"><strong>IMDB-Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-groupt-item"><strong>Director:</strong> ${movie.Director}</li>  
                        <li class="list-groupt-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-groupt-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
        </div>
        
        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                    ${movie.Plot}
                <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-success">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go back to Home</a>
            </div>
        </div>
            `;
        
        $('#movie').html(output);
    })
    .catch((err) =>{
        alert('oops!!');
    });

}