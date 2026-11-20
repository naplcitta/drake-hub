/* App shell: router, home, profile, backups, install */
const standalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true
const TAB_OF=h=>h==="home"?"home":(h==="rank"||h==="ranked"||h.startsWith("vs-"))?"rank":h.startsWith("ch-")?"play":(h==="play"||h==="daily"||h.startsWith("game-")||h.startsWith("run-"))?"play":(h==="me"||h==="stats")?"me":"albums"

function renderChrome(){const L=level(),c=$("#lvchip");if(c)c.innerHTML=`<i>${L.l}</i><span>${esc(L.name)}</span>`}

function vHome(){const L=level(),P=progress(),dd=G.daily[today()],hr=new Date().getHours()
 const greet=hr<5?"Late night":hr<12?"Good morning":hr<18?"Good afternoon":"Good evening"
 const rng=seeded("sotd-"+today()),pool=D.songs.filter(s=>s.pv),sotd=pool[Math.floor(rng()*pool.length)]
 const top=myTop(5),m=String(new Date().getMonth()+1).padStart(2,"0"),anniv=D.albums.filter(a=>a.date.slice(5,7)===m&&a.type!=="Singles")
 const fresh=!S.nb&&!Object.keys(S.r).length
 return `<section class="hero"><div><p class="eyebrow">${greet}</p><h1 class="title foil" style="margin-bottom:4px">Drake Hub</h1><p class="hint">${D.songs.length} songs · ${D.albums.length} projects · 2009 to 2026</p></div>
 <a href="#me" class="ring" style="--p:${L.pct.toFixed(1)}" aria-label="Level ${L.l}"><div><div><b class="foil">${L.l}</b><small>level</small></div></div></a></section>
 ${installCard()}
 ${fresh?`<div class="card glow" style="margin-bottom:12px"><p class="eyebrow">Welcome</p><b style="font-family:var(--display);font-weight:900;font-size:28px;text-transform:uppercase;display:block;line-height:1.02;margin:4px 0 6px">Rank every Drake song. Prove you know the catalogue.</b><p class="hint">Pick between two songs and your all-time list of ${D.songs.length} builds itself. Then play the games, grade the albums and send friends your top 25. No account needed. Everything stays on your phone.</p>
  <div class="row" style="margin-top:12px"><input type="text" id="nm-home" placeholder="Your name (for share cards)" value="${esc(myName())}" maxlength="24" style="flex:1;min-width:160px"><a class="btn gold" href="#rank" id="go-rank">Start ranking</a><a class="btn" href="#daily">Today's challenge</a></div>
  <details style="margin-top:12px"><summary class="hint">Have a backup code?</summary><textarea id="imp-home" rows="3" placeholder="Paste your backup code" style="margin-top:8px"></textarea><button class="btn small" id="imp-go" style="margin-top:8px">Import my progress</button></details></div>`:""}
 <div class="hgrid">
  <a class="card" href="#rank" style="text-decoration:none"><p class="eyebrow">Your ranking</p><div class="row" style="align-items:end;margin-top:4px"><b class="foil num" style="font-family:var(--display);font-weight:900;font-size:44px;line-height:1">${P.pct.toFixed(1)}%</b><span class="hint" style="margin-bottom:6px">finalized</span></div>
   <div class="prog big" style="margin-top:10px"><i style="width:${P.pct}%"></i></div>
   <div class="stat3"><div><b class="num">${S.nb.toLocaleString()}</b><span>battles</span></div><div><b class="num">${P.open?"~"+P.est.toLocaleString():"0"}</b><span>to go</span></div><div><b>${P.open?dur(P.secs):"Done"}</b><span>time left</span></div></div></a>
  <a class="card glow" href="#daily" style="text-decoration:none"><p class="eyebrow">Daily Challenge</p><b style="font-family:var(--display);font-weight:900;font-size:30px;text-transform:uppercase;display:block;line-height:1;margin:6px 0">${dd?dd.right+"/5 today":"Today's five"}</b><p class="hint">${dd?"Come back tomorrow.":"Trivia, a clip, a streams call, odd one out and a cover."}</p><div class="stat3"><div><b class="num">${G.streak||0}</b><span>day streak</span></div><div><b class="num">${Object.keys(G.daily).length}</b><span>days played</span></div><div><b class="num">${L.total.toLocaleString()}</b><span>total XP</span></div></div></a>
 </div>
 <div class="sec-h"><div><h2>Play</h2></div><a class="btn small ghost" href="#play">All games</a></div>
 <div class="qplay">${GORDER.map(id=>`<a class="gtile" href="#game-${id}" style="--bgimg:url('${GDEF[id].bg()}')"><b>${GDEF[id].name}</b><small>${GDEF[id].tag}</small></a>`).join("")}</div>
 <div class="hgrid" style="margin-top:12px">
  <div class="card"><p class="eyebrow">Song of the day</p><div class="sotd" style="margin-top:10px"><img src="${art(sotd)}" alt=""><div><b>${esc(sotd.t)}</b><small class="hint">${esc(A[sotd.a].t)} · ${songYear(sotd)}${sotd.st?" · "+fmtS(sotd.st)+" streams":""}</small><div class="row" style="margin-top:10px">${pvBtn(sotd)}<a class="btn small ghost" href="${songLink(sotd)}" target="_blank" rel="noopener">Spotify</a><a class="btn small ghost" href="#album-${sotd.a}">Album</a></div></div></div></div>
  <div class="card"><p class="eyebrow">${top.length?"Your top 5":"Start ranking"}</p>${top.length?`<ol class="mini-list" style="margin-top:10px">${top.map((s,i)=>`<li><span class="p">${i+1}</span><img src="${art(s)}" alt=""><span>${esc(s.t)}</span><i>${fmtS(s.st)}</i></li>`).join("")}</ol><div class="row" style="margin-top:12px"><button class="btn small gold" id="sh-card">Share my top 10</button><button class="btn small" id="sh-cmp">Compare with a friend</button></div>`:`<p class="hint" style="margin-top:6px">Pick between two songs, over and over, and your all-time list builds itself.</p><a class="btn gold" href="#rank" style="margin-top:12px">Start Head to Head</a>`}</div>
 </div>
 ${anniv.length?`<div class="sec-h"><div><h2>This Month</h2><p>Anniversaries in ${new Date().toLocaleString("en-CA",{month:"long"})}.</p></div></div><div class="picks">${anniv.map(a=>`<a class="pick" href="#album-${a.k}" style="text-decoration:none"><img src="${a.art}" alt=""><div><small>${a.date}</small><b>${esc(a.t)}</b><p>${new Date().getFullYear()-a.y} years old this month.</p></div></a>`).join("")}</div>`:""}`}
