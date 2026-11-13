(() => {
 'use strict';
 const root=document.querySelector('[data-calendar-view]'),data=window.FactretonCalendar;
 if(!root||!data)return;
 root.classList.add('calendar-ready');
 const planner=root.dataset.calendarView==='planner',year=data.year;
 const monthNames=Array.from({length:12},(_,i)=>new Intl.DateTimeFormat('en-ZA',{month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(year,i,1))));
 const dayFormat=new Intl.DateTimeFormat('en-ZA',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
 const shortMonth=new Intl.DateTimeFormat('en-ZA',{month:'short',timeZone:'UTC'});
 const parseDate=s=>new Date(s+'T12:00:00Z');
 const dayText=s=>dayFormat.format(parseDate(s));
 const rangeText=e=>e.start===e.end?dayText(e.start):dayText(e.start)+' – '+dayText(e.end);
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const monthKey=i=>year+'-'+String(i+1).padStart(2,'0');
 const idMap=new Map(data.events.map(e=>[e.id,e]));
 const url=new URL(location.href),params=url.searchParams;
 const requestedMonth=params.get('month');
 const validMonth=requestedMonth&&new RegExp('^'+year+'-(0[1-9]|1[0-2])$').test(requestedMonth);
 const state={scope:['District','Regional','Group'].includes(params.get('scope'))?params.get('scope'):'All',section:['Cubs','Scouts','Leaders'].includes(params.get('section'))?params.get('section'):'All',month:validMonth?Number(requestedMonth.slice(-2))-1:planner?'all':0,q:(params.get('q')||'').slice(0,100),day:null,event:null};
 const ui={scope:root.querySelector('#scope-filter'),section:root.querySelector('#section-filter'),month:root.querySelector('#month-filter'),search:root.querySelector('#calendar-search'),grid:root.querySelector('#calendar-grid'),entries:root.querySelector('#calendar-entries'),count:root.querySelector('#calendar-count'),agenda:root.querySelector('#agenda-heading'),showMonth:root.querySelector('#show-month'),heading:root.querySelector('#month-heading'),prev:root.querySelector('#previous-month'),next:root.querySelector('#next-month')};
 const moreIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>';
 ui.month.innerHTML=(planner?'<option value="all">Whole year</option>':'')+monthNames.map((m,i)=>`<option value="${i}">${m} ${year}</option>`).join('');
 ui.scope.value=state.scope;ui.section.value=state.section;ui.month.value=state.month;ui.search.value=state.q;
 function fits(e){return(state.scope==='All'||e.scope===state.scope)&&(state.section==='All'||e.section===state.section||e.section==='All')&&(!state.q||[e.title,e.summary,e.scope,e.section,e.kind,e.description].join(' ').toLocaleLowerCase().includes(state.q.toLocaleLowerCase().trim()));}
 function inMonth(e,m){const start=monthKey(m)+'-01',end=monthKey(m)+'-'+new Date(Date.UTC(year,m+1,0)).getUTCDate();return e.start<=end&&e.end>=start;}
 function route(mode,e){const p=new URLSearchParams();p.set('month',e?e.start.slice(0,7):state.month==='all'?'all':monthKey(state.month));if(state.scope!=='All')p.set('scope',state.scope);if(state.section!=='All')p.set('section',state.section);if(state.q)p.set('q',state.q);if(e)p.set('event',e.id);return mode+'.html?'+p.toString();}
 function syncUrl(){const p=new URLSearchParams();if(state.month!=='all')p.set('month',monthKey(state.month));if(state.scope!=='All')p.set('scope',state.scope);if(state.section!=='All')p.set('section',state.section);if(state.q)p.set('q',state.q);if(state.event)p.set('event',state.event);history.replaceState(null,'',location.pathname+(p.size?'?'+p:'')+location.hash);}
 function renderGrid(matches){
  const m=state.month,first=(new Date(Date.UTC(year,m,1)).getUTCDay()+6)%7,total=new Date(Date.UTC(year,m+1,0)).getUTCDate(),cells=Math.ceil((first+total)/7)*7;
  const breaks=new Set(data.schoolHolidayDates),today=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Johannesburg',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  ui.grid.innerHTML=Array.from({length:cells},(_,i)=>{const day=i-first+1;if(day<1||day>total)return'<span class="calendar-outside" aria-hidden="true"></span>';const key=monthKey(m)+'-'+String(day).padStart(2,'0'),entries=matches.filter(e=>e.start<=key&&key<=e.end);const scopes=[...new Set(entries.map(e=>e.scope))];return`<button type="button" class="calendar-day${breaks.has(key)?' calendar-break':''}${key===state.day?' calendar-selected':''}${key===today?' calendar-today':''}" data-day="${key}" aria-pressed="${key===state.day}" aria-label="${escape(dayText(key))}, ${entries.length} ${entries.length===1?'entry':'entries'}${breaks.has(key)?', school break or public holiday':''}"><span class="calendar-day-number">${day}</span><span class="calendar-day-markers" aria-hidden="true">${scopes.map(scope=>`<i class="scope-${scope.toLowerCase()}"></i>`).join('')}</span>${entries.length?`<span class="calendar-day-count">${entries.length} <span>${entries.length===1?'entry':'entries'}</span></span>`:''}</button>`;}).join('');
  ui.heading.textContent=monthNames[m]+' '+year;ui.prev.disabled=m===0;ui.next.disabled=m===11;
 }
 function row(e){const date=parseDate(e.start),end=e.start!==e.end?`<span class="entry-end">to ${parseDate(e.end).getUTCDate()} ${shortMonth.format(parseDate(e.end))}</span>`:'';return`<article class="calendar-event" data-entry-id="${escape(e.id)}"><div class="calendar-date-block"><strong>${date.getUTCDate()}</strong><span>${shortMonth.format(date)}</span>${end}</div><div class="calendar-event-copy"><p class="calendar-event-context"><span class="calendar-scope scope-${e.scope.toLowerCase()}">${escape(e.scope)}</span> ${escape(e.section)} · ${escape(e.kind)}</p><h3><button type="button" data-full-entry="${escape(e.id)}">${escape(e.title)}</button></h3><p>${escape(e.summary)}</p><p class="calendar-event-time">${escape(e.time?(e.time+'–'+e.endTime+' SAST'):'Time to be confirmed')} <span class="calendar-status status-${e.status.toLowerCase()}">${escape(e.status)}</span></p></div><details class="calendar-more"><summary aria-label="More options for ${escape(e.title)}">${moreIcon}<span>More</span></summary><div class="calendar-more-menu"><button type="button" data-full-entry="${escape(e.id)}">View full entry</button><a href="${escape(route(planner?'calendar':'planner',e))}">${planner?'Show on calendar':'View in group planner'}</a></div></details></article>`;}
 function render(){
  const matches=data.events.filter(fits),visible=matches.filter(e=>state.month==='all'||inMonth(e,state.month));
  if(!planner)renderGrid(visible);
  const entries=state.day?visible.filter(e=>e.start<=state.day&&state.day<=e.end):visible;
  ui.count.textContent=visible.length+' '+(visible.length===1?'entry':'entries')+(state.month==='all'?' in '+year:' in '+monthNames[state.month])+(state.scope==='All'?'':' · '+state.scope);
  ui.agenda.textContent=state.day?dayText(state.day):planner?'The group plan':monthNames[state.month]+' entries';ui.showMonth.hidden=!state.day;
  if(entries.length){
   if(planner&&state.month==='all'){const groups=new Map();for(const e of entries){const k=e.start.slice(0,7);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(e);}ui.entries.innerHTML=[...groups].map(([k,items])=>`<section class="planner-month" aria-labelledby="planner-${k}"><h3 class="planner-month-title" id="planner-${k}">${monthNames[Number(k.slice(-2))-1]} ${year}<span>${items.length} ${items.length===1?'entry':'entries'}</span></h3>${items.map(row).join('')}</section>`).join('');}
   else ui.entries.innerHTML=entries.map(row).join('');
  }else{ui.entries.innerHTML=`<div class="calendar-empty"><h3>${state.scope==='District'?'District dates are still to come.':'No matching entries.'}</h3><p>${state.scope==='District'?'No district dates have been published in this group plan yet.':'Try another month, section or search term.'}</p><button type="button" class="calendar-reset" data-reset>Reset filters</button></div>`;}
  document.querySelectorAll('.calendar-tabs a').forEach(a=>{a.href=route(a.textContent.trim()==='Calendar'?'calendar':'planner');});
  syncUrl();
 }
 function reset(){state.scope='All';state.section='All';state.q='';state.day=null;ui.scope.value='All';ui.section.value='All';ui.search.value='';render();}
 function filter(){state.scope=ui.scope.value;state.section=ui.section.value;state.month=ui.month.value==='all'?'all':Number(ui.month.value);state.q=ui.search.value.trim();state.day=null;render();}
 root.querySelector('form').addEventListener('submit',e=>e.preventDefault());
 for(const el of[ui.scope,ui.section,ui.month])el.addEventListener('change',filter);
 ui.search.addEventListener('input',filter);root.querySelector('#calendar-reset').addEventListener('click',reset);ui.showMonth.addEventListener('click',()=>{state.day=null;render();});
 ui.prev.addEventListener('click',()=>{if(state.month>0){state.month--;state.day=null;ui.month.value=state.month;render();}});
 ui.next.addEventListener('click',()=>{if(state.month<11){state.month++;state.day=null;ui.month.value=state.month;render();}});
 const dialog=document.querySelector('#calendar-entry-dialog');let returnFocus;
 function closeMore(){root.querySelectorAll('.calendar-more[open]').forEach(d=>{d.open=false;});}
 function showEntry(id,trigger){const e=idMap.get(id);if(!e)return;returnFocus=trigger?.closest('details')?.querySelector('summary')||trigger;closeMore();state.event=id;
  dialog.querySelector('#entry-context').textContent=e.scope+' · '+e.section+' · '+e.kind;
  dialog.querySelector('#entry-title').textContent=e.title;dialog.querySelector('#entry-status').textContent=e.status;
  dialog.querySelector('#entry-facts').innerHTML=[['Dates',rangeText(e)],['Time',e.time?e.time+'–'+e.endTime+' SAST':'To be confirmed'],['Location',e.location],['Listed in',e.sourceLabel]].map(([k,v])=>`<div><dt>${escape(k)}</dt><dd>${escape(v)}</dd></div>`).join('');
  dialog.querySelector('#entry-description').innerHTML=`<h3>About this entry</h3><p>${escape(e.description)}</p><h3>Before you go</h3><p>${escape(e.preparation)}</p>${e.source?`<p><a class="inline-link" href="${escape(e.source)}" target="_blank" rel="noopener noreferrer">Check with the regional organiser ↗</a></p>`:''}`;
  dialog.querySelector('#entry-actions').innerHTML=`<a class="button gold" href="${escape(route(planner?'calendar':'planner',e))}">${planner?'Show on calendar':'View in group planner'}</a><a class="inline-link" href="contact.html">Ask the group</a>`;
  if(!dialog.open)dialog.showModal();document.body.classList.add('modal-open');syncUrl();
 }
 dialog.querySelector('.calendar-dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{state.event=null;syncUrl();document.body.classList.remove('modal-open');if(returnFocus?.isConnected)returnFocus.focus();});
 root.addEventListener('click',e=>{const full=e.target.closest('[data-full-entry]');if(full){showEntry(full.dataset.fullEntry,full);return;}const day=e.target.closest('[data-day]');if(day){state.day=state.day===day.dataset.day?null:day.dataset.day;render();root.querySelector(`[data-day="${day.dataset.day}"]`)?.focus();return;}if(e.target.closest('[data-reset]'))reset();});
 root.addEventListener('toggle',e=>{if(e.target.matches('.calendar-more')&&e.target.open)root.querySelectorAll('.calendar-more[open]').forEach(d=>{if(d!==e.target)d.open=false;});},true);
 document.addEventListener('click',e=>{if(!e.target.closest('.calendar-more'))closeMore();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.open){const open=root.querySelector('.calendar-more[open]');if(open){open.open=false;open.querySelector('summary').focus();}}});
 render();
 const deep=idMap.get(params.get('event'));if(deep)showEntry(deep.id,null);
})();
