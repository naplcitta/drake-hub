/* The Circle: the people around the music, production credits, samples, and the song detail sheet.
   Bios stick to documented facts. Credit counts are computed from the catalogue's producer data. */
const CIRCLE=[
 {id:"40",name:"Noah “40” Shebib",tag:"Co-founder · producer",group:"inner",prod:"40",
  bio:"Co-founded OVO Sound with Drake and Oliver El-Khatib, launched in 2012 as a Warner imprint. He started as Drake's recording engineer and mixer, then became the architect of the sound: muffled drums, filtered samples, space where other producers put noise. He has worked on every Drake album. A former child actor, he was diagnosed with multiple sclerosis at 22 and has spoken openly about it. Two Grammys from 20 nominations."},
 {id:"oliver",name:"Oliver El-Khatib",tag:"Co-founder · manager",group:"inner",
  bio:"Co-founder and managing partner of OVO, and one of Drake's two managers since 2013. He is credited with coming up with the name October's Very Own."},
 {id:"niko",name:"OVO Niko",tag:"Day one",group:"inner",
  bio:"Nicholas “Niko” Carino. A friend from Drake's Degrassi days who was there at the very beginning of the label and helped with OVO's first merchandise. He helps organize OVO Bounce, Drake's basketball tournament in Toronto."},
 {id:"chubbs",name:"OVO Chubbs",tag:"Head of security",group:"inner",
  bio:"Nessel “Chubbs” Beezer. A childhood friend from Toronto and the head of Drake's security."},
 {id:"boi1da",name:"Boi-1da",tag:"Producer · Toronto",group:"sound",prod:"Boi-1da",
  bio:"Matthew Samuels, the Toronto producer who has been in the room since the mixtape days. When Drake wants hard drums, it's usually him: from the early mixtape cuts to God's Plan, which he co-produced."},
 {id:"nineteen85",name:"Nineteen85",tag:"Producer · OVO",group:"sound",prod:"Nineteen85",
  bio:"Paul Jefferies, the in-house OVO producer behind Hold On, We're Going Home, Hotline Bling and One Dance. One half of dvsn with singer Daniel Daley. The duo left OVO Sound in 2025."},
 {id:"cadastre",name:"Noel Cadastre",tag:"Producer · 2026 era",group:"sound",prod:"Noel Cadastre",
  bio:"The most-credited name on the 2026 trilogy in this catalogue. Look at the credits on Iceman, Habibti and Maid of Honour and he's on a large share of them, often alongside O Lil Angel, B4U and OZ."},
 {id:"tminus",name:"T-Minus",tag:"Producer · Toronto",group:"sound",prod:"T-Minus",
  bio:"Tyler Williams, a Toronto producer from Drake's early run. His credits here are listed below."},
 {id:"gordo",name:"Gordo",tag:"Producer · house",group:"sound",prod:"Gordo",
  bio:"The alias Carnage uses for his house and club records. A key producer on Honestly, Nevermind, and Drake's partner on the 2024 single Sideways."},
 {id:"oz",name:"OZ",tag:"Producer",group:"sound",prod:"OZ",
  bio:"Swiss producer with credits from the late 2010s through the 2026 trilogy, including Which One with Central Cee."},
 {id:"pnd",name:"PartyNextDoor",tag:"OVO Sound · artist and producer",group:"label",prod:"PartyNextDoor",
  bio:"One of the label's earliest signings. A producer and voice on records across the catalogue, and Drake's full partner on $ome $exy $ongs 4 U (2025)."},
 {id:"majid",name:"Majid Jordan",tag:"OVO Sound · duo",group:"label",prod:"Majid Jordan",
  bio:"Majid Al Maskati and Jordan Ullman. The voice and co-producers of Hold On, We're Going Home, one of the defining OVO records."},
 {id:"popcaan",name:"Popcaan",tag:"OVO Sound · dancehall",group:"label",
  bio:"Jamaican dancehall star on OVO Sound. On Amazing Shape from Maid of Honour, and part of the Caribbean thread that runs from Views and More Life onward."},
 {id:"pimmie",name:"Pimmie",tag:"OVO Sound",group:"label",
  bio:"OVO Sound singer who leads Pimmie's Dilemma on $ome $exy $ongs 4 U."},
 {id:"roster",name:"The Roster",tag:"OVO Sound",group:"label",
  bio:"Current OVO Sound acts include Drake, PartyNextDoor, Majid Jordan, Roy Woods, Popcaan, Baka Not Nice, Smiley, Naomi Sharon and Pimmie. dvsn left the label in 2025."}]
