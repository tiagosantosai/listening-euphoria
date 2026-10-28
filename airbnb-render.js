(function(){
const C={paper:'#FFFFFF',ink:'#111111',red:'#E8352C',blue:'#1F5BFF',grey:'#8A867D',rule:'#CFCAC0'};
const DISP="'Inter Tight','Inter',system-ui,sans-serif", MONO="'IBM Plex Mono','DejaVu Sans Mono',monospace", BODY="'Inter',system-ui,sans-serif";
const NS='http://www.w3.org/2000/svg';
function el(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function txt(p,x,y,s,o){const t=el('text',Object.assign({x,y},o),p);t.textContent=s;return t}
function lines(p,x,y,arr,o,lh){arr.forEach((s,i)=>txt(p,x,y+i*lh,s,o))}
window.renderInfo=function(D){
  const root=document.getElementById('info'); const tip=document.getElementById('tip');
  function draw(){
    root.innerHTML='';
    const W=window.innerWidth,H=window.innerHeight;
    const svg=el('svg',{width:W,height:H,viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':D.aria},root);
    el('rect',{x:0,y:0,width:W,height:H,fill:C.paper},svg);
    const compact=W<620, tiny=H<380, mid=W<1200;
    const pad=Math.max(14,Math.min(W*0.035,40));
    const s=Math.max(0.62,Math.min(W/1100,H/700,1.25));
    let y=pad;
    const kf=Math.max(9,11*s);
    const avail=W-2*pad;
    {const ko={fill:C.red,'font-family':MONO,'font-size':kf,'font-weight':700,'letter-spacing':'0.04em'};
     let kt=txt(svg,pad,y+kf,compact?D.kickerShort:D.kicker,ko);
     if(kt.getComputedTextLength()>avail&&D.kickerShort&&!compact){kt.remove();kt=txt(svg,pad,y+kf,D.kickerShort,ko)}
     const kl=kt.getComputedTextLength(); if(kl>avail)kt.setAttribute('font-size',kf*avail/kl*0.98);}
    y+=kf+8*s;
    let hf=Math.max(19,Math.min(44*s,W*(compact?0.075:0.045)));
    const hl=compact?D.headShort:D.head;
    {const probe=hl.map(t=>txt(svg,0,-100,t,{'font-family':DISP,'font-size':hf,'font-weight':900,'letter-spacing':'-0.02em'}));
     const mw=Math.max(...probe.map(t=>t.getComputedTextLength())); probe.forEach(t=>t.remove()); if(mw>avail)hf=hf*avail/mw*0.98;}
    txt(svg,pad,y+hf*0.9,hl[0],{fill:C.ink,'font-family':DISP,'font-size':hf,'font-weight':900,'letter-spacing':'-0.02em'});
    y+=hf*1.08;
    if(hl[1]){txt(svg,pad,y+hf*0.9,hl[1],{fill:C.grey,'font-family':DISP,'font-size':hf,'font-weight':900,'letter-spacing':'-0.02em'});y+=hf*1.08}
    const showDeck=!tiny&&H>460;
    if(showDeck){const df=Math.max(11,13*s);y+=6*s;
      const src=compact?D.deckShort:D.deck, o={fill:C.ink,'font-family':BODY,'font-size':df}, out=[];
      src.forEach(par=>{const words=par.split(' ');let cur='';const pr=txt(svg,0,-100,'',o);
        words.forEach(w=>{const t=cur?cur+' '+w:w;pr.textContent=t;if(pr.getComputedTextLength()>avail&&cur){out.push(cur);cur=w}else cur=t});
        if(cur)out.push(cur);pr.remove();});
      lines(svg,pad,y+df,out,o,df*1.4);y+=df*1.4*out.length}
    y+=10*s;
    const kN=D.kpis.length, kw=(W-2*pad)/kN, lf=Math.max(8.5,9.5*s);
    let nf=Math.max(16,Math.min(30*s,kw*0.28));
    {const pr=D.kpis.map(k=>txt(svg,0,-100,k.n,{'font-family':DISP,'font-size':nf,'font-weight':900}));const mw=Math.max(...pr.map(t=>t.getComputedTextLength()));pr.forEach(t=>t.remove());if(mw>kw-12)nf=nf*(kw-12)/mw;}
    D.kpis.forEach((k,i)=>{const x=pad+i*kw;
      el('rect',{x,y,width:kw-10*s,height:3,fill:k.c},svg);
      txt(svg,x,y+8+nf,k.n,{fill:k.c,'font-family':DISP,'font-size':nf,'font-weight':900,'letter-spacing':'-0.02em'});
      const lt=txt(svg,x,y+8+nf+lf+5,(W<1000)?k.ls:k.l,{fill:C.ink,'font-family':MONO,'font-size':lf,'font-weight':700});
      const ll=lt.getComputedTextLength(); if(ll>kw-12)lt.setAttribute('font-size',lf*(kw-12)/ll);});
    y+=8+nf+lf+5+14*s;
    const gf=Math.max(8.5,9.5*s); let gx=pad, gy=y;
    ((compact&&D.legendShort)?D.legendShort:D.legend).forEach(g=>{const t=txt(svg,gx,gy+gf,g.t,{fill:g.c,'font-family':MONO,'font-size':gf,'font-weight':700});const w=t.getComputedTextLength();if(gx+w>W-pad&&gx>pad){gx=pad;gy+=gf*1.5;t.setAttribute('x',gx);t.setAttribute('y',gy+gf)}gx+=w+16*s});
    y=gy;
    if(D.axisNote&&W>=1000)txt(svg,W-pad,y+gf,D.axisNote,{fill:C.grey,'font-family':MONO,'font-size':gf*0.9,'text-anchor':'end'});
    y+=gf+6*s;
    const foot=Math.max(9,9*s)*2*1.5+8;
    const evRoom=D.noEv?6:2*Math.max(8,9*s)*1.25+10;
    const top=y+evRoom, bottom=H-pad-foot-Math.max(10,11*s)-6;
    const left=pad+(D.yLeft?Math.max(26,34*s):0), right=W-pad-(D.yRight?Math.max(30,40*s):0);
    const cw=right-left, ch=Math.max(60,bottom-top);
    D.chart({svg,left,right,top,bottom:top+ch,cw,ch,s,compact,C,MONO,DISP,BODY,el,txt,tip,W,H,pad});
    const ff=Math.max(8,8.5*s);
    {const fo={fill:C.grey,'font-family':MONO,'font-size':ff};let useShort=mid;
     if(!useShort){const pr=txt(svg,0,-100,D.foot,fo);if(pr.getComputedTextLength()>avail)useShort=true;pr.remove()}
     const fl=useShort?D.footShort:[D.foot];
     const ts=fl.map((t,i)=>txt(svg,pad,H-pad-(fl.length-1-i)*ff*1.5,t,fo));
     const mw=Math.max(...ts.map(t=>t.getComputedTextLength()));if(mw>avail)ts.forEach(t=>t.setAttribute('font-size',ff*avail/mw*0.98));}
  }
  draw(); let t; window.addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(draw,80)});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
};
window.showTip=function(tip,html,x,y){tip.innerHTML=html;tip.hidden=false;const r=tip.getBoundingClientRect();let L=x+12,T=y-r.height-10;if(L+r.width>innerWidth-6)L=x-r.width-12;if(L<6)L=6;if(T<6)T=y+14;tip.style.left=L+'px';tip.style.top=T+'px'};
window.hover=function(node,tip,html){const h=e=>{const p=e.touches?e.touches[0]:e;showTip(tip,html,p.clientX,p.clientY)};node.addEventListener('mousemove',h);node.addEventListener('touchstart',h,{passive:true});node.addEventListener('mouseleave',()=>tip.hidden=true)};
window.placeEvents=function(g,ev,xs,yTop,P,valY){
  const f=Math.max(8,9*P.s), lh=f*1.25, ends=[-1e9,-1e9];
  ev.forEach(e=>{const x=xs(e.i), lab=P.compact?e.short:e.long;
    const w=lab.length*f*0.62; let r=1; if(x-w/2<ends[1]+8){r=0} if(r===0&&x-w/2<ends[0]+8){r=1}
    ends[r]=x+w/2; const ty=yTop-(r?0:lh);
    let ax='middle',tx=x; if(x+w/2>P.W-6){ax='end';tx=x+4} if(x-w/2<6){ax='start';tx=x-4}
    P.el('line',{x1:x,x2:x,y1:ty+3,y2:Math.max(ty+4,valY(e.i)-5),stroke:P.C.ink,'stroke-width':0.7,'stroke-dasharray':'1 2'},g);
    P.txt(g,tx,ty,lab,{fill:P.C.ink,'font-family':P.MONO,'font-size':f,'font-weight':700,'text-anchor':ax});
  });
};
})();
