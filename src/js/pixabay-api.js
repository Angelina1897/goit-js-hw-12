import axios from 'axios';

const API_KEY = '46088453-a04f0c5be5b11b3b84520e583';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching images: ${error.response.status} ${error.response.statusText}`
    );
  }
}
