/* ===== Last Wire: party bombs — content =====
   Every line here is original. Song lines are made up for this game: no real lyrics.
   Film titles and place names are facts, not quotes. */
var PARTY = {};

/* 🎬 emoji films: the emojis, then the title in each course language */
PARTY.films = [
  ['🦁👑', 'The Lion King', 'El Rey León', 'Løvernes Konge'],
  ['🐠🔍', 'Finding Nemo', 'Buscando a Nemo', 'Find Nemo'],
  ['❄️👸⛄', 'Frozen', 'Frozen', 'Frost'],
  ['🚢🧊💔', 'Titanic', 'Titanic', 'Titanic'],
  ['🦖🏝️', 'Jurassic Park', 'Parque Jurásico', 'Jurassic Park'],
  ['🧜‍♀️🐚', 'The Little Mermaid', 'La Sirenita', 'Den Lille Havfrue'],
  ['🕷️🧑🏙️', 'Spider-Man', 'Spider-Man', 'Spider-Man'],
  ['⚡🧙‍♂️👓', 'Harry Potter', 'Harry Potter', 'Harry Potter'],
  ['⭐⚔️🌌', 'Star Wars', 'La guerra de las galaxias', 'Star Wars'],
  ['🧊🐿️🌰', 'Ice Age', 'Ice Age: La edad de hielo', 'Ice Age'],
  ['🟢👹🏰', 'Shrek', 'Shrek', 'Shrek'],
  ['🎈🏠👴', 'Up', 'Up', 'Op'],
  ['🏠🧒🎄', 'Home Alone', 'Solo en casa', 'Alene hjemme'],
  ['🏴‍☠️🌊💀', 'Pirates of the Caribbean', 'Piratas del Caribe', 'Pirates of the Caribbean'],
  ['🌹👸🐻', 'Beauty and the Beast', 'La Bella y la Bestia', 'Skønheden og Udyret'],
  ['👻🚫📞', 'Ghostbusters', 'Los cazafantasmas', 'Ghostbusters'],
  ['🦈🏖️😱', 'Jaws', 'Tiburón', 'Dødens gab'],
  ['🤠🚀🧸', 'Toy Story', 'Toy Story', 'Toy Story'],
  ['🐼🥋', 'Kung Fu Panda', 'Kung Fu Panda', 'Kung Fu Panda'],
  ['🍫🏭🎩', 'Charlie and the Chocolate Factory', 'Charlie y la fábrica de chocolate', 'Charlie og chokoladefabrikken'],
  ['🐭👨‍🍳🍲', 'Ratatouille', 'Ratatouille', 'Ratatouille'],
  ['🦍🏙️✈️', 'King Kong', 'King Kong', 'King Kong']
];

