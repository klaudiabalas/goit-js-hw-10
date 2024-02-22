import { fetchBreeds, fetchCat } from './cat-api';

const selectBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

try {
  loader.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  selectBreed.insertAdjacentHTML('beforeend', markup);
  loader.classList.add('hidden');
}

selectBreed.addEventListener('change', e => {
  loader.classList.remove('hidden');
  fetchCat(e.target.value).then(data => renderCat(data[0]));
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
          <h2>${name}</h2>
          <img class="image" src="${url}" alt="${name}" />
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
      </div>`
  );
  loader.classList.add('hidden');
}
