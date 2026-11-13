(() => {
 'use strict';
 if(document.querySelector('#woggles-launcher'))return;
 const publicContact=['Contact a leader','contact.html'];
 const topics={
  meetings:{title:'Meeting times',text:'Cubs usually meet on Mondays, 18:00–19:30. Scouts usually meet on Wednesdays, 18:00–20:00, at Sunderland Street Scout Hall. Check with a leader for school breaks, closures or changes before travelling.',links:[['Cubs evenings','cubs.html'],['Scouts evenings','scouts.html'],publicContact]},
  joining:{title:'Joining & first visits',text:'Start by arranging a first visit with a leader. A parent or carer can meet the team, ask questions and discuss what would help their child settle in. A visit or membership place is confirmed by a leader, not by this chat.',links:[['Plan a first visit','our-story.html#first-visit'],publicContact]},
  ages:{title:'Ages & sections',text:'Our website lists Cubs for ages 7–10 and Scouts for ages 11–17. A leader can help you choose the right section and discuss moving between them.',links:[['About Cubs','cubs.html'],['About Scouts','scouts.html'],publicContact]},
  uniform:{title:'Uniform & scarf',text:'First Factreton Cubs and Scouts wear full khaki with our group scarf in yellow, light blue and grey. Please speak to a leader before buying uniform. Our illustrated guide shows Cub and Scout badge positions.',links:[['Uniform & badge positions','uniform.html'],['Official Scout shop','https://shop.scouts.org.za/'],publicContact]},
  kit:{title:'What to bring',text:'For a first visit, check the activity plan with a leader. Comfortable clothes, closed shoes and drinking water are useful starting points. Outdoor activities may need extra kit; the leader will confirm it.',links:[['First-visit checklist','our-story.html#first-visit'],publicContact]},
  fees:{title:'Fees & availability',text:'Current joining fees, subscriptions and available places are not published on our website. Please ask Donovan or the group for the confirmed amounts and arrangements. I cannot quote fees, take payment or reserve a place.',links:[publicContact,['Email the group','mailto:1stfactretonscoutgroup@gmail.com']]},
  location:{title:'Find the hall',text:'We meet at Sunderland Street Scout Hall, next to the community centre in Factreton, Cape Town. Arrange your visit with a leader and check the meeting details before travelling.',links:[['Open Google Maps','https://www.google.com/maps/place/1st+Factreton+Scout+Group/@-33.905376,18.518527,17z/data=!3m1!4b1!4m6!3m5!1s0x1dcc5da9d7ddcd4d:0x8b313ca73d08ae50!8m2!3d-33.905376!4d18.518527!16s%2Fg%2F11l2gzr4sx'],publicContact]},
  badges:{title:'Badges & learning',text:'Our learning corner has Cubs and Scouts badge guides, advancement introductions and links to the full official requirements. You can ask me for a badge by name. A leader confirms the requirements, assessment and award; this chat does not sign anything off.',links:[['Explore badge guides','learn.html'],['Badge placement','uniform.html']]},
  calendar:{title:'Public events',text:'The public Calendar and Event planner show district and regional opportunities. Listed 2027 dates are provisional pending the 2 December 2026 review; confirm details with the organiser. A listing does not mean First Factreton is attending. Group meeting schedules, camps, hikes and activity plans are not included in the public data.',links:[['Public calendar','calendar.html'],['Event planner','planner.html'],publicContact]},
  private:{title:'Private group information',text:'I use public website information only. Individual progress, attendance, parent contacts, private Group plans and member accounts are not connected to this helper. Please use your verified member channel or ask a leader for that information.',links:[publicContact,['Privacy information','privacy.html']]},
  contact:{title:'Contact our leaders',text:'Donovan Storkey is our Scout Group Leader. Call 071 686 5503 or email 1stfactretonscoutgroup@gmail.com. These links open your own phone or email app; this chat does not send a message to the group.',links:[['Call Donovan','tel:+27716865503'],['Email the group','mailto:1stfactretonscoutgroup@gmail.com'],publicContact]},
  help:{title:'Help the group',text:'Parents, carers and other adults can speak to the group about helping out. The Our Story page introduces some ways to support Scouting; leaders can explain current needs and the next steps.',links:[['Helping out','our-story.html#help-out'],publicContact]},
  history:{title:'Our story',text:'First Factreton Scout Group was founded in 1952. Our Story page brings together the group history, recorded achievements and source links. The PLTU Honour Roll is also available on the website.',links:[['Read Our Story','our-story.html'],['PLTU Honour Roll','pltu-honour.html']]},
  about:{title:'About Woggles',text:'I’m Woggles, First Factreton’s website guide. I match questions to reviewed public answers and guide links; I’m not a live leader or a generative-AI chat. Chat text stays on this page and is not saved or sent by this helper. Clear chat removes it, and leaving or reloading the page starts again.',links:[['Privacy & enquiries','privacy.html'],publicContact]},
  unknown:{title:'Let’s find the right person',text:'I don’t have a confirmed answer to that question. Try a topic below, ask for a badge by name, or contact a leader for group-specific details. I won’t guess arrangements or make a booking.',links:[publicContact,['Explore the website','learn.html']]}
 };
 const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
 const guides=Array.isArray(window.FactretonGuideLinks)?window.FactretonGuideLinks:[];
 function answer(question){
  const q=norm(question);
  if(/\b(progress|attendance|register|password|login|log in|account|parent contact|parents number|private|member record|medical|medication|safeguarding|bullying|emergency|sign off|signoff)\b/.test(q))return topics.private;
  if(/\b(fee|fees|cost|costs|price|prices|pay|payment|subscription|subscriptions|space|spaces|availability|waiting list)\b/.test(q))return topics.fees;
  if(/\b(contact|phone|telephone|call|email|donovan|leader|leaders|sgl|message|whatsapp)\b/.test(q))return topics.contact;
  if(/\b(uniform|scarf|scarves|neckerchief|woggle|belt|badge position|badge placement|wear|shop|buy|hoodie|merchandise|t shirt|tshirt)\b/.test(q))return topics.uniform;
  if(/\b(camp|camps|hike|hikes|hiking dates|calendar|event|events|competition|competitions|holiday|holidays|ramadan|programme|program|planner|tonight|tomorrow)\b/.test(q))return topics.calendar;
  const section=/\bcubs?\b/.test(q)?'Cubs':/\bscouts?\b/.test(q)?'Scouts':null;
  const matches=guides.filter(g=>{const n=norm(g.title);return(!section||g.section===section)&&n.length>=4&&(' '+q+' ').includes(' '+n+' ');}).sort((a,b)=>b.title.length-a.title.length);
  if(matches.length){return{title:'Badge guides to explore',text:'These public guides can help you get started. They are learning summaries with official requirement links; a leader confirms the assessment and award. This chat does not track completion or sign off badges.',links:matches.slice(0,3).map(g=>[g.title+' · '+g.kind,g.page])};}
  if(/\b(badge|badges|advancement|award|awards|requirement|requirements|earn|earning)\b/.test(q))return topics.badges;
  if(/\b(age|ages|old|year old|years old|section|sections|young|younger|older)\b/.test(q))return topics.ages;
  if(/\b(when|time|times|day|days|meet|meets|meeting|meetings|monday|mondays|wednesday|wednesdays|start|finish)\b/.test(q))return topics.meetings;
  if(/\b(where|address|location|directions|map|maps|hall|parking|sunderland)\b/.test(q))return topics.location;
  if(/\b(bring|kit|water|shoes|checklist)\b/.test(q))return topics.kit;
  if(/\b(join|joining|visit|visiting|try|beginner|beginners|sign up|signup|enrol|enroll|registering)\b/.test(q))return topics.joining;
  if(/\b(volunteer|volunteering|help out|helping out|support|donate|donation)\b/.test(q))return topics.help;
  if(/\b(history|story|founded|founding|1952|pltu|honour|honor|trophies|trophy)\b/.test(q))return topics.history;
  if(/\b(woggles|bot|ai|chatgpt|privacy|save|saved|who are you|what can you do|hello|hi|hey|help)\b/.test(q))return topics.about;
  if(/\b(cubs?|pack)\b/.test(q))return{...topics.meetings,text:'Cubs are for ages 7–10 and usually meet on Mondays, 18:00–19:30. Arrange a first visit with a leader and check for any changes before travelling.',links:[['About Cubs','cubs.html'],publicContact]};
  if(/\b(scouts?|scouting|troop)\b/.test(q))return{...topics.meetings,text:'Scouts are for ages 11–17 and usually meet on Wednesdays, 18:00–20:00. Arrange a first visit with a leader and check for any changes before travelling.',links:[['About Scouts','scouts.html'],publicContact]};
  return topics.unknown;
 }
 const launcher=document.createElement('button');launcher.id='woggles-launcher';launcher.className='woggles-launcher';launcher.type='button';launcher.setAttribute('aria-haspopup','dialog');launcher.setAttribute('aria-controls','woggles-dialog');launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-label','Ask Woggles, our website guide');
 launcher.innerHTML='<img src="assets/woggles.webp" alt="" width="68" height="46"><span>Ask Woggles</span>';
 const dialog=document.createElement('dialog');dialog.id='woggles-dialog';dialog.className='woggles-dialog';dialog.setAttribute('aria-labelledby','woggles-title');
 dialog.innerHTML='<header class="woggles-head"><img src="assets/woggles.webp" alt="" width="78" height="52"><div><h2 id="woggles-title" tabindex="-1">Hi, I’m Woggles.</h2><p>Your First Factreton website guide</p></div><button type="button" class="woggles-close" aria-label="Close Woggles">×</button></header><p class="woggles-disclosure">Reviewed public answers · Not a live leader</p><div class="woggles-log" role="log" aria-live="polite" aria-label="Conversation with Woggles"></div><div class="woggles-topics" aria-label="Suggested topics"></div><form class="woggles-form"><label for="woggles-question">What would you like to know?</label><div><input id="woggles-question" name="question" type="text" maxlength="300" placeholder="Try meeting times or First Aid badge" autocomplete="off"><button type="submit" aria-label="Ask Woggles">Ask</button></div></form><footer class="woggles-foot"><button type="button" class="woggles-clear">Clear chat</button><span>Chat text isn’t saved or sent.</span><a href="privacy.html">Privacy</a></footer>';
 document.body.append(launcher,dialog);
 const log=dialog.querySelector('.woggles-log'),input=dialog.querySelector('input'),quick=dialog.querySelector('.woggles-topics');let previousFocus;
 const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
 function message(text,from='Woggles',links=[]){
  const item=node('div','woggles-message '+(from==='You'?'woggles-user':'woggles-answer'));item.append(node('strong','woggles-speaker',from),node('p','',text));
  if(links.length){const nav=node('nav','woggles-links');nav.setAttribute('aria-label','Related pages');for(const[label,href]of links){if(!/^(?:[a-z0-9-]+\.html(?:#[a-z0-9-]+)?|https:\/\/(?:shop\.scouts\.org\.za|www\.google\.com)\/[^\s]*|mailto:1stfactretonscoutgroup@gmail\.com|tel:\+27716865503)$/.test(href))continue;const a=node('a','',label);a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',label+' (opens in a new tab)');}nav.append(a);}item.append(nav);}
  log.append(item);while(log.children.length>13)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;
 }
 function welcome(){log.replaceChildren();message('I can help you find meeting times, joining information, uniform advice, directions and badge guides. Choose a topic or type a question. For personal records or confirmed group arrangements, please ask a leader.');input.value='';}
 function ask(text,key){const clean=text.trim().slice(0,300);if(!clean)return;message(clean,'You');const reply=key?topics[key]:answer(clean);message(reply.text,'Woggles',reply.links);input.value='';}
 for(const key of['meetings','joining','uniform','badges','fees','contact']){const b=node('button','',topics[key].title);b.type='button';b.addEventListener('click',()=>ask(topics[key].title,key));quick.append(b);}
 launcher.addEventListener('click',()=>{previousFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');launcher.setAttribute('aria-expanded','true');dialog.querySelector('h2').focus();});
 dialog.querySelector('.woggles-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{launcher.setAttribute('aria-expanded','false');if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');previousFocus?.focus();});
 dialog.querySelector('form').addEventListener('submit',e=>{e.preventDefault();ask(input.value);});
 dialog.querySelector('.woggles-clear').addEventListener('click',()=>{welcome();input.focus();});
 window.addEventListener('pagehide',()=>{welcome();if(dialog.open)dialog.close();});
 welcome();
})();