/* 🗼 postcards: the picture, the place, and what the helper hears */
PARTY.places = [
  ['🗼', { en: 'Paris', es: 'París', da: 'Paris' }, { en: 'It is very tall and made of iron. You can see the whole city from the top.', es: 'Es muy alta y es de hierro. Desde arriba ves toda la ciudad.', da: 'Det er meget højt og lavet af jern. Fra toppen kan du se hele byen.' }],
  ['🗽', { en: 'New York', es: 'Nueva York', da: 'New York' }, { en: 'She is green, she holds a torch and she stands on an island.', es: 'Es verde, lleva una antorcha y está en una isla.', da: 'Hun er grøn, hun holder en fakkel og står på en ø.' }],
  ['🏯', { en: 'Tokyo', es: 'Tokio', da: 'Tokyo' }, { en: 'It is a busy city with fast trains, neon lights and old temples.', es: 'Es una ciudad con trenes rápidos, luces de neón y templos antiguos.', da: 'Det er en travl by med hurtige tog, neonlys og gamle templer.' }],
  ['🎡', { en: 'London', es: 'Londres', da: 'London' }, { en: 'A huge wheel turns slowly next to the river, and the buses are red.', es: 'Una noria enorme gira junto al río, y los autobuses son rojos.', da: 'Et kæmpe hjul drejer langsomt ved floden, og busserne er røde.' }],
  ['🕌', { en: 'Istanbul', es: 'Estambul', da: 'Istanbul' }, { en: 'This city sits on two continents, and a famous building has six towers.', es: 'Esta ciudad está en dos continentes, y un edificio famoso tiene seis torres.', da: 'Byen ligger på to kontinenter, og en berømt bygning har seks tårne.' }],
  ['🏛️', { en: 'Athens', es: 'Atenas', da: 'Athen' }, { en: 'There is a very old temple with white columns on a hill.', es: 'Hay un templo muy antiguo con columnas blancas en una colina.', da: 'Der er et meget gammelt tempel med hvide søjler på en bakke.' }],
  ['🦘', { en: 'Sydney', es: 'Sídney', da: 'Sydney' }, { en: 'The opera house looks like white sails, and it is summer at Christmas.', es: 'La ópera parece velas blancas, y en Navidad es verano.', da: 'Operahuset ligner hvide sejl, og det er sommer til jul.' }],
  ['🧜‍♀️', { en: 'Copenhagen', es: 'Copenhague', da: 'København' }, { en: 'A small statue sits on a rock by the water, and everybody rides a bike.', es: 'Una estatua pequeña está sobre una roca junto al agua, y todos van en bici.', da: 'En lille statue sidder på en sten ved vandet, og alle cykler.' }],
  ['⛪', { en: 'Barcelona', es: 'Barcelona', da: 'Barcelona' }, { en: 'A strange church has been under construction for more than a hundred years.', es: 'Una iglesia muy rara lleva más de cien años en obras.', da: 'En mærkelig kirke har været under opførelse i mere end hundrede år.' }],
  ['🍕', { en: 'Rome', es: 'Roma', da: 'Rom' }, { en: 'People throw coins into a fountain, and there is a giant old stadium.', es: 'La gente tira monedas a una fuente, y hay un estadio antiguo gigante.', da: 'Folk kaster mønter i en springvand, og der er et kæmpe gammelt stadion.' }],
  ['🏔️', { en: 'Switzerland', es: 'Suiza', da: 'Schweiz' }, { en: 'High mountains, snow all year, cheese with holes and very good chocolate.', es: 'Montañas altas, nieve todo el año, queso con agujeros y chocolate muy bueno.', da: 'Høje bjerge, sne hele året, ost med huller og meget god chokolade.' }],
  ['🌉', { en: 'San Francisco', es: 'San Francisco', da: 'San Francisco' }, { en: 'A red bridge disappears into the fog, and the streets are very steep.', es: 'Un puente rojo desaparece en la niebla, y las calles son muy empinadas.', da: 'En rød bro forsvinder i tågen, og gaderne er meget stejle.' }]
];

