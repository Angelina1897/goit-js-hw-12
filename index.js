import{a as y,i as h,S as p}from"./assets/vendor-u8rapaCG.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const g="46088453-a04f0c5be5b11b3b84520e583",b="https://pixabay.com/api/";async function d(e,o=1,s=15){const r=`${b}?key=${g}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${s}`;try{return(await y.get(r)).data}catch(t){throw console.error("Error fetching images:",t),t}}function u(e){const o=document.querySelector(".gallery"),s=e.map(r=>`
      <div class="photo-card">
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b>: ${r.likes}</p>
          <p><b>Views</b>: ${r.views}</p>
          <p><b>Comments</b>: ${r.comments}</p>
          <p><b>Downloads</b>: ${r.downloads}</p>
        </div>
      </div>
    `).join("");o.insertAdjacentHTML("beforeend",s)}function L(){const e=document.querySelector(".gallery");e.innerHTML=""}function w(){const e=document.querySelector(".load-more");e.style.display="block"}function f(){const e=document.querySelector(".load-more");e.style.display="none"}function S(){h.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})}function q(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}let a="",c=1,i=0,m;const v=document.querySelector(".search-form"),$=document.querySelector(".load-more"),M=document.querySelector(".gallery");v.addEventListener("submit",E);$.addEventListener("click",B);async function E(e){if(e.preventDefault(),a=e.target.elements.searchQuery.value.trim(),a!==""){c=1,L(),f();try{const o=await d(a,c);if(i=o.totalHits,i===0)return alert("No images found for your query.");u(o.hits),m=new p(".gallery a").refresh(),o.totalHits>o.hits.length&&w()}catch(o){console.error(o)}}}async function B(){c+=1;try{const e=await d(a,c);u(e.hits),m.refresh(),M.children.length>=i&&(f(),S()),q()}catch(e){console.error(e)}}
//# sourceMappingURL=index.js.map