const ALBUM_NOTES={sfg:"The mixtape that changed his career. Hazy, slow and confessional, built mostly around 40's sound.",tml:"The major-label debut. Glossier and bigger, but the 40 template is still the spine.",tc:"The blueprint record. Late-night R&B and rap, cinematic and wounded, with The Weeknd and Kendrick in the margins.",nwts:"Colder and more cinematic. Long intros, beat switches, and the Nineteen85 and Majid Jordan sound arriving.",iyrtitl:"A surprise tape that hardened everything. Darker, sparser, built for the 6.",wattba:"Made fast with Future, with Metro Boomin all over it. Trap, start to finish.",views:"Toronto in four seasons. Dancehall and Afrobeats move from flavour to foundation.",ml:"A playlist, not an album. London, Johannesburg and Kingston all on the same tracklist.",scorpion:"A double album split in two: rap on side A, R&B on side B.",cp:"Loosies and SoundCloud cuts from 2010 to 2016, finally made official.",dldt:"Leaks, demos and the drill experiments.",clb:"Star-studded and long. Every lane in one place.",hn:"The left turn: house, Jersey club and Baltimore bounce, largely built with Gordo.",hl:"A full collab album with 21 Savage, mostly Metro Boomin and friends behind the boards.",fatd:"A sprawling return to the late-night lane, with a deluxe tacked on.",ssss:"A full R&B duet album with PartyNextDoor.",iceman:"The rap album of the 2026 trilogy. Long, combative and dense.",habibti:"The R&B and international side of the 2026 trilogy.",moh:"The party side of the 2026 trilogy: club records, Caribbean bounce and UK features.",sh1:"Two songs that set up Scorpion.",sh2:"Three songs, including a Hot 100 #1.",bitw:"Two loosies from the Raptors' championship run.",gigs:"A three-song pack from 2024.",singles:"Drake-led singles that never landed on a project."}

const MONO={"40":"40",oliver:"OE",niko:"N",chubbs:"C",boi1da:"1da",nineteen85:"85",cadastre:"NC",tminus:"T-",gordo:"G",oz:"OZ",pnd:"PND",majid:"MJ",popcaan:"P",pimmie:"PI",roster:"OVO"}
const monoOf=p=>MONO[p.id]||p.name.slice(0,2)
const plural=(n,w)=>n+" "+w+(n===1?"":"s")
function prodCounts(list){const c={};list.forEach(s=>prods(s).forEach(p=>c[p]=(c[p]||0)+1));return Object.entries(c).sort((a,b)=>b[1]-a[1])}
const prodSongs=name=>D.songs.filter(s=>prods(s).includes(name))
const slug=n=>encodeURIComponent(n)
function prodLink(n){return `<a class="plink" href="#producer-${slug(n)}">${esc(n)}</a>`}

