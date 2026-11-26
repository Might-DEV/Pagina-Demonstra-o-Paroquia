/* ==========================================================================
   PARÓQUIA SÃO PAULO APÓSTOLO — SCRIPTS DO SITE (js/script.js)
   --------------------------------------------------------------------------
   Este arquivo reúne todo o JavaScript do site, dividido em módulos numerados.
   Cada módulo tem um cabeçalho dizendo o que faz. Os módulos estão
   isolados em "try/catch": se um deles falhar, os outros continuam funcionando.

   Índice
     [01] Núcleo do site (dados, pop-ups, orações/terço, dízimo, secretaria, init)
     [02] Galeria de momentos — visualizador
     [03] WhatsApp, materiais e contato
     [04] Melhorias de experiência (menu mobile, animações, carrossel)
     [05] Rádio católica
     [08] Recursos extras (inscrição, aniversariantes, rodapé)
     [09] Aniversariantes — setas de rolagem
     [10] Aniversariantes — 7 por página
     [11] Faixa de liturgia — 13/11/2026

   Serviços externos que o site consulta (não dá para hospedar): os streams das rádios.
   ========================================================================== */


/* ==========================================================================
   [01] NÚCLEO DO SITE
   Dados (comunidades, pastorais, sacramentos, agenda, notícias e perfis), pop-ups, orações/terço, dízimo, secretaria e inicialização (init).
   ========================================================================== */
