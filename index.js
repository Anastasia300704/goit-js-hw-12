import{i as d}from"./assets/vendor-I1I71QQ2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&u(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();let c="",n=1;const m=15;let f=0;const g=document.querySelector("#search-form"),l=document.querySelector(".gallery"),i=document.querySelector("#load-more"),p=document.querySelector("#loader");let y=new SimpleLightbox(".gallery a");async function b(r,s){try{return(await axios.get("https://pixabay.com/api/",{params:{key:"46121082-abdd5301ce27c2765f644588b",q:r,page:s,per_page:m,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(t){throw d.error({title:"Error",message:"Failed to fetch images. Please try again.",position:"topRight"}),console.error("Error fetching images:",t),t}}async function h(){w();try{const r=await b(c,n);f=r.totalHits,n===1&&(l.innerHTML=""),L(r.hits),l.childElementCount<f?i.classList.remove("hidden"):(i.classList.add("hidden"),q())}catch(r){console.error("Error during image search:",r)}finally{v()}}g.addEventListener("submit",r=>{if(r.preventDefault(),c=document.querySelector("#searchQuery").value.trim(),n=1,c===""){d.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}h()});i.addEventListener("click",()=>{n+=1,h()});function L(r){const s=r.map(t=>`
    <a href="${t.largeImageURL}" class="photo-card">
      <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b>: ${t.likes}</p>
        <p><b>Views</b>: ${t.views}</p>
        <p><b>Comments</b>: ${t.comments}</p>
        <p><b>Downloads</b>: ${t.downloads}</p>
      </div>
    </a>
  `).join("");l.insertAdjacentHTML("beforeend",s),y.refresh()}function w(){p.classList.remove("hidden"),i.classList.add("hidden")}function v(){p.classList.add("hidden")}function q(){d.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}
//# sourceMappingURL=index.js.map