function vCircle(){const counts=prodCounts(D.songs),total=D.songs.filter(s=>prods(s).length).length
 const card=p=>{const n=p.prod?prodSongs(p.prod).length:0,read=G.read&&G.read[p.id]
  return `<a class="person${read?" read":""}" href="#person-${p.id}"><span class="mono">${esc(monoOf(p))}</span><div><b>${esc(p.name)}</b><small>${esc(p.tag)}${n?` · ${plural(n,"song")}`:""}</small></div></a>`}
 return chips(LIBCHIPS,"circle")+`<p class="eyebrow">OVO · October's Very Own</p><h1 class="title foil">The Circle</h1><p class="hint" style="max-width:60ch">The people who built the sound and the brand. Producer counts come from credits on ${total} of the ${D.songs.length} songs here.</p>
 <div class="sec-h"><div><h2>Inner Circle</h2></div></div><div class="people">${CIRCLE.filter(p=>p.group==="inner").map(card).join("")}</div>
 <div class="sec-h"><div><h2>The Sound</h2></div></div><div class="people">${CIRCLE.filter(p=>p.group==="sound").map(card).join("")}</div>
 <div class="sec-h"><div><h2>OVO Sound</h2></div></div><div class="people">${CIRCLE.filter(p=>p.group==="label").map(card).join("")}</div>
 <div class="sec-h"><div><h2>Behind the Boards</h2><p>Most-credited producers across the catalogue. Tap one to hear their work.</p></div></div>
 <div class="hbars">${counts.slice(0,20).map(([n,c])=>`<a class="hb" href="#producer-${slug(n)}" style="text-decoration:none"><span>${esc(n)}</span><div class="track"><i style="width:${c/counts[0][1]*100}%"></i></div><em class="num">${c}</em></a>`).join("")}</div>
 <div class="sec-h"><div><h2>The 40 Share</h2><p>How much of each project 40 has a production credit on.</p></div></div>
 <div class="hbars">${D.albums.filter(a=>a.type!=="Singles"&&a.type!=="EP").map(a=>{const L=BYA[a.k].filter(s=>prods(s).length),n=L.filter(s=>prods(s).includes("40")).length;return L.length?`<a class="hb" href="#album-${a.k}" style="text-decoration:none"><span>${esc(a.t)}</span><div class="track"><i style="width:${n/L.length*100}%"></i></div><em class="num">${Math.round(n/L.length*100)}%</em></a>`:""}).join("")}</div>
 <p class="note">So Far Gone's tracks aren't individually credited in the source, so it's left out of the counts. Credits from Wikipedia track listings.</p>`}

function vPerson(id){const p=CIRCLE.find(x=>x.id===id);if(!p)return vCircle()
 G.read=G.read||{};if(!G.read[id]){G.read[id]=1;gsave()}
 const songs=p.prod?prodSongs(p.prod):[]
 return chips(LIBCHIPS,"circle")+`<a class="back" href="#circle">← The Circle</a><div class="card glow person-hero"><span class="mono big">${esc(monoOf(p))}</span><div><p class="eyebrow">${esc(p.tag)}</p><h1 class="title foil" style="font-size:clamp(34px,8vw,58px)">${esc(p.name)}</h1></div></div>
 <p class="lede-p">${esc(p.bio)}</p>${songs.length?producerBody(p.prod,songs):""}`}
function producerBody(name,songs){const rated=songs.filter(s=>S.r[s.id]!=null),avg=rated.length?rated.reduce((t,s)=>t+S.r[s.id],0)/rated.length:null
 const L=S.nb?ladderIds(D.songs):[],pos={};L.forEach((id,i)=>pos[id]=i+1)
 const byAlb={};songs.forEach(s=>byAlb[s.a]=(byAlb[s.a]||0)+1),co=prodCounts(songs).filter(([n])=>n!==name).slice(0,6)
 const st=songs.reduce((t,s)=>t+(s.st||0),0),best=songs.filter(s=>pos[s.id]).sort((x,y)=>pos[x.id]-pos[y.id])[0]
 return `<div class="tiles" style="margin-top:18px"><div class="tile"><b class="num">${songs.length}</b><span>production credits here</span></div><div class="tile"><b class="num">${fmtS(st)}</b><span>Spotify streams on those songs</span></div><div class="tile"><b class="num">${avg!=null?avg.toFixed(2):"·"}</b><span>your average rating${rated.length?` (${rated.length} rated)`:""}</span></div><div class="tile"><b>${best?esc(best.t):"·"}</b><span>${best?"your highest-ranked, #"+pos[best.id]:"your favourite, once you rank"}</span></div></div>
 <div class="row" style="margin-top:14px"><button class="btn gold small" id="pq">▶ Play their songs</button>${co.length?`<span class="hint">Often with ${co.map(([n])=>prodLink(n)).join(", ")}</span>`:""}</div>
 <div class="sec-h"><div><h2>Credits</h2><p>Across ${Object.keys(byAlb).length} projects.</p></div></div><ol class="tracks">${songs.slice().sort((x,y)=>songDate(x).localeCompare(songDate(y))).map(songRow).join("")}</ol>`}
