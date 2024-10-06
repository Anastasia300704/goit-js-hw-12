import axios from 'axios';

const API_KEY = '46121082-abdd5301ce27c2765f644588b';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '46121082-abdd5301ce27c2765f644588b',
        q: query,
        page: page,
        per_page: perPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
    throw error;
  }
}
