/* ============================================================
   js/03-secoes.js
   SEÇÕES DA PÁGINA: sacramentos, agenda/calendário, notícias, equipe, santo do dia, comunidades e pastorais.
   ============================================================ */
"use strict";

// Mostra o sacramento escolhido: marca a aba ativa e monta texto, preparação e imagem.
function renderSacrament(index=0){
  const s=sacramentData[index];
  if(!s)return;
  document.querySelectorAll(".sacrament-tab").forEach((t,i)=>{
    t.classList.toggle("active",i===index);
    t.setAttribute("aria-selected",i===index?"true":"false");
  });
  const imageAlt = {
    0:"Batismo: rito de iniciação cristã",
    1:"Eucaristia: celebração da Última Ceia",
    2:"Confirmação: fortalecimento da fé",
    3:"Reconciliação: sacramento da penitência",
    4:"Unção dos Enfermos: oração e cuidado com quem está enfermo",
    5:"Matrimônio: união sacramental",
    6:"Ordem: serviço ministerial na Igreja"
  };
  document.getElementById("sacramentFeature").innerHTML=`
    <div class="sacrament-copy">
      <span class="sacrament-number">0${index+1} / 07</span>
      <h3>${s.name}</h3>
      <p>${s.intro}</p>
      <div class="sacrament-prep"><b>Como se preparar</b><p>${s.prep}</p></div>
      <button class="btn outline sacrament-contact" data-open="secretaria" type="button">Fale com a secretaria</button>
    </div>
    <div class="sacrament-image sacrament-${index}">
      <img class="sacrament-photo" src="${sacramentImages[index]}" alt="${imageAlt[index]}" loading="eager">
      <span>${s.name}</span>
    </div>`;
}
// Monta a Agenda: cards de eventos (parishEvents) e o cartão de materiais (parishMaterials).
function renderAgenda() {
  // Cards dos eventos (um por item de parishEvents).
  const eventCards = parishEvents.map((event, index) => `
    <article class="agenda-card">
      <div class="event-top"><div class="event-date"><b>${event.day}</b><span>${event.month}</span></div><span class="event-category">${event.category}</span></div>
      <h3>${event.title}</h3>
      <p class="event-meta">${event.time} · ${event.place}</p>
      <p class="event-description">${event.description}</p>
      <button class="event-link" type="button" data-event="${index}">Ver no calendário →</button>
    </article>`).join("");

  // Paginação dos materiais: 3 por página, alternada pelo botão do cartão.
  let materialsPage = 0;
  const pageSize = 3;
  const pageCount = Math.ceil(parishMaterials.length / pageSize);
  const renderMaterialRows = () => parishMaterials
    .slice(materialsPage * pageSize, (materialsPage + 1) * pageSize)
    .map((item, visibleIndex) => {
      const index = materialsPage * pageSize + visibleIndex;
      return `<div class="material-row"><span class="material-number">${index+1}.</span><span class="material-name">${item.title}</span><button class="material-download" type="button" data-material-download="${index}">↓ Baixar</button></div>`;
    }).join("");

  // Cartão "Materiais" (lista paginada com botões de download).
  const materialsCard = `<article class="agenda-card materials-card">
    <div class="materials-header"><span class="materials-icon">↧</span><div><span class="event-category">ARQUIVOS</span><h3>Materiais para baixar</h3></div></div>
    <div class="materials-list" aria-live="polite">${renderMaterialRows()}</div>
    <div class="materials-carousel-controls">
      <button class="materials-toggle" type="button" aria-label="Mostrar próximos três arquivos">Próximos 3 arquivos <span aria-hidden="true">↓</span></button>
      <span class="materials-page-indicator">1 / ${pageCount}</span>
    </div>
    
  </article>`;

  // Insere eventos + materiais na grade e liga o botão de paginação.
  document.getElementById("agendaGrid").innerHTML = eventCards + materialsCard;
  const list = document.querySelector(".materials-list");
  const toggle = document.querySelector(".materials-toggle");
  const pageIndicator = document.querySelector(".materials-page-indicator");

  if (toggle && list && pageCount > 1) {
    toggle.addEventListener("click", () => {
      if (list.dataset.animating === "true") return;
      list.dataset.animating = "true";
      list.classList.remove("materials-entering");
      list.classList.add("materials-exiting");

      window.setTimeout(() => {
        materialsPage = (materialsPage + 1) % pageCount;
        list.innerHTML = renderMaterialRows();
        list.classList.remove("materials-exiting");
        list.classList.add("materials-entering");
        pageIndicator.textContent = (materialsPage + 1) + " / " + pageCount;

        if (materialsPage === pageCount - 1) {
          toggle.innerHTML = 'Voltar aos primeiros 3 <span aria-hidden="true">↑</span>';
          toggle.setAttribute("aria-label", "Voltar aos primeiros três arquivos");
        } else {
          toggle.innerHTML = 'Próximos 3 arquivos <span aria-hidden="true">↓</span>';
          toggle.setAttribute("aria-label", "Mostrar próximos três arquivos");
        }

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            list.classList.remove("materials-entering");
            list.dataset.animating = "false";
          });
        });
      }, 180);
    });
  } else if (toggle) {
    toggle.hidden = true;
    document.querySelector(".materials-carousel-controls").hidden = true;
  }
}

