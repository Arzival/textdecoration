import type { Phrase } from '../types'
import { estimateDuration } from '../utils/estimateDuration'

export function buildJs(phrases: Phrase[]): string {
  const ids = phrases.map((_, i) => `p${i + 1}`)

  const durations: Record<string, number> = {}
  phrases.forEach((p, i) => {
    durations[`p${i + 1}`] = p.duration || estimateDuration(p)
  })

  const ITEM_SEL: Record<string, string>  = {}
  const ITEM_DELAY: Record<string, number> = {}
  const ITEM_STEP: Record<string, number>  = {}

  phrases.forEach((p, i) => {
    const id = `p${i + 1}`
    if (p.styleType === 'list-items') { ITEM_SEL[id] = '.list-card';  ITEM_DELAY[id] = 640; ITEM_STEP[id] = 420 }
    if (p.styleType === 'checklist')  { ITEM_SEL[id] = '.check-item'; ITEM_DELAY[id] = 660; ITEM_STEP[id] = 390 }
    if (p.styleType === 'chain')      { ITEM_SEL[id] = '.chain-item'; ITEM_DELAY[id] = 760; ITEM_STEP[id] = 520 }
  })

  const compIds = phrases
    .map((p, i) => (p.styleType === 'comparison' ? `p${i + 1}` : null))
    .filter((id): id is string => id !== null)

  const totalMs = 2000 + phrases.reduce((s, p, i) => s + 600 + (durations[`p${i + 1}`] ?? 7500) + 450 + 2000, 0)

  return `
const INIT_WAIT=2000,ANIM_IN=600,ANIM_OUT=450,PAUSE=2000;
const PHRASE_IDS=${JSON.stringify(ids)};
const DURATIONS=${JSON.stringify(durations)};
const TOTAL_MS=${totalMs};
const ITEM_SEL=${JSON.stringify(ITEM_SEL)};
const ITEM_DELAY=${JSON.stringify(ITEM_DELAY)};
const ITEM_STEP=${JSON.stringify(ITEM_STEP)};
const COMP_IDS=${JSON.stringify(compIds)};

let mainTimer=null,itemTimers=[],rafId=null,progStart=null;
const orig={};
['s1','sEnd'].forEach(id=>orig[id]=document.getElementById(id).innerHTML);

function startProgress(){
  progStart=performance.now();
  function tick(){
    const pct=Math.min(100,(performance.now()-progStart)/TOTAL_MS*100);
    document.getElementById('prog').style.width=pct+'%';
    if(pct<100)rafId=requestAnimationFrame(tick);
  }
  rafId=requestAnimationFrame(tick);
}
function stopProgress(){
  if(rafId){cancelAnimationFrame(rafId);rafId=null;}
  const p=document.getElementById('prog');
  if(p)p.style.width='0%';
}
function activateScene(id){
  ['s1','sEnd'].forEach(sid=>{
    const el=document.getElementById(sid);
    if(sid===id){el.innerHTML=orig[sid];el.classList.add('active');}
    else{el.classList.remove('active');}
  });
}
function animateItems(el,id){
  const sel=ITEM_SEL[id];if(!sel)return;
  el.querySelectorAll(sel).forEach((item,i)=>{
    const t=setTimeout(()=>item.classList.add('visible'),ITEM_DELAY[id]+i*ITEM_STEP[id]);
    itemTimers.push(t);
  });
}
function animateComparison(el){
  const cards=el.querySelectorAll('.cmp-card');
  const verdict=el.querySelector('.cmp-verdict');
  if(!cards.length)return;
  const t1=setTimeout(()=>cards[0].classList.add('enter-l'),ANIM_IN+150);
  const t2=setTimeout(()=>cards[1].classList.add('enter-r'),ANIM_IN+430);
  const t3=setTimeout(()=>{if(verdict)verdict.classList.add('visible');},ANIM_IN+1300);
  itemTimers.push(t1,t2,t3);
}
function showPhrase(idx){
  if(idx>=PHRASE_IDS.length){
    mainTimer=setTimeout(()=>{stopProgress();activateScene('sEnd');},400);
    return;
  }
  const id=PHRASE_IDS[idx];
  const el=document.getElementById(id);
  el.classList.add('entering');
  animateItems(el,id);
  if(COMP_IDS.includes(id))animateComparison(el);
  mainTimer=setTimeout(()=>{
    itemTimers.forEach(clearTimeout);itemTimers=[];
    el.classList.remove('entering');
    el.classList.add('exiting');
    mainTimer=setTimeout(()=>showPhrase(idx+1),ANIM_OUT+PAUSE);
  },ANIM_IN+DURATIONS[id]);
}
function clearAll(){
  if(mainTimer){clearTimeout(mainTimer);mainTimer=null;}
  itemTimers.forEach(clearTimeout);itemTimers=[];
}
function start(){
  clearAll();stopProgress();activateScene('s1');
  mainTimer=setTimeout(()=>{startProgress();showPhrase(0);},INIT_WAIT);
}
start();
`.trim()
}
