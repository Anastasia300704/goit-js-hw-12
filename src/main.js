import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');

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

async function handleImageSearch() {
  showLoader();

  try {
    const images = await fetchImages(query, page);
    totalHits = images.totalHits;

    if (page === 1) {
      gallery.innerHTML = ''; 
    }

    renderImages(images.hits);

    if (gallery.childElementCount < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
      showEndOfResultsMessage();
    }
  } catch (error) {
    console.error('Error during image search:', error);
  } finally {
    hideLoader();
  }
}


form.addEventListener('submit', (event) => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();
  page = 1; 
  handleImageSearch(); 
});


loadMoreBtn.addEventListener('click', () => {
  page += 1; 
  handleImageSearch(); 
});

function renderImages(images) {
  const markup = images.map(image => `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b>: ${image.likes}</p>
        <p><b>Views</b>: ${image.views}</p>
        <p><b>Comments</b>: ${image.comments}</p>
        <p><b>Downloads</b>: ${image.downloads}</p>
      </div>
    </div>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  loader.classList.remove('hidden');
  loadMoreBtn.classList.add('hidden'); 
}

function hideLoader() {
  loader.classList.add('hidden');
}


function showEndOfResultsMessage() {
  iziToast.info({
    title: 'End of Results',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}
