// Abre o modal com os detalhes de um evento da agenda.
function showEvent(index) {
  const e = parishEvents[index];
  if (!e) return;
  openModal(`<h2 id="modalTitle">${e.title}</h2><div class="detail-row"><b>${e.day} ${e.month}</b> · ${e.category}</div><div class="detail-row">◷ <b>Horário:</b> ${e.time}</div><div class="detail-row">⌖ <b>Local:</b> ${e.place}</div><p>${e.description}</p>`);
}
// Mês exibido no calendário completo.
let calendarCursor = new Date();
// Evento selecionado no calendário completo.
let calendarSelectedEvent = null;
// Texto do mês/ano mostrado no topo do calendário completo (ex.: "novembro de 2026").
function calendarMonthLabel(date) {
  return date.toLocaleDateString("pt-BR", {month:"long", year:"numeric"});
}
// Desenha o calendário completo dentro do modal, marcando os dias que têm evento.
function renderCalendarModal() {
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  // Deslocamento do 1º dia do mês (a semana começa na segunda-feira).
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Mapa dia -> eventos, usado para marcar as datas que têm evento.
  const eventMap = new Map();
  parishEvents.forEach((event, index) => {
    const date = event.date || "";
    if (date) eventMap.set(date, index);
  });
  // Total de células do calendário (semanas completas de 7 dias).
  const totalCells = Math.ceil((firstOffset + daysInMonth) / 7) * 7;
  const dayCells = Array.from({length:totalCells}, (_, cellIndex) => {
    const day = cellIndex - firstOffset + 1;
    if (day < 1 || day > daysInMonth) return '<span class="calendar-day calendar-day-empty" aria-hidden="true"></span>';
    const dateKey = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const eventIndex = eventMap.has(dateKey) ? eventMap.get(dateKey) : -1;
    const selected = calendarSelectedEvent === eventIndex && eventIndex >= 0;
    return `<button type="button" class="calendar-day${eventIndex >= 0 ? " has-event" : ""}${selected ? " is-selected" : ""}" data-calendar-date="${dateKey}" ${eventIndex >= 0 ? `data-calendar-event="${eventIndex}"` : ""} aria-label="${day}${eventIndex >= 0 ? ", possui evento" : ""}">
      <span>${day}</span>${eventIndex >= 0 ? '<i aria-hidden="true"></i>' : ""}
    </button>`;
  }).join("");
  // Painel de detalhes do evento selecionado (ou mensagem orientando a escolher uma data).
  let selectedHtml = '<div class="calendar-selected-empty">Selecione uma data marcada para ver os detalhes do encontro.</div>';
  if (calendarSelectedEvent !== null && parishEvents[calendarSelectedEvent]) {
    const event = parishEvents[calendarSelectedEvent];
    selectedHtml = `<article class="calendar-selected-event">
      <span class="event-category">${event.category}</span>
      <h3>${event.title}</h3>
      <p>${event.day} ${event.month} · ${event.time} · ${event.place}</p>
      <p>${event.description}</p>
      <button class="btn-small" type="button" data-calendar-open-event="${calendarSelectedEvent}">Ver detalhes do evento →</button>
    </article>`;
  }
  return `<div class="calendar-modal">
    <div class="calendar-modal-heading">
      <div><span class="pastoral-modal-kicker">Agenda paroquial</span><h2 id="modalTitle">Calendário de eventos</h2><p>Escolha um mês e selecione os dias destacados.</p></div>
    </div>
    <div class="calendar-board">
      <div class="calendar-month-nav">
        <button type="button" data-calendar-month="-1" aria-label="Mês anterior">‹</button>
        <strong>${calendarMonthLabel(calendarCursor)}</strong>
        <button type="button" data-calendar-month="1" aria-label="Próximo mês">›</button>
      </div>
      <div class="calendar-weekdays">${["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"].map(day=>`<span>${day}</span>`).join("")}</div>
      <div class="calendar-days">${dayCells}</div>
    </div>
    <div class="calendar-event-detail" id="calendarEventDetail">${selectedHtml}</div>
    <p class="calendar-legend"><span></span> Dia com evento cadastrado</p>
  </div>`;
}
// Liga os botões do calendário (mês anterior/próximo e clique nos dias).
function bindCalendarModal() {
  // Botões de mês anterior/próximo.
  modalContent.querySelectorAll("[data-calendar-month]").forEach(button => {
    button.addEventListener("click", () => {
      calendarCursor.setMonth(calendarCursor.getMonth() + Number(button.dataset.calendarMonth));
      calendarSelectedEvent = null;
      openModal(renderCalendarModal());
      bindCalendarModal();
    });
  });
  // Clique em um dia com evento: mostra o resumo no painel.
  modalContent.querySelectorAll("[data-calendar-event]").forEach(button => {
    button.addEventListener("click", () => {
      calendarSelectedEvent = Number(button.dataset.calendarEvent);
      openModal(renderCalendarModal());
      bindCalendarModal();
    });
  });
  // Botão de detalhes: abre o modal completo do evento.
  modalContent.querySelectorAll("[data-calendar-open-event]").forEach(button => {
    button.addEventListener("click", () => showEvent(Number(button.dataset.calendarOpenEvent)));
  });
}
// Abre o calendário completo em um modal.
function showFullCalendar() {
  calendarCursor = new Date();
  calendarSelectedEvent = null;
  openModal(renderCalendarModal());
  bindCalendarModal();
}
// Abre o modal do vídeo institucional (arquivo definido em INSTITUTIONAL_VIDEO, em 01-data.js).
function showVideoNotice() {
  openModal(`
    <div class="video-modal-layout">
      <span class="pastoral-modal-kicker">Conheça nossa paróquia</span>
      <h2 id="modalTitle">História da nossa paróquia</h2>
      <p>Conheça um pouco da caminhada de fé, da missão e das comunidades da nossa paróquia.</p>
      <video class="institutional-demo-video" controls playsinline preload="metadata" poster="">
        <source src="${INSTITUTIONAL_VIDEO}" type="video/mp4">
        Seu navegador não conseguiu reproduzir o vídeo. <a href="${INSTITUTIONAL_VIDEO}">Abrir vídeo</a>.
      </video>
    </div>`);
}

