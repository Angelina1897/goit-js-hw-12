import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('#load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    iziToast.warning({ message: 'Please enter a search query!', position: 'topRight' });
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  totalHits = 0;

  clearGallery(gallery);
  clearInput();
  hideLoadMoreButton(loadMoreButton);
  showLoader(loader);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found. Try again!', position: 'topRight' });
      return;
    }

    renderImages(data.hits, gallery);
    if (totalHits > 15) showLoadMoreButton(loadMoreButton);

  } catch (error) {
    iziToast.error({ message: 'Something went wrong.', position: 'topRight' });
    console.error('Error fetching images:', error);
  } finally {
    hideLoader(loader);
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader(loader);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits, gallery);
    smoothScroll();

    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton(loadMoreButton);
      iziToast.info({ message: "You've reached the end of search results.", position: 'topRight' });
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong.', position: 'topRight' });
    console.error('Error fetching more images:', error);
  } finally {
    hideLoader(loader);
  }
}

function clearInput() {
  form.elements.searchQuery.value = '';
}

function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
