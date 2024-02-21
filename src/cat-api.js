import axios from 'axios';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_2XImWvLITSWu2uuYG94uc91jPPVAYnQk70Ne82VFDImPD0t3vZMau6jwF0HwFyVk';

  axios.get(`https://api.thecatapi.com/v1/breeds`).then(res => res.data);
};
export const fetchCat = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
};
