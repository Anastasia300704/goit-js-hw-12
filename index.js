import{i as u}from"./assets/vendor-I1I71QQ2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();let f="",i=1;const h=15;let l=0;const g=document.querySelector("#search-form"),c=document.querySelector(".gallery"),n=document.querySelector("#load-more"),p=document.querySelector("#loader");async function y(t,s){try{return(await axios.get("https://pixabay.com/api/",{params:{key:"46121082-abdd5301ce27c2765f644588b",q:t,page:s,per_page:h,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(r){throw u.error({title:"Error",message:"Failed to fetch images. Please try again.",position:"topRight"}),console.error("Error fetching images:",r),r}}async function m(){L();try{const t=await y(f,i);l=t.totalHits,i===1&&(c.innerHTML=""),b(t.hits),c.childElementCount<l?n.classList.remove("hidden"):(n.classList.add("hidden"),w())}catch(t){console.error("Error during image search:",t)}finally{v()}}g.addEventListener("submit",t=>{t.preventDefault(),f=t.target.elements.searchQuery.value.trim(),i=1,m()});n.addEventListener("click",()=>{i+=1,m()});function b(t){const s=t.map(r=>`
    <div class="photo-card">
      <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b>: ${r.likes}</p>
        <p><b>Views</b>: ${r.views}</p>
        <p><b>Comments</b>: ${r.comments}</p>
        <p><b>Downloads</b>: ${r.downloads}</p>
      </div>
    </div>
  `).join("");c.insertAdjacentHTML("beforeend",s)}function L(){p.classList.remove("hidden"),n.classList.add("hidden")}function v(){p.classList.add("hidden")}function w(){u.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}
//# sourceMappingURL=index.js.map
