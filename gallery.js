'use strict';

const galleryCategories = {all:'All photos',cubs:'Cub adventures',hall:'At the hall',raft:'Raft building',outdoors:'Out & about'};
// Curated public descriptions only. Email provenance stays in the private archive.
const galleryPhotos = [
 [1,'outdoors','Out exploring together','Cubs and leaders gathered outside during a group outing.'],
 [2,'hall','Together in uniform','A group standing together in khaki uniform at the hall.'],
 [3,'hall','An evening at the hall','Scouts and leaders gathered in the hall.'],
 [4,'hall','Ready for the evening','The group lined up together at the hall.'],
 [5,'hall','A place to belong','A wide view of the group gathered indoors.'],
 [6,'hall','Listening and learning','A leader speaking with Scouts at the hall.'],
 [7,'cubs','A small world to discover','Cubs looking closely at a planted bottle outdoors.'],
 [8,'cubs','Curiosity in action','Cubs and a leader exploring their planted bottles together.'],
 [9,'cubs','Learning something new','A small group sharing an outdoor nature activity.'],
 [10,'cubs','Look what we made','A Cub holding up a planted bottle to share with the group.'],
 [11,'outdoors','Together beyond the hall','Cubs, Scouts and leaders together on a grassy field.'],
 [12,'outdoors','Flying the colours','Scouts carrying purple Scout flags outdoors.'],
 [13,'outdoors','Part of something bigger','Groups gathering on a field for an outdoor Scout activity.'],
 [14,'raft','Every lashing counts','A team fastening ropes around the spars of a raft.'],
 [15,'raft','Many hands, one build','Teams working on raft frames beside the water.'],
 [16,'raft','Start with a plan','A team gathering beside the spars and barrels for a raft build.'],
 [17,'raft','From a little idea','A small model of a raft with a shelter and miniature paddles.'],
 [18,'raft','Built as a team','A team in green shirts gathered beside their completed raft.'],
 [19,'raft','Ready by the water','The raft crew gathered on their raft beside the water.'],
 [20,'raft','A platform for adventure','A broad raft deck with spars standing above it.'],
 [21,'raft','Skills put to work','Scouts working together to lash wooden spars on the grass.'],
 [22,'raft','The work beneath the deck','A close view of the lashed frame and barrels beneath a raft.'],
 [23,'raft','Out on the water','A raft with a small shelter floating on the water.'],
 [24,'raft','The build comes together','A side view of the finished raft on the water.'],
 [25,'raft','A different kind of adventure','A raft crew and a person in the water beside the raft.'],
 [26,'raft','Meet the crew','The raft crew standing together in orange lifejackets.'],
 [27,'hall','Practical skills, together','Scouts practising with a wooden stave at the hall.'],
 [28,'cubs','Hands-on discovery','Cubs and a leader working with bowls and activity materials.'],
 [29,'cubs','Making and exploring','Cubs taking part in a practical table activity with a leader.'],
 [30,'hall','Ready, together','Scouts in khaki uniform standing together at the hall.'],
 [31,'hall','Taking the next step','A Scout standing beside a small flag at the hall.'],
 [32,'cubs','Learning around the table','Cubs working at a table while a leader guides the activity.'],
 [33,'cubs','Concentrating on the challenge','Two Cubs concentrating on a table activity.'],
 [34,'cubs','A little help along the way','A leader helping two Cubs with a practical task.'],
 [35,'cubs','A story to share','Cubs sitting together while a leader reads to the group.'],
 [36,'cubs','Pack time','Cubs and a leader gathered together at the hall.'],
 [37,'hall','Learning by doing','Two Scouts practising a lashing on wooden staves.'],
 [38,'hall','Taking care with the turns','A Scout concentrating on a lashing at the hall.'],
 [39,'hall','Proud of the build','A Scout holding a small frame made from lashed staves.'],
 [40,'outdoors','Exploring somewhere new','A group with backpacks gathered outside during an outing.'],
 [41,'outdoors','The next adventure awaits','A group walking along a marked path through coastal surroundings.']
].map(([number,category,title,alt])=>({number,category,title,alt,src:`assets/gallery-${String(number).padStart(2,'0')}.jpg`}));

