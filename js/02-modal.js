/* ============================================================
   js/02-modal.js
   MODAL GENÉRICO: abertura/fechamento do pop-up usado em todo o site.
   ============================================================ */
"use strict";

// Fundo escuro do modal e contêiner onde o conteúdo é injetado.
const modalBackdrop = document.getElementById("modalBackdrop");
// Contêiner interno do modal (recebe o HTML de openModal).
const modalContent = document.getElementById("modalContent");
// Posição atual do terço guiado (índice do passo exibido).
let rosaryIndex = 0;

// Abre o modal genérico com o HTML recebido. Ajusta a largura conforme o tipo de conteúdo,
// aplica um título opcional, bloqueia a rolagem do fundo e foca o botão de fechar.
function openModal(markup, title) {
  modalContent.innerHTML = markup;
  const modalShell = modalContent.closest(".modal");
  if (modalShell) {
    modalShell.classList.toggle("prayer-modal-wide", !!modalContent.querySelector(".prayer-modal-layout"));
    modalShell.classList.toggle("calendar-modal-wide", !!modalContent.querySelector(".calendar-modal"));
    modalShell.classList.toggle("rosary-modal-wide", !!modalContent.querySelector(".rosary-modal"));
    modalShell.classList.toggle("tithe-modal-wide", !!modalContent.querySelector(".tithe-modal-layout"));
    modalShell.classList.toggle("video-modal-wide", !!modalContent.querySelector(".video-modal-layout"));
  }
  const h = modalContent.querySelector("h2");
  if (h && title) h.textContent = title;
  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  // Fechamento do modal: botão ×, clique no fundo e tecla ESC.
  document.getElementById("modalClose").focus();
}
// Fecha o modal: pausa vídeo/áudio, cancela a fala, para o contador de oração, limpa as classes de largura e libera a rolagem.
function closeModal() {
  modalContent.querySelectorAll("video,audio").forEach(media => media.pause());
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (prayerActivityTimer) { clearInterval(prayerActivityTimer); prayerActivityTimer = null; }
  const modalShell = modalContent.closest(".modal");
  if (modalShell) modalShell.classList.remove("prayer-modal-wide","calendar-modal-wide","rosary-modal-wide","tithe-modal-wide","video-modal-wide");
  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
