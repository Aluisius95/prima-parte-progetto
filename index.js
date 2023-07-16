// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Cerca libro per titolo</h1>`;
var apiKey;
let URL;
const searchB = document.getElementById('searchB');
const result = document.getElementById('answer');

//genero una request HTML
function newReq(title, callback) {
  const request = new XMLHttpRequest();
  URL =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/get?key=' +
    apiKey;
  request.onload = fetch(URL)
    .then(
      (response) => response.json(),
      (error) => console.log(error)
    )
    .then((data) => callback(JSON.parse(data)));

  request.open('GET', URL, true);
  request.send();
}

//funzione di chiamata request e match stringa
function searchRB(title) {
  apiKey = document.getElementById('api').value;
  result.innerHTML = '';
  if (title.length == 0) result.innerHTML = '';
  else
    newReq(title, (c) => {
      let reg = new RegExp(title, 'i');
      c.forEach((element) => {
        if (element['titolo'].search(reg) != -1) {
          result.innerHTML += element.autore + ': ' + element.titolo + '.<br>';
        }
      });
    });
}

searchB.addEventListener('input', () => searchRB(searchB.value));
