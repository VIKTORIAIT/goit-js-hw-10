import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(searchFunc, DEBOUNCE_DELAY));

function searchFunc(event) {
  const valueEl = event.target.value.trim();
  if (!valueEl) {
    removeElems();
  }
  fetchCountries(valueEl)
    .then(data => {
      let count = data.length;
      if (count > 10) {
        removeElems();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (count >= 2 && count <= 10) {
        renderListCountries(data);
      } else if (count === 1) {
        renderSingleCountry(data);
      }
    })
    .catch(error => {
      removeElems();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderListCountries(dataCountries) {
  countryInfo.innerHTML = '';
  let country = dataCountries
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li><div class="divstyle"><img width="70px" src="${svg}"/><b>${official}</b></div></li>`;
    })
    .join('');
  countryList.innerHTML = country;
}

function renderSingleCountry(dataCountries) {
  countryList.innerHTML = '';
  let country = dataCountries
    .map(({ name: { official }, flags: { svg }, capital, population, languages }) => {
      const langArray = Object.values(languages).join('');
      return `<div class="divstyle"><img width=70px src="${svg}"/><p class="countryNameText">${official}</p></div>
      <p><span>Capital: </span>${capital}</p>
      <p><span>Population: </span>${population}</p>
      <p><span>Languages: </span>${langArray}</p>`;
    })
    .join('');
  countryInfo.innerHTML = country;
}

function removeElems() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
