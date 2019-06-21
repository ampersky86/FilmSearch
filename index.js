const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

searchForm.addEventListener('submit', apiSearch);



function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=a60d1f2c9be5f3b376503e6121eaac60&language=ru&query='+searchText
    sendRequest('GET', server)
}


const sendRequest = function (method, url) {
    let request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

 request.addEventListener('readystatechange', () => {
     let inner='',
      img_url = 'https://image.tmdb.org/t/p/w1280',
      response = request.responseText,
      output =JSON.parse(response);

     if(request.readyState !==4)
         return 'Loading';
     if (request.readyState !== 200) {
         movie.innerHTML = `Ошибка${request.status}`}


         console.log(output);

         output.results.forEach((item)=>{
            let nameItem=item.name||item.title,
                imgPoster = item.backdrop_path ? (`${img_url}${item.backdrop_path}`):(`${img_url}${item.poster_path}`),
                overview = item.overview;
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
     }
 )

};




