/* ============================================================
   js/10-radio.js
   RÁDIO CATÓLICA: mini-player na faixa de missas (lista de emissoras, play/pause, volume).
   ============================================================ */
(function(){
  // Mini-player de rádio: lista de emissoras, play/pause, próxima, volume e painel recolhível.
  function initNativeRadio(){
    const toggle=document.getElementById("radioMiniToggle");
    const panel=document.getElementById("radioNativeExpansion");
    const audio=document.getElementById("radioNativeAudio");
    const play=document.getElementById("radioNativePlay");
    const pause=document.getElementById("radioNativePause");
    const next=document.getElementById("radioNativeNext");
    const volume=document.getElementById("radioNativeVolume");
    const stationName=document.getElementById("radioNativeStationName");
    const status=document.getElementById("radioNativeStatus");
    const select=document.getElementById("radioNativeStationSelect");
    const officialLink=document.getElementById("radioNativeOfficialLink");
    const widget=document.getElementById("radioMiniWidget");
    const inner=document.querySelector("#missas .mass-ribbon-inner");
    const headerCta=document.querySelector("header .nav-action");
    if(!toggle||!panel||!audio||!play||!pause||!next||!volume||!stationName||!status||!select||!officialLink||!widget||!inner)return;

    /* URLs de áudio direto só são usadas quando identificadas publicamente.
       Para as demais emissoras, o link leva ao player oficial, sem simular um stream. */
    const stations=[
      {name:"Rádio Aparecida · 104.3 FM",city:"Aparecida / SP",url:"",official:"https://www.a12.com/radio"},
      {name:"Rádio Canção Nova · 89.1 FM",city:"Cachoeira Paulista / SP",url:"https://servidor15-5.brlogic.com:7126/live",official:"https://radio.cancaonova.com/radio/cachoeira-paulista/"},
      {name:"Rádio 9 de Julho",city:"Arquidiocese de São Paulo",url:"",official:"https://radio9dejulho.com.br/podcasts/radio-ao-vivo/"},
      {name:"Rádio Evangelizar · 99.5 FM / 1060 AM",city:"Curitiba / PR",url:"https://8241.brasilstream.com.br/stream?origem=site",official:"https://radioevangelizar.com.br/"},
      {name:"FM Dom Bosco · 96.1 FM",city:"Fortaleza / CE",url:"",official:"https://radiosnainternet.com.br/radios/radio-fm-dom-bosco-961/embed"},
      {name:"Rádio Colméia · 98.7 FM",city:"Maringá / PR",url:"https://stm04.virtualcast.com.br:8024/colmeiamaringa",official:"https://colmeiafm.com.br/"}
    ];
    let stationIndex=1;
    let initialized=false;

    // Alinha a borda direita do mini-player com o botão "Seja Dizimista" (somente em telas largas).
    function alignRightEdge(){
      if(window.matchMedia("(max-width: 860px)").matches){widget.style.right="";return;}
      if(!headerCta)return;
      const ribbonRect=inner.getBoundingClientRect();
      const ctaRect=headerCta.getBoundingClientRect();
      widget.style.right=Math.max(0,Math.round(ribbonRect.right-ctaRect.right))+"px";
    }
    // Abre/fecha o painel de controles da rádio.
    function setPanel(open){
      panel.hidden=!open;
      toggle.setAttribute("aria-expanded",String(open));
      toggle.setAttribute("aria-label",open?"Fechar rádio":"Ouvir rádio");
      toggle.title=open?"Fechar controles de rádio":"Ouvir rádio católica";
    }
    // Troca a emissora; emissoras sem stream direto mostram o link do player oficial.
    function setStation(index,shouldPlay){
      stationIndex=(index+stations.length)%stations.length;
      const station=stations[stationIndex];
      select.value=String(stationIndex);
      audio.pause();
      stationName.textContent=station.name;
      officialLink.href=station.official;
      officialLink.hidden=!!station.url;
      if(station.url){
        audio.src=station.url;
        audio.load();
        status.textContent=shouldPlay?"Conectando…":station.city+" · pronta para tocar";
        initialized=true;
        if(shouldPlay)audio.play().then(()=>{status.textContent="Ao vivo · "+station.city;}).catch(()=>{status.textContent="Não foi possível iniciar o stream. Use o player oficial.";officialLink.hidden=false;});
      }else{
        audio.removeAttribute("src");audio.load();initialized=false;
        status.textContent="Player oficial disponível para esta emissora · "+station.city;
        if(shouldPlay)status.textContent="Abra o player oficial para ouvir · "+station.city;
      }
    }
    toggle.addEventListener("click",()=>setPanel(panel.hidden));
    document.addEventListener("click",event=>{if(!panel.hidden&&!widget.contains(event.target))setPanel(false);});
    document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!panel.hidden)setPanel(false);});
    select.addEventListener("change",()=>setStation(Number(select.value),false));
    play.addEventListener("click",()=>{
      const station=stations[stationIndex];
      if(!station.url){officialLink.hidden=false;status.textContent="Esta emissora utiliza o player oficial. Clique no link abaixo para ouvir.";return;}
      if(!initialized)setStation(stationIndex,false);
      audio.play().then(()=>{status.textContent="Ao vivo · "+station.city;}).catch(()=>{status.textContent="Não foi possível iniciar. Tente novamente ou abra o player oficial.";officialLink.hidden=false;});
    });
    pause.addEventListener("click",()=>{audio.pause();status.textContent="Pausada";});
    next.addEventListener("click",()=>setStation(stationIndex+1,true));
    volume.addEventListener("input",()=>{audio.volume=Math.max(0,Math.min(1,Number(volume.value)/100));});
    audio.volume=Number(volume.value)/100;
    audio.addEventListener("playing",()=>{status.textContent="Ao vivo";});
    audio.addEventListener("waiting",()=>{status.textContent="Carregando transmissão…";});
    audio.addEventListener("pause",()=>{if(!audio.ended&&stations[stationIndex].url)status.textContent="Pausada";});
    audio.addEventListener("error",()=>{status.textContent="Transmissão indisponível. Use o player oficial.";officialLink.hidden=false;});
    window.addEventListener("resize",alignRightEdge,{passive:true});
    alignRightEdge();setTimeout(alignRightEdge,250);
    setStation(stationIndex,false);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initNativeRadio);
  else initNativeRadio();
})();