"use strict";
// DADOS — Comunidades da paróquia (nome, festa, endereço, missas, coordenador, contatos, fotos).
const communities = [{"name": "Matriz São Paulo Apóstolo", "short": "Matriz", "feast": "25 de janeiro", "address": "Rua Chico Mendes, 94 – Vila São Paulo", "mass": "Domingos: 7h, 10h30 e 19h", "history": "A comunidade matriz é o centro da vida paroquial, reunindo os fiéis para a Eucaristia, a oração, a formação e o serviço missionário.", "foundation": "A informar", "coordinators": "Maria Aparecida Santos", "contact": "(11) 0000-0101", "image": "imgs/comunidades/comunidade-matriz-sao-paulo-apostolo.webp", "coordinatorPhoto": "imgs/comunidades/coordenador-matriz-sao-paulo-apostolo.webp"}, {"name": "Comunidade São Pedro", "short": "São Pedro", "feast": "29 de junho", "address": "Travessa Dom Pedro II, 8 – Jardim Melilo", "mass": "Sábados: 19h", "foundation": "A informar", "coordinators": "João Carlos Ribeiro", "contact": "(11) 0000-0102", "image": "imgs/comunidades/comunidade-sao-pedro.webp", "coordinatorPhoto": "imgs/comunidades/coordenador-sao-pedro.webp"}, {"name": "Comunidade São Miguel Arcanjo", "short": "São Miguel Arcanjo", "feast": "29 de setembro", "address": "Rua Floriano Peixoto, 15 – Vila Cristina", "mass": "Sábados: 17h30", "foundation": "A informar", "coordinators": "Luciana Ferreira", "contact": "(11) 0000-0103", "image": "imgs/comunidades/comunidade-sao-miguel-arcanjo.webp", "coordinatorPhoto": "imgs/comunidades/coordenador-sao-miguel-arcanjo.webp"}, {"name": "Comunidade São José", "short": "São José", "feast": "19 de março", "address": "Rua Sebastião Pinto Magalhães, 50 – Jardim das Flores", "mass": "Domingos: 17h30", "foundation": "A informar", "coordinators": "Marcos Vinícius Costa", "contact": "(11) 0000-0104", "image": "imgs/comunidades/comunidade-sao-jose.webp", "coordinatorPhoto": "imgs/comunidades/coordenador-sao-jose.webp"}, {"name": "Comunidade Imaculada Conceição", "short": "Imaculada Conceição", "feast": "8 de dezembro", "address": "Rua Noel de Paula, 89 – Cambiri", "mass": "Domingos: 9h", "foundation": "A informar", "coordinators": "Ana Paula Martins", "contact": "(11) 0000-0105", "image": "imgs/comunidades/comunidade-imaculada-conceicao.webp", "coordinatorPhoto": "imgs/comunidades/coordenador-imaculada-conceicao.webp"}, {"name": "Comunidade Sagrada Família", "short": "Sagrada Família", "feast": "2º domingo de agosto", "address": "Rua Bela Vista, 10 – Vila Piauí", "mass": "Domingos: 9h", "foundation": "A informar", "coordinators": "Roberto Alves", "contact": "(11) 0000-0106", "image": "imgs/comunidades/comunidade-sagrada-familia.webp", "coordinatorPhoto": "imgs/comunidades/coordenador-sagrada-familia.webp"}, {"name": "Comunidade Santo Antônio", "short": "Santo Antônio", "feast": "13 de junho", "address": "Novo endereço em breve", "mass": "Em breve", "foundation": "A informar", "coordinators": "Renata Oliveira", "contact": "(11) 0000-0107", "image": "imgs/comunidades/comunidade-santo-antonio.webp", "coordinatorPhoto": "imgs/comunidades/coordenador-santo-antonio.webp"}, {"name": "Comunidade O Caminho", "short": "O Caminho", "feast": "A definir", "address": "Rua Central, Vila Piauí — Convento das Irmãs Religiosas", "mass": "Horário a informar", "history": "Comunidade vinculada ao Convento das Irmãs Religiosas, espaço de oração, vida fraterna e missão evangelizadora.", "foundation": "A informar", "coordinators": "Irmã Helena (exemplo)", "contact": "(11) 0000-0108", "image": "imgs/comunidades/comunidade-o-caminho.svg", "coordinatorPhoto": "imgs/comunidades/coordenador-o-caminho.webp"}];
// DADOS — Pastorais (descrição, como participar e coordenador).
const pastorals = [{"name": "Catequese", "desc": "Acompanha crianças, adolescentes e adultos na iniciação à vida cristã e na caminhada de fé.", "icon": "📖", "participar": "Famílias e pessoas interessadas na catequese podem procurar a secretaria paroquial para conhecer as turmas, as etapas de formação, os documentos e os períodos de inscrição. A coordenação orientará sobre a comunidade onde acontecem os encontros.", "apoiar": "Quem deseja servir como catequista pode conversar com a coordenação sobre formação, disponibilidade e preparação. Também é possível apoiar a acolhida, a organização dos encontros, os materiais e a participação das famílias.", "coordenador": "Adriana Martins", "contato": "(11) 0000-0201", "foto": "imgs/pastorais/coordenador-catequese.webp"}, {"name": "Liturgia", "desc": "Prepara e anima as celebrações, ajudando a assembleia a participar da oração da Igreja.", "icon": "✝", "participar": "Quem deseja servir nas celebrações pode procurar a coordenação para conhecer as equipes disponíveis, como leitores, salmistas, comentaristas, ministros e serviço ao altar. A coordenação explica a preparação necessária e as formas de participação em cada comunidade.", "apoiar": "Colabore com a organização dos espaços, a preparação dos livros e objetos litúrgicos, a acolhida das equipes e o cuidado com a igreja antes e depois das celebrações.", "coordenador": "Maria Aparecida", "contato": "(11) 0000-0202", "foto": "imgs/pastorais/coordenador-liturgia.webp"}, {"name": "Música", "desc": "Coloca o canto e os instrumentos a serviço da oração e da participação nas celebrações.", "icon": "♫", "participar": "Pessoas que gostam de cantar ou tocar instrumentos podem procurar a coordenação para conhecer os grupos, os ensaios e as celebrações em que podem colaborar. A participação é orientada de acordo com as necessidades das comunidades.", "apoiar": "Ajude na preparação dos cantos, na organização dos repertórios e materiais, no cuidado com os instrumentos e no apoio às equipes de música.", "coordenador": "Carlos Henrique", "contato": "(11) 0000-0203", "foto": "imgs/pastorais/coordenador-musica.webp"}, {"name": "Acolhida", "desc": "Recebe cada pessoa com atenção, respeito e espírito fraterno.", "icon": "♡", "participar": "Quem gosta de receber e orientar pessoas pode conversar com a coordenação para conhecer a equipe de acolhida e as oportunidades de serviço nas missas e atividades paroquiais.", "apoiar": "Ajude a orientar visitantes, organizar a entrada e os lugares, acolher pessoas idosas ou com mobilidade reduzida e transmitir informações com gentileza.", "coordenador": "Joana Souza", "contato": "(11) 0000-0204", "foto": "imgs/pastorais/coordenador-acolhida.webp"}, {"name": "Dízimo", "desc": "Promove a partilha e a corresponsabilidade pela missão evangelizadora da paróquia.", "icon": "✧", "participar": "Quem deseja conhecer melhor a pastoral ou manifestar interesse em participar pode procurar a secretaria. A equipe orientará sobre as ações de conscientização, acolhida e acompanhamento dos dizimistas.", "apoiar": "Colabore na acolhida dos dizimistas, na divulgação das ações pastorais e na organização de encontros. O serviço deve preservar a discrição e o cuidado com as informações pessoais e contribuições.", "coordenador": "José Roberto", "contato": "(11) 0000-0205", "foto": "imgs/pastorais/coordenador-dizimo.webp"}, {"name": "Comunicação", "desc": "Compartilha informações, histórias e atividades da paróquia e de suas comunidades.", "icon": "▣", "participar": "Pessoas com interesse em fotografia, vídeo, texto, design ou redes sociais podem procurar a coordenação para conhecer as necessidades da equipe e as orientações para registrar e divulgar as atividades paroquiais.", "apoiar": "Contribua com registros de celebrações e eventos, produção e revisão de textos, organização de materiais e divulgação das iniciativas da paróquia, sempre respeitando a imagem e a privacidade das pessoas.", "coordenador": "Paula Nunes", "contato": "(11) 0000-0206", "foto": "imgs/pastorais/coordenador-comunicacao.webp"}, {"name": "Juventude", "desc": "Acompanha jovens na vivência da fé, na amizade e no anúncio do Evangelho.", "icon": "☀", "participar": "Jovens interessados em caminhar em grupo podem procurar a secretaria ou a coordenação para saber quais encontros, atividades e formas de participação estão disponíveis nas comunidades.", "apoiar": "Ajude na acolhida dos jovens, na preparação de encontros, momentos de oração, atividades formativas e ações de solidariedade.", "coordenador": "Gabriel Costa", "contato": "(11) 0000-0207", "foto": "imgs/pastorais/coordenador-juventude.webp"}, {"name": "Caridade", "desc": "Organiza gestos concretos de cuidado, solidariedade e atenção a quem mais precisa.", "icon": "♥", "participar": "Quem deseja servir pessoas em situação de vulnerabilidade pode procurar a coordenação para conhecer as ações em andamento, as necessidades identificadas e os cuidados necessários no atendimento.", "apoiar": "Colabore com campanhas solidárias, organização de doações e ações de serviço conforme as necessidades comunicadas pela pastoral. O trabalho deve respeitar a dignidade e a privacidade de quem recebe apoio.", "coordenador": "Ana Lúcia", "contato": "(11) 0000-0208", "foto": "imgs/pastorais/coordenador-caridade.webp"}, {"name": "Crisma", "desc": "Acompanha a preparação para o sacramento da Confirmação e o amadurecimento da fé.", "icon": "🕊", "participar": "Adolescentes e adultos interessados em receber o sacramento podem procurar a secretaria paroquial para conhecer os períodos de inscrição, os critérios e o percurso de preparação oferecido pela paróquia.", "apoiar": "Quem deseja colaborar pode apoiar a acolhida, a organização dos encontros, a preparação dos materiais e o acompanhamento dos crismandos, conforme a orientação da coordenação.", "coordenador": "Marcelo Ribeiro", "contato": "(11) 0000-0209", "foto": "imgs/pastorais/coordenador-crisma.webp"}, {"name": "Batismo", "desc": "Acolhe famílias e acompanha a preparação para o sacramento do Batismo.", "icon": "💧", "participar": "Pais e padrinhos podem procurar a secretaria paroquial para receber orientações sobre a preparação, os documentos necessários, as datas disponíveis e a comunidade responsável pelo atendimento.", "apoiar": "A pastoral pode receber apoio na acolhida das famílias, na organização dos encontros de preparação e na orientação dos participantes, sempre em diálogo com a coordenação.", "coordenador": "Renata Lima", "contato": "(11) 0000-0210", "foto": "imgs/pastorais/coordenador-batismo.webp"}, {"name": "Infância Missionária", "desc": "Ajuda crianças a crescer na fé, na oração, na amizade e no espírito missionário.", "icon": "🌎", "participar": "Famílias interessadas podem procurar a secretaria ou a coordenação para conhecer as atividades destinadas às crianças, as formas de inscrição e os encontros disponíveis nas comunidades.", "apoiar": "Colabore na preparação de atividades, na organização de materiais, na acolhida das crianças e no incentivo a atitudes de partilha, oração e solidariedade.", "coordenador": "Beatriz Santos", "contato": "(11) 0000-0211", "foto": "imgs/pastorais/coordenador-infancia-missionaria.webp"}, {"name": "Encontro de Emaús", "desc": "Proporciona uma experiência de encontro com Cristo, partilha e fortalecimento da caminhada de fé.", "icon": "🤝", "participar": "Quem deseja conhecer o Encontro de Emaús pode procurar a coordenação paroquial para receber informações sobre as próximas experiências, orientações de participação e etapas de preparação.", "apoiar": "Ajude na acolhida dos participantes, na preparação dos espaços e materiais, na organização dos momentos de oração e no serviço antes, durante e depois dos encontros.", "coordenador": "Eduardo Martins", "contato": "(11) 0000-0212", "foto": "imgs/pastorais/coordenador-encontro-de-emaus.webp"}];
// DADOS — Textos dos sete sacramentos.
const sacramentData=[
{name:"Batismo",intro:"A porta de entrada na vida cristã. Celebramos os batizados no último domingo do mês, com preparação prévia dos pais e padrinhos.",prep:"Inscrição na secretaria com certidão de nascimento e comprovante de residência."},
{name:"Eucaristia",intro:"A primeira comunhão das crianças e adolescentes acontece após dois anos de catequese, com encontros semanais na paróquia.",prep:"Matrícula na catequese no início do ano, na secretaria paroquial."},
{name:"Confirmação (Crisma)",intro:"O sacramento que fortalece a fé e o compromisso com a comunidade, vivido pelos jovens após a caminhada de catequese.",prep:"Inscrição na catequese de crisma e participação nos encontros de preparação."},
{name:"Reconciliação",intro:"A confissão é celebrada todos os sábados, das 16h às 17h30, e em celebrações penitenciais no Advento e na Quaresma.",prep:"Não é preciso agendar. Em caso de dúvidas, fale com a secretaria."},
{name:"Unção dos Enfermos",intro:"Leva conforto e força a quem enfrenta doença ou fragilidade. Pode ser celebrada na igreja, em casa ou no hospital.",prep:"Avise a secretaria ou a equipe da pastoral da saúde e comunique a família."},
{name:"Matrimônio",intro:"O sim de um casal diante de Deus. As celebrações acontecem aos sábados e exigem preparação com a pastoral familiar.",prep:"Agende com antecedência de seis meses e apresente a documentação necessária."},
{name:"Ordem",intro:"A ordenação de diáconos e presbíteros que servem a comunidade. A paróquia acompanha os vocacionados com oração e formação.",prep:"Jovens que sentem o chamado podem procurar a pastoral vocacional."}];
// DADOS — Imagem de cada sacramento (pasta imgs/sacramentos).
const sacramentImages = ["imgs/sacramentos/batismo.jpg", "imgs/sacramentos/eucaristia.jpg", "imgs/sacramentos/crisma.jpg", "imgs/sacramentos/penitencia.jpg", "imgs/sacramentos/uncao-dos-enfermos.jpg", "imgs/sacramentos/matrimonio.jpg", "imgs/sacramentos/ordem.jpg"];
// Desenha o sacramento escolhido na seção Sacramentos (texto, preparação, contato, imagem e botão de inscrição).
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
      <div class="sacrament-actions"><button class="btn outline sacrament-contact" data-open="secretaria" type="button">Fale com a secretaria</button>
      ${index===0?'<button class="sacrament-enroll-btn" type="button" data-enroll="Batismo">Fazer inscrição</button>':index===1?'<button class="sacrament-enroll-btn" type="button" data-enroll="Catequese">Fazer inscrição</button>':index===2?'<button class="sacrament-enroll-btn" type="button" data-enroll="Crisma">Fazer inscrição</button>':''}</div>
    </div>
    <div class="sacrament-image sacrament-${index}">
      <img class="sacrament-photo" src="${sacramentImages[index]}" alt="${imageAlt[index]}" loading="eager">
      <span>${s.name}</span>
    </div>`;
}
// DADOS — Eventos da agenda paroquial.
const parishEvents = [
  {day:"22", month:"NOV", date:"2026-11-22", category:"CELEBRAÇÃO", title:"Missa em ação de graças pelos 10 anos da paróquia", time:"19h", place:"Matriz — Centro", description:"Celebração de ação de graças pelo jubileu dos 10 anos, com a participação das pastorais, comunidades e convidados."},
  {day:"12", month:"DEZ", date:"2026-12-12", category:"ESPIRITUALIDADE", title:"Novena de Natal da comunidade", time:"19h", place:"Matriz — Centro", description:"Primeira noite da novena de Natal, com oração em família, cânticos e bênção dos presépios trazidos pela comunidade."}
];
// DADOS — Materiais disponíveis para download na agenda.
const parishMaterials = [
  {title:"Programação paroquial",file:"programacao-paroquial.pdf"},
  {title:"Folheto litúrgico",file:"folheto-liturgico.pdf"},
  {title:"Material da catequese",file:"material-catequese.pdf"},
  {title:"Calendário litúrgico",file:"calendario-liturgico.pdf"},
  {title:"Guia das pastorais",file:"guia-das-pastorais.pdf"},
  {title:"Roteiro de oração em família",file:"roteiro-oracao-familia.pdf"}
];
window.parishMaterials = parishMaterials;
// Monta os cards de eventos da agenda e a lista de materiais (3 por página, com botão para alternar).
function renderAgenda() {
  const eventCards = parishEvents.map((event, index) => `
    <article class="agenda-card">
      <div class="event-top"><div class="event-date"><b>${event.day}</b><span>${event.month}</span></div><span class="event-category">${event.category}</span></div>
      <h3>${event.title}</h3>
      <p class="event-meta">${event.time} · ${event.place}</p>
      <p class="event-description">${event.description}</p>
      <button class="event-link" type="button" data-event="${index}">Ver no calendário →</button>
    </article>`).join("");

  let materialsPage = 0;
  const pageSize = 3;
  const pageCount = Math.ceil(parishMaterials.length / pageSize);
  const renderMaterialRows = () => parishMaterials
    .slice(materialsPage * pageSize, (materialsPage + 1) * pageSize)
    .map((item, visibleIndex) => {
      const index = materialsPage * pageSize + visibleIndex;
      return `<div class="material-row"><span class="material-number">${index+1}.</span><span class="material-name">${item.title}</span><button class="material-download" type="button" data-material-download="${index}">↓ Baixar</button></div>`;
    }).join("");

  const materialsCard = `<article class="agenda-card materials-card">
    <div class="materials-header"><span class="materials-icon">↧</span><div><span class="event-category">ARQUIVOS</span><h3>Materiais para baixar</h3></div></div>
    <div class="materials-list" aria-live="polite">${renderMaterialRows()}</div>
    <div class="materials-carousel-controls">
      <button class="materials-toggle" type="button" aria-label="Mostrar próximos três arquivos">Próximos 3 arquivos <span aria-hidden="true">↓</span></button>
      <span class="materials-page-indicator">1 / ${pageCount}</span>
    </div>
    
  </article>`;

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

// Abre o pop-up com os detalhes de um evento da agenda.
function showEvent(index) {
  const e = parishEvents[index];
  if (!e) return;
  openModal(`<h2 id="modalTitle">${e.title}</h2><div class="detail-row"><b>${e.day} ${e.month}</b> · ${e.category}</div><div class="detail-row">◷ <b>Horário:</b> ${e.time}</div><div class="detail-row">⌖ <b>Local:</b> ${e.place}</div><p>${e.description}</p>`);
}
// Estado do calendário completo: mês exibido e evento selecionado.
let calendarCursor = new Date();
let calendarSelectedEvent = null;
// Devolve o nome do mês e o ano exibidos no calendário completo.
function calendarMonthLabel(date) {
  return date.toLocaleDateString("pt-BR", {month:"long", year:"numeric"});
}
// Desenha o calendário mensal completo, marcando os dias que têm eventos.
function renderCalendarModal() {
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventMap = new Map();
  parishEvents.forEach((event, index) => {
    const date = event.date || "";
    if (date) eventMap.set(date, index);
  });
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
// Liga os botões do calendário (mês anterior/próximo) e o clique nos dias.
function bindCalendarModal() {
  modalContent.querySelectorAll("[data-calendar-month]").forEach(button => {
    button.addEventListener("click", () => {
      calendarCursor.setMonth(calendarCursor.getMonth() + Number(button.dataset.calendarMonth));
      calendarSelectedEvent = null;
      openModal(renderCalendarModal());
      bindCalendarModal();
    });
  });
  modalContent.querySelectorAll("[data-calendar-event]").forEach(button => {
    button.addEventListener("click", () => {
      calendarSelectedEvent = Number(button.dataset.calendarEvent);
      openModal(renderCalendarModal());
      bindCalendarModal();
    });
  });
  modalContent.querySelectorAll("[data-calendar-open-event]").forEach(button => {
    button.addEventListener("click", () => showEvent(Number(button.dataset.calendarOpenEvent)));
  });
}
// Abre o calendário completo em um pop-up.
function showFullCalendar() {
  calendarCursor = new Date();
  calendarSelectedEvent = null;
  openModal(renderCalendarModal());
  bindCalendarModal();
}
// Abre o pop-up do vídeo institucional da paróquia.
function showVideoNotice() {
  openModal(`
    <div class="video-modal-layout">
      <span class="pastoral-modal-kicker">Conheça nossa paróquia</span>
      <h2 id="modalTitle">História da nossa paróquia</h2>
      <p>Conheça um pouco da caminhada de fé, da missão e das comunidades da nossa paróquia.</p>
      <video class="institutional-demo-video" controls playsinline preload="metadata" poster="">
        <source src="videos/video-institucional.mp4" type="video/mp4">
        Seu navegador não conseguiu reproduzir o vídeo. <a href="videos/video-institucional.mp4" target="_blank" rel="noopener">Abrir vídeo</a>.
      </video>
    </div>`);
}

// DADOS — Textos completos das notícias.
const newsArticles = [{"date": "20/05/2026", "category": "AÇÃO SOLIDÁRIA", "title": "Pastoral da Caridade inicia campanha do agasalho", "summary": "A campanha arrecada roupas, cobertores e alimentos para as famílias acompanhadas pela paróquia.", "body": "A Pastoral da Caridade promove uma campanha de arrecadação de roupas, cobertores e alimentos para apoiar famílias acompanhadas pelas comunidades paroquiais. As doações podem ser organizadas com a equipe da pastoral e entregues nos pontos de coleta informados pela secretaria."}, {"date": "02/02/2026", "category": "FORMAÇÃO", "title": "Catequese abre inscrições para 2026", "summary": "Inscrições para a catequese de crianças, adolescentes e Crisma podem ser feitas na secretaria paroquial.", "body": "Estão abertas as inscrições para os encontros de catequese de crianças, adolescentes e preparação para a Crisma. Para informações sobre documentação, faixas etárias, turmas e horários, procure a secretaria paroquial."}, {"date": "26/01/2026", "category": "CELEBRAÇÃO", "title": "Festa do padroeiro reúne a comunidade do centro e dos bairros", "summary": "Procissão, missa solene e confraternização marcaram o início das celebrações do jubileu da paróquia.", "body": "A festa do padroeiro reuniu fiéis das comunidades em um momento de oração, procissão, celebração e confraternização. A programação destacou a devoção a São Paulo Apóstolo e a unidade entre as comunidades paroquiais."}, {"date": "18/01/2026", "category": "JUVENTUDE", "title": "Encontro de jovens fortalece a caminhada de fé", "summary": "Jovens das comunidades participaram de uma tarde de oração, partilha e convivência.", "body": "O encontro reuniu jovens das comunidades em uma tarde de oração, partilha e convivência. A programação foi pensada para fortalecer os vínculos, incentivar a participação na vida paroquial e renovar o compromisso com a missão."}, {"date": "12/01/2026", "category": "FORMAÇÃO", "title": "Pastorais se reúnem para planejar o ano pastoral", "summary": "Representantes das equipes alinharam propostas e ações para o calendário paroquial.", "body": "Representantes das pastorais e serviços paroquiais se reuniram para compartilhar prioridades, organizar propostas e planejar as ações do ano. O encontro reforçou a importância do trabalho em conjunto e do serviço às comunidades."}, {"date": "05/01/2026", "category": "COMUNIDADE", "title": "Famílias participam de momento de oração e convivência", "summary": "A atividade aproximou famílias e lideranças em um momento de espiritualidade e acolhida.", "body": "Famílias das comunidades participaram de um momento de oração e convivência. A atividade proporcionou acolhida, integração e partilha, fortalecendo os laços entre os participantes e a vida comunitária."}];
// Abre a notícia completa em um pop-up.
function showNewsArticle(index) {
  const article = newsArticles[index];
  if (!article) return;
  const card=document.querySelectorAll("#newsGrid .news-card:not(.news-card-clone)")[index]; const photo=card?.querySelector(".news-photo")?.src;
  openModal(`${photo?`<img class="news-modal-image" src="${photo}" alt="${article.title}">`:""}<h2 id="modalTitle">${article.title}</h2>
    <p style="color:var(--gold);font-weight:800">${article.date} · ${article.category}</p>
    <div class="detail-row">${article.summary}</div>
    <p>${article.body}</p>
    <button class="news-share-button news-share-modal-action" type="button" data-share-news="${index}">↗ Compartilhar pelo WhatsApp</button>`);
}
// Compartilha uma notícia pelo WhatsApp.
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
document.addEventListener("click", event => {
  const shareButton = event.target.closest("[data-share-news]");
  if (shareButton) shareNewsArticle(Number(shareButton.dataset.shareNews));
});

// Abre o pop-up com a lista de todas as notícias.
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
// DADOS — Biografias exibidas no perfil de cada pessoa da seção Equipe.
const pastorProfiles = [
 {name:"Papa Leão XIV",role:"Papa da Igreja Católica",bio:"Robert Francis Prevost foi eleito em 8 de maio de 2025 e escolheu o nome Leão XIV. É o 267º sucessor de São Pedro."},
 {name:"Dom Giambattista Diquattro",role:"Núncio Apostólico",bio:"Arcebispo e diplomata da Santa Sé, exerce o serviço de representação pontifícia junto à Igreja e às autoridades do país. Sua missão expressa a comunhão da Igreja local com o Santo Padre."},
 {name:"Dom Pedro Luiz Stringhini",role:"Bispo Diocesano",bio:"Bispo da Diocese de Mogi das Cruzes, acompanha e orienta pastoralmente as paróquias e comunidades da diocese, promovendo a evangelização, a unidade e a missão da Igreja."},
 {name:"Pe. Victor Almeida M. da Silva",role:"Pároco",bio:"Responsável pelo cuidado pastoral da Paróquia São Paulo Apóstolo, acompanha a vida litúrgica, sacramental e comunitária e anima as pastorais e comunidades na missão evangelizadora."}

];
// Abre o perfil de um pastor/representante da seção Equipe.
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
document.querySelectorAll("#equipe .person").forEach((card,index)=>{
 card.addEventListener("click",()=>showPastorProfile(index));
 card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();showPastorProfile(index)}});
});

// Referências do pop-up genérico (fundo escuro e área de conteúdo).
const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent = document.getElementById("modalContent");
// Estado do terço: etapa atual.
let rosaryIndex = 0;

// Abre o pop-up genérico do site com o conteúdo (HTML) e o título recebidos.
function openModal(markup, title) {
  modalContent.innerHTML = markup;
  const isSecretaryModal = !!modalContent.querySelector(".secretary-whatsapp-modal");
  const modalShell = modalContent.closest(".modal");
  if (modalShell) {
    modalShell.scrollTop = 0;
    modalShell.classList.toggle("prayer-modal-wide", !!modalContent.querySelector(".prayer-modal-layout"));
    modalShell.classList.toggle("calendar-modal-wide", !!modalContent.querySelector(".calendar-modal"));
    modalShell.classList.toggle("rosary-modal-wide", !!modalContent.querySelector(".rosary-modal"));
    modalShell.classList.toggle("tithe-modal-wide", !!modalContent.querySelector(".tithe-modal-layout"));
    modalShell.classList.toggle("video-modal-wide", !!modalContent.querySelector(".video-modal-layout"));
    modalShell.classList.toggle("secretary-modal", isSecretaryModal);
  }
  modalBackdrop.classList.toggle("secretary-modal-open", isSecretaryModal);
  const h = modalContent.querySelector("h2");
  if (h && title) h.textContent = title;
  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.getElementById("modalClose").focus({preventScroll:true});
  if (modalShell) modalShell.scrollTop = 0;
}
// Fecha o pop-up genérico e restaura a rolagem da página.
function closeModal() {
  modalContent.querySelectorAll("video,audio").forEach(media => media.pause());
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (prayerActivityTimer) { clearInterval(prayerActivityTimer); prayerActivityTimer = null; }
  const modalShell = modalContent.closest(".modal");
  if (modalShell) modalShell.classList.remove("prayer-modal-wide","calendar-modal-wide","rosary-modal-wide","tithe-modal-wide","video-modal-wide","secretary-modal");
  modalBackdrop.classList.remove("secretary-modal-open");
  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
// Cria os cards das comunidades a partir da lista "communities".
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
// Abre os detalhes de uma comunidade: foto, endereço, festa, missas, coordenador, contatos e mapa.
function showCommunity(index) {
  const c = communities[index];
  if (!c) return;

  const mapQuery = encodeURIComponent(c.address + ", Ferraz de Vasconcelos, SP");
  const feast = c.feast || "Data a informar";
  const coordinator = c.coordinators || "A informar";
  const contact = c.contact || "A informar";
  const coordinatorPhoto = c.coordinatorPhoto || "";
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
// Cria os cards das pastorais e preenche a lista de pastorais do formulário de participação.
function renderPastorals() {
  document.getElementById("pastoralGrid").innerHTML = pastorals.map((p, index) => `
    <button class="card pastoral-card" type="button" data-pastoral="${index}">
      <span class="pastoral-icon">${p.icon}</span><h3>${p.name}</h3><p>${p.desc}</p>
    </button>`).join("");
  const select = document.querySelector('#joinForm select[name="pastoral"]');
  select.insertAdjacentHTML("beforeend", pastorals.map(p => `<option value="${p.name}">${p.name}</option>`).join("") + '<option value="Outros">Outros</option>');
}
// Abre os detalhes de uma pastoral, com como participar e dados do coordenador.
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
// Configuração da atividade de oração: chave de armazenamento no navegador e duração (24 horas).
const PRAYER_ACTIVITY_KEY = "paroquia_sao_paulo_atividade_oracao_v1";
const PRAYER_ACTIVITY_DURATION = 24 * 60 * 60 * 1000; // 24 horas
let prayerActivityTimer = null;

// Lê do navegador a lista de velas/intenções registradas nas últimas 24 horas.
function readPrayerActivity() {
  try {
    const rows = JSON.parse(localStorage.getItem(PRAYER_ACTIVITY_KEY) || "[]");
    const now = Date.now();
    const active = Array.isArray(rows) ? rows.filter(row => row && row.expiresAt > now) : [];
    if (active.length !== rows.length) localStorage.setItem(PRAYER_ACTIVITY_KEY, JSON.stringify(active));
    return active;
  } catch (error) {
    return [];
  }
}
// Registra uma nova vela ou intenção (guardada por 24 horas).
function addPrayerActivity(kind, name, label) {
  const now = Date.now();
  const rows = readPrayerActivity();
  rows.push({
    id: String(now) + "-" + Math.random().toString(36).slice(2, 8),
    kind: kind,
    name: String(name || "Visitante").trim() || "Visitante",
    label: label,
    createdAt: now,
    expiresAt: now + PRAYER_ACTIVITY_DURATION
  });
  try { localStorage.setItem(PRAYER_ACTIVITY_KEY, JSON.stringify(rows)); } catch (error) {}
  renderPrayerActivity(kind);
}
// Protege o texto digitado (troca caracteres especiais) antes de exibi-lo na tela.
function escapePrayerText(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(char) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
  });
}
// Converte milissegundos em contagem regressiva (horas:minutos:segundos).
function formatPrayerCountdown(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  if (hours > 0) return hours + " h " + String(minutes).padStart(2, "0") + " min";
  return minutes + " min " + String(rest).padStart(2, "0") + " s";
}
// Atualiza a lista de atividade de oração (quem acendeu vela/enviou intenção e quanto tempo falta).
function renderPrayerActivity(kind) {
  const list = document.getElementById("prayerActivityList");
  const count = document.getElementById("prayerActivityCount");
  if (!list || !count) return;
  const now = Date.now();
  const rows = readPrayerActivity()
    .filter(row => row.kind === kind && row.expiresAt > now)
    .sort((a, b) => b.createdAt - a.createdAt);
  count.textContent = String(rows.length) + (kind === "vela" ? (rows.length === 1 ? " vela acesa" : " velas acesas") : (rows.length === 1 ? " intenção" : " intenções"));
  if (!rows.length) {
    list.innerHTML = '<div class="prayer-activity-empty">Ainda não há registros neste último dia. Seja a primeira pessoa a participar deste momento de oração.</div>';
    return;
  }
  list.innerHTML = rows.map(row => {
    const symbol = kind === "vela" ? "🕯️" : "📜";
    const label = kind === "vela" ? ("Por: " + (row.label || "Intenção de oração")) : (row.label || "Intenção registrada");
    return '<div class="prayer-activity-item">' +
      '<span class="prayer-activity-symbol" aria-hidden="true">' + symbol + '</span>' +
      '<div class="prayer-activity-person"><strong>' + escapePrayerText(row.name) + '</strong><small>' + escapePrayerText(label) + '</small></div>' +
      '<span class="prayer-activity-time" data-expires="' + row.expiresAt + '">' + formatPrayerCountdown(row.expiresAt - now) + '</span>' +
    '</div>';
  }).join("");
}
// Atualiza a lista de atividade de oração a cada segundo enquanto o pop-up está aberto.
function startPrayerActivityRefresh(kind) {
  if (prayerActivityTimer) clearInterval(prayerActivityTimer);
  renderPrayerActivity(kind);
  prayerActivityTimer = setInterval(function() { renderPrayerActivity(kind); }, 1000);
}
// Monta o HTML do painel "Velas acesas / Intenções nas últimas 24 horas".
function prayerActivityMarkup(kind) {
  const title = kind === "vela" ? "Velas acesas no último dia" : "Intenções nas últimas 24 horas";
  return '<aside class="prayer-activity-panel"><div class="prayer-activity-head"><h3>' + title + '</h3><span class="prayer-activity-count" id="prayerActivityCount">0</span></div><div class="prayer-activity-list" id="prayerActivityList" aria-live="polite"></div><p style="font-size:11px;margin:12px 0 0">Cada registro permanece visível por 24 horas.</p></aside>';
}
// Monta o HTML da etapa de contribuição via Pix (QR Code e botões).
function prayerDonationMarkup(kind) {
  const isCandle = kind === "vela";
  const title = isCandle ? "Sua vela está sendo preparada" : "Sua intenção está sendo processada";
  const qrImage = "imgs/pix/qr-code-pix.png";
  return '<div class="prayer-modal-layout prayer-contribution-layout">' +
    '<section class="prayer-main-panel prayer-contribution-panel">' +
      '<span class="prayer-contribution-kicker">Um gesto de fé e partilha</span>' +
      '<h2 id="modalTitle">' + title + '</h2>' +
      '<p>Quer nos ajudar com a evangelização? Faça uma doação de <strong>R$ 2,00</strong>. Esse pequeno gesto nos ajuda a continuar evangelizando.</p>' +
      '<div class="prayer-donation-qr-wrap">' +
        '<img class="prayer-donation-qr" src="' + qrImage + '" alt="QR Code ilustrativo, sem função de pagamento">' +
        '<strong>QR CODE · DEMONSTRAÇÃO</strong>' +
        '<small>Imagem ilustrativa. Não é uma chave PIX e não recebe pagamentos.</small>' +
      '</div>' +
      '<p class="prayer-donation-note">A contribuição é voluntária. Você pode confirmar sua participação mesmo sem realizar uma doação.</p>' +
      '<div class="prayer-contribution-actions">' +
        '<button type="button" class="btn outline prayer-back-button" id="prayerDonationBack">Voltar e editar</button>' +
        '<button type="button" class="btn prayer-confirm-button" id="prayerDonationConfirm">Confirmar</button>' +
      '</div>' +
    '</section>' +
    prayerActivityMarkup(kind) +
  '</div>';
}
// Mostra a etapa de contribuição (Pix) depois de preencher a vela ou a intenção.
function showPrayerContribution(kind, payload) {
  openModal(prayerDonationMarkup(kind));
  startPrayerActivityRefresh(kind);
  document.getElementById("prayerDonationBack").addEventListener("click", function() {
    showPrayer(kind, payload);
  });
  document.getElementById("prayerDonationConfirm").addEventListener("click", function() {
    const label = kind === "vela"
      ? payload.intencao
      : payload.tipo + " — " + payload.intencao;
    addPrayerActivity(kind, payload.nome, label);
    showPrayerConfirmed(kind, payload, label);
  });
}
// Mostra a confirmação: vela acesa ou intenção registrada.
function showPrayerConfirmed(kind, payload, label) {
  const isCandle = kind === "vela";
  const title = isCandle ? "Sua vela foi acesa" : "Sua intenção foi registrada";
  const summary = isCandle
    ? "Sua vela virtual foi acesa. Que esta oração seja acolhida com fé e esperança."
    : "Sua intenção foi registrada no mural de oração da comunidade.";
  openModal(
    '<div class="prayer-modal-layout prayer-confirmed-layout">' +
      '<section class="prayer-main-panel prayer-confirmed-panel">' +
        '<div class="prayer-confirmed-symbol">' + (isCandle ? "🕯️" : "🙏") + '</div>' +
        '<h2 id="modalTitle">' + title + '</h2>' +
        '<p>' + summary + '</p>' +
        '<div class="prayer-confirmed-summary"><strong>' + escapePrayerText(payload.nome) + '</strong><span>' + escapePrayerText(label) + '</span></div>' +
        '<p class="prayer-confirmed-duration">O registro ficará disponível por 24 horas.</p>' +
        '<button type="button" class="btn prayer-done-button" id="prayerDoneButton">Concluir</button>' +
      '</section>' +
      prayerActivityMarkup(kind) +
    '</div>'
  );
  startPrayerActivityRefresh(kind);
  document.getElementById("prayerDoneButton").addEventListener("click", closeModal);
}
// Abre o pop-up de oração: vela virtual, intenção de missa ou terço (conforme o tipo).
function showPrayer(type, restoreData) {
  if (type === "vela") {
    openModal('<div class="prayer-modal-layout"><section class="prayer-main-panel">' +
      '<h2 id="modalTitle">Acenda uma vela virtual</h2><p>Apresente a Deus sua intenção de oração. Escreva por quem ou por qual situação deseja rezar.</p>' +
      '<form class="modal-form" id="candleForm"><input name="nome" required maxlength="80" placeholder="Seu nome"><textarea name="intencao" required maxlength="500" placeholder="Por quem ou por qual intenção deseja rezar?"></textarea><button class="btn" type="submit">Acender vela</button></form>' +
      '<p id="candleMessage" class="prayer-form-feedback" aria-live="polite"></p></section>' +
      prayerActivityMarkup("vela") + '</div>');
    startPrayerActivityRefresh("vela");
    const candleForm = document.getElementById("candleForm");
    if (restoreData) {
      candleForm.elements.nome.value = restoreData.nome || "";
      candleForm.elements.intencao.value = restoreData.intencao || "";
    }
    candleForm.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      const payload = {
        nome: form.elements.nome.value.trim(),
        intencao: form.elements.intencao.value.trim()
      };
      showPrayerContribution("vela", payload);
    });
  } else if (type === "intencao") {
    openModal('<div class="prayer-modal-layout"><section class="prayer-main-panel">' +
      '<h2 id="modalTitle">Intenções de Santa Missa</h2><p>Registre sua intenção para que ela seja apresentada à comunidade em oração. Para efetivar um pedido específico de missa, a secretaria paroquial poderá orientar você.</p>' +
      '<form class="modal-form" id="intentionForm"><input name="solicitante" required maxlength="80" placeholder="Seu nome"><input name="intencao" required maxlength="160" placeholder="Nome ou intenção da missa"><select name="tipo"><option>Intenção geral</option><option>Em memória de falecido(a)</option><option>Pela saúde</option><option>Em ação de graças</option><option>Aniversário</option></select><button class="btn" type="submit">Depositar intenção</button></form>' +
      '<p id="intentionMessage" class="prayer-form-feedback" aria-live="polite"></p></section>' +
      prayerActivityMarkup("intencao") + '</div>');
    startPrayerActivityRefresh("intencao");
    const intentionForm = document.getElementById("intentionForm");
    if (restoreData) {
      intentionForm.elements.solicitante.value = restoreData.nome || "";
      intentionForm.elements.intencao.value = restoreData.intencao || "";
      intentionForm.elements.tipo.value = restoreData.tipo || "Intenção geral";
    }
    intentionForm.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      const payload = {
        nome: form.elements.solicitante.value.trim(),
        intencao: form.elements.intencao.value.trim(),
        tipo: form.elements.tipo.value
      };
      showPrayerContribution("intencao", payload);
    });
  } else if (type === "terco") {
    rosaryIndex = 0;
    renderRosary();
  }
}
// Estado do terço: etapas, progresso das contas e mistério do dia.
let rosarySteps = [];
let rosaryBeadProgress = {};
// DADOS — Mistérios do terço para cada dia da semana.
const rosaryMysteriesByDay = {
  0:{name:"Gloriosos",items:["A Ressurreição de Jesus","A Ascensão de Jesus","A vinda do Espírito Santo","A Assunção de Maria","A Coroação de Maria"]},
  1:{name:"Gozosos",items:["A Anunciação do Anjo","A Visitação de Maria","O Nascimento de Jesus","A Apresentação de Jesus","A Perda e o Encontro de Jesus no Templo"]},
  2:{name:"Dolorosos",items:["A Agonia de Jesus no Horto","A Flagelação de Jesus","A Coroação de Espinhos","Jesus carrega a Cruz","A Crucificação e Morte de Jesus"]},
  3:{name:"Gloriosos",items:["A Ressurreição de Jesus","A Ascensão de Jesus","A vinda do Espírito Santo","A Assunção de Maria","A Coroação de Maria"]},
  4:{name:"Luminosos",items:["O Batismo de Jesus no Jordão","As Bodas de Caná","O Anúncio do Reino de Deus","A Transfiguração de Jesus","A Instituição da Eucaristia"]},
  5:{name:"Gozosos",items:["A Anunciação do Anjo","A Visitação de Maria","O Nascimento de Jesus","A Apresentação de Jesus","A Perda e o Encontro de Jesus no Templo"]},
  6:{name:"Gloriosos",items:["A Ressurreição de Jesus","A Ascensão de Jesus","A vinda do Espírito Santo","A Assunção de Maria","A Coroação de Maria"]}
};
// Monta a sequência do terço do dia (mistérios variam conforme o dia da semana).
function buildRosarySteps() {
  const weekday = new Date().getDay();
  const mysteries = rosaryMysteriesByDay[weekday];
  const steps = [
    {title:"Sinal da Cruz",text:"Em nome do Pai, do Filho e do Espírito Santo. Amém.",kind:"prayer",caption:"Início"},
    {title:"Creio",text:"Creio em Deus Pai todo-poderoso, criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, de onde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",kind:"prayer",caption:"Profissão de fé"},
    {title:"Pai-Nosso",text:"Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",kind:"prayer",caption:"Orações iniciais"},
    {title:"Três Ave-Marias",text:"Reze três Ave-Marias, oferecendo cada uma pela fé, esperança e caridade.",kind:"beads",beads:3,caption:"Orações iniciais"},
    {title:"Glória ao Pai",text:"Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.",kind:"prayer",caption:"Orações iniciais"}
  ];
  mysteries.items.forEach((mystery,index) => {
    steps.push({title:`${index+1}º Mistério ${mysteries.name}`,text:mystery,kind:"mystery",caption:`Meditação ${index+1} de 5`});
    steps.push({title:"Pai-Nosso",text:"Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",kind:"prayer",caption:`${index+1}º mistério`});
    steps.push({title:"Dez Ave-Marias",text:"A cada conta, reze uma Ave-Maria meditando o mistério anunciado.",kind:"beads",beads:10,caption:`${index+1}º mistério`});
    steps.push({title:"Glória ao Pai",text:"Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.",kind:"prayer",caption:`${index+1}º mistério`});
    steps.push({title:"Jaculatória",text:"Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno; levai as almas todas para o céu e socorrei principalmente as que mais precisarem.",kind:"prayer",caption:`Conclusão do ${index+1}º mistério`});
  });
  steps.push({title:"Salve-Rainha",text:"Salve, Rainha, mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.",kind:"prayer",caption:"Encerramento"});
  return {steps,mysteryName:mysteries.name};
}
let rosaryMysteryName = "";
// Desenha a etapa atual do terço: texto, contas, progresso e botões de navegação/áudio.
function renderRosary() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (!rosarySteps.length) {
    const built = buildRosarySteps();
    rosarySteps = built.steps;
    rosaryMysteryName = built.mysteryName;
    rosaryBeadProgress = {};
  }
  const step = rosarySteps[rosaryIndex];
  const beadProgress = rosaryBeadProgress[rosaryIndex] || 0;
  const progress = Math.round(((rosaryIndex + (step.kind === "beads" ? beadProgress / step.beads : 0)) / rosarySteps.length) * 100);
  const beads = step.kind === "beads"
    ? `<div class="rosary-beads" aria-label="Contas da oração">${Array.from({length:step.beads},(_,i)=>`<button type="button" class="rosary-bead${i < beadProgress ? " completed" : ""}" data-rosary-bead="${i+1}" aria-label="Conta ${i+1} de ${step.beads}" aria-pressed="${i < beadProgress ? "true" : "false"}"></button>`).join("")}</div><p class="rosary-bead-status">${beadProgress} de ${step.beads} contas concluídas</p>`
    : "";
  const nextDisabled = step.kind === "beads" && beadProgress < step.beads;
  openModal(`<div class="rosary-modal">
    <span class="pastoral-modal-kicker">Oração guiada</span>
    <h2 id="modalTitle">Terço virtual</h2>
    <p class="rosary-intro">Mistérios ${rosaryMysteryName} de hoje · avance no seu ritmo, acompanhando cada oração.</p>
    <div class="rosary-progress-track"><span style="width:${progress}%"></span></div>
    <div class="rosary-progress-meta"><span>Etapa ${rosaryIndex+1} de ${rosarySteps.length}</span><strong>${progress}%</strong></div>
    <article class="rosary-step rosary-step-enhanced">
      <small>${step.caption}</small><h3>${step.title}</h3><p>${step.text}</p>
      <div class="rosary-audio-controls">
        <button class="rosary-audio-button" type="button" id="readRosaryStep">🔊 Ouvir esta etapa</button>
        <button class="rosary-audio-stop" type="button" id="stopRosaryAudio">Parar áudio</button>
      </div>
      ${beads}
    </article>
    <div class="rosary-navigation">
      <button class="btn outline" type="button" id="previousRosary" ${rosaryIndex===0?"disabled":""}>← Anterior</button>
      <button class="btn" type="button" id="nextRosary" ${nextDisabled?"disabled":""}>${rosaryIndex===rosarySteps.length-1?"Concluir oração":"Próxima etapa →"}</button>
    </div>
    <p class="rosary-help" id="rosaryHelp" aria-live="polite">${nextDisabled?"Toque nas contas para acompanhar cada Ave-Maria e liberar a próxima etapa.":"Você pode voltar ou avançar pelas etapas a qualquer momento."}</p>
  </div>`);
  const readStepButton = document.getElementById("readRosaryStep");
  const stopAudioButton = document.getElementById("stopRosaryAudio");
  readStepButton.addEventListener("click", () => {
    const help = document.getElementById("rosaryHelp");
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      help.textContent = "A narração não está disponível neste navegador. Tente abrir o site em outro navegador.";
      return;
    }
    window.speechSynthesis.cancel();
    const narration = new SpeechSynthesisUtterance(`${step.caption}. ${step.title}. ${step.text}`);
    narration.lang = "pt-BR";
    narration.rate = 0.9;
    narration.pitch = 1;
    narration.onstart = () => { readStepButton.textContent = "🔊 Reproduzindo..."; help.textContent = "Ouça a oração desta etapa. Você pode parar o áudio quando desejar."; };
    narration.onend = () => { readStepButton.textContent = "🔊 Ouvir esta etapa"; help.textContent = "Narração concluída. Você pode ouvir novamente ou seguir para a próxima etapa."; };
    narration.onerror = () => { readStepButton.textContent = "🔊 Ouvir esta etapa"; help.textContent = "Não foi possível reproduzir a narração. Tente novamente."; };
    window.speechSynthesis.speak(narration);
  });
  stopAudioButton.addEventListener("click", () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    readStepButton.textContent = "🔊 Ouvir esta etapa";
    document.getElementById("rosaryHelp").textContent = "Áudio interrompido. Você pode ouvir novamente quando desejar.";
  });
  modalContent.querySelectorAll("[data-rosary-bead]").forEach(bead => {
    bead.addEventListener("click", () => {
      const value = Number(bead.dataset.rosaryBead);
      const current = rosaryBeadProgress[rosaryIndex] || 0;
      rosaryBeadProgress[rosaryIndex] = value <= current ? value - 1 : value;
      renderRosary();
    });
  });
  document.getElementById("previousRosary").addEventListener("click", () => {
    if (rosaryIndex > 0) rosaryIndex--;
    renderRosary();
  });
  document.getElementById("nextRosary").addEventListener("click", () => {
    if (nextDisabled) return;
    if (rosaryIndex === rosarySteps.length - 1) {
      closeModal();
      rosaryIndex = 0;
      rosarySteps = [];
      rosaryBeadProgress = {};
      return;
    }
    rosaryIndex++;
    renderRosary();
  });
}
// Abre o pop-up "Seja Dizimista" com o formulário de interesse e o QR Code.
function showTithe() {
  const communityOptions = communities.map(c => `<option value="${c.name}">${c.name}</option>`).join("");
  openModal(`
    <div class="tithe-modal-layout">
      <span class="pastoral-modal-kicker">Dízimo e contribuição</span>
      <h2 id="modalTitle">Seja dizimista</h2>
      <p class="tithe-modal-intro">Sua contribuição ajuda a manter a missão evangelizadora, as celebrações e as atividades da nossa paróquia. Obrigado por caminhar conosco.</p>
      <div class="tithe-modal-grid">
        <section class="tithe-donation-panel">
          <h3>Faça uma doação</h3>
          <p>Em breve, você poderá contribuir também pelo PIX.</p>
          <div class="tithe-qr-placeholder" role="img" aria-label="Espaço reservado para o QR Code oficial de doação">
            <div class="tithe-qr-mark" aria-hidden="true">▦</div>
            <strong>QR Code PIX</strong>
            <span>Espaço reservado ao código oficial da paróquia</span>
          </div>
          <small class="tithe-qr-note">O QR Code será inserido após a confirmação da chave PIX oficial.</small>
        </section>
        <section class="tithe-interest-panel">
          <h3>Manifeste seu interesse</h3>
          <p>Preencha seus dados e fale diretamente com a secretaria pelo WhatsApp.</p>
          <form id="titheInterestForm" class="tithe-interest-form">
            <label>Nome completo<input name="nome" type="text" placeholder="Como podemos chamar você?" required></label>
            <label>Telefone<input name="telefone" type="tel" placeholder="(11) 99999-9999" required></label>
            <fieldset class="tithe-community-field">
              <legend>Você já participa de alguma comunidade da paróquia?</legend>
              <label><input type="radio" name="participa" value="Sim" required> Sim</label>
              <label><input type="radio" name="participa" value="Não"> Não</label>
            </fieldset>
            <label id="titheCommunitySelectWrap" class="tithe-community-select" hidden>
              Qual comunidade?
              <select name="comunidade">
                <option value="">Selecione sua comunidade</option>
                ${communityOptions}
              </select>
            </label>
            <button class="btn gold" type="submit">Manifestar interesse</button>
          </form>
          <p class="tithe-submit-note" id="titheMessage" aria-live="polite" role="status"></p>
        </section>
      </div>
    </div>`);

  const form = document.getElementById("titheInterestForm");
  const communityWrap = document.getElementById("titheCommunitySelectWrap");
  const communitySelect = communityWrap.querySelector("select");
  form.querySelectorAll('input[name="participa"]').forEach(radio => {
    radio.addEventListener("change", () => {
      const show = radio.checked && radio.value === "Sim";
      if (show) {
        communityWrap.hidden = false;
        communitySelect.required = true;
      } else if (radio.checked) {
        communityWrap.hidden = true;
        communitySelect.required = false;
        communitySelect.value = "";
      }
    });
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("nome") || "").trim();
    const phone = String(data.get("telefone") || "").trim();
    const member = String(data.get("participa") || "Não");
    const community = member === "Sim" ? String(data.get("comunidade") || "") : "Ainda não participa de uma comunidade";
    const message = [
      "Olá! Gostaria de manifestar meu interesse pelo dízimo da Paróquia São Paulo Apóstolo.",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Já participa de uma comunidade: ${member}`,
      `Comunidade: ${community}`
    ].join("\n");
    document.getElementById("titheMessage").textContent =
      "Abriremos o WhatsApp da secretaria para você revisar e enviar sua mensagem.";
    const url = "https://wa.me/551146767007?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
  });
}

