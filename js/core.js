/* Drake Hub core: helpers, catalog, saved state, ranking engine, XP, preview player */
const $=(s,r=document)=>r.querySelector(s)
const $$=(s,r=document)=>[...r.querySelectorAll(s)]
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))
const norm=s=>String(s).toLowerCase().replace(/’/g,"'").replace(/[^a-z0-9]/g,"")
const fmt=ms=>{const s=Math.round(ms/1000);return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
const hrs=ms=>{const m=Math.round(ms/60000);return Math.floor(m/60)+"h "+(m%60)+"m"}
const GRADES=["A+","A","A-","B+","B","B-","C+","C","C-","D","F"]
const autoGrade=v=>v==null?null:v>=9.3?"A+":v>=8.7?"A":v>=8.2?"A-":v>=7.8?"B+":v>=7.3?"B":v>=6.8?"B-":v>=6.3?"C+":v>=5.8?"C":v>=5.3?"C-":v>=4.5?"D":"F"
const rc=v=>`hsl(${28+v*2.6} ${48+v*3}% ${40+v*3.2}%)`
const fmtS=n=>n==null?"":n>=1e9?(n/1e9).toFixed(n>=1e10?1:2)+"B":n>=1e6?(n/1e6).toFixed(n>=1e8?0:1)+"M":(n/1e3).toFixed(0)+"K"
const strm=s=>s.st!=null?fmtS(s.st)+" streams":"under tracking cutoff"
const spot=q=>"https://open.spotify.com/search/"+encodeURIComponent(q)
const songLink=s=>s.sp?"https://open.spotify.com/track/"+s.sp:spot(s.t+" Drake")
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const sample=(a,n)=>shuffle(a).slice(0,n)
const rand=a=>a[Math.floor(Math.random()*a.length)]
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
const ICON={
 play:'<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>',
 pause:'<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
 stop:'<svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>'}

/* catalog */
let D,A={},SONG={},BYA={},BYT={}
const art=s=>s.art||A[s.a].art
const albumArt=k=>A[k].art
function cover(k){const a=A[k];return a.mosaic?`<div class="mosaic">${a.mosaic.map(u=>`<img src="${u}" alt="" loading="lazy">`).join("")}</div>`:`<img src="${a.art}" alt="${esc(a.t)} cover" loading="lazy">`}
const songDate=s=>s.d||A[s.a].date
const songYear=s=>s.y||A[s.a].y
function find(t,a){const c=BYT[norm(t)]||[];return (a&&c.find(s=>s.a===a))||c[0]}

/* saved state. Same shape and key as the original hub so backups move straight across. */
const KEY="drakehub.v1",GKEY="drakehub.games"
const blank=()=>({r:{},g:{},ao:[],to:{},e:{},b:{},nb:0,u:0})
const gblank=()=>({xp:0,best:{},plays:{},daily:{},streak:0,lastDaily:"",badges:{},u:0})
let S=blank(),G=gblank()
try{const j=JSON.parse(localStorage.getItem(KEY)||"null");if(j&&j.r)S=Object.assign(blank(),j)}catch(e){}
try{const j=JSON.parse(localStorage.getItem(GKEY)||"null");if(j)G=Object.assign(gblank(),j)}catch(e){}
function persist(){S.u=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast("Storage is full. Export a backup from Me.")}snapshot()}
function gsave(){G.u=Date.now();try{localStorage.setItem(GKEY,JSON.stringify(G))}catch(e){}}
function snapshot(){try{const k="drakehub.snap."+today();if(!localStorage.getItem(k)){localStorage.setItem(k,JSON.stringify({S,G}));const old=Object.keys(localStorage).filter(x=>x.startsWith("drakehub.snap.")).sort();while(old.length>5)localStorage.removeItem(old.shift())}}catch(e){}}
function exportCode(){return JSON.stringify({app:"drakehub",v:2,S,G})}
function importCode(txt){const j=JSON.parse(txt);let s=null,g=null
 if(j&&j.app==="drakehub"){s=j.S;g=j.G}else if(j&&typeof j.r==="object")s=j
 if(!s||typeof s.r!=="object")throw new Error("bad")
 try{localStorage.setItem("drakehub.preimport."+Date.now(),JSON.stringify({S,G}))}catch(e){}
 S=Object.assign(blank(),s);if(g)G=Object.assign(gblank(),g);persist();gsave()
 job=null;cur=null;duel=null
 return {battles:S.nb,rated:Object.keys(S.r).length}}
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{})

