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
    //console.log(request);
    request.open(method, url);
    request.send();

 request.addEventListener('readystatechange', () => {
     let inner='';
     let img_url = 'https://image.tmdb.org/t/p/w1280';

     if(request.readyState !==4) return 'Loading';
     if (request.readyState !== 200) {
         movie.innerHTML = `Ошибка${request.status}`}

         let response = request.responseText;
         let output = JSON.parse(response);
         console.log(output.results);

         output.results.forEach((item)=>{
            let nameItem=item.name||item.title,
                imgPoster = item.backdrop_path ? (`${img_url}${item.backdrop_path}`):(`${img_url}${item.poster_path}`),
                release = item.release_date;
            inner+=`<div class="col-12">${nameItem}
                           <div>Дата релиза: ${release}</div>
                          <img src="${imgPoster}" alt=""/>
                     <div/>`;
            movie.innerHTML=inner;
        })
     }
 )

};


