/* ============================================================
   js/05-dizimo-secretaria.js
   MODAIS DE DÍZIMO, SECRETARIA (WhatsApp) E APOIO.
   ============================================================ */
"use strict";

// Abre o modal "Seja dizimista" (QR Code PIX ainda é um espaço reservado).
function showTithe() {
  // Opções do campo "qual comunidade você participa", geradas a partir de communities.
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

  // Formulário de interesse no dízimo: mostra a escolha de comunidade só se "Sim" e envia a mensagem pelo WhatsApp.
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
    const url = "https://wa.me/" + WHATSAPP_SECRETARIA + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
  });
}

// Abre o formulário que monta a mensagem e abre o WhatsApp da secretaria.
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

  // Formulário da secretaria: monta a mensagem e abre o WhatsApp para revisão e envio.
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
    const url = "https://wa.me/" + WHATSAPP_SECRETARIA + "?text=" + encodeURIComponent(whatsappText);
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null; else window.location.href = url;
    const feedback = document.getElementById("secretaryWhatsappFeedback");
    if (feedback) feedback.textContent = "O WhatsApp foi aberto com sua mensagem preenchida. Revise e toque em Enviar.";
  });
}

// Abre o modal "Ajude-nos a evangelizar" (informações de contribuição).
function showSupport() {
  openModal(`<h2 id="modalTitle">Ajude-nos a evangelizar</h2><p>As informações para contribuição devem ser preenchidas com a chave PIX e o QR Code oficiais da paróquia.</p><div class="info-box"><b>Contribuição via PIX</b><span>Chave PIX e QR Code oficial a cadastrar.</span></div>`);
}