function localGet(k,d){try{return localStorage.getItem("dh."+k)??d}catch(e){return d}}
function localSet(k,v){try{localStorage.setItem("dh."+k,v)}catch(e){}}
function toast(m){const t=$("#toast");if(!t)return;t.textContent=m;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),1900)}

/* state helpers */
const elo=id=>S.e[id]??1500
function albumStats(k){const ss=BYA[k];const rs=ss.map(s=>S.r[s.id]).filter(v=>v!=null);const avg=rs.length?rs.reduce((a,b)=>a+b,0)/rs.length:null;return{n:ss.length,rated:rs.length,avg}}
function albumOrder(){const all=D.albums.map(a=>a.k);const o=S.ao.filter(k=>A[k]);return o.length?o.concat(all.filter(k=>!o.includes(k))):null}
function trackOrder(k){const o=(S.to[k]||[]).filter(id=>SONG[id]);const rest=BYA[k].map(s=>s.id).filter(id=>!o.includes(id));return o.concat(rest)}
const songScore=s=>(S.r[s.id]??0)*1000+(elo(s.id)-1500)

/* ranking engine, carried over unchanged so existing progress keeps its meaning.
   The list is final when every song has beaten (or tied) the song right below it.
   Results are stored per pair in S.p, so no matchup is asked twice. */
let duel=null,scope=localGet("scope","all"),RANK={}
const pk=(x,y)=>x<y?x+"|"+y:y+"|"+x
function res(x,y){const v=S.p&&S.p[pk(x,y)];if(v==null)return null;if(v==="t")return "t";return v==="a"?(x<y?x:y):(x<y?y:x)}
function rec(x,y,w){S.p=S.p||{};S.p[pk(x,y)]=w==="t"?"t":(w===(x<y?x:y)?"a":"b")}
let job=null,cur=null,skipped=new Set(),accepted=new Set(),jobStarts={}
function eloRanking(){return D.songs.slice().sort((x,y)=>elo(y.id)-elo(x.id)||(S.b[y.id]||0)-(S.b[x.id]||0)||D.songs.indexOf(x)-D.songs.indexOf(y))}
const ladderIds=sub=>sub.slice().sort((x,y)=>elo(y.id)-elo(x.id)||(S.b[y.id]||0)-(S.b[x.id]||0)||D.songs.indexOf(x)-D.songs.indexOf(y)).map(s=>s.id)
function pool(){if(scope==="all")return D.songs;if(scope.startsWith("top:"))return eloRanking().slice(0,+scope.slice(4));if(scope.startsWith("a:"))return BYA[scope.slice(2)]||D.songs;if(scope.startsWith("l:"))return D.songs.filter(s=>s.l===scope.slice(2));if(scope==="rated")return D.songs.filter(s=>S.r[s.id]!=null);return D.songs}
function linkState(x,y){if(accepted.has(pk(x,y)))return "ok";const r=res(x,y);if(r==null)return "open";return r==="t"||r===x?"ok":"conflict"}
function placeJob(){const {b,L,dir,bot}=job
 if(dir>0){const below=L[bot],above=bot>0?L[bot-1]:null,eb=elo(below),ea=above!=null?Math.max(elo(above),eb+.002):eb+30;S.e[b]=(ea+eb)/2}
 else{const above=L[bot],below=bot>0?L[bot-1]:null,ea=elo(above),eb=below!=null?Math.min(elo(below),ea-.002):ea-30;S.e[b]=(ea+eb)/2}
 job=null}
function startJob(L,j){const x=L[j],y=L[j+1]
 const mover=(S.b[y]||0)<=(S.b[x]||0)?"up":"down",b=mover==="up"?y:x
 jobStarts[b]=(jobStarts[b]||0)+1
 if(jobStarts[b]>15){accepted.add(pk(x,y));return}
 if(mover==="up")job={scope,b,L:L.slice(),dir:1,lo:j,st:1,ph:"g"}
 else{const R=L.slice().reverse();job={scope,b,L:R,dir:-1,lo:R.length-1-(j+1),st:1,ph:"g"}}}
function jobNext(){
 for(let g=0;g<400&&job;g++){const {b,L,dir}=job
  const beats=o=>{const r=res(b,o);if(r==null)return null;if(r==="t")return "t";return dir>0?(r===b):(r===o)}
  if(job.ph==="g"){const t=job.lo-job.st;if(t<0){job.ph="s";job.top=0;job.bot=job.lo;continue}
   const o=L[t];if(o===b){job.lo=t;job.st*=2;continue}
   const r=beats(o);if(r==null)return o
   if(r==="t"){job.ph="s";job.top=job.bot=t+1}else if(r){job.lo=t;job.st*=2}else{job.ph="s";job.top=t+1;job.bot=job.lo}}
  else{if(job.top>=job.bot){placeJob();persist();return null}
   const m=(job.top+job.bot)>>1,o=L[m];if(o===b){job.top=m+1;continue}
   const r=beats(o);if(r==null)return o
   if(r==="t"){job.top=job.bot=m+1}else if(r)job.bot=m;else job.top=m+1}}
 return null}
