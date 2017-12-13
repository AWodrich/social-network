var url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=8a37cb8f51b6445faff2aa74c0655cf4';

var req = new Request(url);

fetch(req)
    .then(response => console.log(response.json()))
