import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Очищення галереї
export const clearGallery = () => {
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';
};

// Відображення зображень у галереї
export const renderGallery = (images) => {
  const gallery = document.querySelector('#gallery');
  const markup = images.map(({ webformatURL, largeImageURL, tags }) => `
    <div class="gallery-item">
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
    </div>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};





