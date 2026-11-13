/* ============================================================
   js/04-oracao.js
   REZE CONOSCO: vela virtual, intenção de missa (com contagem de 24h salva no navegador) e terço guiado.
   ============================================================ */
"use strict";

// Chave do localStorage onde ficam as velas/intenções das últimas 24h (somente neste navegador).
const PRAYER_ACTIVITY_KEY = "paroquia_sao_paulo_atividade_oracao_v1";
// Quanto tempo uma vela/intenção fica listada: 24 horas em milissegundos.
const PRAYER_ACTIVITY_DURATION = 24 * 60 * 60 * 1000; // 24 horas
// Temporizador que atualiza a contagem regressiva do painel de atividade.
let prayerActivityTimer = null;

// Lê as atividades salvas, descarta as expiradas e devolve apenas as ativas.
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
// Registra uma nova vela/intenção (com nome, texto e hora de expiração) no localStorage.
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
// Escapa caracteres HTML do texto digitado, evitando injeção de código na lista.
function escapePrayerText(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(char) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
  });
}
// Converte milissegundos restantes em texto de contagem regressiva.
function formatPrayerCountdown(milliseconds) {
  // Separa o tempo restante em horas, minutos e segundos.
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  if (hours > 0) return hours + " h " + String(minutes).padStart(2, "0") + " min";
  return minutes + " min " + String(rest).padStart(2, "0") + " s";
}
// Atualiza o painel de atividade (contador e lista) para velas ou intenções.
function renderPrayerActivity(kind) {
  // Elementos do painel (podem não existir se o modal já foi fechado).
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
// Inicia a atualização periódica do painel de atividade.
function startPrayerActivityRefresh(kind) {
  if (prayerActivityTimer) clearInterval(prayerActivityTimer);
  renderPrayerActivity(kind);
  prayerActivityTimer = setInterval(function() { renderPrayerActivity(kind); }, 1000);
}
// HTML do painel lateral "Velas acesas / Intenções nas últimas 24 horas".
function prayerActivityMarkup(kind) {
  const title = kind === "vela" ? "Velas acesas no último dia" : "Intenções nas últimas 24 horas";
  return '<aside class="prayer-activity-panel"><div class="prayer-activity-head"><h3>' + title + '</h3><span class="prayer-activity-count" id="prayerActivityCount">0</span></div><div class="prayer-activity-list" id="prayerActivityList" aria-live="polite"></div><p style="font-size:11px;margin:12px 0 0">Cada registro permanece visível por 24 horas.</p></aside>';
}
// HTML da etapa de contribuição (QR Code PIX de exemplo) mostrada antes de confirmar vela/intenção.
function prayerDonationMarkup(kind) {
  const isCandle = kind === "vela";
  const title = isCandle ? "Sua vela está sendo preparada" : "Sua intenção está sendo processada";
  // QR Code PIX de EXEMPLO (assets/img/qr-pix-exemplo.png): trocar pelo QR oficial da paróquia.
  const qrImage = "assets/img/qr-pix-exemplo.png";
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
// Mostra a etapa de contribuição e, ao confirmar, registra a atividade.
function showPrayerContribution(kind, payload) {
  openModal(prayerDonationMarkup(kind));
  startPrayerActivityRefresh(kind);
  // Botão "Voltar": retorna ao formulário preservando o que foi digitado.
  document.getElementById("prayerDonationBack").addEventListener("click", function() {
    showPrayer(kind, payload);
  });
  // Botão de confirmar: registra a vela/intenção na lista das últimas 24h (não há cobrança real).
  document.getElementById("prayerDonationConfirm").addEventListener("click", function() {
    const label = kind === "vela"
      ? payload.intencao
      : payload.tipo + " — " + payload.intencao;
    addPrayerActivity(kind, payload.nome, label);
    showPrayerConfirmed(kind, payload, label);
  });
}
// Mostra a tela de confirmação após acender a vela ou enviar a intenção.
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
// Abre o fluxo de oração: "vela" (vela virtual), "intencao" (intenção de missa) ou "terco" (terço).
function showPrayer(type, restoreData) {
  // VELA VIRTUAL: formulário com nome e intenção.
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
  // INTENÇÃO DE MISSA: formulário com tipo de intenção e texto.
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
  // TERÇO VIRTUAL: reinicia o progresso e mostra o primeiro passo.
  } else if (type === "terco") {
    rosaryIndex = 0;
    renderRosary();
  }
}
// Lista de passos do terço do dia (montada por buildRosarySteps).
let rosarySteps = [];
// Quantas contas já foram rezadas em cada passo.
let rosaryBeadProgress = {};
// Mistérios do terço por dia da semana (0 = domingo).
const rosaryMysteriesByDay = {
  0:{name:"Gloriosos",items:["A Ressurreição de Jesus","A Ascensão de Jesus","A vinda do Espírito Santo","A Assunção de Maria","A Coroação de Maria"]},
  1:{name:"Gozosos",items:["A Anunciação do Anjo","A Visitação de Maria","O Nascimento de Jesus","A Apresentação de Jesus","A Perda e o Encontro de Jesus no Templo"]},
  2:{name:"Dolorosos",items:["A Agonia de Jesus no Horto","A Flagelação de Jesus","A Coroação de Espinhos","Jesus carrega a Cruz","A Crucificação e Morte de Jesus"]},
  3:{name:"Gloriosos",items:["A Ressurreição de Jesus","A Ascensão de Jesus","A vinda do Espírito Santo","A Assunção de Maria","A Coroação de Maria"]},
  4:{name:"Luminosos",items:["O Batismo de Jesus no Jordão","As Bodas de Caná","O Anúncio do Reino de Deus","A Transfiguração de Jesus","A Instituição da Eucaristia"]},
  5:{name:"Gozosos",items:["A Anunciação do Anjo","A Visitação de Maria","O Nascimento de Jesus","A Apresentação de Jesus","A Perda e o Encontro de Jesus no Templo"]},
  6:{name:"Gloriosos",items:["A Ressurreição de Jesus","A Ascensão de Jesus","A vinda do Espírito Santo","A Assunção de Maria","A Coroação de Maria"]}
};
// Monta a sequência completa do terço (orações iniciais, 5 dezenas e finais) conforme o dia da semana.
function buildRosarySteps() {
  // Mistérios do dia conforme o dia da semana.
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
// Nome do mistério do dia exibido no terço.
let rosaryMysteryName = "";
// Desenha o passo atual do terço (texto, contas, progresso e botões, incluindo leitura em voz).
function renderRosary() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (!rosarySteps.length) {
    const built = buildRosarySteps();
    rosarySteps = built.steps;
    rosaryMysteryName = built.mysteryName;
    rosaryBeadProgress = {};
  }
  // Passo atual do terço, contas já rezadas e porcentagem de progresso.
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
  // Botões de leitura em voz do passo atual (ouvir/parar).
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
  // Contas do terço: cada clique marca uma conta rezada.
  modalContent.querySelectorAll("[data-rosary-bead]").forEach(bead => {
    bead.addEventListener("click", () => {
      const value = Number(bead.dataset.rosaryBead);
      const current = rosaryBeadProgress[rosaryIndex] || 0;
      rosaryBeadProgress[rosaryIndex] = value <= current ? value - 1 : value;
      renderRosary();
    });
  });
  // Navegação entre os passos (anterior/próximo; "próximo" só habilita após completar as contas).
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