function normalizeLadder(){const L=ladderIds(D.songs);let prev=Infinity,ch=false
 for(const id of L){let e=elo(id);if(e>=prev-0.005){e=prev-0.01;ch=true}if(e!==elo(id))S.e[id]=e;prev=e}return ch}
function newDuel(){cur=null;duel=null;if(normalizeLadder())persist()
 const sub=pool();if(sub.length<2)return
 for(let guard=0;guard<600&&!cur;guard++){
  if(job){if(job.scope!==scope){job=null;continue}const o=jobNext();if(o)cur={t:"job",x:job.b,y:o};continue}
  const L=ladderIds(sub);let j=-1,st=""
  for(let i=0;i<L.length-1;i++){const s=linkState(L[i],L[i+1]);if(s==="ok")continue;if(skipped.has(pk(L[i],L[i+1])))continue;j=i;st=s;break}
  if(j<0){if(skipped.size){skipped.clear();continue}break}
  if(st==="conflict"){startJob(L,j);continue}
  cur={t:"link",x:L[j],y:L[j+1],j,L}}
 const lad=eloRanking();RANK={};lad.forEach((s,i)=>RANK[s.id]=i+1)
 if(cur){const a=SONG[cur.x],b=SONG[cur.y];duel=Math.random()<.5?[a,b]:[b,a]}}
function progress(){const L=ladderIds(D.songs),n=L.length,links=n-1;let ok=0;for(let i=0;i<links;i++)if(linkState(L[i],L[i+1])==="ok")ok++
 const open=links-ok,pairs=S.p?Object.keys(S.p).length:0
 if(!S.tr||S.tr.nb>S.nb)S.tr={nb:S.nb,ok}
 const dOk=ok-S.tr.ok,dNb=S.nb-S.tr.nb
 const ratio=dOk>=15&&dNb>0?Math.min(12,Math.max(1.5,dNb/dOk)):8.5
 const est=open?Math.max(open,Math.round(open*ratio/10)*10):0
 const ts=(S.bt||[]),gaps=[];for(let i=1;i<ts.length;i++){const g=(ts[i]-ts[i-1])/1000;if(g>0&&g<=90)gaps.push(g)}
 const pace=gaps.length>=5?gaps.reduce((a,b)=>a+b,0)/gaps.length:6
 return {n,links,ok,open,pairs,all:n*(n-1)/2,est,pace,secs:est*pace,measured:gaps.length>=5,learned:dOk>=15,pct:ok/links*100}}
const dur=s=>{s=Math.round(s);if(s<60)return s+" sec";const m=Math.round(s/60);if(m<60)return m+" min";return Math.floor(m/60)+" h "+(m%60)+" min"}
function moveSong(id,pos){normalizeLadder()
 const L=ladderIds(D.songs).filter(x=>x!==id),i=Math.max(0,Math.min(L.length,pos-1))
 const above=L[i-1],below=L[i]
 const ea=above!=null?elo(above):elo(below)+30,eb=below!=null?elo(below):elo(above)-30
 S.e[id]=(ea+eb)/2
 if(above!=null)rec(above,id,above)
 if(below!=null)rec(id,below,id)
 S.b[id]=S.b[id]||0;S.man=(S.man||0)+1;job=null;cur=null;duel=null;persist()}
function myTop(n){return S.nb?ladderIds(D.songs).slice(0,n).map(id=>SONG[id]):[]}

/* XP, levels and badges */
const LEVELS=["So Far Gone","Thank Me Later","Take Care","Nothing Was the Same","Too Late","Views","More Life","Scorpion","Certified Lover Boy","For All the Dogs","Iceman","6 God"]
const lvNeed=l=>Math.round(250*Math.pow(l,1.45))
function xpTotal(){return (G.xp||0)+S.nb*2+Object.keys(S.r).length}
function level(){let x=xpTotal(),l=0;while(l<LEVELS.length-1&&x>=lvNeed(l+1)){x-=lvNeed(l+1);l++}
 const need=l<LEVELS.length-1?lvNeed(l+1):null;return{l:l+1,name:LEVELS[l],into:x,need,pct:need?x/need*100:100,total:xpTotal()}}
