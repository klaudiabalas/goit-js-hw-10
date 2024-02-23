import Notiflix from 'notiflix';

import { fetchBreeds, fetchCat } from './cat-api';

const selectBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');

loader.classList.add('hidden');

try {
  loader.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  if (typeof breeds == 'object') {
    const markup = breeds
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    selectBreed.insertAdjacentHTML('beforeend', markup);
    loader.classList.add('hidden');
  } else {
    Notiflix.Report.failure('Error 404', data, 'OK');
    loader.textContent = 'Error 404';
    document.body.style.background = 'red';
  }
}

selectBreed.addEventListener('change', e => {
  loader.classList.remove('hidden');
  catInfo.classList.remove('hidden');
  try {
    fetchCat(e.target.value).then(data => renderCat(data[0]));
  } catch (error) {
    console.log(error);
  }
});

const infoCat = dataCat => {
  if (dataCat != undefined) {
    const { url } = catData;
    const { description, name, temperament } = catData.breeds[0];
    catInfo.replaceChildren();
    catInfo.classList.remove('hidden');
    catInfo.insertAdjacentHTML(
      'beforeend',
      `<div>
          <h2 class="breed-name">${name}</h2>
          <img class="image" src="${url}" alt="${name}" />
          <div class="container">
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
          </div>
      </div>`
    );
    loader.classList.add('hidden');
  } else {
    loader.classList.add('hidden');
    Notiflix.Report.failure(
      'Search error.',
      'No description of this cat breed has been found. Please select a different breed.',
      'Ok'
    );
  }
};