function vProducer(n){n=decodeURIComponent(n);const songs=prodSongs(n);const p=CIRCLE.find(x=>x.prod===n);if(p)return vPerson(p.id)
 return chips(LIBCHIPS,"circle")+`<a class="back" href="#circle">← The Circle</a><p class="eyebrow">Producer</p><h1 class="title foil">${esc(n)}</h1>${songs.length?producerBody(n,songs):`<p class="empty">No credits found for ${esc(n)}.</p>`}`}
function afterPerson(){const b=$("#pq");if(!b)return;const h=decodeURIComponent(location.hash.slice(1));const name=h.startsWith("producer-")?h.slice(9):(CIRCLE.find(p=>"person-"+p.id===h)||{}).prod
 b.onclick=()=>Player.queue(prodSongs(name).sort((x,y)=>(y.st||0)-(x.st||0)).map(s=>s.id),"Produced by "+name)}

/* song detail sheet */
function openSong(id){const s=SONG[id];if(!s)return;const L=S.nb?ladderIds(D.songs):[],r=L.indexOf(id)+1,byS=D.songs.filter(x=>x.st).sort((x,y)=>y.st-x.st),sr=byS.indexOf(s)+1
 const sh=$("#sheet");sh.innerHTML=`<div class="sheet-bg" data-close></div><div class="sheet-card" role="dialog" aria-label="${esc(s.t)}"><button class="sheet-x" data-close aria-label="Close">✕</button>
 <div class="sheet-top"><img src="${art(s)}" alt=""><div><p class="eyebrow">${esc(A[s.a].t)} · ${songYear(s)}</p><h2>${esc(s.t)}</h2>${s.f?`<p class="hint">feat. ${esc(s.f)}</p>`:""}<div class="row" style="margin-top:10px">${pvBtn(s)}<a class="btn small ghost" href="${songLink(s)}" target="_blank" rel="noopener">Spotify</a><a class="btn small ghost" href="#album-${s.a}" data-close>Album</a></div></div></div>
 <div class="sheet-stats"><div><b>${r?"#"+r:"·"}</b><span>your rank</span></div><div><b>${S.r[id]??"·"}</b><span>your rating</span></div><div><b>${s.st?fmtS(s.st):"·"}</b><span>${sr?"#"+sr+" most streamed":"streams"}</span></div><div><b>${fmt(s.ms)}</b><span>${isOne(s)?"Hot 100 #1":"length"}</span></div></div>
 <div class="trk sheet-rate" data-id="${s.id}">${pips(s.id)}</div>
 <h4 class="eyebrow" style="margin:16px 0 6px">Produced by</h4><p>${prods(s).length?prods(s).map(prodLink).join(" · "):`<span class="hint">Not credited in the source.</span>`}</p>
 ${s.sm?`<h4 class="eyebrow" style="margin:16px 0 6px">Samples and interpolations</h4>${s.sm.map(t=>`<p class="hint" style="color:var(--fg)">${esc(t)}</p>`).join("")}`:""}
 <h4 class="eyebrow" style="margin:16px 0 6px">Lane</h4><p class="hint">${esc(D.lanes[s.l])}${s.x?" · "+esc(s.x):""}</p></div>`
 sh.hidden=false;requestAnimationFrame(()=>sh.classList.add("open"));Player.render()
 $$("[data-close]",sh).forEach(e=>e.addEventListener("click",()=>closeSong()))}
function closeSong(){const sh=$("#sheet");sh.classList.remove("open");setTimeout(()=>{sh.hidden=true;sh.innerHTML=""},220)}
document.addEventListener("click",e=>{const t=e.target.closest("[data-song]");if(t&&!e.target.closest("button,a,input")){openSong(t.dataset.song)}})
addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#sheet").hidden)closeSong()})
