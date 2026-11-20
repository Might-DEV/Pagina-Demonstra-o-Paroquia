# Paróquia São Paulo Apóstolo — Site

Site institucional da Paróquia São Paulo Apóstolo, desenvolvido com HTML, CSS e JavaScript puros, sem frameworks.

## Estrutura atual

```
MAICON PROJETO/
├── index.html          Página principal da paróquia
├── liturgia.html       Página independente da Liturgia diária
├── css/
│   └── style.css       Estilos compartilhados de todas as páginas
├── js/
│   ├── script.js       Comportamentos da página principal
│   └── liturgia.js     Calendário, leituras, API, cache e áudio da Liturgia
├── imgs/
│   ├── logo/
│   ├── banner/
│   ├── hero/
│   ├── noticias/
│   ├── galeria/
│   ├── equipe/
│   ├── comunidades/
│   ├── pastorais/
│   ├── sacramentos/
│   ├── santos/
│   └── pix/
├── videos/
│   ├── 54983-490755468.mp4
│   └── LEIA-ME.txt
└── README.md
```

## Páginas

### Página principal

O arquivo `index.html` contém as seções da paróquia: início, história, comunidades, sacramentos, pastorais, agenda, notícias, equipe e contato.

### Página de Liturgia

A página `liturgia.html` é separada da página principal. Ela utiliza o `js/liturgia.js` exclusivamente para:

- selecionar datas no calendário;
- consultar leituras da Liturgia do dia;
- usar cache local quando a API estiver indisponível;
- apresentar o santo ou a celebração do dia;
- permitir narração das leituras;
- compartilhar o dia pelo WhatsApp.

Os links de “Liturgia” e “Ver calendário” no menu e na faixa diária apontam para `liturgia.html`.

## Como editar

| Quero mudar... | Arquivo |
|---|---|
| Textos e seções da página principal | `index.html` |
| Menu e conteúdo da página da Liturgia | `liturgia.html` |
| Dados de comunidades, pastorais, agenda e notícias | `js/script.js` |
| Comportamento da página principal | `js/script.js` |
| Calendário e consulta das leituras | `js/liturgia.js` |
| Cores, layout e responsividade | `css/style.css` |
| Uma imagem | Substitua o arquivo em `imgs/`, mantendo o mesmo nome |

## Vídeo institucional

O vídeo institucional usado no pop-up da história está em:

`videos/54983-490755468.mp4`

O caminho é configurado em `js/script.js`, na função `showVideoNotice()`.

## Publicação

Envie a pasta inteira para o servidor web e mantenha a estrutura de diretórios. Abra `index.html` para a página principal ou `liturgia.html` diretamente para a Liturgia.

## Serviços externos

- **Liturgia diária:** API em `liturgia.up.railway.app`, com fontes e proxies alternativos.
- **Rádios ao vivo:** transmissões das emissoras católicas.
- **WhatsApp, Instagram, Facebook, YouTube, Google Maps e Vatican News:** links externos.

## Pontos que ainda precisam de conteúdo oficial

- Convite do grupo de WhatsApp em `index.html`;
- QR Code oficial em `imgs/pix/qr-code-pix.png`;
- Telefones e outros dados demonstrativos;
- Dados de aniversariantes.