function addXP(n,why){const before=level().l;G.xp=(G.xp||0)+Math.round(n);gsave();const after=level();if(after.l>before)setTimeout(()=>toast("Level up: "+after.name),400);renderChrome()}
const BADGES=[
 ["first","First Pick","Fight your first head-to-head",()=>S.nb>=1],
 ["b500","Grinder","500 head-to-heads",()=>S.nb>=500],
 ["b1500","Obsessed","1,500 head-to-heads",()=>S.nb>=1500],
 ["top25","Top 25 Locked","Every link in your top 25 settled",()=>{const L=ladderIds(D.songs);for(let i=0;i<25;i++)if(linkState(L[i],L[i+1])!=="ok")return false;return true}],
 ["final","Final Answer","Finalize all 368",()=>progress().open===0],
 ["album","Front to Back","Rate every song on one album",()=>D.albums.some(a=>albumStats(a.k).rated===a.n)],
 ["grader","The Critic","Grade 10 albums",()=>Object.keys(S.g).length>=10],
 ["ear","Golden Ear","Perfect 10 in Snippet on Medium or harder",()=>!!G.badges.ear],
 ["legend","Legend","Win a Legend snippet round",()=>!!G.badges.legend],
 ["hilo","Numbers Guy","Streak of 15 in Higher or Lower",()=>Object.values(G.best.hilo||{}).some(v=>v>=15)],
 ["daily7","Every Day","7-day daily streak",()=>(G.streak||0)>=7],
 ["cover","Crate Digger","Perfect Cover Zoom on Hard",()=>!!G.badges.cover],
 ["trivia","Encyclopedia","10 out of 10 Trivia on Hard",()=>!!G.badges.trivia],
 ["spotify","Plugged In","Connect Spotify",()=>!!localGet("sp.tok","")]]

/* 30-second preview player (Apple Music previews, streamed, never stored) */
const Player={a:null,id:null,tick:null,
 el(){if(!this.a){this.a=new Audio();this.a.preload="none";this.a.addEventListener("ended",()=>this.stop());this.a.addEventListener("timeupdate",()=>{const b=$("#mini .bar i");if(b&&this.a.duration)b.style.width=(this.a.currentTime/this.a.duration*100)+"%"})}return this.a},
 toggle(id){if(this.id===id){this.stop();return}const s=SONG[id];if(!s||!s.pv)return;Game.stopAudio&&Game.stopAudio()
  const a=this.el();a.src=s.pv;a.currentTime=0;a.play().catch(()=>toast("Tap again to play"));this.id=id;this.render()},
 stop(){if(this.a)this.a.pause();this.id=null;this.render()},
 render(){const m=$("#mini");$$(".pv").forEach(b=>{const on=b.dataset.pv===this.id;b.classList.toggle("on",on);b.innerHTML=on?ICON.pause:ICON.play;b.setAttribute("aria-label",(on?"Stop preview of ":"Play preview of ")+(SONG[b.dataset.pv]||{}).t)})
  if(!this.id){m.hidden=true;return}const s=SONG[this.id];m.hidden=false
  m.innerHTML=`<img src="${art(s)}" alt=""><div><b>${esc(s.t)}</b><small>${esc(A[s.a].t)} · 30-second preview</small><div class="bar"><i></i></div></div><a class="icbtn" href="${songLink(s)}" target="_blank" rel="noopener" aria-label="Open on Spotify"><svg viewBox="0 0 24 24"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14zM5 5h6v2H7v10h10v-4h2v6H5z"/></svg></a><button class="icbtn" id="mini-stop" aria-label="Stop preview">${ICON.stop}</button>`
  $("#mini-stop").onclick=()=>this.stop()}}
const pvBtn=s=>s.pv?`<button class="pv${Player.id===s.id?" on":""}" data-pv="${s.id}" aria-label="Play preview of ${esc(s.t)}">${Player.id===s.id?ICON.pause:ICON.play}</button>`:""

/* seeded random for daily content */
function seeded(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19}
 return function(){h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);h^=h>>>16;return (h>>>0)/4294967296}}

async function loadCatalog(){const r=await fetch("data/catalog.json");const d=await r.json();D=d
 d.albums.forEach(a=>{A[a.k]=a;BYA[a.k]=[]})
 d.songs.forEach(s=>{SONG[s.id]=s;BYA[s.a].push(s);(BYT[norm(s.t)]=BYT[norm(s.t)]||[]).push(s)})}
