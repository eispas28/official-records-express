(function(){try{
var c=localStorage.getItem('orx-sb')==='1',h=localStorage.getItem('orx-sb-html6-'+(c?1:0));if(!h)return;
var m={'dashboard.dc.html':'Dashboard','reports-reconciliation.dc.html':'Reports & Reconciliation','certificate-orders.dc.html':'Certificate Orders','apostille-queue.dc.html':'Apostille Queue','audit-log.dc.html':'Audit Log','settings.dc.html':'Platform Settings'};
var cur=m[location.pathname.split('/').pop()]||'';
var t=document.createElement('div');t.innerHTML=h;var a=t.firstElementChild;if(!a)return;
a.removeAttribute('id');a.style.viewTransitionName='none';
a.querySelectorAll('a').forEach(function(l){var on=l.getAttribute('aria-label')===cur;if(on){l.setAttribute('aria-current','page');l.style.background='#E9ECEF'}else{l.removeAttribute('aria-current');l.style.background='transparent'}l.setAttribute('tabindex','-1')});
var w=document.createElement('div');w.id='pre-sb';w.setAttribute('aria-hidden','true');w.setAttribute('inert','');w.style.cssText='position:fixed;left:0;top:0;bottom:0;z-index:49;pointer-events:none';w.appendChild(a);
document.body.insertBefore(w,document.body.firstChild);
}catch(e){}})();
window.addEventListener('load',function(){setTimeout(function(){try{var a=document.getElementById('app-sidebar');if(a)localStorage.setItem('orx-sb-html6-'+(localStorage.getItem('orx-sb')==='1'?1:0),a.outerHTML)}catch(e){}},700)});
