import { fetchImages } from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    lightbox = new SimpleLightbox('.gallery-item a', { /* опції за бажанням */ });
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
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showEndMessage(message = "We're sorry, but you've reached the end of search results.") {
  endMessage.textContent = message;
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
  showLoader();

  try {
    const data = await fetchImages(searchQuery, page, perPage);
    if (data.hits.length === 0) {
      showEndMessage("No images found. Please try a different search term.");
      return;
    }
    renderImages(data.hits);
    checkEndOfResults(data);
  } catch (error) {
    showEndMessage("An error occurred while fetching images. Please try again later.");
  } finally {
    hideLoader();
  }
}

async function loadMoreImages() {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(searchQuery, page, perPage);
    renderImages(data.hits);
    scrollPage();
    checkEndOfResults(data);
  } catch (error) {
    showEndMessage("An error occurred while fetching images. Please try again later.");
  } finally {
    hideLoader();
  }
}

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

hideLoadMoreBtn();
hideEndMessage();