/* the rest is per course language */
PARTY.en = {
  /* 🎵 the line, the right last word, two that sound close */
  song: [
    ['My cat is singing in the rain, she thinks she is a', 'train', 'trend', 'tray'],
    ['I ate a pizza on the moon, I used a tiny silver', 'spoon', 'soon', 'spin'],
    ['Grandma dances on the bus, she does not make a lot of', 'fuss', 'fuzz', 'bus'],
    ['I lost my sock inside the sea, a fish is wearing it for', 'free', 'three', 'tree'],
    ['The dog is driving to the beach, he wants a coffee and a', 'peach', 'pitch', 'beach'],
    ['My phone fell in a bowl of soup, now it can only text in a', 'loop', 'loose', 'hoop'],
    ['I wrote a song about my shoe, it is a little bit too', 'blue', 'blow', 'glue'],
    ['We danced all night, we danced till three, then we had pancakes with our', 'tea', 'key', 'sea'],
    ['The robot cried, the robot sighed, he wanted chips but they were', 'fried', 'tried', 'dried'],
    ['My heart goes boom, my heart goes bang, I sing the chorus but I never', 'sang', 'sank', 'hang']
  ],
  /* 🎤 karaoke lines */
  karaoke: [
    'I want to dance with a dinosaur tonight',
    'My pizza is my only friend',
    'We are the champions of the sofa',
    'Baby, baby, where is my phone',
    'Give me sunshine and a sandwich',
    'I can see the stars from my kitchen',
    'Do not stop me, I am having toast',
    'Tonight we sing, tomorrow we sleep'
  ],
  /* 👅 tongue twisters */
  twister: [
    'She sells sea shells by the sea shore',
    'Red lorry yellow lorry red lorry yellow lorry',
    'Peter Piper picked a peck of pickled peppers',
    'How can a clam cram in a clean cream can',
    'Fred fed Ted bread and Ted fed Fred bread',
    'Six slippery snails slid slowly seaward',
    'I scream you scream we all scream for ice cream',
    'Black background brown background'
  ],
  /* 📻 five stations: the helper hears one of them */
  radio: [
    ['ship', 'sheep', 'chip', 'cheap', 'shop'],
    ['bad', 'bed', 'bat', 'bet', 'bid'],
    ['live', 'leave', 'life', 'leaf', 'love'],
    ['three', 'tree', 'free', 'tea', 'see'],
    ['walk', 'work', 'wok', 'woke', 'week'],
    ['thin', 'tin', 'fin', 'thing', 'tine'],
    ['pull', 'pool', 'pole', 'poll', 'pal'],
    ['hat', 'hut', 'heart', 'hot', 'hate']
  ],
  /* 🌧️ idioms: the idiom, its picture, the meaning, two wrong meanings */
  idiom: [
    ['It is raining cats and dogs', '🌧️🐱🐶', 'It is raining very hard', 'Animals are falling', 'The pets are wet'],
    ['Break a leg', '🎭🦵', 'Good luck', 'Be careful', 'Go to hospital'],
    ['A piece of cake', '🍰✋', 'Very easy', 'Very sweet', 'A small present'],
    ['Under the weather', '🌦️🤒', 'A bit ill', 'Outside in the rain', 'Very happy'],
    ['Spill the beans', '🫘💦', 'Tell the secret', 'Make a mess', 'Cook dinner'],
    ['Cost an arm and a leg', '💪🦵💸', 'Very expensive', 'Very dangerous', 'Very painful'],
    ['Once in a blue moon', '🔵🌙', 'Almost never', 'Every night', 'At the weekend'],
    ['Hit the sack', '👊🛏️', 'Go to bed', 'Get angry', 'Go shopping'],
    ['Let the cat out of the bag', '🐱👜', 'Tell a secret by mistake', 'Buy a pet', 'Open a present']
  ],
  /* 📱 slang: the message, what it means, two wrong meanings, the slang list for the helper */
  slang: [
    ['brb, gonna grab food', 'I will be right back, I am getting food', 'I am bored, I want food', 'Bring me food right now', 'brb=be right back;gonna=going to'],
    ['ngl that movie was mid', 'Honestly, the film was just okay', 'The film was in the middle of the night', 'I did not like the cinema', 'ngl=not gonna lie;mid=average, not great'],
    ['omw!! ttyl', 'I am on my way, talk to you later', 'Oh my god, I am tired', 'I am waiting, call me', 'omw=on my way;ttyl=talk to you later'],
    ['idk, maybe tmrw?', 'I do not know, maybe tomorrow?', 'I do not care, not tomorrow', 'I am sure it is tomorrow', 'idk=I don\'t know;tmrw=tomorrow'],
    ['GG, you carried the team fr', 'Good game, you really helped the team the most', 'You carried the bags for the team', 'The team was angry at you', 'GG=good game;carried=did most of the work;fr=for real'],
    ['lol my dog ate my homework, no cap', 'Funny, my dog really ate my homework', 'My dog ate my hat', 'I am lying about my homework', 'lol=laughing out loud;no cap=no lie, really'],
    ['btw the party is lit', 'By the way, the party is great', 'The party has many lights', 'The party is finished', 'btw=by the way;lit=really fun'],
    ['tbh I\'m lowkey hungry', 'To be honest, I am a little hungry', 'I am very very hungry', 'I am not hungry today', 'tbh=to be honest;lowkey=a little, quietly']
  ],
  /* ✂️ rhyme wires: the word the helper hears, the word that rhymes, four that do not */
  rhyme: [
    ['cat', 'hat', 'cut', 'cot', 'cake', 'kit'],
    ['moon', 'spoon', 'moan', 'mean', 'man', 'mine'],
    ['light', 'night', 'late', 'lot', 'let', 'loot'],
    ['bear', 'chair', 'beer', 'bar', 'boar', 'burn'],
    ['phone', 'bone', 'fun', 'fan', 'fin', 'fine'],
    ['snake', 'cake', 'snack', 'sneak', 'snick', 'smoke'],
    ['house', 'mouse', 'horse', 'hose', 'hats', 'his'],
    ['rain', 'train', 'run', 'ran', 'ring', 'rope']
  ]
};

