const searchForm = document.querySelector('#search-form');


searchForm.addEventListener('submit', apiSearch);



function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=a60d1f2c9be5f3b376503e6121eaac60&language=ru&query='+searchText
    sendRequest('GET', server)
}

const sendRequest = function (method, url) {
    let request = new XMLHttpRequest();
    console.log(request);
    request.open(method, url);
    request.send();

 request.addEventListener('readystatechange', () => {
     if(request.readyState !=4) {return 'Loading'}
     else if (request.readyState == 4) {

     }
 })

};

