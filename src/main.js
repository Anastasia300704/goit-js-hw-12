const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  query = input.value.trim();
  
  if (!query) {
    showNotification('Please enter a search query');
    return;
  }

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('hidden'); // Сховати кнопку перед новим пошуком

  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(data.hits);

    if (totalHits > data.hits.length) {
      loadMoreBtn.classList.remove('hidden'); // Показати кнопку, якщо є ще зображення
    }
  } catch (error) {
    showError('Something went wrong, please try again later.');
  } finally {
    toggleLoader(false);
  }
}

async function onLoadMore() {
  page += 1;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    renderImages(data.hits);

    const totalDisplayedImages = document.querySelectorAll('.gallery-item').length;
    if (totalDisplayedImages >= totalHits) {
      loadMoreBtn.classList.add('hidden'); // Сховати кнопку, якщо зображення закінчились
      showNotification("We're sorry, but you've reached the end of search results.");
    }

    smoothScroll();
  } catch (error) {
    showError('Something went wrong, please try again later.');
  } finally {
    toggleLoader(false);
  }
}

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

import { fetchImages } from "./js/pixabay-api.js";
import { renderImages, clearGallery, showError, showNotification, toggleLoader } from "./js/render-functions.js";
import "css-loader";


