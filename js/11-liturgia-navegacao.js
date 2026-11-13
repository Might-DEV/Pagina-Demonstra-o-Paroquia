/* ============================================================
   js/11-liturgia-navegacao.js
   NAVEGAÇÃO: alterna entre a página inicial e a página de Liturgia (#liturgia) sem recarregar.
   ============================================================ */
(()=>{
  const page=document.getElementById('liturgiaPageView');
  const home=document.getElementById('siteMain');
  if(!page||!home)return;
  let lastHomeHash='#inicio';
  // Fecha o menu mobile ao trocar de página.
  const closeMobile=()=>{
    const nav=document.getElementById('navLinks');
    const toggle=document.getElementById('menuToggle');
    const backdrop=document.getElementById('mobileNavBackdrop');
    if(nav)nav.classList.remove('show');
    document.body.classList.remove('mobile-nav-open');
    if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');toggle.textContent='☰';}
    if(backdrop)backdrop.classList.remove('show');
  };
  // Mostra a página de Liturgia e esconde a página inicial.
  const showLiturgia=()=>{
    home.hidden=true;
    page.hidden=false;
    document.title='Liturgia | Paróquia São Paulo Apóstolo';
    window.scrollTo({top:0,behavior:'auto'});
    closeMobile();
  };
  // Volta para a página inicial.
  const showHome=()=>{
    page.hidden=true;
    home.hidden=false;
    document.title='Paróquia São Paulo Apóstolo | Ferraz de Vasconcelos';
  };
  // Intercepta links "#...": "#liturgia" abre a página de Liturgia; qualquer outro âncora volta à página inicial.
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a)return;
    const href=a.getAttribute('href');
    if(href==='#liturgia'){
      e.preventDefault();
      if(location.hash!=='#liturgia')history.pushState(null,'','#liturgia');
      showLiturgia();
    }else if(href&&href.startsWith('#')&&href!=='#'){
      if(!page.hidden){showHome();}
      if(href!=='#liturgia')lastHomeHash=href;
    }
  });
  // Botão voltar/avançar do navegador.
  window.addEventListener('popstate',()=>{
    if(location.hash==='#liturgia')showLiturgia();else showHome();
  });
  // Mudança manual do hash na barra de endereços.
  window.addEventListener('hashchange',()=>{
    if(location.hash==='#liturgia')showLiturgia();
    else if(!page.hidden)showHome();
  });
  // Se o site abrir direto em #liturgia, mostra a página de Liturgia
  if(location.hash==='#liturgia')showLiturgia();
})();
