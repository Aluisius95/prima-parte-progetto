// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Cerca libro per titolo</h1>`;
const searchB = document.getElementById('search');
const result = document.getElementById('answer');
const apiKey = '77a2224b';
const URL =
  'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/get?key=' +
  apiKey;

//aggiungo casella di testo
let casella = document.createElement('input');
casella.setAttribute('type', 'text');
searchB.appendChild(casella);

//genero una request HTML
function newReq(title, callback) {
  const request = new XMLHttpRequest();

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
  result.innerHTML = '';
  newReq(title, (c) => {
    let reg = new RegExp(title, 'i');
    c.forEach((element) => {
      if (element['titolo'].search(reg) != -1) {
        result.innerHTML += element.autore + ': ' + element.titolo + '.<br>';
      }
    });
  });
}

casella.addEventListener('keyup', () => searchRB(casella.value));
