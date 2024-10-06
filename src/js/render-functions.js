import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


let lightbox = new SimpleLightbox('.gallery a');

function renderImages(images) {
  const markup = images.map(image => `
    <a href="${image.largeImageURL}" class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b>: ${image.likes}</p>
        <p><b>Views</b>: ${image.views}</p>
        <p><b>Comments</b>: ${image.comments}</p>
        <p><b>Downloads</b>: ${image.downloads}</p>
      </div>
    </a>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh(); 
}

export const smoothScroll = () => {
  const { height: cardHeight } = document.querySelector('.image-item').getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};




