/* ============================================================
   js/08-interacoes.js
   INTERAÇÕES GERAIS: botão flutuante do WhatsApp, download de materiais e formulário de contato.
   ============================================================ */
(function(){
// Cria o botão flutuante do WhatsApp (abre o modal da secretaria) se ainda não existir.
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
// Download dos materiais da Agenda: gera um arquivo .txt simples no próprio navegador.
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
// Formulário de contato: monta a mensagem e abre o WhatsApp da secretaria.
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
  const url="https://wa.me/" + WHATSAPP_SECRETARIA + "?text="+encodeURIComponent(message);
  const tab=window.open(url,"_blank");
  if(tab)tab.opener=null;else window.location.href=url;
  const feedback=document.getElementById('contactFeedback');
  if(feedback)feedback.textContent='O WhatsApp abriu com sua mensagem preenchida. Revise e toque em Enviar.';
});
})();
