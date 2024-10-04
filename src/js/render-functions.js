import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let gallery = new SimpleLightbox('.gallery a');

export function renderImages(images) {
  const galleryElement = document.querySelector('.gallery');
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <a href="${largeImageURL}" class="gallery-item">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </a>
      `;
    })
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

export function clearGallery() {
  const galleryElement = document.querySelector('.gallery');
  galleryElement.innerHTML = '';
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function showNotification(message) {
  iziToast.info({
    title: 'Info',
    message: message,
  });
}

export function toggleLoader(isLoading) {
  const loader = document.querySelector('.loader');
  if (isLoading) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}




