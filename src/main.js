import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton, showEndOfResultsMessage, smoothScroll, showError} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let query = '';
let page = 1;
let totalHits = 0;
let simpleLightbox;

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  
  query = event.target.elements.searchQuery.value.trim();
  if (query === '') return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  
  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    
    if (totalHits === 0) {
      return alert('No images found for your query.');
    }
    
    renderImages(data.hits);
    simpleLightbox = new SimpleLightbox('.gallery a').refresh();
    if (data.totalHits > data.hits.length) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  page += 1;

  try {
    const data = await fetchImages(query, page);
    renderImages(data.hits);
    simpleLightbox.refresh();

    const totalLoadedImages = gallery.children.length;
    if (totalLoadedImages >= totalHits) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    }

    smoothScroll();
  } catch (error) {
    console.error(error);
  }
}