function afterHome(){afterInstall()
 const b=$("#imp-go");if(b)b.onclick=()=>doImport($("#imp-home").value)
 const n=$("#nm-home");if(n)n.onchange=()=>localSet("name",n.value.trim())
 const c=$("#sh-card");if(c)c.onclick=topCard
 const v=$("#sh-cmp");if(v)v.onclick=shareCompare}

function doImport(txt){try{const r=importCode(txt.trim());toast(`Imported ${r.battles.toLocaleString()} battles and ${r.rated} ratings`);renderChrome();route(true)}catch(e){toast("That isn't a valid backup code. Copy the whole thing and try again.")}}

let meTab=localGet("meTab","profile")
function vMe(){const L=level()
 const tabs=`<div class="seg" role="group" aria-label="Me sections" style="margin-bottom:16px">${[["profile","Profile"],["stats","My Stats"],["spotify","Spotify"],["data","Backup"]].map(([k,t])=>`<button data-me="${k}" aria-pressed="${meTab===k}">${t}</button>`).join("")}</div>`
 let body=""
 if(meTab==="stats")body=vStats()
 else if(meTab==="spotify")body=vSpotify()
 else if(meTab==="data")body=`<div class="card"><p class="eyebrow">Backup</p><p class="hint" style="margin:6px 0 12px">Everything saves on this phone automatically, and the app keeps a daily snapshot of the last five days. A backup code is your copy if you change phones or clear Safari.</p>
  <div class="row"><button class="btn gold" id="ex-copy">Copy backup code</button><button class="btn" id="ex-file">Save backup file</button></div>
  <textarea id="ex-text" rows="3" hidden readonly style="margin-top:10px"></textarea></div>
  <div class="card" style="margin-top:12px"><p class="eyebrow">Restore or import</p><p class="hint" style="margin:6px 0 10px">Paste a code from this app or from the web hub. Your current data is snapshotted first.</p>
  <textarea id="im-text" rows="3" placeholder="Paste a backup code"></textarea><div class="row" style="margin-top:8px"><button class="btn gold" id="im-go">Import</button><label class="btn" for="im-file">Open a file</label><input type="file" id="im-file" accept=".json,.txt,application/json,text/plain" hidden></div></div>
  <div class="card" style="margin-top:12px"><p class="eyebrow">Daily snapshots</p><ul class="mini-list" style="margin-top:8px">${Object.keys(localStorage).filter(k=>k.startsWith("drakehub.snap.")).sort().reverse().map(k=>{let n=0;try{n=JSON.parse(localStorage.getItem(k)).S.nb}catch(e){}return `<li style="grid-template-columns:1fr auto"><span>${k.slice(14)} · ${n.toLocaleString()} battles</span><button class="btn small ghost" data-snap="${k}">Restore</button></li>`}).join("")||`<li class="hint" style="grid-template-columns:1fr">None yet.</li>`}</ul></div>
  <div class="card" style="margin-top:12px"><p class="eyebrow">Sources</p><p class="hint" style="margin-top:6px">Tracklists, covers and 30-second previews from Apple's iTunes catalogue, streamed from Apple. Spotify stream counts from kworb.net, ${D.streamsAsOf}. Chart history from Billboard reporting. An unofficial fan project, not affiliated with Drake or OVO.</p></div>`
 else body=`<div class="card glow"><div class="row" style="align-items:center"><div class="ring" style="--p:${L.pct.toFixed(1)}"><div><div><b class="foil">${L.l}</b><small>level</small></div></div></div><div style="flex:1;min-width:180px"><p class="eyebrow">Level ${L.l} of ${LEVELS.length}</p><b style="font-family:var(--display);font-weight:900;font-size:32px;text-transform:uppercase;display:block;line-height:1">${esc(L.name)}</b><p class="hint num">${L.need?`${L.into.toLocaleString()} / ${L.need.toLocaleString()} XP to ${esc(LEVELS[L.l])}`:"Max level"} · ${L.total.toLocaleString()} XP total</p><p class="hint" style="margin-top:4px">XP: 2 per battle, 1 per rating, a tenth of every game score, 100 per daily.</p></div></div></div>
  <div class="card" style="margin-top:12px"><p class="eyebrow">Your name</p><div class="row" style="margin-top:8px"><input type="text" id="nm-me" placeholder="Shown on share cards and challenges" value="${esc(myName())}" maxlength="24" style="flex:1;min-width:180px"><button class="btn small" id="nm-save">Save</button></div>
   <div class="row" style="margin-top:12px"><button class="btn small gold" id="me-card">Share my top 10</button><button class="btn small" id="me-cmp">Compare with a friend</button><button class="btn small ghost" id="me-app">Share the app</button></div>
   <p class="hint" style="margin-top:10px">No account, no server. Your rankings, scores and Spotify sign-in stay on this phone. Links you share carry only what's in them, like your top 25 or a game score.</p></div>
  <div class="sec-h"><div><h2>Badges</h2><p>${BADGES.filter(b=>b[3]()).length} of ${BADGES.length} earned.</p></div></div>
  <div class="badges">${BADGES.map(([k,n,d,f])=>{const got=f();return `<div class="bdg${got?" got":""}"><i>${got?"✓":"?"}</i><b>${n}</b><small>${d}</small></div>`}).join("")}</div>
  <div class="sec-h"><div><h2>Game Records</h2></div></div>
  <div class="tiles">${GORDER.map(id=>{const b=G.best[id]||{},e=Object.entries(b);return `<div class="tile"><b class="num">${e.length?Math.max(...e.map(x=>x[1])).toLocaleString():"·"}</b><span>${GDEF[id].name}${id==="hilo"?" streak":""} · ${G.plays[id]||0} plays</span></div>`}).join("")}</div>
  ${standalone()?"":`<div class="card" style="margin-top:16px"><p class="eyebrow">Install</p><p class="hint" style="margin-top:6px"><b>iPhone:</b> in Safari, tap Share, then Add to Home Screen. <b>Android:</b> in Chrome, tap the menu, then Install app. It opens full screen and works offline.</p></div>`}`
 return `<p class="eyebrow">Me</p>${tabs}${body}`}
