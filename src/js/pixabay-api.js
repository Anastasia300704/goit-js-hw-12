import axios from 'axios';

const API_KEY = '46121082-abdd5301ce27c2765f644588b';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Функція для отримання зображень з Pixabay API
 * @param {string} query - Ключове слово для пошуку
 * @param {number} page - Номер сторінки для пагінації
 * @param {number} perPage - Кількість зображень на сторінку
 * @returns {Promise<Object>} - Відповідь API
 */
export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}
