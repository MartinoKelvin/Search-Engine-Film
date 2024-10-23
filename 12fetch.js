// $('.search-button').on('click', function () {
//     $.ajax({
//         url: 'http://www.omdbapi.com/?i=tt3896198&apikey=c38469db&s=' + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showCards(m);
//             });
//             $('.movie-container').html(cards);

//             // ketika tombol detail di klik
//             $('.modal-detail-button').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=c38469db&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showMovieDetail(a);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: (e) => {
//             console.log(e.responseText);
//         }
//     });
// });


//Fetch
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function () {

    const inputKeyword = document.querySelector('.input-keyword');
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=c38469db&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach(m => cards += showCards(m));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;

            //ketika tombol detail di klik
            const modalDetailButton = document.querySelectorAll('.modal-detail-button');
            modalDetailButton.forEach(btn => {
                btn.addEventListener('click', function () {
                    const imdbid = this.dataset.imdbid;
                    fetch('http://www.omdbapi.com/?apikey=c38469db&i=' + imdbid)
                        .then(response => response.json())
                        .then(a => {
                            const movieDetail = showMovieDetail(a);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = movieDetail;
                        });
                });
            });



        });

});








function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card" >
                    <img src="${m.Poster}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">
                                View Details</a>
                        </div>
                    </div>
            </div > `;
}

function showMovieDetail(a) {
    return `<div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${a.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <h4>${a.Title} (${a.Year})</h4>
                                    </li>
                                    <li class="list-group-item"><strong>Director : </strong> ${a.Director}</li>
                                    <li class="list-group-item"><strong>Actors : </strong>${a.Actors}</li>
                                    <li class="list-group-item"><strong>Writer : </strong>${a.Writer}</li>
                                    <li class="list-group-item"><strong>Plot : </strong> <br> ${a.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
}