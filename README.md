# Site da Paróquia São Paulo Apóstolo

Site estático (HTML + CSS + JavaScript puro). Abra o `index.html` no navegador ou publique a pasta inteira em qualquer hospedagem.

## Estrutura

```
site-paroquia/
├── index.html            Estrutura e textos fixos da página (comentada por seção)
├── css/                  Estilos (14 arquivos, carregados NA ORDEM do número)
├── js/                   Scripts (12 arquivos, carregados NA ORDEM do número)
└── assets/
    ├── img/              Todas as imagens (antes estavam embutidas em base64)
    └── video/            Coloque aqui o vídeo institucional
```

### CSS (a ordem importa)
O CSS original era um acúmulo de ajustes sobrescrevendo uns aos outros (muitos `!important`).
Para não mudar o visual, a **ordem de cascata foi preservada**: cada arquivo mantém um comentário
com o nome do bloco original. Não reordene os `<link>` no `index.html`.

| Arquivos | Conteúdo |
|---|---|
| 01–06 | Base original: variáveis, cabeçalho, hero, seções, modais, refinamentos |
| 07–11 | Camadas de ajustes: galeria, oração/PIX, sistema visual, contato, rádio, faixa de liturgia |
| 12–13 | Visualizador da galeria e página de Liturgia |
| 14 | Classes que substituíram estilos inline |

### JavaScript (a ordem importa)
| Arquivo | Função |
|---|---|
| `01-data.js` | **Dados do site**: comunidades, pastorais, agenda, notícias, perfis, número do WhatsApp |
| `02-modal.js` | Modal genérico usado em todo o site |
| `03-secoes.js` | Sacramentos, agenda/calendário, notícias, equipe, comunidades, pastorais |
| `04-oracao.js` | Vela virtual, intenção de missa e terço |
| `05-dizimo-secretaria.js` | Modais de dízimo, secretaria e apoio |
| `06-main.js` | Inicialização e eventos globais |
| `07-galeria.js` | Visualizador de fotos |
| `08-interacoes.js` | Botão flutuante do WhatsApp, download de materiais, formulário de contato |
| `09-ux.js` | Menu mobile, cabeçalho dinâmico, carrossel de notícias |
| `10-radio.js` | Mini-player de rádio católica |
| `11-liturgia-navegacao.js` | Alterna entre página inicial e página de Liturgia |
| `12-liturgia.js` | Calendário, API das leituras, narração por voz |

Os scripts ficam no fim do `<body>` **sem `defer`** de propósito: `09-ux.js` e `10-radio.js`
precisam rodar depois que `06-main.js` renderizar os cards.

## Como atualizar conteúdo
- **Textos de comunidades, pastorais, agenda, notícias, perfis:** `js/01-data.js`
- **Número do WhatsApp da secretaria:** constante `WHATSAPP_SECRETARIA` em `js/01-data.js`
- **Vídeo institucional:** coloque `video_institucional_demonstrativo.mp4` em `assets/video/`
  (ou mude `INSTITUTIONAL_VIDEO` em `js/01-data.js`)
- **Notícias:** o card em `index.html` e o texto completo em `newsArticles` precisam estar **na mesma ordem**
- **Horários de missa:** aparecem em 3 lugares (faixa do topo e seção Contato no `index.html`; comunidades em `01-data.js`)

## Pendências de conteúdo (não são erros de código)
- Link do grupo de WhatsApp da comunidade ainda é um modelo: `COLE_AQUI_O_CONVITE_DO_GRUPO` (hero, `index.html`)
- QR Code PIX é um espaço reservado (`index.html`, dízimo e `assets/img/qr-pix-exemplo.png`)
- Telefones `(11) 0000-xxxx` e "Irmã Helena (exemplo)" são dados de exemplo em `01-data.js`
- Faixa "Liturgia / Santo do dia" (topo da home) e diálogo do santo estão **fixos** em 12/11 (São Josafá)
- Horário da missa da Matriz diverge: faixa do topo diz 19h30, comunidade/Contato dizem 19h
- Materiais da Agenda: o botão gera um `.txt`; os PDFs listados ainda não existem
