/* ============================================================
   js/09-ux.js
   EXPERIÊNCIA DE USO: menu mobile, cabeçalho dinâmico, revelação ao rolar, carrossel de notícias e feedback dos botões.
   ============================================================ */
(function(){
  // Fecha o menu mobile (painel, fundo escuro, ícone ☰ e atributos de acessibilidade).
  function closeMobileNavigation(){
    const nav=document.getElementById("navLinks");
    const toggle=document.getElementById("menuToggle");
    const backdrop=document.getElementById("mobileNavBackdrop");
    if(!nav||!toggle)return;
    nav.classList.remove("show");
    document.body.classList.remove("mobile-nav-open");
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-label","Abrir menu");
    toggle.textContent="☰";
    if(backdrop)backdrop.classList.remove("show");
  }
  // Menu mobile: botão ☰/×, fundo clicável, fecha ao escolher um link, com ESC ou ao ampliar a tela.
  function initMobileNavigation(){
    const nav=document.getElementById("navLinks");
    const toggle=document.getElementById("menuToggle");
    if(!nav||!toggle||toggle.dataset.enhanced==="true")return;
    let backdrop=document.getElementById("mobileNavBackdrop");
    if(!backdrop){
      backdrop=document.createElement("button");
      backdrop.type="button";
      backdrop.id="mobileNavBackdrop";
      backdrop.className="mobile-nav-backdrop";
      backdrop.setAttribute("aria-label","Fechar menu");
      document.body.appendChild(backdrop);
    }
    toggle.dataset.enhanced="true";
    toggle.addEventListener("click",()=>{
      const willOpen=toggle.getAttribute("aria-expanded")!=="true";
      if(willOpen){
        nav.classList.add("show");
        backdrop.classList.add("show");
        document.body.classList.add("mobile-nav-open");
        toggle.setAttribute("aria-expanded","true");
        toggle.setAttribute("aria-label","Fechar menu");
        toggle.textContent="×";
      }else closeMobileNavigation();
    });
    nav.addEventListener("click",event=>{
      if(event.target.closest("a"))closeMobileNavigation();
    });
    backdrop.addEventListener("click",closeMobileNavigation);
    document.addEventListener("keydown",event=>{
      if(event.key==="Escape")closeMobileNavigation();
    });
    window.addEventListener("resize",()=>{
      if(window.innerWidth>960)closeMobileNavigation();
    });
  }
  // Animação de entrada: seções e cards aparecem ao entrar na tela (IntersectionObserver).
  function initScrollReveal(){
    const targets=document.querySelectorAll("main > section, footer, #agendaGrid .agenda-card, #newsGrid .news-card, #communityGrid .community-card, #equipe .person");
    if(!("IntersectionObserver" in window))return;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.08,rootMargin:"0px 0px -35px 0px"});
    targets.forEach((el,index)=>{
      el.classList.add("scroll-reveal");
      el.style.setProperty("--reveal-delay",Math.min(index%4,3)*65+"ms");
      observer.observe(el);
    });
  }
  // Cabeçalho que muda ao rolar e barra de progresso de leitura da página.
  function initDynamicHeader(){
    const header=document.querySelector("header.topbar");
    const progress=document.getElementById("readingProgressBar");
    let ticking=false;
    const update=()=>{
      const y=window.scrollY||document.documentElement.scrollTop;
      if(header)header.classList.toggle("is-scrolled",y>24);
      if(progress){
        const max=document.documentElement.scrollHeight-window.innerHeight;
        const ratio=max>0?Math.min(1,Math.max(0,y/max)):0;
        progress.style.width=(ratio*100)+"%";
      }
      ticking=false;
    };
    window.addEventListener("scroll",()=>{
      if(!ticking){window.requestAnimationFrame(update);ticking=true;}
    },{passive:true});
    window.addEventListener("resize",update);
    update();
  }
  // Carrossel de notícias com loop infinito (clones nas pontas), setas e pontos de navegação.
  function initNewsCarousel(){
    const track=document.getElementById("newsGrid");
    const dots=document.getElementById("newsCarouselDots");
    const prev=document.getElementById("newsCarouselPrev");
    const next=document.getElementById("newsCarouselNext");
    if(!track||!dots||!prev||!next||track.dataset.carouselReady==="true")return;
    const originals=Array.from(track.querySelectorAll(".news-card"));
    if(originals.length<2)return;
    track.dataset.carouselReady="true";

    const lastClone=originals[originals.length-1].cloneNode(true);
    const firstClone=originals[0].cloneNode(true);
    lastClone.classList.add("news-card-clone");
    firstClone.classList.add("news-card-clone");
    lastClone.setAttribute("aria-hidden","true");
    firstClone.setAttribute("aria-hidden","true");
    track.insertBefore(lastClone,track.firstChild);
    track.appendChild(firstClone);

    let current=0;
    let step=0;
    let settleTimer=null;
    let transitionTimer=null;
    let transitioning=false;

    originals.forEach((_,index)=>{
      const dot=document.createElement("button");
      dot.type="button";
      dot.className="news-carousel-dot"+(index===0?" is-active":"");
      dot.setAttribute("aria-label","Ir para notícia "+(index+1));
      dot.addEventListener("click",()=>goTo(index));
      dots.appendChild(dot);
    });
    const dotButtons=Array.from(dots.querySelectorAll("button"));

    // Mede a largura de um card + espaçamento e reposiciona o carrossel.
    function measure(){
      const card=track.querySelector(".news-card");
      if(!card)return;
      const style=getComputedStyle(track);
      const gap=parseFloat(style.columnGap||style.gap)||0;
      step=card.getBoundingClientRect().width+gap;
      track.scrollLeft=step*(current+1);
    }
    // Marca o ponto (bolinha) do card atual.
    function setDots(index){
      dotButtons.forEach((dot,i)=>dot.classList.toggle("is-active",i===index));
    }
    // Ao chegar num clone, salta sem animação para o card real equivalente (efeito de loop).
    function finishLoop(){
      if(!step)return;
      const position=Math.round(track.scrollLeft/step);
      if(position===0){
        track.scrollTo({left:step*originals.length,behavior:"auto"});
      }else if(position===originals.length+1){
        track.scrollTo({left:step,behavior:"auto"});
      }
      current=(Math.round(track.scrollLeft/step)-1+originals.length)%originals.length;
      setDots(current);
      transitioning=false;
      if(transitionTimer){clearTimeout(transitionTimer);transitionTimer=null;}
    }
    // Rola suavemente até a notícia indicada (-1 e total = clones das pontas).
    function goTo(index){
      if(!step||transitioning)return;
      let target;
      if(index<0){
        current=originals.length-1;
        target=0; // clone do último card, antes do primeiro
      }else if(index>=originals.length){
        current=0;
        target=originals.length+1; // clone do primeiro card, depois do último
      }else{
        current=index;
        target=index+1;
      }
      transitioning=true;
      setDots(current);
      track.scrollTo({left:step*target,behavior:"smooth"});
      if(transitionTimer)clearTimeout(transitionTimer);
      transitionTimer=setTimeout(finishLoop,560);
    }

    prev.addEventListener("click",()=>goTo(current-1));
    next.addEventListener("click",()=>goTo(current+1));
    track.addEventListener("scroll",()=>{
      if(!step)return;
      if(settleTimer)clearTimeout(settleTimer);
      settleTimer=setTimeout(()=>{
        if(transitioning){finishLoop();return;}
        const position=Math.round(track.scrollLeft/step);
        if(position===0||position===originals.length+1){finishLoop();return;}
        current=(position-1+originals.length)%originals.length;
        setDots(current);
      },110);
    },{passive:true});
    window.addEventListener("resize",measure);
    requestAnimationFrame(measure);
  }
  // Efeito visual de clique nos botões (classes interaction-pressed/clicked).
  function initButtonFeedback(){
    document.addEventListener("pointerdown",event=>{
      const button=event.target.closest("button,.btn,.btn-small,.nav-action");
      if(button)button.classList.add("interaction-pressed");
    });
    ["pointerup","pointercancel"].forEach(type=>{
      document.addEventListener(type,()=>{
        document.querySelectorAll(".interaction-pressed").forEach(el=>el.classList.remove("interaction-pressed"));
      });
    });
    document.addEventListener("click",event=>{
      const button=event.target.closest("button,.btn,.btn-small,.nav-action");
      if(!button)return;
      button.classList.remove("interaction-clicked");
      void button.offsetWidth;
      button.classList.add("interaction-clicked");
      window.setTimeout(()=>button.classList.remove("interaction-clicked"),420);
    });
  }
  // Liga todos os recursos de experiência de uso.
  function initUX(){
    initMobileNavigation();
    initDynamicHeader();
    initScrollReveal();
    initNewsCarousel();
    initButtonFeedback();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initUX);
  else initUX();
})();
