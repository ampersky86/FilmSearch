const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

searchForm.addEventListener('submit', apiSearch);



function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=a60d1f2c9be5f3b376503e6121eaac60&language=ru&query='+searchText;
    movie.innerHTML='Загрузка';

    fetch(server)
        .then(function (result) {
            if (result.status!==200) {
                return Promise.reject(new Error(result.status));
            }
            return result.json();
        })
        .then(function (output) {
            let inner = '';
            let img_url = 'https://image.tmdb.org/t/p/w500';
            output.results.forEach((item)=>{
                let nameItem=item.name||item.title;
                let imgPoster = `${img_url}${item.poster_path}`;//item.poster_path ? (`${img_url}${item.poster_path}`):(`${img_url}${item.backdrop_path}`);
                let overview = item.overview;
                inner+=`<div class="row">
                        <div class="card" style="width:18rem;">
                            <img class="card-img-top" src="${imgPoster}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${nameItem}</h5>
                                <p class="card-text">${overview}</p>
                                <a href="#" class="btn btn-primary">Подробнее</a>
                            </div>
                        </div>    
                    </div>`;
                movie.innerHTML=inner;
            })
        })
        .catch(function (reason) {
            console.log(`Ошибка - ${reason}`);
            movie.innerHTML='Что-то пошло не так';
        });
    }

