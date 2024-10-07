import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages, resetPage } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';


const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#loadMore');
const loader = document.querySelector('#loader');
const notification = document.querySelector('#notification');

let query = '';
let lightbox = new SimpleLightbox('.gallery-item a');

// Функція показу лоадера
const showLoader = () => {
  loader.style.display = 'block';
};

// Функція приховування лоадера
const hideLoader = () => {
  loader.style.display = 'none';
};

// Функція показу кнопки "Load More"
const showLoadMoreBtn = () => {
  loadMoreBtn.style.display = 'block';
};

// Функція приховування кнопки "Load More"
const hideLoadMoreBtn = () => {
  loadMoreBtn.style.display = 'none';
};

// Пошук зображень
const searchImages = async () => {
  showLoader();
  try {
    const { hits, totalHits } = await getImages(query);
    if (hits.length === 0) {
      notification.textContent = 'Нічого не знайдено за вашим запитом.';
      return;
    }
    renderGallery(hits);

    // Оновлення SimpleLightbox після рендерингу нових зображень
    lightbox.refresh();
    
    if (document.querySelector('#gallery').childElementCount >= totalHits) {
      hideLoadMoreBtn();
      notification.textContent = "We're sorry, but you've reached the end of search results.";
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    notification.textContent = 'Сталася помилка. Спробуйте ще раз.';
    clearGallery();
  } finally {
    hideLoader();
  }
};

// Обробка форми пошуку
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  if (!query) return;

  clearGallery();
  resetPage();
  hideLoadMoreBtn();
  searchImages();
});

// Натискання на кнопку "Load More"
loadMoreBtn.addEventListener('click', () => {
  searchImages();
});