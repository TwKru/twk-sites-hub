const cards=[...document.querySelectorAll('.project')];
const filters=[...document.querySelectorAll('[data-filter]')];
const search=document.querySelector('#search');
let category='all',toastTimer;
function update(){let count=0;const query=search.value.trim().toLocaleLowerCase('ru');cards.forEach(card=>{const shown=(category==='all'||card.dataset.category===category)&&card.dataset.search.toLocaleLowerCase('ru').includes(query);card.hidden=!shown;if(shown)count++;});document.querySelector('#results').textContent=`Показано проектов: ${count}`;document.querySelector('.empty').hidden=count!==0;}
filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();}));
search.addEventListener('input',update);
document.querySelector('#reset').addEventListener('click',()=>{category='all';search.value='';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='all')));update();search.focus();});
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,3000);}
async function copy(url){try{await navigator.clipboard.writeText(url);toast('Ссылка скопирована');}catch{const dialog=document.querySelector('#copy-fallback'),input=dialog.querySelector('input');input.value=url;dialog.showModal();input.focus();input.select();}}
document.querySelectorAll('.copy').forEach(button=>button.addEventListener('click',()=>copy(button.dataset.url)));
document.querySelectorAll('.share-hub').forEach(button=>button.addEventListener('click',()=>{const url=new URL(location.href);url.hash='';url.search='';copy(url.href);}));
document.querySelector('#close-dialog').addEventListener('click',()=>document.querySelector('#copy-fallback').close());
