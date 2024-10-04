import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '46121082-abdd5301ce27c2765f644588b';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;
const perPage = 15;
let searchQuery = '';
let lightbox = null;

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const loader = document.getElementById('loader');
const endMessage = document.getElementById('end-message');

function initializeLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery-item a',);
  }
}

async function fetchImages(query) {
  showLoader();
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
    console.error('Error fetching data: ', error);
  } finally {
    hideLoader();
  }
}

function renderImages(images) {
  const markup = images.map(image => `
    <div class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
    </div>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  initializeLightbox();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showEndMessage() {
  endMessage.classList.remove('hidden');
}

function hideEndMessage() {
  endMessage.classList.add('hidden');
}

function scrollPage() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function checkEndOfResults(data) {
  if (page * perPage >= data.totalHits) {
    hideLoadMoreBtn();
    showEndMessage();
  } else {
    showLoadMoreBtn();
  }
}

async function onSearchSubmit(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.query.value.trim();
  
  if (!searchQuery) return;

  page = 1;
  hideEndMessage();
  clearGallery();
  hideLoadMoreBtn();

  const data = await fetchImages(searchQuery);
  if (data.hits.length === 0) {
    showEndMessage();
    endMessage.textContent = "No images found. Please try a different search term.";
    return;
  }
  renderImages(data.hits);
  checkEndOfResults(data);
  if (data.hits.length > 0 && page * perPage < data.totalHits) {
    showLoadMoreBtn();
  }
}

async function loadMoreImages() {
  page += 1;
  const data = await fetchImages(searchQuery);
  renderImages(data.hits);
  scrollPage();
  checkEndOfResults(data);
}

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

hideLoadMoreBtn();
hideEndMessage();





