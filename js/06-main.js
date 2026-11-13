/* ============================================================
   js/06-main.js
   INICIALIZAÇÃO: renderiza as seções dinâmicas e registra os eventos globais após o carregamento do DOM.
   ============================================================ */
"use strict";

// Inicialização do site: renderiza as seções dinâmicas e registra todos os eventos globais.
function init() {
  // Renderização das seções geradas por JavaScript.
  renderCommunities();
  renderSacrament(0);
  document.querySelector('.sacrament-tabs').addEventListener('click',e=>{const t=e.target.closest('[data-sacrament]');if(t)renderSacrament(Number(t.dataset.sacrament));});
  renderPastorals();
  renderAgenda();
  // Ano atual no rodapé.
  document.getElementById("year").textContent = new Date().getFullYear();
  // Botão "Todas as notícias" e cliques nos botões "Ler a notícia".
  document.getElementById("allNewsButton").addEventListener("click", showAllNews);
  document.getElementById("newsGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-news]");
    if (button) showNewsArticle(Number(button.dataset.news));
  });

  // Calendário completo e cliques nos cards (agenda, comunidades e pastorais).
  document.getElementById("fullCalendarBtn").addEventListener("click", showFullCalendar);
  document.getElementById("agendaGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-event]");
    if (button) showEvent(Number(button.dataset.event));
  });
  document.getElementById("communityGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-community]");
    if (button) showCommunity(Number(button.dataset.community));
  });
  document.getElementById("pastoralGrid").addEventListener("click", e => {
    const button = e.target.closest("[data-pastoral]");
    if (button) showPastoral(Number(button.dataset.pastoral));
  });
  // Delegação global: [data-saint-story] abre o santo do dia; [data-open] abre os modais (vela, intenção, terço, dízimo, apoio, vídeo, secretaria).
  document.addEventListener("click", event => {
    const saintButton = event.target.closest("[data-saint-story]");
    if (saintButton) { showSaintStory(); return; }
    const button = event.target.closest("[data-open]");
    if (!button) return;
    const type = button.dataset.open;
    if (["vela","intencao","terco"].includes(type)) showPrayer(type);
    else if (type === "dizimo") showTithe();
    else if (type === "apoio") showSupport();
    else if (type === "video") showVideoNotice();
    else if (type === "secretaria") showSecretaryModal();
  });
  // Fechamento do modal: botão ×, clique no fundo e tecla ESC.
  document.getElementById("modalClose").addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", e => { if (e.target === modalBackdrop) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modalBackdrop.classList.contains("show")) closeModal(); });
  // Formulário "Faça parte da nossa missão": monta a mensagem e abre o WhatsApp da secretaria.
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
    const url = "https://wa.me/" + WHATSAPP_SECRETARIA + "?text=" + encodeURIComponent(msg);
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null; else window.location.href = url;
    e.currentTarget.reset();
  });
}
// Executa a inicialização quando o HTML termina de ser lido.
document.addEventListener("DOMContentLoaded", init);

