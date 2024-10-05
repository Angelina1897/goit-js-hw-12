import{i,S as l}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function e(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();const u="46088453-a04f0c5be5b11b3b84520e583";async function d(a,o=1){const s=`https://pixabay.com/api/?key=${u}&q=${encodeURIComponent(a)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=12`;try{const e=await fetch(s);if(!e.ok)throw new Error("Failed to fetch images");return await e.json()}catch(e){throw console.error(e),e}}function f(a){const o=document.querySelector(".gallery"),s=a.map(e=>`
    <a href="${e.largeImageURL}" class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
      <div class="info">
        <p><b>Likes:</b> ${e.likes}</p>
        <p><b>Views:</b> ${e.views}</p>
        <p><b>Comments:</b> ${e.comments}</p>
        <p><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </a>
  `).join("");o.innerHTML=s}function y(){document.querySelector(".gallery").innerHTML=""}function p(){document.querySelector(".loader").style.display="block"}function m(){document.querySelector(".loader").style.display="none"}let c;document.querySelector("#search-form").addEventListener("submit",async a=>{a.preventDefault();const o=a.target.querySelector('input[name="searchQuery"]').value.trim();if(!o){i.error({title:"Error",message:"Please enter a search query!"});return}y(),p();try{const s=await d(o);s.hits.length===0?i.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):(f(s.hits),c=new l(".gallery a"),c.refresh())}catch{i.error({title:"Error",message:"Failed to fetch images. Please try again!"})}finally{m()}});
//# sourceMappingURL=index.js.map
