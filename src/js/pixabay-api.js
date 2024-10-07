import axios from 'axios';

const API_KEY = '46121082-abdd5301ce27c2765f644588b';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
const perPage = 15;

export const getImages = async (query) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: perPage,
    },
  });

  const { hits, totalHits } = response.data;
  currentPage++;
  return { hits, totalHits };
};

// Скидання сторінки для нового пошуку
export const resetPage = () => {
  currentPage = 1;
};