import{a as v,i as m,S as h}from"./assets/vendor-u8rapaCG.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const $="46088453-a04f0c5be5b11b3b84520e583",M="https://pixabay.com/api/";async function g(r,a=1,t=12){try{return(await v.get(`${M}`,{params:{key:$,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:a,per_page:t}})).data}catch(s){throw console.error("Error fetching images:",s),s}}function p(r){const a=document.querySelector(".gallery"),t=r.map(({webformatURL:s,largeImageURL:e,tags:o,likes:n,views:b,comments:E,downloads:P})=>`
      <li class="gallery-item">
                <a href="${e}" class="gallery-link">
                    <img src="${s}" alt="${o}" class="gallery-image" />
                </a>
                <div class="info">
                    <p class="info-item"><span>Likes</span> ${n}</p>
                    <p class="info-item"><span>Views</span> ${b}</p>
                    <p class="info-item"><span>Comments</span> ${E}</p>
                    <p class="info-item"><span>Downloads</span> ${P}</p>
                </div>
            </li>
    `).join("");a.insertAdjacentHTML("beforeend",t)}function q(){document.querySelector(".gallery").innerHTML=""}function c(r){m.error({title:"Error",message:r})}function B(){m.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})}function L(){document.querySelector(".loader").style.display="flex"}function w(){document.querySelector(".loader").style.display="none"}const O=document.querySelector(".search-form"),T=document.querySelector(".gallery"),d=document.querySelector(".load-more");let x=new h(".gallery a"),l=1,i="",y=0,f;O.addEventListener("submit",z);d.addEventListener("click",A);async function z(r){if(r.preventDefault(),i=r.target.elements.query.value.trim(),!i){c("Please enter a search query.");return}l=1,q(),u(),await S(i,l)}async function A(){l+=1,await S(i,l)}async function S(r,a){L();try{const t=await g(r,a);if(t.hits.length===0){c("Sorry, there are no images matching your search query. Please try again!"),u();return}y=t.totalHits,p(t.hits),x.refresh(),T.children.length>=y?(u(),B()):H(),I()}catch(t){c(`Error fetching images: ${t.message}`)}finally{w()}}function H(){d.style.display="block"}function u(){d.style.display="none"}function I(){const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}document.querySelector("#search-form").addEventListener("submit",async r=>{r.preventDefault();const a=r.target.querySelector('input[name="searchQuery"]').value.trim();if(!a){iziToast.error({title:"Error",message:"Please enter a search query!"});return}q(),L();try{const t=await g(a);t.hits.length===0?iziToast.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):(p(t.hits),f=new h(".gallery a"),f.refresh())}catch{iziToast.error({title:"Error",message:"Failed to fetch images. Please try again!"})}finally{w()}});
//# sourceMappingURL=index.js.map
