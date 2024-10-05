import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

document.querySelector('#search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const query = event.target.querySelector('input[name="searchQuery"]').value.trim();
  
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(query);
    
    if (data.hits.length === 0) {
      iziToast.error({ title: 'No Results', message: 'Sorry, there are no images matching your search query. Please try again!' });
    } else {
      renderImages(data.hits);
      lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images. Please try again!' });
  } finally {
    hideLoader();
  }
});