PARTY.es = {
  song: [
    ['Mi gato canta en el balcón, cree que es un', 'campeón', 'camión', 'champiñón'],
    ['Comí una pizza en la luna, con una cuchara y una', 'aceituna', 'acetona', 'aceitera'],
    ['La abuela baila en el tranvía, con su perro y su', 'tía', 'día', 'tío'],
    ['Perdí un calcetín en el mar, un pez lo quiere', 'llevar', 'lavar', 'llorar'],
    ['El perro va a la playa en coche, quiere un café de', 'noche', 'leche', 'coche'],
    ['Mi móvil cayó en la sopa, ahora huele a', 'ropa', 'copa', 'sopa'],
    ['Bailamos hasta las tres, después comimos un', 'pez', 'mes', 'pie'],
    ['El robot lloró de verdad, quería churros y', 'libertad', 'ciudad', 'mitad'],
    ['Mi corazón hace bum, mi corazón hace', 'pum', 'pan', 'pam'],
    ['Escribí una canción a mi zapato, porque es mi mejor', 'amigo', 'abrigo', 'trigo']
  ],
  karaoke: [
    'Quiero bailar con un dinosaurio esta noche',
    'Mi pizza es mi única amiga',
    'Somos los campeones del sofá',
    'Dame sol y un bocadillo',
    'Veo las estrellas desde mi cocina',
    'Esta noche cantamos, mañana dormimos',
    'Mi gato tiene más fans que yo',
    'No me pares, estoy comiendo churros'
  ],
  twister: [
    'Tres tristes tigres tragaban trigo en un trigal',
    'Pablito clavó un clavito en la calva de un calvito',
    'El perro de San Roque no tiene rabo',
    'Como poco coco como poco coco compro',
    'Erre con erre cigarro erre con erre barril',
    'Pepe Pecas pica papas con un pico',
    'Si tu gusto gustara del gusto que gusta mi gusto',
    'Cuando cuentes cuentos cuenta cuántos cuentos cuentas'
  ],
  radio: [
    ['pero', 'perro', 'pelo', 'peso', 'Pedro'],
    ['casa', 'pasa', 'cara', 'capa', 'caja'],
    ['gato', 'pato', 'dato', 'rato', 'plato'],
    ['pollo', 'polo', 'bollo', 'pozo', 'rollo'],
    ['cielo', 'hielo', 'pelo', 'suelo', 'velo'],
    ['año', 'aro', 'baño', 'paño', 'daño'],
    ['mesa', 'misa', 'musa', 'masa', 'meta'],
    ['carro', 'caro', 'cardo', 'charro', 'barro']
  ],
  idiom: [
    ['Estar en las nubes', '☁️🧍', 'Estar distraído', 'Viajar en avión', 'Tener mucho frío'],
    ['Ser pan comido', '🍞😋', 'Ser muy fácil', 'Tener hambre', 'Ser muy barato'],
    ['Tomar el pelo', '💇‍♂️✋', 'Engañar en broma', 'Cortar el pelo', 'Peinar a alguien'],
    ['Estar como una cabra', '🐐🌀', 'Estar un poco loco', 'Comer mucha hierba', 'Vivir en el campo'],
    ['Costar un ojo de la cara', '👁️💸', 'Ser muy caro', 'Doler mucho', 'Ser muy feo'],
    ['Echar agua al mar', '🪣🌊', 'Hacer algo inútil', 'Limpiar la playa', 'Ir a nadar'],
    ['Meter la pata', '🦶🕳️', 'Equivocarse', 'Bailar mal', 'Perder un zapato'],
    ['Ponerse rojo como un tomate', '🍅😳', 'Tener vergüenza', 'Comer ensalada', 'Tomar mucho sol'],
    ['Dormir como un tronco', '🪵😴', 'Dormir muy bien', 'Dormir en el bosque', 'No dormir nada']
  ],
  slang: [
    ['xq no vienes? tb hay pizza', '¿Por qué no vienes? También hay pizza', 'No vengas, no hay pizza', 'Ven rápido, solo hay pizza', 'xq=por qué;tb=también'],
    ['tqm amiga, bss', 'Te quiero mucho, amiga, besos', 'Tengo que irme, amiga', 'Te espero mañana, besos', 'tqm=te quiero mucho;bss=besos'],
    ['el finde fue guay', 'El fin de semana fue genial', 'El final fue triste', 'El viernes fue aburrido', 'finde=fin de semana;guay=genial'],
    ['porfa, pásame los apuntes xfa', 'Por favor, dame los apuntes', 'Pasa por mi casa', 'Yo te paso los apuntes', 'porfa=por favor;xfa=por favor'],
    ['flipé con el concierto, mazo bueno', 'El concierto me encantó, muy bueno', 'El concierto fue malo', 'No fui al concierto', 'flipar=sorprenderse mucho;mazo=muy (en España)'],
    ['q tal? nos vemos dsp', '¿Qué tal? Nos vemos después', '¿Quién eres? No te veo', 'Hola, nos vemos ayer', 'q=qué;dsp=después'],
    ['k risa jajaja, ntp', 'Qué risa, no te preocupes', 'Qué rabia, no te creo', 'Estoy triste, no puedo', 'k=qué;jajaja=me río;ntp=no te preocupes'],
    ['m voy a dormir, bn8', 'Me voy a dormir, buenas noches', 'Voy a comer, buenos días', 'No puedo dormir, ayuda', 'm=me;bn8=buenas noches']
  ],
  rhyme: [
    ['gato', 'pato', 'gota', 'goto', 'gana', 'gusto'],
    ['luna', 'cuna', 'lana', 'lona', 'loma', 'lima'],
    ['casa', 'masa', 'cosa', 'cesta', 'capa', 'cama'],
    ['perro', 'cerro', 'pera', 'pelo', 'parra', 'pino'],
    ['flor', 'calor', 'flan', 'fila', 'faro', 'fresa'],
    ['mano', 'verano', 'mono', 'mina', 'mapa', 'malo'],
    ['sol', 'col', 'sal', 'sala', 'seta', 'sopa'],
    ['tren', 'bien', 'tres', 'trono', 'tarta', 'tela']
  ]
};

