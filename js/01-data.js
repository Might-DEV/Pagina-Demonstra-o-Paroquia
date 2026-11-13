/* ============================================================
   js/01-data.js
   DADOS DO SITE: comunidades, pastorais, sacramentos, agenda, materiais, notícias e perfis.
   Para atualizar conteúdo do site, edite SOMENTE este arquivo (e os textos do index.html).
   ============================================================ */
"use strict";

// Número do WhatsApp da secretaria, no formato internacional (55 + DDD + número, sem símbolos).
// Usado em todos os formulários que abrem uma conversa. Altere SOMENTE aqui.
const WHATSAPP_SECRETARIA = "551146767007";

// Caminho do vídeo institucional (abre no modal da seção História).
// Coloque o arquivo MP4 em assets/video/ com este nome.
const INSTITUTIONAL_VIDEO = "assets/video/video_institucional_demonstrativo.mp4";

// Comunidades da paróquia (cards + modal). Campos: name, short, feast (festa), address, mass (horário),
// history (opcional), foundation, coordinators, contact, image (arquivo em assets/img), coordinatorPhoto.
// OBS: telefones "0000" e "(exemplo)" são PLACEHOLDERS: troque pelos dados reais.
const communities = [
  {
    "name": "Matriz São Paulo Apóstolo",
    "short": "Matriz",
    "feast": "25 de janeiro",
    "address": "Rua Chico Mendes, 94 – Vila São Paulo",
    "mass": "Domingos: 7h, 10h30 e 19h",
    "history": "A comunidade matriz é o centro da vida paroquial, reunindo os fiéis para a Eucaristia, a oração, a formação e o serviço missionário.",
    "foundation": "A informar",
    "coordinators": "Maria Aparecida Santos",
    "contact": "(11) 0000-0101",
    "image": "assets/img/matriz-sao-paulo-apostolo-imagem.webp",
    "coordinatorPhoto": "assets/img/matriz-sao-paulo-apostolo-coordenador.webp"
  },
  {
    "name": "Comunidade São Pedro",
    "short": "São Pedro",
    "feast": "29 de junho",
    "address": "Travessa Dom Pedro II, 8 – Jardim Melilo",
    "mass": "Sábados: 19h",
    "foundation": "A informar",
    "coordinators": "João Carlos Ribeiro",
    "contact": "(11) 0000-0102",
    "image": "assets/img/comunidade-sao-pedro-imagem.webp",
    "coordinatorPhoto": "assets/img/comunidade-sao-pedro-coordenador.webp"
  },
  {
    "name": "Comunidade São Miguel Arcanjo",
    "short": "São Miguel Arcanjo",
    "feast": "29 de setembro",
    "address": "Rua Floriano Peixoto, 15 – Vila Cristina",
    "mass": "Sábados: 17h30",
    "foundation": "A informar",
    "coordinators": "Luciana Ferreira",
    "contact": "(11) 0000-0103",
    "image": "assets/img/comunidade-sao-miguel-arcanjo-imagem.webp",
    "coordinatorPhoto": "assets/img/comunidade-sao-miguel-arcanjo-coordenador.webp"
  },
  {
    "name": "Comunidade São José",
    "short": "São José",
    "feast": "19 de março",
    "address": "Rua Sebastião Pinto Magalhães, 50 – Jardim das Flores",
    "mass": "Domingos: 17h30",
    "foundation": "A informar",
    "coordinators": "Marcos Vinícius Costa",
    "contact": "(11) 0000-0104",
    "image": "assets/img/comunidade-sao-jose-imagem.webp",
    "coordinatorPhoto": "assets/img/comunidade-sao-jose-coordenador.webp"
  },
  {
    "name": "Comunidade Imaculada Conceição",
    "short": "Imaculada Conceição",
    "feast": "8 de dezembro",
    "address": "Rua Noel de Paula, 89 – Cambiri",
    "mass": "Domingos: 9h",
    "foundation": "A informar",
    "coordinators": "Ana Paula Martins",
    "contact": "(11) 0000-0105",
    "image": "assets/img/comunidade-imaculada-conceicao-imagem.webp",
    "coordinatorPhoto": "assets/img/comunidade-imaculada-conceicao-coordenador.webp"
  },
  {
    "name": "Comunidade Sagrada Família",
    "short": "Sagrada Família",
    "feast": "2º domingo de agosto",
    "address": "Rua Bela Vista, 10 – Vila Piauí",
    "mass": "Domingos: 9h",
    "foundation": "A informar",
    "coordinators": "Roberto Alves",
    "contact": "(11) 0000-0106",
    "image": "assets/img/comunidade-sagrada-familia-imagem.webp",
    "coordinatorPhoto": "assets/img/comunidade-sagrada-familia-coordenador.webp"
  },
  {
    "name": "Comunidade Santo Antônio",
    "short": "Santo Antônio",
    "feast": "13 de junho",
    "address": "Novo endereço em breve",
    "mass": "Em breve",
    "foundation": "A informar",
    "coordinators": "Renata Oliveira",
    "contact": "(11) 0000-0107",
    "image": "assets/img/comunidade-santo-antonio-imagem.webp",
    "coordinatorPhoto": "assets/img/comunidade-santo-antonio-coordenador.webp"
  },
  {
    "name": "Comunidade O Caminho",
    "short": "O Caminho",
    "feast": "A definir",
    "address": "Rua Central, Vila Piauí — Convento das Irmãs Religiosas",
    "mass": "Horário a informar",
    "history": "Comunidade vinculada ao Convento das Irmãs Religiosas, espaço de oração, vida fraterna e missão evangelizadora.",
    "foundation": "A informar",
    "coordinators": "Irmã Helena (exemplo)",
    "contact": "(11) 0000-0108",
    "image": "assets/img/comunidade-o-caminho-imagem.svg",
    "coordinatorPhoto": "assets/img/comunidade-o-caminho-coordenador.webp"
  }
];
// Pastorais (cards + modal). Campos: name, desc, icon, participar, apoiar, coordenador, contato, foto.
// OBS: telefones "0000" são PLACEHOLDERS.
const pastorals = [
  {
    "name": "Catequese",
    "desc": "Acompanha crianças, adolescentes e adultos na iniciação à vida cristã e na caminhada de fé.",
    "icon": "📖",
    "participar": "Famílias e pessoas interessadas na catequese podem procurar a secretaria paroquial para conhecer as turmas, as etapas de formação, os documentos e os períodos de inscrição. A coordenação orientará sobre a comunidade onde acontecem os encontros.",
    "apoiar": "Quem deseja servir como catequista pode conversar com a coordenação sobre formação, disponibilidade e preparação. Também é possível apoiar a acolhida, a organização dos encontros, os materiais e a participação das famílias.",
    "coordenador": "Adriana Martins",
    "contato": "(11) 0000-0201",
    "foto": "assets/img/catequese-coordenador.webp"
  },
  {
    "name": "Liturgia",
    "desc": "Prepara e anima as celebrações, ajudando a assembleia a participar da oração da Igreja.",
    "icon": "✝",
    "participar": "Quem deseja servir nas celebrações pode procurar a coordenação para conhecer as equipes disponíveis, como leitores, salmistas, comentaristas, ministros e serviço ao altar. A coordenação explica a preparação necessária e as formas de participação em cada comunidade.",
    "apoiar": "Colabore com a organização dos espaços, a preparação dos livros e objetos litúrgicos, a acolhida das equipes e o cuidado com a igreja antes e depois das celebrações.",
    "coordenador": "Maria Aparecida",
    "contato": "(11) 0000-0202",
    "foto": "assets/img/liturgia-coordenador.webp"
  },
  {
    "name": "Música",
    "desc": "Coloca o canto e os instrumentos a serviço da oração e da participação nas celebrações.",
    "icon": "♫",
    "participar": "Pessoas que gostam de cantar ou tocar instrumentos podem procurar a coordenação para conhecer os grupos, os ensaios e as celebrações em que podem colaborar. A participação é orientada de acordo com as necessidades das comunidades.",
    "apoiar": "Ajude na preparação dos cantos, na organização dos repertórios e materiais, no cuidado com os instrumentos e no apoio às equipes de música.",
    "coordenador": "Carlos Henrique",
    "contato": "(11) 0000-0203",
    "foto": "assets/img/musica-coordenador.webp"
  },
  {
    "name": "Acolhida",
    "desc": "Recebe cada pessoa com atenção, respeito e espírito fraterno.",
    "icon": "♡",
    "participar": "Quem gosta de receber e orientar pessoas pode conversar com a coordenação para conhecer a equipe de acolhida e as oportunidades de serviço nas missas e atividades paroquiais.",
    "apoiar": "Ajude a orientar visitantes, organizar a entrada e os lugares, acolher pessoas idosas ou com mobilidade reduzida e transmitir informações com gentileza.",
    "coordenador": "Joana Souza",
    "contato": "(11) 0000-0204",
    "foto": "assets/img/acolhida-coordenador.webp"
  },
  {
    "name": "Dízimo",
    "desc": "Promove a partilha e a corresponsabilidade pela missão evangelizadora da paróquia.",
    "icon": "✧",
    "participar": "Quem deseja conhecer melhor a pastoral ou manifestar interesse em participar pode procurar a secretaria. A equipe orientará sobre as ações de conscientização, acolhida e acompanhamento dos dizimistas.",
    "apoiar": "Colabore na acolhida dos dizimistas, na divulgação das ações pastorais e na organização de encontros. O serviço deve preservar a discrição e o cuidado com as informações pessoais e contribuições.",
    "coordenador": "José Roberto",
    "contato": "(11) 0000-0205",
    "foto": "assets/img/dizimo-coordenador.webp"
  },
  {
    "name": "Comunicação",
    "desc": "Compartilha informações, histórias e atividades da paróquia e de suas comunidades.",
    "icon": "▣",
    "participar": "Pessoas com interesse em fotografia, vídeo, texto, design ou redes sociais podem procurar a coordenação para conhecer as necessidades da equipe e as orientações para registrar e divulgar as atividades paroquiais.",
    "apoiar": "Contribua com registros de celebrações e eventos, produção e revisão de textos, organização de materiais e divulgação das iniciativas da paróquia, sempre respeitando a imagem e a privacidade das pessoas.",
    "coordenador": "Paula Nunes",
    "contato": "(11) 0000-0206",
    "foto": "assets/img/comunicacao-coordenador.webp"
  },
  {
    "name": "Juventude",
    "desc": "Acompanha jovens na vivência da fé, na amizade e no anúncio do Evangelho.",
    "icon": "☀",
    "participar": "Jovens interessados em caminhar em grupo podem procurar a secretaria ou a coordenação para saber quais encontros, atividades e formas de participação estão disponíveis nas comunidades.",
    "apoiar": "Ajude na acolhida dos jovens, na preparação de encontros, momentos de oração, atividades formativas e ações de solidariedade.",
    "coordenador": "Gabriel Costa",
    "contato": "(11) 0000-0207",
    "foto": "assets/img/juventude-coordenador.webp"
  },
  {
    "name": "Caridade",
    "desc": "Organiza gestos concretos de cuidado, solidariedade e atenção a quem mais precisa.",
    "icon": "♥",
    "participar": "Quem deseja servir pessoas em situação de vulnerabilidade pode procurar a coordenação para conhecer as ações em andamento, as necessidades identificadas e os cuidados necessários no atendimento.",
    "apoiar": "Colabore com campanhas solidárias, organização de doações e ações de serviço conforme as necessidades comunicadas pela pastoral. O trabalho deve respeitar a dignidade e a privacidade de quem recebe apoio.",
    "coordenador": "Ana Lúcia",
    "contato": "(11) 0000-0208",
    "foto": "assets/img/caridade-coordenador.webp"
  },
  {
    "name": "Crisma",
    "desc": "Acompanha a preparação para o sacramento da Confirmação e o amadurecimento da fé.",
    "icon": "🕊",
    "participar": "Adolescentes e adultos interessados em receber o sacramento podem procurar a secretaria paroquial para conhecer os períodos de inscrição, os critérios e o percurso de preparação oferecido pela paróquia.",
    "apoiar": "Quem deseja colaborar pode apoiar a acolhida, a organização dos encontros, a preparação dos materiais e o acompanhamento dos crismandos, conforme a orientação da coordenação.",
    "coordenador": "Marcelo Ribeiro",
    "contato": "(11) 0000-0209",
    "foto": "assets/img/crisma-coordenador.webp"
  },
  {
    "name": "Batismo",
    "desc": "Acolhe famílias e acompanha a preparação para o sacramento do Batismo.",
    "icon": "💧",
    "participar": "Pais e padrinhos podem procurar a secretaria paroquial para receber orientações sobre a preparação, os documentos necessários, as datas disponíveis e a comunidade responsável pelo atendimento.",
    "apoiar": "A pastoral pode receber apoio na acolhida das famílias, na organização dos encontros de preparação e na orientação dos participantes, sempre em diálogo com a coordenação.",
    "coordenador": "Renata Lima",
    "contato": "(11) 0000-0210",
    "foto": "assets/img/batismo-coordenador.webp"
  },
  {
    "name": "Infância Missionária",
    "desc": "Ajuda crianças a crescer na fé, na oração, na amizade e no espírito missionário.",
    "icon": "🌎",
    "participar": "Famílias interessadas podem procurar a secretaria ou a coordenação para conhecer as atividades destinadas às crianças, as formas de inscrição e os encontros disponíveis nas comunidades.",
    "apoiar": "Colabore na preparação de atividades, na organização de materiais, na acolhida das crianças e no incentivo a atitudes de partilha, oração e solidariedade.",
    "coordenador": "Beatriz Santos",
    "contato": "(11) 0000-0211",
    "foto": "assets/img/infancia-missionaria-coordenador.webp"
  },
  {
    "name": "Encontro de Emaús",
    "desc": "Proporciona uma experiência de encontro com Cristo, partilha e fortalecimento da caminhada de fé.",
    "icon": "🤝",
    "participar": "Quem deseja conhecer o Encontro de Emaús pode procurar a coordenação paroquial para receber informações sobre as próximas experiências, orientações de participação e etapas de preparação.",
    "apoiar": "Ajude na acolhida dos participantes, na preparação dos espaços e materiais, na organização dos momentos de oração e no serviço antes, durante e depois dos encontros.",
    "coordenador": "Eduardo Martins",
    "contato": "(11) 0000-0212",
    "foto": "assets/img/encontro-de-emaus-coordenador.webp"
  }
];
// Sacramentos: nome, introdução (intro) e como se preparar (prep). A ordem deve acompanhar as abas do index.html e sacramentImages.
const sacramentData=[
{name:"Batismo",intro:"A porta de entrada na vida cristã. Celebramos os batizados no último domingo do mês, com preparação prévia dos pais e padrinhos.",prep:"Inscrição na secretaria com certidão de nascimento e comprovante de residência."},
{name:"Eucaristia",intro:"A primeira comunhão das crianças e adolescentes acontece após dois anos de catequese, com encontros semanais na paróquia.",prep:"Matrícula na catequese no início do ano, na secretaria paroquial."},
{name:"Confirmação (Crisma)",intro:"O sacramento que fortalece a fé e o compromisso com a comunidade, vivido pelos jovens após a caminhada de catequese.",prep:"Inscrição na catequese de crisma e participação nos encontros de preparação."},
{name:"Reconciliação",intro:"A confissão é celebrada todos os sábados, das 16h às 17h30, e em celebrações penitenciais no Advento e na Quaresma.",prep:"Não é preciso agendar. Em caso de dúvidas, fale com a secretaria."},
{name:"Unção dos Enfermos",intro:"Leva conforto e força a quem enfrenta doença ou fragilidade. Pode ser celebrada na igreja, em casa ou no hospital.",prep:"Avise a secretaria ou a equipe da pastoral da saúde e comunique a família."},
{name:"Matrimônio",intro:"O sim de um casal diante de Deus. As celebrações acontecem aos sábados e exigem preparação com a pastoral familiar.",prep:"Agende com antecedência de seis meses e apresente a documentação necessária."},
{name:"Ordem",intro:"A ordenação de diáconos e presbíteros que servem a comunidade. A paróquia acompanha os vocacionados com oração e formação.",prep:"Jovens que sentem o chamado podem procurar a pastoral vocacional."}];
// Imagem de cada sacramento (mesma ordem de sacramentData): série "Os Sete Sacramentos", de Poussin (domínio público).
const sacramentImages = ["https://commons.wikimedia.org/wiki/Special:FilePath/Seven_Sacraments_-_Baptism_(II)_1646_Nicolas_Poussin.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Seven_Sacraments_-_Eucharist_II_(1647)_Nicolas_Poussin.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Seven_Sacraments_-_Confirmation_II_(1645)_Nicolas_Poussin.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Sacrament_of_Penance_II_(1647)_Nicolas_Poussin.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Seven_Sacraments_-_Extreme_Unction_II_(1644)_Nicolas_Poussin.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Seven_Sacraments_-_Marriage_II_(1647-1648)_Nicolas_Poussin.jpg", "https://commons.wikimedia.org/wiki/Special:FilePath/Seven_Sacraments_-_Ordination_II_(1647)_Nicolas_Poussin.jpg"];
// Eventos da agenda. "date" no formato AAAA-MM-DD (usado pelo calendário completo).
const parishEvents = [
  {day:"22", month:"NOV", date:"2026-11-22", category:"CELEBRAÇÃO", title:"Missa em ação de graças pelos 10 anos da paróquia", time:"19h", place:"Matriz — Centro", description:"Celebração de ação de graças pelo jubileu dos 10 anos, com a participação das pastorais, comunidades e convidados."},
  {day:"12", month:"DEZ", date:"2026-12-12", category:"ESPIRITUALIDADE", title:"Novena de Natal da comunidade", time:"19h", place:"Matriz — Centro", description:"Primeira noite da novena de Natal, com oração em família, cânticos e bênção dos presépios trazidos pela comunidade."}
];
// Materiais para download listados na Agenda. (O botão gera um .txt simples; os PDFs listados em "file" ainda não existem.)
const parishMaterials = [
  {title:"Programação paroquial",file:"programacao-paroquial.pdf"},
  {title:"Folheto litúrgico",file:"folheto-liturgico.pdf"},
  {title:"Material da catequese",file:"material-catequese.pdf"},
  {title:"Calendário litúrgico",file:"calendario-liturgico.pdf"},
  {title:"Guia das pastorais",file:"guia-das-pastorais.pdf"},
  {title:"Roteiro de oração em família",file:"roteiro-oracao-familia.pdf"}
];
window.parishMaterials = parishMaterials;
// Texto completo das notícias. MESMA ORDEM dos cards de #newsGrid no index.html (o índice liga o card ao texto).
const newsArticles = [
  {
    "date": "20/05/2026",
    "category": "AÇÃO SOLIDÁRIA",
    "title": "Pastoral da Caridade inicia campanha do agasalho",
    "summary": "A campanha arrecada roupas, cobertores e alimentos para as famílias acompanhadas pela paróquia.",
    "body": "A Pastoral da Caridade promove uma campanha de arrecadação de roupas, cobertores e alimentos para apoiar famílias acompanhadas pelas comunidades paroquiais. As doações podem ser organizadas com a equipe da pastoral e entregues nos pontos de coleta informados pela secretaria."
  },
  {
    "date": "02/02/2026",
    "category": "FORMAÇÃO",
    "title": "Catequese abre inscrições para 2026",
    "summary": "Inscrições para a catequese de crianças, adolescentes e Crisma podem ser feitas na secretaria paroquial.",
    "body": "Estão abertas as inscrições para os encontros de catequese de crianças, adolescentes e preparação para a Crisma. Para informações sobre documentação, faixas etárias, turmas e horários, procure a secretaria paroquial."
  },
  {
    "date": "26/01/2026",
    "category": "CELEBRAÇÃO",
    "title": "Festa do padroeiro reúne a comunidade do centro e dos bairros",
    "summary": "Procissão, missa solene e confraternização marcaram o início das celebrações do jubileu da paróquia.",
    "body": "A festa do padroeiro reuniu fiéis das comunidades em um momento de oração, procissão, celebração e confraternização. A programação destacou a devoção a São Paulo Apóstolo e a unidade entre as comunidades paroquiais."
  },
  {
    "date": "18/01/2026",
    "category": "JUVENTUDE",
    "title": "Encontro de jovens fortalece a caminhada de fé",
    "summary": "Jovens das comunidades participaram de uma tarde de oração, partilha e convivência.",
    "body": "O encontro reuniu jovens das comunidades em uma tarde de oração, partilha e convivência. A programação foi pensada para fortalecer os vínculos, incentivar a participação na vida paroquial e renovar o compromisso com a missão."
  },
  {
    "date": "12/01/2026",
    "category": "FORMAÇÃO",
    "title": "Pastorais se reúnem para planejar o ano pastoral",
    "summary": "Representantes das equipes alinharam propostas e ações para o calendário paroquial.",
    "body": "Representantes das pastorais e serviços paroquiais se reuniram para compartilhar prioridades, organizar propostas e planejar as ações do ano. O encontro reforçou a importância do trabalho em conjunto e do serviço às comunidades."
  },
  {
    "date": "05/01/2026",
    "category": "COMUNIDADE",
    "title": "Famílias participam de momento de oração e convivência",
    "summary": "A atividade aproximou famílias e lideranças em um momento de espiritualidade e acolhida.",
    "body": "Famílias das comunidades participaram de um momento de oração e convivência. A atividade proporcionou acolhida, integração e partilha, fortalecendo os laços entre os participantes e a vida comunitária."
  }
];
// Perfis do modal da seção Equipe. MESMA ORDEM dos cards de #equipe no index.html.
const pastorProfiles = [
 {name:"Papa Leão XIV",role:"Papa da Igreja Católica",bio:"Robert Francis Prevost foi eleito em 8 de maio de 2025 e escolheu o nome Leão XIV. É o 267º sucessor de São Pedro."},
 {name:"Dom Giambattista Diquattro",role:"Núncio Apostólico",bio:"Arcebispo e diplomata da Santa Sé, exerce o serviço de representação pontifícia junto à Igreja e às autoridades do país. Sua missão expressa a comunhão da Igreja local com o Santo Padre."},
 {name:"Dom Pedro Luiz Stringhini",role:"Bispo Diocesano",bio:"Bispo da Diocese de Mogi das Cruzes, acompanha e orienta pastoralmente as paróquias e comunidades da diocese, promovendo a evangelização, a unidade e a missão da Igreja."},
 {name:"Pe. Victor Almeida M. da Silva",role:"Pároco",bio:"Responsável pelo cuidado pastoral da Paróquia São Paulo Apóstolo, acompanha a vida litúrgica, sacramental e comunitária e anima as pastorais e comunidades na missão evangelizadora."}

];