// Abre o pop-up "Falar com a secretaria" (envia a mensagem pelo WhatsApp).
function showSecretaryModal() {
  openModal(`
    <div class="secretary-whatsapp-modal">
      <span class="pastoral-modal-kicker">Atendimento paroquial</span>
      <h2 id="modalTitle">Falar com a secretaria</h2>
      <p class="secretary-modal-intro">Preencha os dados abaixo. O WhatsApp da paróquia abrirá com sua mensagem pronta para revisão e envio.</p>
      <form id="secretaryWhatsappForm" class="secretary-whatsapp-form">
        <label>Qual é o seu nome?
          <input name="nome" type="text" placeholder="Digite seu nome completo" autocomplete="name" required>
        </label>
        <label>Motivo do contato?
          <select name="motivo" required>
            <option value="">Selecione o motivo</option>
            <option>Informações sobre missas e horários</option>
            <option>Batismo e outros sacramentos</option>
            <option>Casamento e documentação</option>
            <option>Catequese e Crisma</option>
            <option>Pastorais e comunidades</option>
            <option>Dízimo e doações</option>
            <option>Agendamento ou atendimento na secretaria</option>
            <option>Outro assunto</option>
          </select>
        </label>
        <label>Mensagem
          <textarea name="mensagem" rows="5" placeholder="Escreva como podemos ajudar..." required></textarea>
        </label>
        <button class="btn gold" type="submit">Continuar pelo WhatsApp</button>
        <p class="secretary-modal-note" id="secretaryWhatsappFeedback" role="status" aria-live="polite">Você poderá revisar a mensagem antes de enviá-la.</p>
      </form>
    </div>`);

  const form = document.getElementById("secretaryWhatsappForm");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("nome") || "").trim();
    const reason = String(data.get("motivo") || "").trim();
    const message = String(data.get("mensagem") || "").trim();
    const whatsappText = [
      "Olá! Gostaria de falar com a Secretaria da Paróquia São Paulo Apóstolo.",
      "",
      "Nome: " + name,
      "Motivo do contato: " + reason,
      "Mensagem: " + message
    ].join("\n");
    const url = "https://wa.me/551146767007?text=" + encodeURIComponent(whatsappText);
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null; else window.location.href = url;
    const feedback = document.getElementById("secretaryWhatsappFeedback");
    if (feedback) feedback.textContent = "O WhatsApp foi aberto com sua mensagem preenchida. Revise e toque em Enviar.";
  });
}

