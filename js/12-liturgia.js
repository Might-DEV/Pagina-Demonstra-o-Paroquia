/* ============================================================
   js/12-liturgia.js
   LITURGIA DIÁRIA: calendário, busca das leituras na API (com fontes alternativas e cache local),
   narração por voz, ajuste de fonte e diálogo do santo do dia.
   ============================================================ */
(()=>{
  // Fonte principal das leituras. Se falhar, requestLiturgyData tenta rotas alternativas (proxies) e, por fim, o cache local.
  const API='https://liturgia.up.railway.app/v2/';
  // Hoje (meio-dia, para evitar problemas de fuso/horário de verão).
  const today=new Date(); today.setHours(12,0,0,0);
  // Dia selecionado no calendário.
  let selected=new Date(); selected.setHours(12,0,0,0);
  // Mês exibido no calendário (sempre dia 1).
  let view=new Date(selected.getFullYear(),selected.getMonth(),1);
  // Nomes dos meses em português.
  const months=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  // Iniciais dos dias da semana (domingo a sábado).
  const weekdays=['D','S','T','Q','Q','S','S'];
  const $=id=>document.getElementById(id);
  // Formata a data por extenso em português (ex.: "quinta-feira, 12 de novembro de 2026").
  const fmtDate=d=>new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d);
  // Compara duas datas considerando apenas dia, mês e ano.
  const sameDay=(a,b)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
  // Escapa caracteres HTML de um texto.
  function escapeHTML(str){return String(str??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  // Desenha a grade do mês (botões dos dias), destacando dia selecionado e hoje.
  function renderCalendar(){
    $('monthLabel').textContent=months[view.getMonth()].replace(/^./,c=>c.toUpperCase())+' '+view.getFullYear();
    const grid=$('calendarGrid'); grid.innerHTML='';
    weekdays.forEach(d=>{const el=document.createElement('div');el.className='weekday';el.textContent=d;grid.appendChild(el);});
    const firstDay=new Date(view.getFullYear(),view.getMonth(),1).getDay();
    const daysInMonth=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
    const prevDays=new Date(view.getFullYear(),view.getMonth(),0).getDate();
    const total=Math.ceil((firstDay+daysInMonth)/7)*7;
    for(let i=0;i<total;i++){
      let date,muted=false;
      if(i<firstDay){date=new Date(view.getFullYear(),view.getMonth()-1,prevDays-firstDay+i+1);muted=true;}
      else if(i>=firstDay+daysInMonth){date=new Date(view.getFullYear(),view.getMonth()+1,i-firstDay-daysInMonth+1);muted=true;}
      else date=new Date(view.getFullYear(),view.getMonth(),i-firstDay+1);
      const b=document.createElement('button');b.type='button';b.className='day-btn'+(muted?' muted':'')+(sameDay(date,selected)?' selected':'')+(sameDay(date,today)?' today':'');b.textContent=date.getDate();b.setAttribute('aria-label',fmtDate(date));b.setAttribute('aria-pressed',String(sameDay(date,selected)));
      b.addEventListener('click',()=>{selected=new Date(date.getFullYear(),date.getMonth(),date.getDate());view=new Date(selected.getFullYear(),selected.getMonth(),1);renderCalendar();loadDay(selected);});grid.appendChild(b);
    }
  }
  // Garante que o valor seja uma lista (aceita valor único, lista ou vazio).
  function arr(v){if(Array.isArray(v))return v;if(v==null)return[];return [v];}
  // Junta o texto das leituras, aceitando os vários formatos de resposta das APIs.
  function readText(items){
    return arr(items).map(x=>{
      if(typeof x==='string')return x;
      if(!x||typeof x!=='object')return '';
      const direct=x.texto||x.text||x.conteudo||x.leitura||(typeof x.content==='string'?x.content:'');
      const psalm=Array.isArray(x.content_psalm)?x.content_psalm.join('\n'):'';
      const nested=Array.isArray(x.content)?x.content.map(part=>typeof part==='string'?part:(part?.texto||part?.text||'')).filter(Boolean).join('\n'):'';
      return [direct,nested,psalm].filter(Boolean).join('\n');
    }).filter(Boolean).join('\n\n');
  }
  // Extrai a referência bíblica (ex.: "Lc 17,20-25") de uma leitura.
  function getRef(items){const a=arr(items);return a.map(x=>x?.referencia||x?.ref||x?.reference||'').filter(Boolean).join(' · ');}
  // Devolve o primeiro campo existente entre vários nomes possíveis.
  function firstAvailable(obj,keys){for(const k of keys){if(obj&&obj[k]!=null)return obj[k];}return null;}
  // Padroniza uma leitura em {meta, text, ref, raw}.
  function makeReading(data,keys){
    const item=firstAvailable(data,keys);const list=arr(item);
    return {
      meta:list.map(x=>[x?.titulo||x?.title||x?.head_title,x?.referencia||x?.ref||x?.reference].filter(Boolean).join(' · ')).filter(Boolean).join(' / '),
      text:readText(list),ref:getRef(list),raw:list
    };
  }
  // Converte formatos diferentes de API para um formato único (liturgia, cor e leituras).
  function normalizeLiturgyPayload(raw){
    let payload=raw&&typeof raw==='object'?raw:{};
    if(payload.today&&typeof payload.today==='object')payload=payload.today;
    if(payload.result&&typeof payload.result==='object')payload=payload.result;
    if(payload.data&&typeof payload.data==='object')payload=payload.data;
    if(payload.leituras&&typeof payload.leituras==='object')return payload;
    const source=payload.readings||payload.leituras||{};
    const adapt=(value,kind)=>{
      if(value==null)return [];
      if(Array.isArray(value))return value;
      if(typeof value==='string')return [{texto:value}];
      if(typeof value!=='object')return [];
      const title=value.title||value.titulo||value.head_title||'';
      const reference=value.referencia||value.ref||value.reference||'';
      const parts=[];
      if(value.head&&kind!=='psalm')parts.push(value.head);
      if(value.text)parts.push(value.text);
      if(Array.isArray(value.content_psalm))parts.push(value.content_psalm.join('\n'));
      if(value.footer)parts.push(value.footer);
      if(value.footer_response)parts.push(value.footer_response);
      if(value.response&&kind!=='psalm')parts.push(value.response);
      return [{titulo:title,referencia:reference,texto:parts.filter(Boolean).join('\n\n'),refrao:value.refrao||value.response||''}];
    };
    return {
      ...payload,
      liturgia:payload.liturgia||payload.entry_title||payload.title||payload.celebration||'',
      cor:payload.cor||payload.color||payload.liturgical_color||'',
      leituras:{
        primeiraLeitura:adapt(source.primeiraLeitura||source.primeira_leitura||source.first_reading||source.firstReading,'first'),
        salmo:adapt(source.salmo||source.psalm||source.responsorial_psalm,'psalm'),
        evangelho:adapt(source.evangelho||source.gospel||source.gospel_reading,'gospel')
      }
    };
  }
  // Busca JSON com limite de tempo (9 s) e erros em português.
  async function fetchJSONWithTimeout(url,timeoutMs=9000){
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),timeoutMs);
    try{
      const response=await fetch(url,{headers:{'Accept':'application/json'},cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('Fonte respondeu com status '+response.status+'.');
      const body=await response.text();
      try{return JSON.parse(body);}catch(_){throw new Error('A fonte de liturgia retornou um formato inesperado.');}
    }finally{clearTimeout(timeout);}
  }
  // Tenta as fontes em ordem (principal, proxies e segunda API) até obter textos de leitura.
  async function requestLiturgyData(day,month,year){
    const query=`dia=${day}&mes=${month}&ano=${year}`;
    const primary=`${API}?${query}`;
    const alternate=`https://api-liturgia-diaria.vercel.app/?date=${year}-${month}-${day}`;
    const attempts=[
      {label:'fonte principal',url:primary},
      {label:'rota alternativa',url:`https://api.allorigins.win/raw?url=${encodeURIComponent(primary)}`},
      {label:'segunda fonte',url:`https://api.allorigins.win/raw?url=${encodeURIComponent(alternate)}`},
      {label:'proxy alternativo',url:`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(primary)}`}
    ];
    let lastError=null;
    for(const attempt of attempts){
      try{
        const raw=await fetchJSONWithTimeout(attempt.url);
        const data=normalizeLiturgyPayload(raw);
        const readings=data.leituras||{};
        const hasText=['primeiraLeitura','salmo','evangelho'].some(key=>readText(readings[key]).trim().length>0);
        if(!hasText)throw new Error('A fonte respondeu, mas não trouxe os textos das leituras.');
        return {data,source:attempt.label};
      }catch(err){lastError=err;}
    }
    throw lastError||new Error('Não foi possível consultar as fontes litúrgicas.');
  }
  // Chave do cache local de um dia.
  function cacheKeyForDate(day,month,year){return `paroquia-liturgia-${year}-${month}-${day}`;}
  // Lê do cache local as leituras de um dia (se existirem).
  function readCachedLiturgy(day,month,year){
    try{const value=localStorage.getItem(cacheKeyForDate(day,month,year));return value?JSON.parse(value):null;}catch(_){return null;}
  }
  // Salva no cache local as leituras de um dia, para uso offline/falha da API.
  function saveCachedLiturgy(day,month,year,data){
    try{localStorage.setItem(cacheKeyForDate(day,month,year),JSON.stringify({data,savedAt:Date.now()}));}catch(_){/* cache opcional */}
  }
  // Preenche o cartão de uma leitura (referência e texto).
  function renderReading(prefix,reading){$(prefix+'Meta').textContent=reading.meta||reading.ref||'Leitura do dia';$(prefix+'Text').textContent=reading.text||'Não foi possível carregar o texto desta leitura.';}
  // Extrai o nome da memória/festa do santo a partir do título da liturgia.
  function parseSaint(lit){
    if(!lit)return null;
    const match=String(lit).match(/(?:Memória|Festa|Solenidade|Comemoração)(?: facultativa)? de (?:São|Santa|Santo) [^–—,;]+/i);
    return match?match[0]:null;
  }
  // Tamanho atual da letra das leituras (px).
  let readingFontSize=14;
  // Leitura em narração: "first", "psalm" ou "gospel" (null = nenhuma).
  let activeReadingKey=null;
  // Identificador da narração em andamento (usado para ignorar eventos de narrações canceladas).
  let activeUtterance=null;
  // Indica se a narração está pausada.
  let speechPaused=false;
  // Mostra uma mensagem de status abaixo dos botões de áudio da leitura.
  function setReadingStatus(key,message){
    const status=document.querySelector('[data-reading-status="'+key+'"]');
    if(status)status.textContent=message||'';
  }
  // Atualiza texto e estado (habilitado/desabilitado) dos botões ouvir/pausar/parar.
  function updateReadingAudioControls(){
    document.querySelectorAll('[data-reading-play]').forEach(button=>{
      const key=button.getAttribute('data-reading-play');
      button.disabled=!!activeReadingKey && activeReadingKey!==key;
      if(activeReadingKey===key && !speechPaused)button.textContent='▶ Reproduzindo';
      else if(key==='first')button.textContent='▶ Ouvir leitura';
      else if(key==='psalm')button.textContent='▶ Ouvir salmo';
      else button.textContent='▶ Ouvir Evangelho';
    });
    document.querySelectorAll('[data-reading-pause]').forEach(button=>{
      const key=button.getAttribute('data-reading-pause');
      const isActive=activeReadingKey===key;
      button.disabled=!isActive;
      button.textContent=isActive&&speechPaused?'Retomar':'Pausar';
      button.setAttribute('aria-pressed',String(isActive&&speechPaused));
    });
    document.querySelectorAll('[data-reading-stop]').forEach(button=>{
      button.disabled=activeReadingKey!==button.getAttribute('data-reading-stop');
    });
  }
  // Interrompe a narração em andamento e reinicia os controles.
  function stopReadingNarration(announce=false){
    const previous=activeReadingKey;
    if('speechSynthesis' in window)window.speechSynthesis.cancel();
    activeReadingKey=null;activeUtterance=null;speechPaused=false;
    updateReadingAudioControls();
    if(announce&&previous)setReadingStatus(previous,'Narração interrompida.');
  }
  // Monta o texto que será falado (título + referência + leitura).
  function buildReadingNarration(key){
    if(key==='first')return $('firstMeta').textContent+'. '+$('firstText').textContent;
    if(key==='psalm')return $('psalmMeta').textContent+'. '+$('psalmRefrain').textContent+'. '+$('psalmText').textContent;
    return $('gospelMeta').textContent+'. '+$('gospelText').textContent;
  }
  // Divide o texto da leitura em trechos curtos (até ~180 caracteres, preferindo fim de frase).
  // Necessário porque o Chrome interrompe sozinho falas muito longas (~15 s) quando se usa uma
  // única SpeechSynthesisUtterance. Falando trecho a trecho, a leitura completa é narrada.
  function splitNarrationText(text,max=180){
    const sentences=text.match(/[^.!?;:]+[.!?;:]*\s*/g)||[text];
    const chunks=[];
    let current='';
    sentences.forEach(sentence=>{
      if(current&&(current+sentence).length>max){chunks.push(current.trim());current='';}
      if(sentence.length>max){
        // Frase maior que o limite: quebra em vírgula ou espaço
        let rest=sentence;
        while(rest.length>max){
          let cut=rest.lastIndexOf(',',max);
          if(cut<40)cut=rest.lastIndexOf(' ',max);
          if(cut<1)cut=max;
          chunks.push(rest.slice(0,cut+1).trim());
          rest=rest.slice(cut+1);
        }
        current=rest;
      }else current+=sentence;
    });
    if(current.trim())chunks.push(current.trim());
    return chunks.filter(Boolean);
  }
  // Inicia a narração por voz da leitura indicada ('first', 'psalm' ou 'gospel')
  function startReadingNarration(key){
    if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){
      setReadingStatus(key,'A narração não é compatível com este navegador. Experimente Chrome, Edge ou Safari atualizado.');return;
    }
    const text=buildReadingNarration(key).replace(/\s+/g,' ').trim();
    if(!text||/carregando|não foi possível carregar/i.test(text)){
      setReadingStatus(key,'Esta leitura ainda não está disponível para narração.');return;
    }
    stopReadingNarration(false);
    activeReadingKey=key;speechPaused=false;
    setReadingStatus(key,'Preparando a narração…');
    updateReadingAudioControls();
    const chunks=splitNarrationText(text);
    // "session" identifica esta narração: se activeUtterance mudar, ela foi cancelada e os eventos antigos são ignorados
    const session={};
    activeUtterance=session;
    const voices=window.speechSynthesis.getVoices();
    const ptVoice=voices.find(v=>/^pt(-|_)?br/i.test(v.lang))||voices.find(v=>/^pt/i.test(v.lang));
    let position=0;
    // Encerra a narração (fim normal ou erro) e restaura os botões
    function finishNarration(message){
      if(activeUtterance!==session)return;
      setReadingStatus(key,message);
      activeReadingKey=null;activeUtterance=null;speechPaused=false;updateReadingAudioControls();
    }
    // Fala o próximo trecho; ao terminar um, o evento "end" chama este mesmo passo
    function speakNext(){
      if(activeUtterance!==session)return;
      if(position>=chunks.length){finishNarration('Narração concluída.');return;}
      const utterance=new SpeechSynthesisUtterance(chunks[position++]);
      utterance.lang='pt-BR';utterance.rate=.92;utterance.pitch=1;
      if(ptVoice)utterance.voice=ptVoice;
      utterance.onend=speakNext;
      utterance.onerror=(event)=>{
        if(activeUtterance!==session||event.error==='canceled'||event.error==='interrupted')return;
        finishNarration('Não foi possível continuar a narração neste navegador.');
      };
      window.speechSynthesis.speak(utterance);
    }
    setReadingStatus(key,'Reproduzindo esta leitura.');
    speakNext();
  }
  document.querySelectorAll('[data-reading-play]').forEach(button=>{
    button.addEventListener('click',()=>startReadingNarration(button.getAttribute('data-reading-play')));
  });
  document.querySelectorAll('[data-reading-pause]').forEach(button=>{
    button.addEventListener('click',()=>{
      const key=button.getAttribute('data-reading-pause');
      if(activeReadingKey!==key||!('speechSynthesis' in window))return;
      if(speechPaused){window.speechSynthesis.resume();speechPaused=false;setReadingStatus(key,'Narração retomada.');}
      else{window.speechSynthesis.pause();speechPaused=true;setReadingStatus(key,'Narração pausada.');}
      updateReadingAudioControls();
    });
  });
  document.querySelectorAll('[data-reading-stop]').forEach(button=>{
    button.addEventListener('click',()=>{
      if(activeReadingKey===button.getAttribute('data-reading-stop'))stopReadingNarration(true);
    });
  });
  // Controles de acessibilidade: diminuir/aumentar a letra (13 a 24 px) e alternar fonte com/sem serifa.
  $('readingFontDown').addEventListener('click',()=>{
    readingFontSize=Math.max(13,readingFontSize-1);
    $('liturgiaPageView').style.setProperty('--liturgy-reading-size',readingFontSize+'px');
    $('readingFontValue').textContent=readingFontSize+' px';
  });
  $('readingFontUp').addEventListener('click',()=>{
    readingFontSize=Math.min(24,readingFontSize+1);
    $('liturgiaPageView').style.setProperty('--liturgy-reading-size',readingFontSize+'px');
    $('readingFontValue').textContent=readingFontSize+' px';
  });
  $('readingFontToggle').addEventListener('click',()=>{
    const enabled=$('liturgiaPageView').classList.toggle('sans-reading');
    $('readingFontToggle').setAttribute('aria-pressed',String(enabled));
    $('readingFontToggle').textContent=enabled?'Fonte serifada':'Fonte sem serifa';
  });
  // Controles de áudio geral removidos: a narração é vinculada individualmente a cada leitura.

  // Aplica os dados recebidos: celebração, cor litúrgica, leituras e cartão do santo do dia.
  function applyLiturgyData(data){
    $('celebration').textContent=data.liturgia||'Liturgia do dia';
    $('liturgicalColor').textContent=data.cor?'Cor litúrgica: '+data.cor:'';
    const readings=data.leituras||{};
    const first=makeReading(readings,['primeiraLeitura','primeira_leitura','first_reading']);
    const psalm=makeReading(readings,['salmo','psalm']);
    const gospel=makeReading(readings,['evangelho','gospel']);
    renderReading('first',first);renderReading('psalm',psalm);renderReading('gospel',gospel);
    const psalmObj=arr(readings.salmo||readings.psalm)[0]||{};
    $('psalmRefrain').textContent=psalmObj.refrao||psalmObj.refrão||psalmObj.response||'';
    $('psalmRefrain').style.display=$('psalmRefrain').textContent?'block':'none';
    const saint=parseSaint(data.liturgia);
    if(saint){$('saintName').textContent=saint;$('saintDescription').textContent='Celebração e memória litúrgica indicada para esta data.';const isJosaphat=/josaf[aá]/i.test(saint);$('saintPhoto').style.display=isJosaphat?'':'none';$('saintStoryButton').style.display=isJosaphat?'':'none';}
    else{$('saintName').textContent='Celebração do dia';$('saintDescription').textContent=data.liturgia||'Consulte a celebração litúrgica desta data.';$('saintPhoto').style.display='none';$('saintStoryButton').style.display='none';}
  }
  let loadSequence=0;
  // Carrega as leituras de um dia: tenta a rede, salva no cache e, se falhar, usa o cache ou mostra erro com botão de nova tentativa.
  async function loadDay(date){
    const thisLoad=++loadSequence;
    stopReadingNarration(false);
    $('liturgyApp').classList.add('loading');$('loadStatus').className='status';$('loadStatus').textContent='Buscando as leituras…';$('retryLiturgia').hidden=true;
    $('selectedDate').textContent=fmtDate(date).replace(/^./,c=>c.toUpperCase());
    const d=String(date.getDate()).padStart(2,'0'),m=String(date.getMonth()+1).padStart(2,'0'),y=date.getFullYear();
    try{
      const result=await requestLiturgyData(d,m,y);
      if(thisLoad!==loadSequence)return;
      applyLiturgyData(result.data);
      saveCachedLiturgy(d,m,y,result.data);
      $('loadStatus').className='status';
      $('loadStatus').textContent='Leituras carregadas.';
      $('liturgyApp').setAttribute('data-loaded-date',`${y}-${m}-${d}`);
    }catch(err){
      if(thisLoad!==loadSequence)return;
      const cached=readCachedLiturgy(d,m,y);
      if(cached&&cached.data&&cached.data.leituras){
        applyLiturgyData(normalizeLiturgyPayload(cached.data));
        $('loadStatus').className='status';
        const when=cached.savedAt?new Date(cached.savedAt).toLocaleString('pt-BR'):'anteriormente';
        $('loadStatus').textContent='Exibindo leituras salvas em '+when+'. Não foi possível atualizar agora.';
      }else{
        $('celebration').textContent='Leitura temporariamente indisponível';
        $('liturgicalColor').textContent='';
        $('firstMeta').textContent='';$('firstText').textContent='Não foi possível obter o texto da Primeira Leitura. Verifique a conexão e tente novamente.';
        $('psalmMeta').textContent='';$('psalmRefrain').textContent='';$('psalmRefrain').style.display='none';$('psalmText').textContent='O texto do Salmo não está disponível no momento.';
        $('gospelMeta').textContent='';$('gospelText').textContent='O texto do Evangelho não está disponível no momento.';
        $('loadStatus').className='status error';
        $('loadStatus').textContent=(err&&err.message?err.message:'Não foi possível consultar a fonte litúrgica.')+' Você pode tentar novamente.';
        $('retryLiturgia').hidden=false;
      }
    }finally{$('liturgyApp').classList.remove('loading');}
  }

  // Navegação do calendário e botões da barra de ferramentas (hoje, tentar de novo, compartilhar).
  $('prevMonth').addEventListener('click',()=>{view=new Date(view.getFullYear(),view.getMonth()-1,1);renderCalendar();});
  $('nextMonth').addEventListener('click',()=>{view=new Date(view.getFullYear(),view.getMonth()+1,1);renderCalendar();});
  // Seleciona o dia de hoje e recarrega as leituras.
  function goToday(){selected=new Date(today);view=new Date(today.getFullYear(),today.getMonth(),1);renderCalendar();loadDay(selected);}
  $('todayButton').addEventListener('click',goToday);
  $('retryLiturgia').addEventListener('click',()=>loadDay(selected));
  $('shareDay').addEventListener('click',()=>{const text=`Liturgia Diária — ${fmtDate(selected)}\nAcompanhe a Palavra de Deus na Paróquia São Paulo Apóstolo.`;window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank','noopener');});
  const saintDialog=$('saintDialog');
  // Fecha o diálogo com a história do santo.
  function closeSaintDialog(){saintDialog.classList.remove('open');saintDialog.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  // Abertura/fechamento do diálogo do santo (botão, fundo e tecla ESC).
  $('saintStoryButton').addEventListener('click',()=>{saintDialog.classList.add('open');saintDialog.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('closeSaintDialog').focus();});
  $('closeSaintDialog').addEventListener('click',closeSaintDialog);
  saintDialog.addEventListener('click',e=>{if(e.target===saintDialog)closeSaintDialog();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&saintDialog.classList.contains('open'))closeSaintDialog();});
  // Início: desenha o calendário e carrega as leituras de hoje.
  renderCalendar();loadDay(selected);
})();
