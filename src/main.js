import { fetchImages } from "./js/pixabay-api.js";
import { renderImages, clearGallery, showError, showNotification, toggleLoader } from "./js/render-functions.js";
import "css-loader";


const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    iziToast.error({ message: 'Please enter a search term' });
    return;
  }

  page = 1;
  clearGallery();
  toggleLoadMoreBtn(false);
  showLoader();

  try {
    const { images, totalHits: hits } = await fetchImages(query, page);
    totalHits = hits;
    renderGallery(images);

    if (totalHits > 15) {
      toggleLoadMoreBtn(true);
    }
  } catch (error) {
    showNoResultsMessage();
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;
  toggleLoadMoreBtn(false);
  showLoader();

  try {
    const { images } = await fetchImages(query, page);
    renderGallery(images);

    if (page * 15 >= totalHits) {
      toggleLoadMoreBtn(false);
      showEndOfResultsMessage();
    } else {
      toggleLoadMoreBtn(true);
    }

    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({ message: 'Something went wrong during loading more images.' });
  } finally {
    hideLoader();
  }
}


