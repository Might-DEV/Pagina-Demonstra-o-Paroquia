# Paróquia São Paulo Apóstolo — Site

Site institucional da paróquia (HTML + CSS + JavaScript puros, sem frameworks).
Basta enviar a pasta inteira para o servidor e abrir `index.html`.

## Estrutura

```
paroquia/
├── index.html                      Estrutura da página (textos e seções)
├── css/
│   └── style.css                   Todo o visual (cores, layout, animações, celular)
├── js/
│   └── script.js                   Todo o comportamento (menus, pop-ups, rádio, liturgia...)
├── imgs/                           Todas as imagens do site
│   ├── logo/                       Logo da paróquia
│   ├── banner/                     Imagem de fundo do banner
│   ├── hero/                       Santo do topo da página
│   ├── noticias/                   Fotos das notícias
│   ├── galeria/                    Galeria de momentos (8 fotos)
│   ├── equipe/                     Pastores e representantes
│   ├── comunidades/                Foto de cada comunidade e do seu coordenador
│   ├── pastorais/                  Foto do coordenador de cada pastoral
│   ├── sacramentos/                Imagens dos sete sacramentos e fundos
│   ├── santos/                     Imagens do santo do dia
│   └── pix/                        QR Code do Pix
├── videos/                         Vídeo institucional (ver abaixo)
└── baixar_imagens_externas.py      Script de uso único (ver abaixo)
```

## Antes de publicar (2 passos)

1. **Imagens que antes eram links externos.** Rode uma vez, no seu computador com internet:
   `python baixar_imagens_externas.py`
   Ele salva em `imgs/` as 15 imagens (Papa, santos, sacramentos e fundos) que o site antigo buscava em outros sites.
   Se alguma falhar, basta salvar o arquivo na pasta com o mesmo nome listado no script.
2. **Vídeo institucional.** Coloque `video_institucional_demonstrativo.mp4` dentro da pasta `videos/`.

## Como editar

| Quero mudar...                                                | Onde                                                                |
|---------------------------------------------------------------|---------------------------------------------------------------------|
| Textos fixos, links, seções                                   | `index.html` (cada seção tem um comentário `<!-- ... -->`)          |
| Comunidades, pastorais, agenda, notícias, perfis, sacramentos | `js/script.js`, módulo **[01]** (listas "DADOS — ...")              |
| Cores                                                         | `css/style.css`, seção **[01]**, bloco `:root` (variáveis)          |
| Qualquer ajuste visual                                        | `css/style.css` (procure o nome do componente em `── Nome ──`)      |
| Trocar uma foto                                               | Substitua o arquivo em `imgs/` mantendo o mesmo nome                |
| Aniversariantes                                               | `index.html`, cartão `birthday-card`                                |

Dica: no CSS, quando duas regras mudam a mesma coisa, **a que vem depois vence**. Por isso a ordem das seções [01] a [47] foi mantida igual à do site original.

## Pendências que já existiam no site original (não foram alteradas)

- O link do grupo de WhatsApp ainda é um espaço reservado: `COLE_AQUI_O_CONVITE_DO_GRUPO` (em `index.html`).
- Alguns dados são de exemplo (ex.: telefones `(11) 0000-0101`, aniversariantes, "Irmã Helena (exemplo)").
- O QR Code do Pix em `imgs/pix/qr-code-pix.png` é a imagem usada hoje; troque pelo QR oficial.

## Serviços externos que o site ainda consulta (não são arquivos)

São dados e transmissões ao vivo; não dá para hospedar no seu servidor:

- **Liturgia diária** (leituras do dia): API em `liturgia.up.railway.app` (com alternativas de reserva).
- **Rádios ao vivo** (Canção Nova, Evangelizar, Colméia): os streams vêm das emissoras.
- Links de navegação (Instagram, Facebook, YouTube, WhatsApp, Google Maps, Vatican News): apenas abrem outras páginas.