PARTY.da = {
  song: [
    ['Min kat synger i haven, hun har ondt i', 'maven', 'havet', 'magen'],
    ['Jeg spiste pizza på månen, med en lille sølv', 'ske', 'sne', 'kaffe'],
    ['Mormor danser i bussen, hun giver chaufføren et', 'kys', 'lys', 'kyst'],
    ['Jeg tabte min sok i havet, nu bor den i en', 'hval', 'hal', 'sal'],
    ['Hunden kører til stranden, han vil have is og', 'vand', 'sand', 'mand'],
    ['Min telefon faldt i suppen, nu smager den af', 'ost', 'øst', 'post'],
    ['Vi dansede til klokken tre, så skulle vi have', 'te', 'tre', 'ske'],
    ['Robotten græd hele dagen, han ville have is på', 'stranden', 'standen', 'tranen'],
    ['Mit hjerte siger bum, mit hjerte siger', 'dum', 'dam', 'rum'],
    ['Jeg skrev en sang til min sko, for den er min bedste', 'ro', 'bro', 'tro']
  ],
  karaoke: [
    'Jeg vil danse med en dinosaur i aften',
    'Min pizza er min eneste ven',
    'Vi er mestre i at ligge på sofaen',
    'Giv mig solskin og en sandwich',
    'Jeg kan se stjernerne fra mit køkken',
    'I aften synger vi, i morgen sover vi',
    'Min kat har flere fans end mig',
    'Stop mig ikke, jeg spiser rugbrød'
  ],
  twister: [
    'Rødgrød med fløde',
    'Fem flade flødeboller på et fladt flødebollefad',
    'Kokken kogte kogekød i kogekarret',
    'Sytten sure sild i en saltet sildetønde',
    'Tre trætte trolde tripper på trappen',
    'Bispens gipsgebis',
    'Det var en sær sort sag',
    'Svend svinger sværdet svært'
  ],
  radio: [
    ['hus', 'mus', 'lus', 'bus', 'hos'],
    ['sol', 'stol', 'sul', 'sal', 'søl'],
    ['bil', 'pil', 'bol', 'bul', 'vil'],
    ['mand', 'vand', 'sand', 'land', 'mund'],
    ['kat', 'hat', 'kær', 'kit', 'nat'],
    ['ost', 'øst', 'post', 'kost', 'rist'],
    ['bord', 'ord', 'jord', 'nord', 'bort'],
    ['lys', 'lus', 'kys', 'lyst', 'los']
  ],
  idiom: [
    ['Det regner skomagerdrenge', '🌧️👦🔨', 'Det regner meget', 'Drenge falder ned', 'Skoene bliver våde'],
    ['At have en finger med i spillet', '☝️🎲', 'At være med til noget', 'At spille kort', 'At have ondt i fingeren'],
    ['At tage benene på nakken', '🦵🏃', 'At løbe meget hurtigt', 'At lave yoga', 'At falde ned'],
    ['Der er ugler i mosen', '🦉🌿', 'Noget er mistænkeligt', 'Der er dyr i skoven', 'Det er nat'],
    ['At købe katten i sækken', '🐱👜', 'At købe noget uden at se det', 'At købe et kæledyr', 'At gå på indkøb'],
    ['Det er ikke mit bord', '🙅🪑', 'Det er ikke mit ansvar', 'Jeg har ingen møbler', 'Jeg spiser ikke her'],
    ['At gå som katten om den varme grød', '🐱🥣', 'At undgå at sige det vigtige', 'At spise langsomt', 'At være sulten'],
    ['At slå to fluer med ét smæk', '🪰🪰👋', 'At klare to ting på én gang', 'At være vred på fluer', 'At klappe i hænderne'],
    ['Nu skal du høre løjer', '👂🤡', 'Nu kommer der noget sjovt', 'Du skal til lægen', 'Du skal synge']
  ],
  slang: [
    ['hva så? ses vi ik?', 'Hvad så? Ses vi ikke?', 'Hvor er du? Jeg kan ikke se dig', 'Hej, vi ses aldrig', 'hva så=hvad så, hej;ik=ikke'],
    ['det var vildt nice', 'Det var rigtig godt', 'Det var et vildt dyr', 'Det var lidt kedeligt', 'vildt=meget;nice=godt'],
    ['jeg er mega træt, smutter', 'Jeg er meget træt, jeg går nu', 'Jeg er en stor træ', 'Jeg er glad og bliver her', 'mega=meget;smutte=gå'],
    ['lol, han er så cringe', 'Haha, han er så pinlig', 'Han er så sød', 'Han er meget sur', 'lol=jeg griner;cringe=pinlig'],
    ['np, vi ses imorn', 'Intet problem, vi ses i morgen', 'Nej tak, vi ses aldrig', 'Ny plan, vi ses i dag', 'np=intet problem;imorn=i morgen'],
    ['skal vi hygge? kom nu', 'Skal vi have det rart sammen? Kom nu', 'Skal vi arbejde? Kom nu', 'Skal vi skændes? Gå nu', 'hygge=have det rart'],
    ['det er sgu for sejt', 'Det er virkelig rigtig sejt', 'Det er for langsomt', 'Det er ikke sejt', 'sgu=virkelig (stærkt ord);sejt=cool'],
    ['tak for i dag, kh', 'Tak for i dag, kærlig hilsen', 'Tak for maden, kom hjem', 'Undskyld, kan du hjælpe', 'kh=kærlig hilsen']
  ],
  rhyme: [
    ['kat', 'hat', 'kop', 'kit', 'kage', 'kok'],
    ['sol', 'stol', 'sal', 'sild', 'syl', 'sur'],
    ['hus', 'mus', 'hav', 'hest', 'hund', 'hit'],
    ['bil', 'pil', 'bold', 'bad', 'bog', 'bus'],
    ['mand', 'vand', 'mund', 'mel', 'mos', 'mur'],
    ['fisk', 'disk', 'fest', 'fod', 'fly', 'fem'],
    ['sko', 'ko', 'ske', 'sky', 'sne', 'sø'],
    ['nat', 'kat', 'not', 'net', 'nul', 'næse']
  ]
};
