(() => {
  'use strict';

  const root = document.querySelector('[data-tool-animation]');
  if (!root) return;

  const canvas = root.querySelector('.tool-animation-canvas');
  const ctx = canvas.getContext('2d');
  const tabs = [...root.querySelectorAll('.tool-tab')];
  const copy = root.querySelector('.tool-copy');
  const kicker = root.querySelector('[data-tool-kicker]');
  const headline = root.querySelector('[data-tool-headline]');
  const phase = root.querySelector('[data-tool-phase]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tools = {
    dynomap: {
      color: '#2e5cb8', kicker: 'Dynomap',
      headline: 'Tables learn their own spatial organization.',
      phase: 'Features move · neighborhoods emerge · attributions return to biology'
    },
    graph: {
      color: '#147b78', kicker: 'Graph2Image',
      headline: 'Large biological networks become inspectable images.',
      phase: 'Topology is encoded · image channels form · node evidence remains visible'
    },
    foundation: {
      color: '#173d59', kicker: 'Graph Foundation Model',
      headline: 'One structural language transfers across unseen graphs.',
      phase: 'Node roles are described · text and graph streams align · zero-shot transfer follows'
    },
    gig: {
      color: '#6955a5', kicker: 'Graph-in-Graph',
      headline: 'Each patient becomes a pathway-structured graph.',
      phase: 'Expression personalizes nodes · pathways preserve biology · predictions remain traceable'
    },
    cell: {
      color: '#b87d24', kicker: 'scVision',
      headline: 'Single cells become reusable visual representations.',
      phase: 'Genes are mapped · cells are rendered · a foundation representation is learned'
    }
  };
  let active = 'dynomap';
  let started = performance.now();
  let cycleTimer;

  const rgba = (hex, alpha) => {
    const value = parseInt(hex.slice(1), 16);
    return `rgba(${value >> 16},${(value >> 8) & 255},${value & 255},${alpha})`;
  };
  const line = (x1, y1, x2, y2, color, width = 1) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
  };
  const circle = (x, y, radius, fill, stroke = null, width = 1) => {
    ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
  };
  const label = (text, x, y, align = 'left') => {
    ctx.fillStyle = '#728087';
    ctx.font = '600 10px "DM Sans", sans-serif';
    ctx.textAlign = align;
    ctx.fillText(text.toUpperCase(), x, y);
  };
  const bezierPoint = (t, p0, p1, p2, p3) => {
    const u = 1 - t;
    return {
      x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
      y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
    };
  };

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(box.width * dpr);
    canvas.height = Math.round(box.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const background = (w, h) => {
    ctx.clearRect(0, 0, w, h);
    const glow = ctx.createRadialGradient(w * .68, h * .43, 20, w * .68, h * .43, w * .46);
    glow.addColorStop(0, 'rgba(51,127,130,.07)');
    glow.addColorStop(1, 'rgba(51,127,130,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  };

  const flowParticles = (progress, color, w, h, lanes = 7) => {
    const p0 = {x:w*.27,y:h*.45}, p1 = {x:w*.39,y:h*.27}, p2 = {x:w*.49,y:h*.69}, p3 = {x:w*.59,y:h*.44};
    for (let i = 0; i < lanes; i += 1) {
      const offset = (i - (lanes - 1) / 2) * 7;
      const a = {x:p0.x,y:p0.y+offset}, b = {x:p1.x,y:p1.y+offset*.3};
      const c = {x:p2.x,y:p2.y+offset*.25}, d = {x:p3.x,y:p3.y+offset*.7};
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.bezierCurveTo(b.x,b.y,c.x,c.y,d.x,d.y);
      ctx.strokeStyle = rgba(color,.16); ctx.lineWidth = 1; ctx.stroke();
      for (let k = 0; k < 2; k += 1) {
        const t = (progress + i*.071 + k*.43) % 1;
        const point = bezierPoint(t,a,b,c,d);
        circle(point.x, point.y, k ? 1.8 : 2.8, rgba(color,k ? .55 : .9));
      }
    }
  };

  const drawDynomap = (progress, w, h) => {
    const red = '#2e5cb8', teal = '#147b78', gold = '#b87d24', navy = '#173d59';
    label('Unordered table', w*.075, h*.13);
    const ox = w*.075, oy = h*.18, size = Math.min(22, w*.027);
    const colors = ['#ddd8cf','#d7e4df','#e9c6b8','#dec489'];
    for (let r=0;r<6;r+=1) for (let c=0;c<6;c+=1) {
      ctx.fillStyle = colors[(r*7+c*3)%colors.length];
      ctx.globalAlpha = .45 + ((r+c)%3)*.18;
      ctx.fillRect(ox+c*(size+3),oy+r*(size+3),size,size);
    }
    ctx.globalAlpha = 1;
    flowParticles(progress,red,w,h,9);
    label('Learned continuous map',w*.63,h*.13);
    const centers = [
      {x:w*.72,y:h*.29,color:teal},
      {x:w*.84,y:h*.45,color:red},
      {x:w*.73,y:h*.62,color:gold}
    ];
    centers.forEach((center,ci) => {
      const radius = Math.min(w,h)*.135;
      const cloud = ctx.createRadialGradient(center.x,center.y,2,center.x,center.y,radius);
      cloud.addColorStop(0,rgba(center.color,.19)); cloud.addColorStop(1,rgba(center.color,0));
      ctx.fillStyle = cloud; ctx.beginPath(); ctx.arc(center.x,center.y,radius,0,Math.PI*2); ctx.fill();
      const points=[];
      for(let i=0;i<16;i+=1) {
        const angle=i*2.399+ci, rr=radius*(.18+((i*13)%17)/22);
        points.push({x:center.x+Math.cos(angle)*rr,y:center.y+Math.sin(angle)*rr*.72});
      }
      points.forEach((point,i) => {
        if(i>0) line(point.x,point.y,points[(i*5+3)%points.length].x,points[(i*5+3)%points.length].y,rgba(center.color,.28));
      });
      points.forEach((point,i) => circle(point.x,point.y,i%5===0?4.5:2.1,rgba(center.color,.88),'#ffffff',1));
    });
    line(centers[0].x,centers[0].y,centers[1].x,centers[1].y,rgba(navy,.52),2);
    line(centers[1].x,centers[1].y,centers[2].x,centers[2].y,rgba(navy,.52),2);
  };

  const drawGraph2Image = (progress, w, h) => {
    const teal='#147b78', gold='#b87d24', navy='#173d59';
    label('Biological network',w*.065,h*.13);
    const points=[];
    for(let i=0;i<12;i+=1) {
      const angle=i*2.399, rr=34+(i%4)*15;
      points.push({x:w*.17+Math.cos(angle)*rr,y:h*.42+Math.sin(angle)*rr*.82});
    }
    points.forEach((point,i) => {
      line(point.x,point.y,points[(i*5+2)%points.length].x,points[(i*5+2)%points.length].y,rgba(navy,.28));
      if(i%2===0) line(point.x,point.y,points[(i+1)%points.length].x,points[(i+1)%points.length].y,rgba(teal,.42));
    });
    points.forEach((point,i)=>circle(point.x,point.y,i%4===0?4.5:2.7,i%3===0?gold:teal,'#ffffff',1));
    flowParticles(progress,teal,w,h,8);
    label('Feature · edge · structure channels',w*.63,h*.13);
    for(let layer=2;layer>=0;layer-=1) {
      const x=w*.65+layer*18,y=h*.2-layer*9,ww=w*.27,hh=h*.44;
      ctx.fillStyle=layer===0?'rgba(23,48,75,.94)':`rgba(51,127,130,${.12+layer*.08})`;
      ctx.strokeStyle=layer===0?'rgba(255,255,255,.5)':rgba(teal,.45); ctx.lineWidth=1;
      ctx.beginPath(); ctx.roundRect(x,y,ww,hh,9); ctx.fill(); ctx.stroke();
      if(layer===0) {
        for(let r=0;r<5;r+=1) for(let c=0;c<7;c+=1) {
          const value=(r*11+c*7)%13;
          ctx.fillStyle=value<4?rgba(gold,.75):value>9?rgba(teal,.78):'rgba(255,255,255,.08)';
          ctx.fillRect(x+17+c*(ww-34)/7,y+19+r*(hh-38)/5,(ww-45)/7,(hh-49)/5);
        }
      }
    }
  };

  const drawFoundation = (progress, w, h) => {
    const navy='#173d59',teal='#147b78',gold='#b87d24',red='#2e5cb8',paper='#ffffff';
    label('9 source graphs',w*.055,h*.13);
    label('Shared topology',w*.5,h*.13,'center');
    label('Unseen protein network',w*.69,h*.13);

    const sourceCenters=[
      {x:w*.13,y:h*.25,color:teal},
      {x:w*.13,y:h*.43,color:gold},
      {x:w*.13,y:h*.61,color:red}
    ];
    sourceCenters.forEach((source,sourceIndex) => {
      const boxW=Math.max(68,w*.15),boxH=Math.max(42,h*.13);
      ctx.fillStyle='rgba(255,253,249,.78)';
      ctx.strokeStyle=rgba(navy,.14);ctx.lineWidth=1;
      ctx.beginPath();ctx.roundRect(source.x-boxW/2,source.y-boxH/2,boxW,boxH,7);ctx.fill();ctx.stroke();
      const nodes=[];
      for(let i=0;i<7;i+=1) {
        const angle=i*2.399+sourceIndex*.7,rr=8+(i%3)*5;
        nodes.push({x:source.x+Math.cos(angle)*rr*1.6,y:source.y+Math.sin(angle)*rr*.72});
      }
      nodes.forEach((node,i) => {
        line(node.x,node.y,nodes[(i*3+2)%nodes.length].x,nodes[(i*3+2)%nodes.length].y,rgba(navy,.24));
      });
      nodes.forEach((node,i)=>circle(node.x,node.y,i%3===0?3.2:2.1,rgba(source.color,.86),paper,.8));
    });

    const core={x:w*.49,y:h*.42},coreW=Math.max(94,w*.18),coreH=Math.max(70,h*.23);
    sourceCenters.forEach((source,i) => {
      const a={x:source.x+w*.08,y:source.y},b={x:w*.31,y:source.y};
      const c={x:w*.37,y:core.y+(i-1)*12},d={x:core.x-coreW/2,y:core.y+(i-1)*12};
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.bezierCurveTo(b.x,b.y,c.x,c.y,d.x,d.y);
      ctx.strokeStyle=rgba(source.color,.24);ctx.lineWidth=1;ctx.stroke();
      const point=bezierPoint((progress+i*.24)%1,a,b,c,d);
      circle(point.x,point.y,2.8,source.color,paper,.8);
    });

    ctx.fillStyle=navy;ctx.strokeStyle=rgba(navy,.34);ctx.lineWidth=1;
    ctx.beginPath();ctx.roundRect(core.x-coreW/2,core.y-coreH/2,coreW,coreH,12);ctx.fill();ctx.stroke();
    ctx.fillStyle=paper;ctx.textAlign='center';ctx.font='600 10px "DM Sans", sans-serif';ctx.fillText('GFM',core.x,core.y-4);
    ctx.fillStyle='rgba(255,253,249,.65)';ctx.font='600 7px "DM Sans", sans-serif';ctx.fillText('STRUCTURAL ROLES',core.x,core.y+11);
    const orbitNodes=[[-27,-22],[-10,-30],[14,-25],[29,-10],[25,17],[4,27],[-21,20],[-31,0]];
    orbitNodes.forEach((node,i)=>{
      const next=orbitNodes[(i+1)%orbitNodes.length];
      line(core.x+node[0],core.y+node[1],core.x+next[0],core.y+next[1],'rgba(255,255,255,.18)');
      circle(core.x+node[0],core.y+node[1],1.7,[teal,gold,red][i%3]);
    });

    const targetCenter={x:w*.82,y:h*.42};
    const transferA={x:core.x+coreW/2,y:core.y},transferB={x:w*.64,y:h*.27};
    const transferC={x:w*.68,y:h*.62},transferD={x:targetCenter.x-w*.1,y:targetCenter.y};
    ctx.beginPath();ctx.moveTo(transferA.x,transferA.y);ctx.bezierCurveTo(transferB.x,transferB.y,transferC.x,transferC.y,transferD.x,transferD.y);
    ctx.strokeStyle=rgba(navy,.25);ctx.lineWidth=1.5;ctx.stroke();
    for(let i=0;i<3;i+=1) {
      const point=bezierPoint((progress+i/3)%1,transferA,transferB,transferC,transferD);
      circle(point.x,point.y,3,[teal,gold,red][i],paper,.8);
    }

    const communities=[
      {x:targetCenter.x-w*.035,y:targetCenter.y-h*.11,color:teal},
      {x:targetCenter.x+w*.055,y:targetCenter.y,color:red},
      {x:targetCenter.x-w*.025,y:targetCenter.y+h*.13,color:gold}
    ];
    const targetNodes=[];
    communities.forEach((community,group) => {
      for(let i=0;i<7;i+=1) {
        const angle=i*2.399+group*.6,rr=8+(i%4)*4;
        targetNodes.push({x:community.x+Math.cos(angle)*rr*1.3,y:community.y+Math.sin(angle)*rr*.7,color:community.color,group});
      }
    });
    targetNodes.forEach((node,i) => {
      const sameGroup=targetNodes.filter((candidate)=>candidate.group===node.group);
      const neighbor=sameGroup[(i*3+1)%sameGroup.length];
      line(node.x,node.y,neighbor.x,neighbor.y,rgba(node.color,.3));
      if(i%7===0) {
        const bridge=targetNodes[(i+9)%targetNodes.length];
        line(node.x,node.y,bridge.x,bridge.y,rgba(navy,.28));
      }
    });
    targetNodes.forEach((node,i)=>circle(node.x,node.y,i%7===0?4:2.2,rgba(node.color,.9),paper,.8));
    label('Zero-shot transfer',targetCenter.x,h*.7,'center');
  };

  const drawScVision = (progress, w, h) => {
    const gold='#b87d24',teal='#147b78',red='#2e5cb8',navy='#173d59';
    label('Single-cell expression',w*.065,h*.13);
    const baseX=w*.07,baseY=h*.64;
    for(let i=0;i<12;i+=1) {
      const barHeight=28+((i*17)%9)*7;
      ctx.fillStyle=i%4===0?rgba(gold,.82):rgba(navy,.18+.035*(i%5));
      ctx.fillRect(baseX+i*11,baseY-barHeight,7,barHeight);
    }
    for(let i=0;i<34;i+=1) {
      const angle=i*2.399,rr=16+(i%8)*4;
      circle(w*.17+Math.cos(angle)*rr,h*.26+Math.sin(angle)*rr*.6,1.9,[teal,red,gold][i%3]);
    }
    flowParticles(progress,gold,w,h,8);
    label('Reusable cell representation',w*.63,h*.13);
    const x=w*.65,y=h*.18,size=Math.min(w*.265,h*.46);
    ctx.fillStyle='rgba(255,253,249,.94)';ctx.strokeStyle=rgba(navy,.22);ctx.lineWidth=1;
    ctx.beginPath();ctx.roundRect(x,y,size,size,11);ctx.fill();ctx.stroke();
    const grid=7,gap=3,cell=(size-28-gap*(grid-1))/grid;
    for(let r=0;r<grid;r+=1) for(let c=0;c<grid;c+=1) {
      const value=(r*13+c*7)%17;
      ctx.fillStyle=value<4?rgba(gold,.82):value>12?rgba(teal,.76):value===9?rgba(red,.72):rgba(navy,.09);
      ctx.fillRect(x+14+c*(cell+gap),y+14+r*(cell+gap),cell,cell);
    }
    const maskIndex=Math.floor(progress*7)%7;
    ctx.fillStyle=rgba(navy,.85);
    ctx.fillRect(x+14+maskIndex*(cell+gap),y+14+((maskIndex*3)%7)*(cell+gap),cell,cell);
    const ex=x+size+45,ey=y+size*.48;
    for(let i=0;i<42;i+=1) {
      const group=i%3,angle=i*2.399,rr=7+(i%11)*2.5;
      const cx=ex+(group-1)*30,cy=ey+(group===1?34:-10);
      circle(cx+Math.cos(angle)*rr,cy+Math.sin(angle)*rr*.56,1.8,[teal,red,gold][group]);
    }
  };

  const drawGiG = (progress, w, h) => {
    const purple='#6955a5',teal='#147b78',gold='#b87d24',blue='#2e5cb8',navy='#173d59',paper='#ffffff';
    const compact=w<460;
    label(compact?'Patient data':'Patient expression',w*.055,h*.13);
    label(compact?'Patient graphs':'Pathway-structured patient graphs',compact?w*.5:w*.48,h*.13,'center');
    label(compact?'Prediction':'Clinical prediction',compact?w*.78:w*.79,h*.13);

    const patients=[
      {y:h*.25,color:teal,values:[.35,.72,.46,.86,.27,.61,.43,.78]},
      {y:h*.42,color:purple,values:[.66,.31,.83,.49,.73,.38,.58,.25]},
      {y:h*.59,color:gold,values:[.42,.81,.29,.63,.88,.47,.34,.69]}
    ];
    const cardX=w*.055,cardW=Math.max(92,w*.17),cardH=Math.max(34,h*.105);
    const graphCenters=[];

    patients.forEach((patient,index) => {
      ctx.fillStyle='rgba(255,255,255,.82)';ctx.strokeStyle=rgba(navy,.14);ctx.lineWidth=1;
      ctx.beginPath();ctx.roundRect(cardX,patient.y-cardH/2,cardW,cardH,7);ctx.fill();ctx.stroke();
      patient.values.forEach((value,i) => {
        const barW=(cardW-26)/patient.values.length;
        const barH=6+value*(cardH-15);
        ctx.fillStyle=i%3===index%3?rgba(patient.color,.78):rgba(navy,.13);
        ctx.fillRect(cardX+10+i*barW,patient.y+cardH/2-7-barH,Math.max(3,barW-3),barH);
      });
      ctx.fillStyle=rgba(navy,.62);ctx.font='600 7px "DM Sans", sans-serif';ctx.textAlign='left';
      ctx.fillText(`P${index+1}`,cardX+cardW+7,patient.y+2);
      graphCenters.push({x:w*.48,y:patient.y,color:patient.color,index});
    });

    const cohortX=w*.32,cohortY=h*.17,cohortW=w*.31,cohortH=h*.49;
    ctx.fillStyle=rgba(purple,.035);ctx.strokeStyle=rgba(purple,.22);ctx.lineWidth=1;
    ctx.beginPath();ctx.roundRect(cohortX,cohortY,cohortW,cohortH,12);ctx.fill();ctx.stroke();
    ctx.fillStyle=rgba(purple,.7);ctx.font='600 7px "DM Sans", sans-serif';ctx.textAlign='right';
    ctx.fillText(compact?'PATIENT GRAPHS':'ONE GRAPH PER PATIENT',cohortX+cohortW-10,cohortY+15);

    graphCenters.forEach((center,index) => {
      const a={x:cardX+cardW+18,y:patients[index].y};
      const b={x:w*.285,y:patients[index].y};
      const c={x:w*.33,y:center.y};
      const d={x:center.x-37,y:center.y};
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.bezierCurveTo(b.x,b.y,c.x,c.y,d.x,d.y);
      ctx.strokeStyle=rgba(center.color,.24);ctx.lineWidth=1;ctx.stroke();
      const particle=bezierPoint((progress+index*.22)%1,a,b,c,d);
      circle(particle.x,particle.y,2.7,center.color,paper,.8);

      const nodes=[];
      for(let i=0;i<8;i+=1) {
        const angle=(Math.PI*2*i)/8+index*.23;
        const radius=i%2===0?27:18;
        nodes.push({x:center.x+Math.cos(angle)*radius,y:center.y+Math.sin(angle)*radius*.55});
      }
      [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,4],[2,6],[1,5]].forEach((edge,edgeIndex)=>{
        const source=nodes[edge[0]],target=nodes[edge[1]];
        line(source.x,source.y,target.x,target.y,edgeIndex===8+index?rgba(center.color,.8):rgba(navy,.22),edgeIndex===8+index?2:1);
      });
      nodes.forEach((node,i)=>circle(node.x,node.y,i===index+1?4:2.4,i===index+1?center.color:rgba(center.color,.72),paper,.8));
    });

    const outcomeX=w*.73,outcomeY=h*.23,outcomeW=w*.21,outcomeH=h*.34;
    ctx.fillStyle='rgba(255,255,255,.9)';ctx.strokeStyle=rgba(navy,.16);ctx.lineWidth=1;
    ctx.beginPath();ctx.roundRect(outcomeX,outcomeY,outcomeW,outcomeH,10);ctx.fill();ctx.stroke();
    graphCenters.forEach((center,index) => {
      const start={x:cohortX+cohortW,y:center.y};
      const control1={x:w*.67,y:center.y};
      const control2={x:w*.68,y:outcomeY+outcomeH*.5};
      const end={x:outcomeX,y:outcomeY+outcomeH*.5};
      ctx.beginPath();ctx.moveTo(start.x,start.y);ctx.bezierCurveTo(control1.x,control1.y,control2.x,control2.y,end.x,end.y);
      ctx.strokeStyle=rgba(center.color,.18);ctx.lineWidth=1;ctx.stroke();
      const point=bezierPoint((progress+index*.3)%1,start,control1,control2,end);
      circle(point.x,point.y,2.6,center.color,paper,.8);
    });
    ctx.fillStyle=navy;ctx.font='600 8px "DM Sans", sans-serif';ctx.textAlign='left';ctx.fillText(compact?'RISK':'DISEASE PROBABILITY',outcomeX+13,outcomeY+20);
    const gaugeX=outcomeX+13,gaugeY=outcomeY+39,gaugeW=outcomeW-26;
    ctx.fillStyle=rgba(navy,.1);ctx.beginPath();ctx.roundRect(gaugeX,gaugeY,gaugeW,8,4);ctx.fill();
    const fill=.64+.12*Math.sin(progress*Math.PI*2);
    ctx.fillStyle=purple;ctx.beginPath();ctx.roundRect(gaugeX,gaugeY,gaugeW*fill,8,4);ctx.fill();
    ctx.fillStyle=purple;ctx.font='600 18px "DM Sans", sans-serif';ctx.fillText(`${Math.round(fill*100)}%`,gaugeX,gaugeY+34);
    ctx.fillStyle=rgba(navy,.62);ctx.font='600 7px "DM Sans", sans-serif';ctx.fillText(compact?'PATHWAY':'TOP PATHWAY',gaugeX,gaugeY+54);
    ctx.fillStyle=teal;ctx.font=`600 ${compact?8:9}px "DM Sans", sans-serif`;ctx.fillText(compact?'IMMUNE':'IMMUNE SIGNALING',gaugeX,gaugeY+68);
  };

  const draw = (time) => {
    const box=canvas.getBoundingClientRect(),w=box.width,h=box.height;
    const progress=reduceMotion ? .86 : ((time-started)%5000)/5000;
    background(w,h);
    if(active==='dynomap') drawDynomap(progress,w,h);
    else if(active==='graph') drawGraph2Image(progress,w,h);
    else if(active==='foundation') drawFoundation(progress,w,h);
    else if(active==='gig') drawGiG(progress,w,h);
    else drawScVision(progress,w,h);
    window.requestAnimationFrame(draw);
  };

  const activate = (name,manual=false) => {
    active=name;started=performance.now();
    const data=tools[name];
    tabs.forEach((tab) => {
      const selected=tab.dataset.tool===name;
      tab.classList.toggle('is-active',selected);
      tab.setAttribute('aria-selected',String(selected));
    });
    copy.style.setProperty('--tool-color',data.color);
    kicker.textContent=data.kicker;headline.textContent=data.headline;phase.textContent=data.phase;
    if(manual && !reduceMotion) schedule();
  };
  const schedule = () => {
    window.clearInterval(cycleTimer);
    cycleTimer=window.setInterval(() => {
      const index=tabs.findIndex((tab)=>tab.dataset.tool===active);
      activate(tabs[(index+1)%tabs.length].dataset.tool);
    },5000);
  };

  tabs.forEach((tab)=>tab.addEventListener('click',()=>activate(tab.dataset.tool,true)));
  window.addEventListener('resize',resize,{passive:true});
  resize();
  if(!reduceMotion) schedule();
  window.requestAnimationFrame(draw);
})();