function afterMe(){$$("[data-me]").forEach(b=>b.onclick=()=>{meTab=b.dataset.me;localSet("meTab",meTab);route(true)})
 if(meTab==="spotify")afterSpotify()
 if(meTab==="profile"){$("#nm-save").onclick=()=>{localSet("name",$("#nm-me").value.trim());toast("Saved")}
  $("#me-card").onclick=topCard;$("#me-cmp").onclick=shareCompare
  $("#me-app").onclick=()=>shareOut({title:"Drake Hub",text:"Rank every Drake song head to head and play Drake games:",url:appURL()})}
 if(meTab==="data"){
  $("#ex-copy").onclick=async()=>{const c=exportCode();try{await navigator.clipboard.writeText(c);toast("Backup copied. Paste it into Notes.")}catch(e){const t=$("#ex-text");t.hidden=false;t.value=c;t.select();toast("Select all and copy")}}
  $("#ex-file").onclick=async()=>{const f=new File([exportCode()],`drake-hub-backup-${today()}.json`,{type:"application/json"})
   try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:"Drake Hub backup"});return}}catch(e){if(e.name==="AbortError")return}
   const a=document.createElement("a");a.href=URL.createObjectURL(f);a.download=f.name;document.body.appendChild(a);a.click();a.remove();toast("Backup saved")}
  $("#im-go").onclick=()=>doImport($("#im-text").value)
  $("#im-file").onchange=async e=>{const f=e.target.files[0];if(f)doImport(await f.text())}
  $$("[data-snap]").forEach(b=>b.onclick=()=>{if(!b.dataset.armed){b.dataset.armed=1;b.textContent="Tap to confirm";return}try{const j=JSON.parse(localStorage.getItem(b.dataset.snap));doImport(JSON.stringify({app:"drakehub",v:2,S:j.S,G:j.G}))}catch(e){toast("That snapshot couldn't be read")}})}}