function gallery(){return `<section class="gallery-intro content"><div><p class="eyebrow">First Factreton in pictures</p><h1>Little moments.<br>Big adventures.</h1><p>From curious Cub evenings to teamwork on the water, a look at life with our group.</p><a class="button dark" href="#photos">Explore the gallery ${arrow}</a><p class="gallery-intro-note">${galleryPhotos.length} photographs · Cubs, Scouts and our wider Scouting adventures</p></div><figure><img src="assets/gallery-11.jpg" width="1024" height="768" alt="Cubs, Scouts and leaders gathered together outdoors." fetchpriority="high"><figcaption>Friendship. Practical skills. A place to belong.</figcaption></figure></section><section class="gallery-section content" id="photos" aria-labelledby="gallery-heading"><div class="gallery-heading"><div><h2 id="gallery-heading">Our adventures, together.</h2><p>Choose a collection, or enjoy a little of everything.</p></div><p id="gallery-count" role="status"></p></div><div class="gallery-filters" role="group" aria-label="Filter gallery photos">${Object.entries(galleryCategories).map(([key,label])=>`<button type="button" data-gallery-filter="${key}" aria-pressed="${key==='all'}">${label}</button>`).join('')}</div><div class="photo-grid" id="photo-grid"></div><div class="gallery-more"><button class="button dark" type="button" id="gallery-more">Show more photos ${arrow}</button></div><p class="gallery-contact">Questions about a photograph? <a class="inline-link" href="contact.html">Contact the group</a>.</p></section><dialog class="photo-viewer" id="photo-viewer" aria-labelledby="photo-title"><div class="photo-viewer-top"><p id="photo-position"></p><button class="close-dialog" type="button" aria-label="Close photo">×</button></div><div class="photo-stage"><img id="photo-large" alt=""></div><div class="photo-viewer-bottom"><div><p class="gallery-category" id="photo-category"></p><h2 id="photo-title"></h2><p id="photo-description"></p></div><div class="photo-controls"><button type="button" id="photo-previous" aria-label="Previous photo">←</button><button type="button" id="photo-next" aria-label="Next photo">→</button></div></div></dialog>${visit()}`;}

function setupGallery(){
 const grid=document.querySelector('#photo-grid');if(!grid)return;
 let filter='all',limit=12,selected=0;
 const viewer=document.querySelector('#photo-viewer');
 const subset=()=>galleryPhotos.filter(photo=>filter==='all'||photo.category===filter);
 function render(focusNew=false){
  const photos=subset(),previousCount=grid.children.length;
  grid.innerHTML=photos.slice(0,limit).map(photo=>`<figure class="photo-card"><a href="${photo.src}" data-photo-open="${photo.number}" aria-label="Open photo ${photo.number}: ${photo.title}"><div class="photo-frame"><img src="${photo.src}" alt="${photo.alt}" width="1024" height="768" loading="lazy" decoding="async"><span class="photo-expand" aria-hidden="true">↗</span></div><figcaption><span class="gallery-category">${galleryCategories[photo.category]}</span><h3>${photo.title}</h3></figcaption></a></figure>`).join('');
  document.querySelector('#gallery-count').textContent=`Showing ${Math.min(limit,photos.length)} of ${photos.length} photos`;
  document.querySelector('#gallery-more').hidden=limit>=photos.length;
  if(focusNew)grid.querySelectorAll('[data-photo-open]')[previousCount]?.focus();
 }
 function showPhoto(){
  const photos=subset(),photo=photos[selected];
  const image=document.querySelector('#photo-large');image.src=photo.src;image.alt=photo.alt;
  document.querySelector('#photo-title').textContent=photo.title;
  document.querySelector('#photo-description').textContent=photo.alt;
  document.querySelector('#photo-category').textContent=galleryCategories[photo.category];
  document.querySelector('#photo-position').textContent=`Photo ${selected+1} of ${photos.length}`;
  document.querySelector('#photo-previous').disabled=selected===0;
  document.querySelector('#photo-next').disabled=selected===photos.length-1;
 }
 document.querySelectorAll('[data-gallery-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.galleryFilter;limit=12;
  document.querySelectorAll('[data-gallery-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  render();
 }));
 document.querySelector('#gallery-more').addEventListener('click',()=>{limit+=12;render(true);});
 grid.addEventListener('click',event=>{
  const link=event.target.closest('[data-photo-open]');if(!link||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();selected=subset().findIndex(photo=>photo.number===Number(link.dataset.photoOpen));showPhoto();openDialog(viewer);
 });
 document.querySelector('#photo-previous').addEventListener('click',()=>{if(selected>0){selected--;showPhoto();}});
 document.querySelector('#photo-next').addEventListener('click',()=>{if(selected<subset().length-1){selected++;showPhoto();}});
 viewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'&&selected>0){event.preventDefault();selected--;showPhoto();}
  if(event.key==='ArrowRight'&&selected<subset().length-1){event.preventDefault();selected++;showPhoto();}
 });
 viewer.addEventListener('close',()=>{document.querySelector('#photo-large').removeAttribute('src');});
 render();
}
