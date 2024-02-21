import { fetchBreeds } from './cat.-api';

const selectBreed = document.querySelector('.breed-select');

selectBreed.addEventListener('click', () => {
  try {
    fetchBreeds().then(data => renderSelect(data));
  } catch (error) {
    console.log(error);
  }
});

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value = "${id}">${name}</options>`;
    })
    .join('');
  selectBreed.insertAdjacentHTML('beforeend', markup);
}

selectBreed.addEventListener('change', e => {
  console.log(e.target.value);
});
