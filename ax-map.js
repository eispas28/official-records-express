(function(){
const LIBS=[["https://unpkg.com/d3@7.9.0/dist/d3.min.js","sha384-CjloA8y00+1SDAUkjs099PVfnY2KmDC2BZnws9kh8D/lX1s46w6EPhpXdqMfjK6i"],["https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js","sha384-Ukv1p/xTma6P4/2bY5KzWBw+ydSpXmhCMtyciIQVDJ1RmOxtCYNMF1uXT9T63H67"]];
const load=([src,h])=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.integrity=h;s.crossOrigin='anonymous';s.onload=res;s.onerror=rej;document.head.appendChild(s)});
let DATA={484:['Mexico',184,'#0B3387'],826:['United Kingdom',142,'#125DCB'],276:['Germany',97,'#2F78E0'],76:['Brazil',76,'#6FAFFF'],392:['Japan',58,'#6FAFFF']};
const COL=['#0B3387','#125DCB','#2F78E0','#6FAFFF','#6FAFFF'];
const read=()=>{const w=window.__axMapData;if(!w)return;DATA={};Object.entries(w).sort((a,b)=>b[1][1]-a[1][1]).forEach(([id,v],i)=>{DATA[id]=[v[0],v[1],COL[Math.min(i,4)]]})};
const US=840,BASE='#B2D5FF',GREY='#CED4DA';
const btn='width:32px;height:32px;display:grid;place-items:center;border:1px solid #E9ECEF;background:#fff;color:#344054;cursor:pointer;font-size:16px;padding:0;box-shadow:0 1px 2px rgba(10,13,18,.05)';
class AxMap extends HTMLElement{
 async connectedCallback(){
  read();this._on=()=>{read();if(this._refill)this._refill()};window.addEventListener('ax-map-data',this._on);
  this.style.cssText='display:block;position:relative;border-radius:8px;overflow:hidden;background:#F7F7F8;min-height:140px;flex:1';
  try{
   if(!window.d3)await load(LIBS[0]);
   if(!window.topojson)await load(LIBS[1]);
   const t=await (await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')).json();
   const f=topojson.feature(t,t.objects.countries).features.filter(d=>+d.id!==10);
   const W=300,H=185;
   const p=d3.geoNaturalEarth1().fitExtent([[4,4],[W-4,H-4]],{type:'FeatureCollection',features:f});
   const g=d3.geoPath(p);
   this.innerHTML='';
   const svg=d3.select(this).append('svg').attr('viewBox',`0 0 ${W} ${H}`).attr('width','100%').attr('height','100%').attr('role','img').attr('aria-label','Interactive world map of apostille destinations').style('display','block').style('position','absolute').style('inset','0').style('cursor','grab').style('touch-action','none');
   const gg=svg.append('g');
   const fillOf=d=>+d.id===US?GREY:(DATA[+d.id]?DATA[+d.id][2]:BASE);
   const tip=d3.select(this).append('div').attr('style','position:absolute;pointer-events:none;display:none;background:#fff;border:1px solid #E9ECEF;border-radius:8px;padding:10px 12px;min-width:150px;font:600 14px Roboto,sans-serif;color:#181D27;box-shadow:0 8px 16px rgba(10,13,18,.12);white-space:nowrap;z-index:3');
   const host=this;
   const info=document.createElement('div');info.setAttribute('aria-live','polite');info.style.cssText='position:absolute;left:8px;bottom:8px;display:none;align-items:flex-start;gap:12px;background:#fff;border:1px solid #E9ECEF;border-radius:8px;padding:8px 8px 8px 12px;font:500 14px Roboto,sans-serif;color:#181D27;box-shadow:0 8px 16px rgba(10,13,18,.12);z-index:2';host.appendChild(info);
   let sel=null;
   const txt=d=>{const v=DATA[+d.id];return +d.id===US?'Not applicable — no apostilles':v?v[1]+' documents':'No documents in this period'};
   const draw=()=>{if(!sel){info.style.display='none';return}info.innerHTML='<div><div>'+sel.properties.name+'</div><div style="font-weight:600;color:#087990">'+txt(sel)+'</div></div><button type="button" aria-label="Close country details" style="width:24px;height:24px;border:0;background:transparent;color:#667085;cursor:pointer;font-size:14px;padding:0"><i class="bi bi-x-lg" aria-hidden="true"></i></button>';info.style.display='flex';info.querySelector('button').onclick=()=>{sel=null;draw()}};
   this._refill=()=>{gg.selectAll('path').attr('fill',fillOf);draw()};
   gg.selectAll('path').data(f).join('path').attr('d',g).attr('fill',fillOf).attr('stroke','#fff').attr('stroke-width',.5).attr('vector-effect','non-scaling-stroke').style('transition','fill .12s')
    .on('pointerenter',function(e,d){d3.select(this).attr('fill',+d.id===US?'#ADB5BD':DATA[+d.id]?d3.color(DATA[+d.id][2]).darker(.9):'#6FA8FF').raise()})
    .on('pointermove',function(e,d){const r=host.getBoundingClientRect(),n=d.properties.name,v=DATA[+d.id];
      tip.style('display','block').html(`<div style="margin-bottom:6px">${n}</div>${+d.id===US?'<div style="font-weight:400;color:#495057">Not applicable — no apostilles</div>':`<div style="display:flex;align-items:center;gap:8px;font-weight:400;color:#495057"><span style="width:8px;height:8px;border-radius:50%;background:${v?'#125DCB':'#B2D5FF'}"></span><span style="flex:1">Documents</span><span style="font-weight:600;color:#181D27">${v?v[1]:0}</span></div>`}`);
      const w=tip.node().offsetWidth;let x=e.clientX-r.left+12;if(x+w>r.width)x=e.clientX-r.left-w-12;tip.style('left',x+'px').style('top',Math.max(4,e.clientY-r.top-tip.node().offsetHeight-12)+'px')})
    .on('click',function(e,d){sel=sel&&+sel.id===+d.id?null:d;draw()})
    .on('pointerleave',function(e,d){d3.select(this).attr('fill',fillOf(d));tip.style('display','none')});
   const z=d3.zoom().scaleExtent([1,10]).translateExtent([[0,0],[W,H]]).extent([[0,0],[W,H]])
    .filter(e=>(e.type!=='wheel'||e.ctrlKey||e.metaKey)&&!e.button)
    .on('start',()=>svg.style('cursor','grabbing')).on('end',()=>svg.style('cursor','grab'))
    .on('zoom',e=>gg.attr('transform',e.transform));
   svg.call(z);
   const bar=document.createElement('div');bar.style.cssText='position:absolute;right:8px;top:8px;display:flex;flex-direction:column;border-radius:8px;overflow:hidden;z-index:1';
   [['bi-plus-lg','Zoom in',()=>svg.transition().duration(200).call(z.scaleBy,1.6)],['bi-dash-lg','Zoom out',()=>svg.transition().duration(200).call(z.scaleBy,1/1.6)],['bi-arrows-angle-contract','Reset view',()=>svg.transition().duration(300).call(z.transform,d3.zoomIdentity)]].forEach(([i,l,fn])=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',l);b.title=l;b.style.cssText=btn;b.innerHTML=`<i class="bi ${i}" aria-hidden="true"></i>`;b.onclick=fn;bar.appendChild(b)});
   this.appendChild(bar);
  }catch(e){console.warn('ax-map failed',e)}
 }
}
AxMap.prototype.disconnectedCallback=function(){window.removeEventListener('ax-map-data',this._on)};
if(!customElements.get('ax-map'))customElements.define('ax-map',AxMap);
})();