// Abre o modal com a notícia completa (a foto é copiada do card correspondente).
function showNewsArticle(index) {
  const article = newsArticles[index];
  if (!article) return;
  // Foto do card correspondente (ignora os clones do carrossel).
  const card=document.querySelectorAll("#newsGrid .news-card:not(.news-card-clone)")[index]; const photo=card?.querySelector(".news-photo")?.src;
  openModal(`${photo?`<img class="news-modal-image" src="${photo}" alt="${article.title}">`:""}<h2 id="modalTitle">${article.title}</h2>
    <p style="color:var(--gold);font-weight:800">${article.date} · ${article.category}</p>
    <div class="detail-row">${article.summary}</div>
    <p>${article.body}</p>
    <button class="news-share-button news-share-modal-action" type="button" data-share-news="${index}">↗ Compartilhar pelo WhatsApp</button>`);
}
// Compartilha a notícia pelo WhatsApp (texto com negrito/itálico do WhatsApp, sem URL).
function shareNewsArticle(index) {
  const article = newsArticles[index];
  if (!article) return;

  // WhatsApp usa *texto* para negrito e _texto_ para itálico.
  // O compartilhamento leva o conteúdo da notícia, sem URL.
  const content = [article.summary, article.body]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const message = [
    "*NOTÍCIA DA PARÓQUIA SÃO PAULO APÓSTOLO*",
    "",
    `_Data: ${article.date}_`,
    "",
    `*${article.title}*`,
    "",
    content
  ].join("\n");

  const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(message);
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
// Delegação de evento: qualquer botão [data-share-news] (card ou modal) compartilha a notícia.
document.addEventListener("click", event => {
  const shareButton = event.target.closest("[data-share-news]");
  if (shareButton) shareNewsArticle(Number(shareButton.dataset.shareNews));
});

// Abre o modal "Todas as notícias" com a lista completa.
function showAllNews() {
  openModal(`<h2 id="modalTitle">Todas as notícias</h2>
    <p>Notícias e comunicados da Paróquia São Paulo Apóstolo.</p>
    ${newsArticles.map((article,index)=>`<div class="detail-row">
      <span style="color:var(--gold);font-weight:800">${article.date} · ${article.category}</span>
      <br><b>${article.title}</b><br>${article.summary}
      <br><div class="news-card-actions"><button class="news-read-button" type="button" data-modal-news="${index}">Ler notícia →</button><button class="news-share-button" type="button" data-share-news="${index}">↗ Compartilhar</button></div>
    </div>`).join("")}`);
  modalContent.querySelectorAll("[data-modal-news]").forEach(button => {
    button.addEventListener("click", () => showNewsArticle(Number(button.dataset.modalNews)));
  });
}
// Abre o modal com o perfil do pastor/representante clicado.
function showPastorProfile(index){
 const card=document.querySelectorAll("#equipe .person")[index], profile=pastorProfiles[index];
 if(!card||!profile)return;
 const img=card.querySelector("img");
 openModal(`<div class="profile-modal profile-modal-complete">
   <img src="${img.src}" alt="${profile.name}">
   <div class="profile-modal-content">
     <span class="pastoral-modal-kicker">Pastores e representantes</span>
     <h2 id="modalTitle">${profile.name}</h2>
     <p class="profile-role">${profile.role}</p>
     <div class="profile-bio-visible">
       <h3>Sobre</h3>
       <p>${profile.bio}</p>
     </div>
   </div>
 </div>`);
}
// Cards da equipe: abrem o perfil por clique e também por Enter/Espaço (acessibilidade por teclado).
document.querySelectorAll("#equipe .person").forEach((card,index)=>{
 card.addEventListener("click",()=>showPastorProfile(index));
 card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();showPastorProfile(index)}});
});

