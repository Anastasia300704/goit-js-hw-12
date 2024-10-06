import{i as p}from"./assets/vendor-I1I71QQ2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();let l="",i=1;const u=15,h=document.querySelector(".search-form"),c=document.querySelector(".gallery"),n=document.querySelector(".load-more"),f=document.querySelector(".loader");async function y(t,s){try{return(await axios.get("https://pixabay.com/api/",{params:{key:"YOUR_API_KEY",q:t,page:s,per_page:u}})).data}catch(r){console.error("Error fetching images:",r)}}async function m(){L();try{const t=await y(l,i);i===1&&(c.innerHTML=""),g(t.hits),t.hits.length<u||c.childElementCount>=t.totalHits?(n.classList.add("hidden"),v()):n.classList.remove("hidden")}catch(t){console.error("Error fetching images:",t)}finally{b()}}h.addEventListener("submit",t=>{t.preventDefault(),l=t.target.elements.searchQuery.value.trim(),i=1,m()});n.addEventListener("click",()=>{i+=1,m()});function g(t){const s=t.map(r=>`
    <div class="photo-card">
      <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b>: ${r.likes}</p>
        <p><b>Views</b>: ${r.views}</p>
        <p><b>Comments</b>: ${r.comments}</p>
        <p><b>Downloads</b>: ${r.downloads}</p>
      </div>
    </div>
  `).join("");c.insertAdjacentHTML("beforeend",s)}function L(){f.classList.remove("hidden"),n.classList.add("hidden")}function b(){f.classList.add("hidden"),c.childElementCount<totalHits&&n.classList.remove("hidden")}function v(){p.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}
//# sourceMappingURL=index.js.map