let lastView=""
function route(keep){if(!D)return
 const h=(location.hash||"#home").slice(1)||"home",v=$("#view"),y=scrollY
 if(h.startsWith("run-")){$$(".tabbar a").forEach(a=>a.toggleAttribute("aria-current",a.dataset.tab==="play"));if(!Game.live)location.replace(h==="run-daily"?"#daily":"#game-"+h.slice(4));return}
 Game.live=false;Game.stopAudio()
 $$(".tabbar a").forEach(a=>a.toggleAttribute("aria-current",a.dataset.tab===TAB_OF(h)))
 if(h.startsWith("album-")){v.innerHTML=vAlbum(h.slice(6));afterAlbum(h.slice(6))}
 else if(h.startsWith("vs-")){v.innerHTML=vVs(h.slice(3));afterVs()}
 else if(h.startsWith("ch-")){v.innerHTML=vChallenge(h.slice(3));afterChallenge(h.slice(3))}
 else if(h.startsWith("game-")){const id=h.slice(5);if(GDEF[id]){v.innerHTML=vGameStart(id);afterGameStart(id)}else{v.innerHTML=vPlay()}}
 else switch(h){
  case "rank":v.innerHTML=vRank();afterRank();break
  case "ranked":v.innerHTML=vRanked();afterRanked();break
  case "play":v.innerHTML=vPlay();break
  case "daily":v.innerHTML=vDaily();afterDaily();break
  case "albums":v.innerHTML=vAlbums();afterAlbums();break
  case "songs":v.innerHTML=vSongs();afterSongs();break
  case "lanes":v.innerHTML=vLanes();break
  case "charts":v.innerHTML=vCharts();break
  case "stats":meTab="stats";location.replace("#me");return
  case "me":v.innerHTML=vMe();afterMe();break
  default:v.innerHTML=vHome();afterHome()}
 Player.render()
 if(keep===true||lastView===h)scrollTo(0,y);else scrollTo(0,0)
 lastView=h}
addEventListener("hashchange",()=>{trackMode="album";route()})

;(async()=>{try{await loadCatalog()}catch(e){$("#view").innerHTML=`<p class="empty" style="margin-top:30px">The catalogue didn't load. Check your connection and reopen the app.</p>`;return}
 await SP.handleCallback()
 renderChrome();route()
 if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{})})()
