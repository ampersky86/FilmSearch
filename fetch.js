const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');


searchForm.addEventListener('submit', apiSearch);

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0){
        movie.innerHTML='<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=a60d1f2c9be5f3b376503e6121eaac60&language=ru&query='+searchText;
    movie.innerHTML = '<div class="lds-css ng-scope"> <div style="width:100%;height:100%" class="lds-cube"><div></div><div></div><div></div><div></div></div>';

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
            console.log(output.results.length);
            if (output.results.length === 0){
                inner = '<h2 class="col-12 text-center text-info">По вашему запросу ничего не найдено</h2>';
            }
            output.results.forEach((item)=>{
                let nameItem = item.name||item.title;
                let poster = item.poster_path ? (`${img_url}${item.poster_path}`):'./img/not_poster.jpg';
                let overview = item.overview;
                inner+=`<div class="row">
                        <div class="card" style="width:18rem;">
                            <img class="card-img-top" src="${poster}" alt="${nameItem}">
                            <div class="card-body">
                                <h5 class="card-title">${nameItem}</h5>
                                <p class="card-text">${overview}</p>
                                <a href="#" class="btn btn-primary">Подробнее</a>
                            </div>
                        </div>    
                    </div>`;
            });
            movie.innerHTML=inner;
        })
        .catch(function (reason) {
            console.log(`Ошибка - ${reason}`);
            movie.innerHTML='Что-то пошло не так';
        });
    }