// Abre o modal com a história do santo do dia. ATENÇÃO: o conteúdo é fixo (São Josafá, 12/11); precisa ser trocado a cada dia.
function showSaintStory() {
  openModal(`
    <article class="saint-modal" aria-labelledby="saintModalTitle">
      <span class="saint-modal-kicker">Santo do dia · 12 de novembro</span>
      <div class="saint-modal-portrait-wrap"><img class="saint-modal-portrait" src="https://static.wixstatic.com/media/f42513_c33a4f49272a4adeb4bd2371a3a6dc2d~mv2.png/v1/fill/w_1024%2Ch_1024%2Cal_c/ChatGPT%20Image%205_11_2025%2C%2009_28_01.png" alt="Representação artística de São Josafá Kuncewicz, com vestes episcopais e báculo" loading="lazy"></div>
      <h2 id="saintModalTitle">São Josafá Kuncewicz</h2>
      <p class="saint-modal-subtitle">Bispo e mártir da unidade da Igreja · c. 1580–1623</p>
      <p>São Josafá nasceu por volta de 1580, na região da atual Ucrânia, e recebeu no batismo o nome de João. Ainda jovem, aproximou-se da vida religiosa e, em 1604, ingressou no mosteiro basiliano da Santíssima Trindade, em Vilna, adotando o nome de Josafá.</p>
      <p>Ordenado sacerdote em 1609 e consagrado bispo em 1617, dedicou seu ministério à unidade dos cristãos e à comunhão com a Igreja de Roma, preservando a tradição litúrgica bizantina. Como pastor, cuidava especialmente dos pobres, visitava suas comunidades e procurava fortalecer a formação de seu clero.</p>
      <h3>Seu testemunho de fé</h3>
      <p>Em um período marcado por tensões religiosas, sua atuação em favor da unidade despertou forte oposição. Durante uma visita pastoral a Vitebsk, em 12 de novembro de 1623, foi atacado e morto por um grupo de opositores. Tinha cerca de 43 anos.</p>
      <p>Sua morte foi reconhecida como martírio. Foi beatificado em 1643 e canonizado pelo Papa Pio IX em 1867. Seus restos mortais repousam na Basílica de São Pedro, em Roma.</p>
      <div class="saint-modal-note"><strong>O que sua história nos ensina:</strong> São Josafá é lembrado pelo compromisso com a unidade, pela coragem diante das dificuldades e pelo serviço pastoral ao povo de Deus.</div>
      <a class="saint-modal-source" href="https://www.vaticannews.va/pt/santo-do-dia/11/12/s--josafa-kuncewicz--bispo-e-martir.html" target="_blank" rel="noopener">Fonte: Vatican News — São Josafá ↗</a>
    </article>
  `);
}