// Abre o pop-up "Ajude-nos a evangelizar" com as informações para contribuição.
function showSupport() {
  openModal(`<h2 id="modalTitle">Ajude-nos a evangelizar</h2><p>As informações para contribuição devem ser preenchidas com a chave PIX e o QR Code oficiais da paróquia.</p><div class="info-box"><b>Contribuição via PIX</b><span>Chave PIX e QR Code oficial a cadastrar.</span></div>`);
}
// Inicialização do site: desenha os cards e liga todos os cliques, teclas e formulários.
function init() {
  if (!document.getElementById("siteMain")) return;
  // Desenha os cards das comunidades
  renderCommunities();
  // Mostra o primeiro sacramento (Batismo) por padrão
  renderSacrament(0);
  // Troca o sacramento ao clicar nas abas
  document.querySelector('.sacrament-tabs').addEventListener('click',e=>{const t=e.target.closest('[data-sacrament]');if(t)renderSacrament(Number(t.dataset.sacrament));});
  // Desenha os cards das pastorais
  renderPastorals();
  // Desenha a agenda e a lista de materiais
  renderAgenda();
  // Escreve o ano atual no rodapé
  document.getElementById("year").textContent = new Date().getFullYear();
  // Botão "Todas as notícias"
  document.getElementById("allNewsButton").addEventListener("click", showAllNews);
  // Clique em "Ler a notícia" abre a notícia completa
  document.getElementById("newsGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-news]");
    if (button) showNewsArticle(Number(button.dataset.news));
  });

  // Botão "Calendário completo"
  document.getElementById("fullCalendarBtn").addEventListener("click", showFullCalendar);
  // Clique num evento da agenda abre os detalhes
  document.getElementById("agendaGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-event]");
    if (button) showEvent(Number(button.dataset.event));
  });
  // Clique num card de comunidade abre os detalhes
  document.getElementById("communityGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-community]");
    if (button) showCommunity(Number(button.dataset.community));
  });
  // Clique num card de pastoral abre os detalhes
  document.getElementById("pastoralGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-pastoral]");
    if (button) showPastoral(Number(button.dataset.pastoral));
  });
  // Cliques nos botões com data-open abrem o pop-up correspondente (vela, intenção, terço, dízimo, apoio, vídeo, secretaria)
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    const type = button.dataset.open;
    if (["vela","intencao","terco"].includes(type)) showPrayer(type);
    else if (type === "dizimo") showTithe();
    else if (type === "apoio") showSupport();
    else if (type === "video") showVideoNotice();
    else if (type === "secretaria") showSecretaryModal();
  });
  // Botão × fecha o pop-up
  document.getElementById("modalClose").addEventListener("click", closeModal);
  // Clicar no fundo escuro fecha o pop-up
  modalBackdrop.addEventListener("click", e => { if (e.target === modalBackdrop) closeModal(); });
  // Tecla ESC fecha o pop-up
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modalBackdrop.classList.contains("show")) closeModal(); });
  // Formulário "Faça parte da nossa missão": envia o interesse pelo WhatsApp da secretaria
  document.getElementById("joinForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      "Olá! Gostaria de manifestar interesse em participar de uma pastoral da Paróquia São Paulo Apóstolo.",
      "",
      "Nome: " + String(f.get("nome") || "").trim(),
      "Telefone: " + String(f.get("telefone") || "").trim(),
      "Pastoral: " + String(f.get("pastoral") || "").trim(),
      "Mensagem: " + String(f.get("mensagem") || "").trim()
    ].join("\n");
    const url = "https://wa.me/551146767007?text=" + encodeURIComponent(msg);
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null; else window.location.href = url;
    e.currentTarget.reset();
  });
}
// Inicia o site quando o HTML terminou de carregar
document.addEventListener("DOMContentLoaded", init);