// Gera os cards da seção Comunidades a partir do array communities.
function renderCommunities() {
  const grid = document.getElementById("communityGrid");
  grid.innerHTML = communities.map((c, index) => `
    <article class="card community-card">
      <div class="community-photo" role="img" aria-label="Imagem de ${c.name}" style="background-image:url('${c.image}')"></div>
      <div class="card-body">
        <h3>${c.name}</h3>
        <p class="community-address">${c.address}</p>
        <p class="community-mass"><b>Missas:</b> ${c.mass}</p>
        <button class="btn-small" type="button" data-community="${index}">Conhecer comunidade →</button>
      </div>
    </article>`).join("");
}
// Abre o modal de uma comunidade (história, endereço com link do mapa, horário e coordenador com troca de foto).
function showCommunity(index) {
  const c = communities[index];
  if (!c) return;

  // Texto de busca para o link do Google Maps (endereço + cidade).
  const mapQuery = encodeURIComponent(c.address + ", Ferraz de Vasconcelos, SP");
  // Valores padrão quando algum dado ainda não foi informado.
  const feast = c.feast || "Data a informar";
  const coordinator = c.coordinators || "A informar";
  const contact = c.contact || "A informar";
  const coordinatorPhoto = c.coordinatorPhoto || "";
  // IDs únicos do seletor de foto e do avatar do coordenador.
  const photoInputId = `communityCoordinatorPhoto-${index}`;
  const avatarId = `communityCoordinatorAvatar-${index}`;

  openModal(`
    <div class="community-modal">
      <span class="pastoral-modal-kicker">Nossa comunidade</span>
      <h2 id="modalTitle">${c.name}</h2>
      <div class="modal-photo community-modal-cover" role="img" aria-label="Imagem de ${c.name}" style="background-image:url('${c.image}')"></div>

      <section class="community-modal-section community-facts-section">
        <h3>Informações da comunidade</h3>
        <div class="info-grid community-details-grid">
          <div class="info-box"><b>Missas</b><span>${c.mass || "Horário a confirmar"}</span></div>
          <div class="info-box"><b>Endereço</b><span>${c.address || "A informar"}</span></div>
          <div class="info-box"><b>Ano de fundação</b><span>${c.foundation || "A informar"}</span></div>
          <div class="info-box"><b>Festa do padroeiro</b><span>${feast}</span></div>
        </div>
      </section>

      <section class="community-modal-section">
        <h3>História da comunidade</h3>
        <p>${c.history || "A história desta comunidade será incluída após confirmação das informações com a coordenação local."}</p>
      </section>

      <section class="community-modal-section">
        <h3>Galeria de fotos</h3>
        <p>Registros da igreja, das celebrações e das atividades comunitárias.</p>
        <div class="community-modal-gallery">
          <div class="community-gallery-item" style="background-image:linear-gradient(135deg,#bda18a,#765365)" role="img" aria-label="Espaço para foto da igreja"></div>
          <div class="community-gallery-item" style="background-image:linear-gradient(135deg,#d8c4a5,#a36d70)" role="img" aria-label="Espaço para foto de celebração"></div>
          <div class="community-gallery-item" style="background-image:linear-gradient(135deg,#9eaf9a,#526b62)" role="img" aria-label="Espaço para foto de atividade pastoral"></div>
        </div>
      </section>

      <section class="community-modal-section">
        <h3>Coordenação e contato</h3>
        <div class="community-coordinator-card">
          <label class="community-coordinator-photo" for="${photoInputId}" title="Adicionar ou trocar foto da coordenação">
            <span class="community-coordinator-avatar has-photo" id="${avatarId}" aria-hidden="true" style="background-image:url('${coordinatorPhoto}')">
              <svg viewBox="0 0 48 48" focusable="false">
                <circle cx="24" cy="16" r="9"></circle>
                <path d="M7 42c1.8-9.2 8.2-14 17-14s15.2 4.8 17 14"></path>
              </svg>
            </span>
            <input id="${photoInputId}" class="community-coordinator-file" type="file" accept="image/*" aria-label="Adicionar foto da coordenação">
          </label>
          <div class="community-coordinator-info-grid">
            <div class="community-coordinator-info-card"><strong>Coordenação</strong><span>${coordinator}</span></div>
            <div class="community-coordinator-info-card"><strong>Contato</strong><span>${contact}</span></div>
          </div>
        </div>
      </section>

      <section class="community-modal-section">
        <h3>Pastorais e serviços</h3>
        <p>As pastorais presentes nesta comunidade e seus horários de atuação serão confirmados com a coordenação local.</p>
      </section>

      ${c.address && c.address !== "Novo endereço em breve"
        ? `<a class="btn outline community-map-button" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${mapQuery}">Ver endereço da comunidade</a>`
        : `<p class="community-map-unavailable">Endereço para localização no mapa em atualização.</p>`}
    </div>`);

  // Troca de foto do coordenador: mostra a prévia na tela (a foto NÃO é salva).
  const photoInput = document.getElementById(photoInputId);
  photoInput?.addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const avatar = document.getElementById(avatarId);
      if (avatar) {
        avatar.innerHTML = "";
        avatar.style.backgroundImage = `url('${reader.result}')`;
        avatar.classList.add("has-photo");
      }
    };
    reader.readAsDataURL(file);
  });
}
// Gera os cards da seção Pastorais e preenche a lista do formulário "Faça parte".
function renderPastorals() {
  document.getElementById("pastoralGrid").innerHTML = pastorals.map((p, index) => `
    <button class="card pastoral-card" type="button" data-pastoral="${index}">
      <span class="pastoral-icon">${p.icon}</span><h3>${p.name}</h3><p>${p.desc}</p>
    </button>`).join("");
  const select = document.querySelector('#joinForm select[name="pastoral"]');
  select.insertAdjacentHTML("beforeend", pastorals.map(p => `<option value="${p.name}">${p.name}</option>`).join("") + '<option value="Outros">Outros</option>');
}
// Abre o modal de uma pastoral (como participar, como apoiar e coordenação).
function showPastoral(index) {
  const p = pastorals[index];
  if (!p) return;

  const coordinatorName = p.coordenador || "A informar";
  const coordinatorPhone = p.contato || "A informar";
  const defaultCoordinatorPhoto = p.foto || "";

  openModal(`
    <div class="pastoral-modal pastoral-modal-reference-layout">
      <span class="pastoral-modal-kicker">Pastoral paroquial</span>
      <h2 id="modalTitle">${p.name}</h2>
      <p class="pastoral-modal-intro">${p.desc}</p>

      <div class="pastoral-modal-section">
        <h3>Como participar / inscrever-se</h3>
        <p>${p.participar}</p>
      </div>

      <div class="pastoral-modal-section">
        <h3>Como apoiar</h3>
        <p>${p.apoiar}</p>
      </div>

      <div class="pastoral-coordinator-footer">
        <label class="pastoral-coordinator-photo-upload" for="pastoralCoordinatorPhoto" title="Adicionar ou trocar a foto da coordenação">
          <img class="pastoral-coordinator-avatar" id="pastoralCoordinatorAvatar" src="${defaultCoordinatorPhoto}" alt="Foto de ${coordinatorName}">
          <input id="pastoralCoordinatorPhoto" type="file" accept="image/*" aria-label="Adicionar foto da coordenação">
        </label>

        <div class="pastoral-coordinator-info-grid">
          <div class="pastoral-coordinator-info-card">
            <strong>Coordenação</strong>
            <span>${coordinatorName}</span>
          </div>
          <div class="pastoral-coordinator-info-card">
            <strong>Contato</strong>
            <span>${coordinatorPhone}</span>
          </div>
        </div>
      </div>
    </div>`);

  // Troca de foto da coordenação: mostra a prévia na tela (a foto NÃO é salva).
  const photoInput = document.getElementById("pastoralCoordinatorPhoto");
  photoInput?.addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const avatar = document.getElementById("pastoralCoordinatorAvatar");
      if (avatar) {
        avatar.src = reader.result;
        avatar.alt = "Foto da coordenação da pastoral";
      }
    };
    reader.readAsDataURL(file);
  });
}