/* ==========================================================================
   [02] GALERIA DE MOMENTOS — VISUALIZADOR
   Ao clicar numa foto da galeria abre a imagem grande, com setas (botões e teclado), ESC para fechar e clique fora para sair.
   ========================================================================== */
try {
(()=>{const cards=[...document.querySelectorAll('.gallery-grid .gallery-item')],modal=document.getElementById('moment-gallery-viewer'),img=document.getElementById('moment-gallery-full-image'),cap=document.getElementById('moment-gallery-full-caption');if(!modal||!cards.length)return;let idx=0;
function show(n){idx=(n+cards.length)%cards.length;const c=cards[idx],im=c.querySelector('img');img.src=im.currentSrc||im.src;img.alt=im.alt||'';cap.textContent=c.querySelector('span')?.textContent||im.alt||'';}
function open(n){show(n);modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function close(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';img.removeAttribute('src');}
cards.forEach((c,i)=>c.addEventListener('click',e=>{e.preventDefault();open(i)}));
modal.querySelector('.moment-gallery-close').addEventListener('click',close);
modal.querySelector('.moment-gallery-prev').addEventListener('click',()=>show(idx-1));
modal.querySelector('.moment-gallery-next').addEventListener('click',()=>show(idx+1));
modal.addEventListener('click',e=>{if(e.target===modal)close()});
document.addEventListener('keydown',e=>{if(!modal.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
})();
} catch (erro) {
  console.error('[Erro no módulo 02 - GALERIA DE MOMENTOS — VISUALIZADOR]', erro);
}

/* ==========================================================================
   [03] WHATSAPP, MATERIAIS E CONTATO
   Cria o botão flutuante do WhatsApp, baixa os materiais da agenda e envia o formulário de contato para o WhatsApp da secretaria.
   ========================================================================== */
try {
(function(){
if(!document.querySelector('.whatsapp-float')){
  const w=document.createElement('button');
  w.type='button';
  w.className='whatsapp-float';
  w.dataset.open='secretaria';
  w.title='Fale com a secretaria pelo WhatsApp';
  w.setAttribute('aria-label','Fale com a secretaria pelo WhatsApp');
  w.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.44 2.13 11.9c0 1.75.46 3.46 1.33 4.96L2 22l5.29-1.39a9.93 9.93 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02A9.84 9.84 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.52 3.69-8.2 8.22-8.2 2.19 0 4.25.85 5.8 2.4a8.16 8.16 0 0 1 2.4 5.8c0 4.53-3.68 8.23-8.17 8.23zm4.51-6.16c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-.1-.95-.95-1.6-1.94-1.79-2.28-.19-.33-.02-.51.14-.68.14-.14.31-.37.47-.55.16-.19.21-.33.31-.55.1-.21.05-.4-.03-.56-.08-.16-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29z"/></svg>`;
  document.body.appendChild(w);
}
document.addEventListener('click',function(e){
  const b=e.target.closest('[data-material-download]');
  if(!b)return;
  const n=Number(b.dataset.materialDownload);
  const t=(window.parishMaterials||[])[n]?.title||('Material paroquial '+(n+1));
  const content=["PARÓQUIA SÃO PAULO APÓSTOLO","",t,"","Material de apoio paroquial."].join("\n");
  const blob=new Blob([content],{type:'text/plain;charset=utf-8'});
  const u=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=u;a.download='material-paroquial-'+(n+1)+'.txt';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(u),1000);
});
const f=document.getElementById('parishContactForm');
if(f)f.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(f);
  const message=[
    "Olá! Gostaria de falar com a Secretaria da Paróquia São Paulo Apóstolo.",
    "",
    "Nome: "+String(data.get("nome")||"").trim(),
    "Telefone: "+String(data.get("telefone")||"").trim(),
    "Motivo do contato: "+String(data.get("motivo")||"").trim(),
    "Mensagem: "+String(data.get("mensagem")||"").trim()
  ].join("\n");
  const url="https://wa.me/551146767007?text="+encodeURIComponent(message);
  const tab=window.open(url,"_blank");
  if(tab)tab.opener=null;else window.location.href=url;
  const feedback=document.getElementById('contactFeedback');
  if(feedback)feedback.textContent='O WhatsApp abriu com sua mensagem preenchida. Revise e toque em Enviar.';
});
})();
} catch (erro) {
  console.error('[Erro no módulo 03 - WHATSAPP, MATERIAIS E CONTATO]', erro);
}

/* ==========================================================================
   [04] MELHORIAS DE EXPERIÊNCIA
   Menu mobile, animação de entrada ao rolar, cabeçalho dinâmico + barra de progresso, carrossel de notícias e efeito ao clicar nos botões.
   ========================================================================== */
try {
(function(){
  // Fecha o menu mobile e remove o fundo escurecido.
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
  // Liga o botão hambúrguer: abre/fecha o menu no celular e fecha ao clicar fora ou num link.
  function initMobileNavigation(){
    const nav=document.getElementById("navLinks");
    const toggle=document.getElementById("menuToggle");
    if(!nav||!toggle||toggle.dataset.enhanced==="true")return;
    const header=document.querySelector("header.topbar");
    function syncMobileNavPosition(){
      if(!header)return;
      const headerRect=header.getBoundingClientRect();
      const top=Math.max(0,Math.min(window.innerHeight-44,Math.round(headerRect.bottom)));
      document.documentElement.style.setProperty("--mobile-nav-top",top+"px");
    }
    syncMobileNavPosition();
    window.addEventListener("resize",syncMobileNavPosition);
    window.addEventListener("scroll",syncMobileNavPosition,{passive:true});
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
        syncMobileNavPosition();
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
  // Faz seções e cards aparecerem suavemente quando entram na tela.
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
  // Muda o cabeçalho ao rolar e atualiza a barra de progresso de leitura no topo.
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
  // Carrossel de notícias: setas, bolinhas e rolagem em loop.
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

    // Mede o tamanho dos cards do carrossel.
    function measure(){
      const card=track.querySelector(".news-card");
      if(!card)return;
      const style=getComputedStyle(track);
      const gap=parseFloat(style.columnGap||style.gap)||0;
      step=card.getBoundingClientRect().width+gap;
      track.scrollLeft=step*(current+1);
    }
    // Marca a bolinha do card atual.
    function setDots(index){
      dotButtons.forEach((dot,i)=>dot.classList.toggle("is-active",i===index));
    }
    // Reposiciona o carrossel ao final do movimento para o efeito de loop.
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
    // Vai até o card indicado.
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
  // Efeito visual ao pressionar e clicar nos botões.
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
  // Liga todas as melhorias de experiência acima.
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
} catch (erro) {
  console.error('[Erro no módulo 04 - MELHORIAS DE EXPERIÊNCIA]', erro);
}

/* ==========================================================================
   [05] RÁDIO CATÓLICA
   Player de rádio ao vivo: abre/fecha o painel, troca de emissora, play/pause, volume e link para o player oficial quando não há stream direto.
   ========================================================================== */
try {
(function(){
  // Liga o player de rádio: painel, emissoras, play/pause, próxima rádio e volume.
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

    // Alinha o painel da rádio à borda direita da faixa de missas.
    function alignRightEdge(){
      if(window.matchMedia("(max-width: 860px)").matches){widget.style.right="";return;}
      if(!headerCta)return;
      const ribbonRect=inner.getBoundingClientRect();
      const ctaRect=headerCta.getBoundingClientRect();
      widget.style.right=Math.max(0,Math.round(ribbonRect.right-ctaRect.right))+"px";
    }
    // Abre ou fecha o painel do player de rádio.
    function setPanel(open){
      panel.hidden=!open;
      toggle.setAttribute("aria-expanded",String(open));
      toggle.setAttribute("aria-label",open?"Fechar rádio":"Ouvir rádio");
      toggle.title=open?"Fechar controles de rádio":"Ouvir rádio católica";
    }
    // Troca de emissora (e toca, se pedido), atualizando nome, status e link oficial.
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
} catch (erro) {
  console.error('[Erro no módulo 05 - RÁDIO CATÓLICA]', erro);
}

/* ==========================================================================
   [08] RECURSOS EXTRAS
   Inscrição nos sacramentos (envio por WhatsApp), paginação dos aniversariantes e alternador dos botões flutuantes no rodapé.
   ========================================================================== */
try {
(function(){
const modal=document.getElementById('enrollmentModal'),form=document.getElementById('enrollForm'),sel=document.getElementById('enrollSacramento');
if(!modal||!form||!sel)return;
function openEnroll(type){sel.value=type;document.getElementById('enrollTitle').textContent='Inscrição — '+type;modal.classList.add('show');}
const sacramentFeature=document.getElementById('sacramentFeature');
if(sacramentFeature)sacramentFeature.addEventListener('click',e=>{const b=e.target.closest('[data-enroll]');if(b)openEnroll(b.dataset.enroll)});
const monthName=new Intl.DateTimeFormat('pt-BR',{month:'long'}).format(new Date());const monthCap=monthName.charAt(0).toUpperCase()+monthName.slice(1);const monthTitle=document.getElementById('birthdayMonthTitle'),monthTag=document.getElementById('birthdayMonthTag');if(monthTitle)monthTitle.textContent='Aniversariantes de '+monthCap;if(monthTag)monthTag.textContent=monthCap.toUpperCase();
const birthdayItems=[...document.querySelectorAll('.birthday-person')];let birthdayOffset=0;const birthdayNext=document.getElementById('birthdayNext');function showBirthdayPage(){birthdayItems.forEach((item)=>item.style.display='flex');}if(birthdayNext){birthdayNext.addEventListener('click',()=>{birthdayOffset=birthdayOffset+4>=birthdayItems.length?0:birthdayOffset+4;showBirthdayPage();});showBirthdayPage();}
document.getElementById('closeEnroll').onclick=()=>modal.classList.remove('show');modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=['INSCRIÇÃO PAROQUIAL — '+d.get('sacramento'),'Nome: '+d.get('nome'),'Nascimento: '+d.get('nascimento'),'Endereço: '+d.get('endereco'),'Telefone: '+d.get('telefone'),'Responsável: '+(d.get('responsavel')||'Não informado'),'Telefone responsável: '+(d.get('telResponsavel')||'Não informado'),'E-mail: '+(d.get('email')||'Não informado'),'Observações: '+(d.get('observacoes')||'')].join('\n');window.open('https://wa.me/551146767007?text='+encodeURIComponent(msg),'_blank');});
const footer=document.querySelector('footer');if(footer){const label=document.createElement('label');label.className='footer-floating-toggle';label.innerHTML='<input type="checkbox" id="hideFloatingControls"> Ocultar botões flutuantes de WhatsApp e rádio';const copyright=footer.querySelector('.copyright');(copyright||footer).appendChild(label);const check=label.querySelector('input');function apply(){document.body.classList.toggle('hide-parish-floats',check.checked);document.querySelectorAll('.whatsapp-float,.radio-float,.radio-player-float,#radioFloatButton,#radioMiniWidget,.radio-mini-widget,.radio-mini-toggle').forEach(el=>el.style.display=check.checked?'none':'');localStorage.setItem('hideParishFloat',''+check.checked)}check.checked=localStorage.getItem('hideParishFloat')==='true';apply();check.addEventListener('change',apply);}
})();
} catch (erro) {
  console.error('[Erro no módulo 08 - RECURSOS EXTRAS]', erro);
}

/* ==========================================================================
   [09] ANIVERSARIANTES — SETAS DE ROLAGEM
   Botões subir/descer que rolam a lista de aniversariantes.
   ========================================================================== */
try {
(()=>{const list=document.getElementById('birthdayList'),up=document.getElementById('birthdayUp'),down=document.getElementById('birthdayDown');if(!list||!up||!down)return;up.addEventListener('click',()=>list.scrollBy({top:-Math.max(100,list.clientHeight*.65),behavior:'smooth'}));down.addEventListener('click',()=>list.scrollBy({top:Math.max(100,list.clientHeight*.65),behavior:'smooth'}));})();
} catch (erro) {
  console.error('[Erro no módulo 09 - ANIVERSARIANTES — SETAS DE ROLAGEM]', erro);
}

/* ==========================================================================
   [10] ANIVERSARIANTES — 7 POR PÁGINA
   Mostra os aniversariantes de 7 em 7, com botões para navegar entre as páginas.
   ========================================================================== */
try {
document.addEventListener('DOMContentLoaded',()=>{
 const list=document.querySelector('#birthdayList');if(!list)return;
 const people=[...list.querySelectorAll('.birthday-person')],perPage=7;let page=0;
 const pager=document.createElement('div');pager.className='birthday-pager';pager.innerHTML='<button type="button" aria-label="Aniversariantes anteriores">↑</button><button type="button" aria-label="Próximos aniversariantes">↓</button>';
 if(people.length>perPage)list.parentElement.appendChild(pager);
 const buttons=pager.querySelectorAll('button');
 function render(){people.forEach((el,i)=>el.classList.toggle('bday-visible',i>=page*perPage&&i<(page+1)*perPage));buttons[0].disabled=page===0;buttons[1].disabled=(page+1)*perPage>=people.length;}
 buttons[0].onclick=()=>{page=Math.max(0,page-1);render()};buttons[1].onclick=()=>{if((page+1)*perPage<people.length)page++;render()};render();
});
} catch (erro) {
  console.error('[Erro no módulo 10 - ANIVERSARIANTES — 7 POR PÁGINA]', erro);
}

