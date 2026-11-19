/* ===== Last Wire: party bombs — content =====
   Song lines are real lyrics, but only from songs in the public domain (traditional songs and songs whose
   copyright has run out). Every other sentence is original. Film titles and place names are facts, not quotes. */
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
  ['🍕', { en: 'Rome', es: 'Roma', da: 'Rom' }, { en: 'People throw coins into a fountain, and there is a giant old stadium.', es: 'La gente tira monedas a una fuente, y hay un estadio antiguo gigante.', da: 'Folk kaster mønter i et springvand, og der er et kæmpe gammelt stadion.' }],
  ['🏔️', { en: 'Switzerland', es: 'Suiza', da: 'Schweiz' }, { en: 'High mountains, snow all year, cheese with holes and very good chocolate.', es: 'Montañas altas, nieve todo el año, queso con agujeros y chocolate muy bueno.', da: 'Høje bjerge, sne hele året, ost med huller og meget god chokolade.' }],
  ['🌉', { en: 'San Francisco', es: 'San Francisco', da: 'San Francisco' }, { en: 'A red bridge disappears into the fog, and the streets are very steep.', es: 'Un puente rojo desaparece en la niebla, y las calles son muy empinadas.', da: 'En rød bro forsvinder i tågen, og gaderne er meget stejle.' }],
  ['🏰', { en: 'Prague', es: 'Praga', da: 'Prag' }, { en: 'An old stone bridge has thirty statues, and a famous clock shows the planets.', es: 'Un viejo puente de piedra tiene treinta estatuas, y un reloj famoso muestra los planetas.', da: 'En gammel stenbro har tredive statuer, og et berømt ur viser planeterne.' }],
  ['🌷', { en: 'Amsterdam', es: 'Ámsterdam', da: 'Amsterdam' }, { en: 'Houses lean over the canals, and there are more bikes than people.', es: 'Las casas se inclinan sobre los canales, y hay más bicis que personas.', da: 'Husene læner sig over kanalerne, og der er flere cykler end mennesker.' }],
  ['🐫', { en: 'Cairo', es: 'El Cairo', da: 'Kairo' }, { en: 'Three huge pyramids stand in the desert just outside the city.', es: 'Tres pirámides enormes están en el desierto, justo fuera de la ciudad.', da: 'Tre kæmpe pyramider står i ørkenen lige uden for byen.' }],
  ['🗿', { en: 'Easter Island', es: 'Isla de Pascua', da: 'Påskeøen' }, { en: 'Giant stone heads look out over a tiny island in the Pacific.', es: 'Cabezas gigantes de piedra miran desde una isla pequeña del Pacífico.', da: 'Kæmpe stenhoveder kigger ud over en lille ø i Stillehavet.' }],
  ['🎭', { en: 'Venice', es: 'Venecia', da: 'Venedig' }, { en: 'There are no cars, people travel by boat, and masks fill the streets in February.', es: 'No hay coches, la gente va en barco, y en febrero las calles se llenan de máscaras.', da: 'Der er ingen biler, folk sejler i både, og i februar er gaderne fulde af masker.' }],
  ['🐉', { en: 'Beijing', es: 'Pekín', da: 'Beijing' }, { en: 'A very long wall starts near this city, and the old palace has almost a thousand buildings.', es: 'Una muralla muy larga empieza cerca de esta ciudad, y el palacio antiguo tiene casi mil edificios.', da: 'En meget lang mur starter nær byen, og det gamle palads har næsten tusind bygninger.' }]
];

/* the rest is per course language */
PARTY.en = {
  /* 🎵 real lyrics from famous songs that are free to use (public domain): the song, the line with one [word] missing, two words that sound close */
  song: [
    ['Twinkle, Twinkle, Little Star', 'Twinkle, twinkle, little [star], how I wonder what you are', 'car', 'stair'],
    ['Twinkle, Twinkle, Little Star', 'Up above the [world] so high, like a diamond in the sky', 'word', 'whirl'],
    ['Twinkle, Twinkle, Little Star', 'When the blazing [sun] is gone, when he nothing shines upon', 'son', 'sum'],
    ['Jingle Bells', 'Dashing through the [snow] in a one-horse open sleigh', 'slow', 'show'],
    ['Jingle Bells', 'Oh what fun it is to [ride] in a one-horse open sleigh', 'write', 'hide'],
    ['Jingle Bells', 'O\'er the [fields] we go, laughing all the way', 'feels', 'wheels'],
    ['Happy Birthday', 'Happy [birthday] to you, happy birthday to you', 'Thursday', 'Earth day'],
    ['Row, Row, Row Your Boat', 'Row, row, row your [boat], gently down the stream', 'goat', 'coat'],
    ['Row, Row, Row Your Boat', 'Gently down the [stream], merrily, merrily, merrily, merrily', 'dream', 'scream'],
    ['Row, Row, Row Your Boat', 'Merrily, merrily, merrily, merrily, life is but a [dream]', 'cream', 'team'],
    ['Old MacDonald', 'Old MacDonald had a [farm], E-I-E-I-O', 'arm', 'form'],
    ['Old MacDonald', 'And on that farm he had a [cow], E-I-E-I-O', 'cat', 'car'],
    ['Old MacDonald', 'With a moo moo [here] and a moo moo there', 'hair', 'year'],
    ['Mary Had a Little Lamb', 'Mary had a little [lamb], its fleece was white as snow', 'lamp', 'jam'],
    ['Mary Had a Little Lamb', 'And everywhere that Mary [went], the lamb was sure to go', 'want', 'wind'],
    ['Mary Had a Little Lamb', 'It followed her to [school] one day, which was against the rule', 'pool', 'stool'],
    ['London Bridge', 'London Bridge is falling [down], falling down, falling down', 'town', 'gown'],
    ['London Bridge', 'London Bridge is falling down, my fair [lady]', 'baby', 'lazy'],
    ['London Bridge', 'Build it up with [wood] and clay, wood and clay, wood and clay', 'food', 'wool'],
    ['Auld Lang Syne', 'Should auld acquaintance be [forgot] and never brought to mind', 'forget', 'forgive'],
    ['Silent Night', 'Silent night, holy [night], all is calm, all is bright', 'nine', 'kite'],
    ['Amazing Grace', 'Amazing grace, how sweet the [sound] that saved a wretch like me', 'sand', 'round'],
    ['Amazing Grace', 'I once was [lost], but now am found', 'last', 'cost'],
    ['Amazing Grace', 'Was blind, but now I [see]', 'sea', 'tea'],
    ['Oh! Susanna', 'Oh, Susanna, oh don\'t you [cry] for me', 'try', 'fly'],
    ['Oh! Susanna', 'Oh, I come from Alabama with a [banjo] on my knee', 'mango', 'bingo'],
    ['Oh! Susanna', 'I\'m going to Louisiana, my true [love] for to see', 'glove', 'dove'],
    ['Yankee Doodle', 'Yankee Doodle went to [town] a-riding on a pony', 'down', 'gown'],
    ['Take Me Out to the Ball Game', 'Take me out to the ball [game], take me out with the crowd', 'gate', 'name'],
    ['Take Me Out to the Ball Game', 'Buy me some peanuts and Cracker [Jack]', 'snack', 'black'],
    ['Take Me Out to the Ball Game', 'I don\'t care if I never get [back]', 'black', 'pack'],
    ['Daisy Bell', 'Daisy, Daisy, give me your [answer], do', 'anchor', 'dancer'],
    ['Daisy Bell', 'I\'m half [crazy] all for the love of you', 'lazy', 'daisy'],
    ['Daisy Bell', 'It won\'t be a stylish [marriage], I can\'t afford a carriage', 'garage', 'message'],
    ['Itsy Bitsy Spider', 'The itsy bitsy spider climbed up the water [spout]', 'sprout', 'scout'],
    ['Itsy Bitsy Spider', 'Down came the [rain] and washed the spider out', 'train', 'lane'],
    ['Itsy Bitsy Spider', 'Out came the [sun] and dried up all the rain', 'son', 'fun'],
    ['My Bonnie', 'My Bonnie lies over the [ocean], my Bonnie lies over the sea', 'motion', 'potion'],
    ['My Bonnie', 'Bring back, bring back, oh bring back my [Bonnie] to me', 'money', 'bunny'],
    ['My Bonnie', 'Last night as I lay on my [pillow]', 'willow', 'yellow'],
    ['When the Saints Go Marching In', 'Oh when the [saints] go marching in', 'sense', 'sins'],
    ['When the Saints Go Marching In', 'Oh Lord, I want to be in that [number]', 'summer', 'lumber'],
    ['When the Saints Go Marching In', 'Oh when the [sun] refuse to shine', 'son', 'sign'],
    ['Drunken Sailor', 'What shall we do with the drunken [sailor] early in the morning', 'tailor', 'sailing'],
    ['Drunken Sailor', 'Way hay and up she [rises], early in the morning', 'prizes', 'sizes'],
    ['Drunken Sailor', 'Put him in the long [boat] till he\'s sober', 'coat', 'goat']
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
    'Black background brown background',
    'How much wood would a woodchuck chuck if a woodchuck could chuck wood',
    'Betty bought a bit of better butter',
    'Lesser leather never weathered wetter weather better',
    'A big black bug bit a big black bear'
  ],
  /* 📻 five words that sound close; the helper hears each one inside a sentence */
  radio: [
    [['ship', 'We watched a big ship sail past the island.'], ['sheep', 'The farmer counts every sheep before he goes to bed.'], ['chip', 'My laptop needs a new chip to work again.'], ['cheap', 'This hotel is cheap but very clean.'], ['shop', 'She opened a small shop next to the station.']],
    [['bad', 'That was a bad idea, but it was fun.'], ['bed', 'The cat jumped on my bed at five in the morning.'], ['bat', 'A tiny bat flew into the kitchen last night.'], ['bet', 'I bet ten euros that it will rain tomorrow.'], ['bid', 'He made a bid for the old guitar online.']],
    [['live', 'We live in a flat above a bakery.'], ['leave', 'Please leave your shoes at the door.'], ['life', 'My grandma has had a very exciting life in Paris.'], ['leaf', 'A yellow leaf fell into my coffee.'], ['love', 'I love the smell of fresh bread.']],
    [['three', 'My brother has three cats and a parrot.'], ['tree', 'The kids built a house in the old tree behind school.'], ['free', 'The museum is free on Sunday mornings.'], ['tea', 'Would you like a cup of tea with honey?'], ['see', 'I can see the mountains from my window.']],
    [['walk', 'We walk to the beach every evening.'], ['work', 'My dad has to work on Saturdays.'], ['wok', 'She cooks noodles in a huge wok on Fridays.'], ['woke', 'The baby woke up at four in the morning.'], ['week', 'Next week we are flying to Spain.']],
    [['thin', 'The ice is too thin for skating today.'], ['tin', 'Grandpa keeps his buttons in an old tin box.'], ['fin', 'We saw a shark fin near the boat.'], ['thing', 'The best thing about summer is ice cream.'], ['sin', 'Wasting good chocolate is a sin, my aunt says.']],
    [['pull', 'You have to pull the door, not push it.'], ['pool', 'The hotel pool is open until ten.'], ['pole', 'A bird is sitting on the pole outside.'], ['pile', 'There is a pile of laundry on my chair.'], ['pal', 'My old pal from school visited me today.']],
    [['hat', 'He wore a funny hat to the wedding.'], ['hut', 'We slept in a wooden hut in the forest.'], ['heart', 'Her heart was beating very fast.'], ['hot', 'The soup is too hot to eat now.'], ['hate', 'I hate waking up when it is dark.']],
    [['cap', 'He forgot his cap on the train.'], ['cup', 'I broke my favourite cup this morning.'], ['cop', 'A cop helped the old lady cross the street.'], ['cab', 'We took a cab to the airport at night.'], ['cape', 'The little boy wears a red cape like a hero.']],
    [['sit', 'Please sit next to me at dinner.'], ['seat', 'This seat by the window is mine.'], ['set', 'Can you set the table for six?'], ['sat', 'The dog sat on my new jacket.'], ['soot', 'The old chimney was full of black soot.']],
    [['rock', 'He threw a small rock into the lake.'], ['lock', 'The lock on my bike is broken again.'], ['rack', 'Put your coat on the rack by the door.'], ['rook', 'She moved her rook and won the game.'], ['wreck', 'Divers found an old wreck under the sea.']],
    [['fan', 'Turn on the fan, it is so hot in here.'], ['van', 'The pizza van stops outside every Friday.'], ['fun', 'We had so much fun at the zoo.'], ['fin', 'The dolphin waved its fin at us.'], ['phone', 'My phone is dead again after one hour.']]
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
    ['Let the cat out of the bag', '🐱👜', 'Tell a secret by mistake', 'Buy a pet', 'Open a present'],
    ['The ball is in your court', '🎾👉', 'It is your decision now', 'Go and play tennis', 'You lost the game'],
    ['Cry over spilled milk', '😭🥛', 'Be sad about something you cannot change', 'Clean the kitchen', 'Love milk too much'],
    ['Hold your horses', '✋🐴🐴', 'Wait a moment', 'Go riding now', 'Be very strong']
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
    ['tbh I\'m lowkey hungry', 'To be honest, I am a little hungry', 'I am very very hungry', 'I am not hungry today', 'tbh=to be honest;lowkey=a little, quietly'],
    ['idk tbh, maybe tmrw', 'I do not know, to be honest, maybe tomorrow', 'I know the answer, see you today', 'I am tired, bye forever', 'idk=I don\'t know;tbh=to be honest;tmrw=tomorrow'],
    ['lol that pic is fire', 'Haha, that photo is amazing', 'Help, the photo is burning', 'That picture is too hot to touch', 'lol=laughing out loud;pic=picture;fire=amazing'],
    ['np, ty for the help', 'No problem, thank you for the help', 'No phone, try the help desk', 'I need help, call me', 'np=no problem;ty=thank you'],
    ['ikr, the bus is sooo slow', 'I know, right? The bus is very slow', 'I am in the bus, it is fast', 'The bus is gone, I am sad', 'ikr=I know, right?;sooo=very'],
    ['smh, he forgot my bday again', 'I am disappointed, he forgot my birthday again', 'He sent me a birthday cake again', 'I am smiling, it is his birthday', 'smh=shaking my head;bday=birthday'],
    ['that test was a W', 'The test went really well', 'The test had a lot of W words', 'I failed the test', 'W=a win'],
    ['she ghosted me after one date', 'She stopped answering me after one date', 'She dressed up as a ghost on our date', 'She was scared on our date', 'ghosted=stopped replying'],
    ['jk, I\'m not mad', 'Just kidding, I am not angry', 'I am very angry with you', 'I am not mad, I am crazy', 'jk=just kidding;mad=angry'],
    ['dm me the deets', 'Send me the details in a private message', 'Delete my details', 'Do not message me', 'dm=direct message;deets=details'],
    ['bruh, my phone is at 1%', 'Oh no, my phone battery is almost empty', 'My brother has my phone', 'My phone costs one euro', 'bruh=oh no, really?;1%=battery almost dead'],
    ['wyd? wanna hang out?', 'What are you doing? Do you want to meet?', 'Why did you hang up?', 'Where is your dad? He wants to go out', 'wyd=what (are) you doing;wanna=want to;hang out=spend time together'],
    ['fyi the store closes at 8', 'For your information, the shop closes at 8', 'The shop opens at 8 for you', 'Find your shop before 8', 'fyi=for your information']
  ],
  /* ✂️ the helper hears the sentence; the bomb cuts the wire with the missing [word] among words that rhyme */
  rhyme: [
    ['My [cat] is sleeping on the warm sofa.', 'hat', 'bat', 'rat'],
    ['We watched the [moon] from the roof last night.', 'spoon', 'June', 'tune'],
    ['Please turn on the [light] in the hall.', 'night', 'kite', 'bite'],
    ['A big brown [bear] lives in that forest.', 'chair', 'pear', 'hair'],
    ['My [phone] is always in my back pocket.', 'bone', 'cone', 'stone'],
    ['There is a [snake] under the old bridge.', 'cake', 'lake', 'rake'],
    ['Our [house] has a blue front door.', 'mouse', 'blouse', 'grouse'],
    ['The [train] to London is very late again.', 'rain', 'brain', 'plane'],
    ['I lost my [key] at the beach today.', 'tea', 'bee', 'knee'],
    ['The [king] wears a crown made of gold.', 'ring', 'wing', 'string'],
    ['The [boat] is waiting in the harbour.', 'coat', 'goat', 'note'],
    ['A little [bird] is singing on the roof.', 'word', 'herd', 'third']
  ],
  /* 🔐 the helper hears the three numbers inside a sentence */
  safe: ['First turn the dial to {0}, then go to {1}, and stop at {2} before the timer ends.', 'The code starts with {0}, the middle number is {1}, and the last one is {2} on this safe.']
};

PARTY.es = {
  /* 🎵 letras reales de canciones famosas libres de derechos (dominio público) */
  song: [
    ['Cielito Lindo', 'Ay, ay, ay, ay, canta y no [llores]', 'flores', 'llueves'],
    ['Cielito Lindo', 'De la Sierra Morena, cielito lindo, vienen [bajando]', 'bailando', 'bañando'],
    ['Cielito Lindo', 'Porque cantando se alegran, cielito lindo, los [corazones]', 'canciones', 'cajones'],
    ['La Cucaracha', 'La cucaracha, la cucaracha, ya no puede [caminar]', 'cantar', 'cocinar'],
    ['Las Mañanitas', 'Estas son las mañanitas que cantaba el rey [David]', 'Daniel', 'Madrid'],
    ['Las Mañanitas', 'Despierta, mi bien, despierta, mira que ya [amaneció]', 'anocheció', 'amaestró'],
    ['Las Mañanitas', 'Hoy por ser día de tu [santo] te las cantamos aquí', 'canto', 'llanto'],
    ['De Colores', 'De colores se visten los campos en la [primavera]', 'primera', 'pradera'],
    ['Arroz con leche', 'Arroz con leche, me quiero [casar] con una señorita de San Nicolás', 'cazar', 'cansar'],
    ['Arroz con leche', 'Que sepa [coser], que sepa bordar', 'comer', 'correr'],
    ['Arroz con leche', 'Que sepa abrir la [puerta] para ir a jugar', 'puerto', 'huerta'],
    ['Los pollitos dicen', 'Los pollitos dicen pío, pío, pío, cuando tienen [hambre], cuando tienen frío', 'hombre', 'alambre'],
    ['Los pollitos dicen', 'La gallina busca el [maíz] y el trigo', 'país', 'raíz'],
    ['Los pollitos dicen', 'Les da la comida y les presta [abrigo]', 'amigo', 'trigo'],
    ['Estrellita', 'Estrellita, ¿dónde estás? Me pregunto qué [serás]', 'será', 'verás'],
    ['Estrellita', 'En el cielo o en el [mar], un diamante de verdad', 'bar', 'par'],
    ['Estrellita', 'Estrellita, ¿dónde estás? Me pregunto qué serás, un [diamante] de verdad', 'estudiante', 'elefante'],
    ['Los peces en el río', 'Pero mira cómo beben los [peces] en el río', 'pecas', 'veces'],
    ['Los peces en el río', 'Pero mira cómo beben por ver a Dios [nacer]', 'hacer', 'nadar'],
    ['Los peces en el río', 'Beben y beben y vuelven a [beber]', 'volver', 'barrer'],
    ['Campana sobre campana', 'Campana sobre campana, y sobre campana [una]', 'luna', 'cuna'],
    ['La Bamba', 'Para bailar la [bamba] se necesita una poca de gracia', 'banda', 'rampa'],
    ['La Bamba', 'Yo no soy [marinero], soy capitán, soy capitán', 'carnicero', 'panadero'],
    ['La Bamba', 'Arriba y arriba, y arriba y arriba, por ti [seré]', 'sería', 'sabré'],
    ['El patio de mi casa', 'El patio de mi casa es [particular], cuando llueve se moja como los demás', 'popular', 'peculiar'],
    ['Cumpleaños feliz', 'Cumpleaños feliz, te [deseamos] a ti', 'deseo', 'dejamos'],
    ['Noche de paz', 'Noche de paz, noche de [amor], todo duerme en derredor', 'humor', 'color'],
    ['Los elefantes', 'Un elefante se balanceaba sobre la tela de una [araña]', 'cabaña', 'mañana'],
    ['Los elefantes', 'Como veía que [resistía], fue a llamar a otro elefante', 'existía', 'insistía'],
    ['Los elefantes', 'Dos elefantes se [balanceaban] sobre la tela de una araña', 'bañaban', 'bajaban'],
    ['Debajo un botón', 'Debajo un botón, ton, ton, que encontró Martín, tin, tin, había un [ratón]', 'balcón', 'montón'],
    ['Tengo una muñeca', 'Tengo una muñeca vestida de [azul]', 'abril', 'baúl'],
    ['Tengo una muñeca', 'Con su [camisita] y su canesú', 'camiseta', 'cajita'],
    ['Tengo una muñeca', 'La saqué a [paseo], se me constipó', 'pasillo', 'pasear']
  ],
  twister: [
    'Tres tristes tigres tragaban trigo en un trigal',
    'Pablito clavó un clavito en la calva de un calvito',
    'El perro de San Roque no tiene rabo',
    'Como poco coco como poco coco compro',
    'Erre con erre cigarro erre con erre barril',
    'Pepe Pecas pica papas con un pico',
    'Si tu gusto gustara del gusto que gusta mi gusto',
    'Cuando cuentes cuentos cuenta cuántos cuentos cuentas',
    'Erre con erre cigarro, erre con erre barril',
    'Compré pocas copas, pocas copas compré',
    'Como poco coco como, poco coco compro',
    'El cielo está enladrillado, quién lo desenladrillará'
  ],
  radio: [
    [['pero', 'Quiero ir, pero tengo que trabajar.'], ['perro', 'Mi perro duerme en el sofá todo el día.'], ['pelo', 'Ella tiene el pelo largo y rizado.'], ['peso', 'El médico mira mi peso cada mes.'], ['Pedro', 'Mañana Pedro cumple treinta años.']],
    [['casa', 'Nuestra casa tiene un jardín pequeño.'], ['pasa', '¿Qué pasa con el autobús hoy?'], ['cara', 'Tienes chocolate en la cara, cariño.'], ['capa', 'El mago lleva una capa negra muy larga.'], ['caja', 'Guardo las fotos en una caja de zapatos.']],
    [['gato', 'El gato de mi vecina come pescado.'], ['pato', 'Un pato nada tranquilo en el lago.'], ['dato', 'Ese dato no es correcto, mira otra vez.'], ['rato', 'Espérame un rato en la puerta, por favor.'], ['plato', 'Pon el plato en la mesa, por favor.']],
    [['pollo', 'Hoy comemos pollo con patatas.'], ['polo', 'Mi hermano lleva un polo azul.'], ['bollo', 'Con el café siempre como un bollo.'], ['pozo', 'El agua del pozo está muy fría.'], ['rollo', 'Esta película es un rollo, me aburro.']],
    [['cielo', 'Esta noche el cielo está lleno de estrellas.'], ['hielo', 'Pon más hielo en mi limonada.'], ['pelo', 'Mi abuela se pintó el pelo de azul.'], ['suelo', 'Las llaves están en el suelo del coche.'], ['velo', 'La novia lleva un velo blanco.']],
    [['año', 'Este año quiero aprender a nadar.'], ['aro', 'El perro salta por un aro en el circo.'], ['baño', 'El baño está al final del pasillo.'], ['paño', 'Limpia la mesa con un paño húmedo.'], ['daño', 'El golpe no me hizo daño, tranquila.']],
    [['mesa', 'Deja las llaves en la mesa de la cocina.'], ['misa', 'Mis abuelos van a misa los domingos.'], ['musa', 'Su gata es la musa de todas sus canciones.'], ['masa', 'La masa de la pizza necesita una hora.'], ['meta', 'El corredor llegó a la meta primero.']],
    [['carro', 'Mi tío lava su carro cada sábado.'], ['caro', 'Este restaurante es muy caro para nosotros.'], ['cardo', 'Un cardo con espinas creció en el jardín.'], ['charro', 'El charro canta con un sombrero enorme.'], ['barro', 'Los niños volvieron llenos de barro.']],
    [['vaca', 'La vaca come hierba en el prado.'], ['baca', 'Pusimos las maletas en la baca del coche.'], ['saca', 'Mi madre saca la basura por la noche.'], ['vaga', 'Mi prima es un poco vaga por las mañanas.'], ['paca', 'El granjero carga una paca de paja.']],
    [['beso', 'Mi abuela me da un beso en la frente.'], ['peso', 'Esta maleta tiene mucho peso.'], ['queso', 'Me encanta el queso con membrillo.'], ['hueso', 'El perro esconde un hueso en el jardín.'], ['yeso', 'Llevo el brazo en yeso desde el lunes.']],
    [['llama', 'Mi madre me llama todos los días.'], ['cama', 'Mi gato duerme en mi cama.'], ['dama', 'Una dama elegante entró en el café.'], ['rama', 'Un pájaro canta en la rama del árbol.'], ['fama', 'El cantante busca fama en Madrid.']],
    [['lana', 'Mi abuela teje un gorro de lana.'], ['rana', 'Una rana verde salta en el estanque.'], ['gana', 'Mi equipo siempre gana los domingos.'], ['sana', 'La fruta es muy sana para los niños.'], ['cana', 'Mi padre tiene una cana nueva.']]
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
    ['Dormir como un tronco', '🪵😴', 'Dormir muy bien', 'Dormir en el bosque', 'No dormir nada'],
    ['Tirar la toalla', '🏖️🙌', 'Rendirse', 'Ir a la playa', 'Lavar la ropa'],
    ['Ponerse las pilas', '🔋⚡', 'Empezar a esforzarse', 'Comprar baterías', 'Encender la luz'],
    ['Dar en el clavo', '🔨📌', 'Acertar', 'Arreglar una silla', 'Hacerse daño']
  ],
  slang: [
    ['xq no vienes? tb hay pizza', '¿Por qué no vienes? También hay pizza', 'No vengas, no hay pizza', 'Ven rápido, solo hay pizza', 'xq=por qué;tb=también'],
    ['tqm amiga, bss', 'Te quiero mucho, amiga, besos', 'Tengo que irme, amiga', 'Te espero mañana, besos', 'tqm=te quiero mucho;bss=besos'],
    ['el finde fue guay', 'El fin de semana fue genial', 'El final fue triste', 'El viernes fue aburrido', 'finde=fin de semana;guay=genial'],
    ['porfa, pásame los apuntes xfa', 'Por favor, dame los apuntes', 'Pasa por mi casa', 'Yo te paso los apuntes', 'porfa=por favor;xfa=por favor'],
    ['flipé con el concierto, mazo bueno', 'El concierto me encantó, muy bueno', 'El concierto fue malo', 'No fui al concierto', 'flipar=sorprenderse mucho;mazo=muy (en España)'],
    ['q tal? nos vemos dsp', '¿Qué tal? Nos vemos después', '¿Quién eres? No te veo', 'Hola, nos vemos ayer', 'q=qué;dsp=después'],
    ['k risa jajaja, ntp', 'Qué risa, no te preocupes', 'Qué rabia, no te creo', 'Estoy triste, no puedo', 'k=qué;jajaja=me río;ntp=no te preocupes'],
    ['m voy a dormir, bn8', 'Me voy a dormir, buenas noches', 'Voy a comer, buenos días', 'No puedo dormir, ayuda', 'm=me;bn8=buenas noches'],
    ['ntp, nos vemos mñn', 'No te preocupes, nos vemos mañana', 'No tengo planes, nos vemos nunca', 'No te puedo ver mañana', 'ntp=no te preocupes;mñn=mañana'],
    ['k pasa? q haces?', '¿Qué pasa? ¿Qué haces?', '¿Cuándo pasas? ¿Quién eres?', 'Pasa por casa, haz la cena', 'k=qué;q=qué'],
    ['estoy flipando, q fuerte', 'Estoy muy sorprendido, qué increíble', 'Estoy cansado, qué frío', 'Estoy bailando, qué música', 'flipar=estar muy sorprendido;q fuerte=qué increíble'],
    ['dnd stás? tmb voy', '¿Dónde estás? También voy', '¿De dónde eres? No voy', 'Estoy en casa, no vengas', 'dnd=dónde;stás=estás;tmb=también']
  ],
  rhyme: [
    ['Mi [gato] duerme en la ventana.', 'pato', 'plato', 'rato'],
    ['Esta noche la [luna] está muy grande.', 'cuna', 'duna', 'tuna'],
    ['La [casa] de mi abuela es azul.', 'masa', 'pasa', 'tasa'],
    ['El [perro] del vecino ladra mucho.', 'cerro', 'hierro', 'becerro'],
    ['Me regalaron una [flor] amarilla.', 'color', 'tambor', 'motor'],
    ['Me duele la [mano] desde ayer.', 'grano', 'hermano', 'enano'],
    ['Hoy el [sol] calienta muchísimo.', 'col', 'gol', 'farol'],
    ['El [tren] sale a las ocho en punto.', 'andén', 'sartén', 'rehén'],
    ['Mi [abuela] baila salsa los sábados.', 'escuela', 'cazuela', 'ciruela'],
    ['El [ratón] come queso en la cocina.', 'jamón', 'balcón', 'cajón'],
    ['Mi [hermana] canta en la ducha.', 'ventana', 'manzana', 'campana'],
    ['El [león] duerme bajo un árbol.', 'avión', 'camión', 'melón']
  ],
  safe: ['Primero gira la rueda hasta el {0}, luego hasta el {1} y al final para en el {2} antes de que acabe el tiempo.', 'El código empieza con el {0}, el número del medio es el {1} y el último es el {2} en esta caja fuerte.']
};

PARTY.da = {
  /* 🎵 rigtige sangtekster fra kendte sange, der er frie at bruge (fri af ophavsret) */
  song: [
    ['Der er et yndigt land', 'Der er et yndigt [land], det står med brede bøge', 'lam', 'sand'],
    ['I østen stiger solen op', 'I østen stiger [solen] op, den spreder guld på sky', 'sålen', 'stolen'],
    ['Glade jul', 'Glade jul, dejlige [jul], engle daler ned i skjul', 'hjul', 'hul'],
    ['Glade jul', 'Engle daler ned i [skjul], hid de flyve med paradisgrønt', 'skud', 'stjal'],
    ['Højt fra træets grønne top', 'Højt fra træets grønne top stråler [julens] pragt', 'jordens', 'gulvets'],
    ['Mester Jakob', 'Mester Jakob, mester Jakob, [sover] du, sover du?', 'soler', 'sukker'],
    ['Mester Jakob', 'Hører du [klokken]? Hører du klokken?', 'kokken', 'flokken'],
    ['Bjørnen sover', 'Bjørnen sover, bjørnen sover i sit lune [hi]', 'ni', 'ski'],
    ['Nu er det jul igen', 'Og julen varer lige til [påske]', 'pause', 'faste'],
    ['Kong Christian stod ved højen mast', 'Kong Christian stod ved højen [mast] i røg og damp', 'hast', 'last'],
    ['Jeg er havren', 'Jeg er [havren], jeg har bjælder på', 'haven', 'hagen'],
    ['Den danske sang', 'Den danske sang er en ung, blond [pige]', 'pibe', 'stige'],
    ['Danmark, dejligst vang og vænge', 'Danmark, dejligst vang og [vænge], lukt med bølgen blå', 'penge', 'enge'],
    ['Jeg gik mig over sø og land', 'Jeg gik mig over [sø] og land, der mødte mig en gammel mand', 'sne', 'ø'],
    ['Et barn er født i Betlehem', 'Et barn er født i [Betlehem], thi glæde sig Jerusalem', 'Betania', 'bedstemor'],
    ['Dejlig er jorden', 'Dejlig er [jorden], prægtig er Guds himmel', 'morgen', 'ordet'],
    ['Nu falmer skoven', 'Nu falmer [skoven] trindt om land', 'skolen', 'stoven'],
    ['Lysets engel', 'Lysets [engel] går med glans gennem himlens sale', 'enkel', 'hængsel']
  ],
  twister: [
    'Rødgrød med fløde',
    'Fem flade flødeboller på et fladt flødebollefad',
    'Kokken kogte kogekød i kogekarret',
    'Sytten sure sild i en saltet sildetønde',
    'Tre trætte trolde tripper på trappen',
    'Bispens gipsgebis',
    'Det var en sær sort sag',
    'Svend svinger sværdet svært',
    'Hundrede halte høns hoppede hen over hegnet',
    'Syvogsytti sure sild i en sæk',
    'Glade grise griner i græsset',
    'Tre trætte trolde tripper på taget'
  ],
  radio: [
    [['hus', 'Vi bor i et gult hus ved skoven.'], ['mus', 'Der løb en lille mus hen over gulvet.'], ['bus', 'Jeg tager en bus til arbejde hver morgen.'], ['lus', 'Min søn har fået lus fra børnehaven.'], ['hos', 'I aften spiser vi hos min mormor.']],
    [['sol', 'Der er sol over hele landet i dag.'], ['stol', 'Katten sover på min stol hele dagen.'], ['sal', 'Koncerten er i den store sal på skolen.'], ['sjal', 'Mormor strikker et rødt sjal til mig.'], ['skål', 'Hun spiser havregryn af en blå skål hver morgen.']],
    [['bil', 'Min far har købt en ny bil i går.'], ['pil', 'Han skød en pil lige i midten af skiven.'], ['vil', 'Jeg vil gerne have en is, tak.'], ['mil', 'Vi kørte ti mil for at se havet.'], ['smil', 'Hun har et stort smil på læben i dag.']],
    [['mand', 'En gammel mand fodrer duerne i parken.'], ['vand', 'Kan jeg få et glas vand, tak?'], ['sand', 'Børnene bygger et slot af sand på stranden.'], ['land', 'Danmark er et lille land med mange øer.'], ['mund', 'Tør din mund, du har is over det hele.']],
    [['kat', 'Vores kat sover altid i vindueskarmen.'], ['hat', 'Han har en sjov hat på til festen.'], ['nat', 'I nat kunne jeg slet ikke sove.'], ['mat', 'Jeg er helt mat efter løbeturen i dag.'], ['fat', 'Sæt kagen på et stort fat, tak.']],
    [['ost', 'Jeg vil have ost på mit brød, tak.'], ['øst', 'Solen står op i øst hver morgen.'], ['post', 'Har du fået noget post i dag?'], ['kost', 'Fej gulvet med en kost, tak.'], ['rust', 'Der er rust på min gamle cykel.']],
    [['bord', 'Vi har købt et nyt bord til køkkenet.'], ['ord', 'Det ord kan jeg ikke udtale.'], ['jord', 'Planten skal have mere jord i potten.'], ['nord', 'Vi kører mod nord i sommerferien.'], ['bort', 'Hunden løb bort fra haven i går.']],
    [['hest', 'Min kusine rider på en hvid hest.'], ['fest', 'Vi holder fest for farmor på lørdag.'], ['rest', 'Der er en rest pizza i køleskabet.'], ['gæst', 'Vi har en gæst fra Spanien i denne uge.'], ['vest', 'Han har en varm vest på i dag.']],
    [['fisk', 'Vi spiser fisk med kartofler i aften.'], ['disk', 'Læg kagen på den lange disk ved kassen.'], ['frisk', 'Brødet er helt frisk fra bageren.'], ['pisk', 'Kusken har en lang pisk i hånden.'], ['risk', 'Vi spiller Risk hele søndagen.']],
    [['ko', 'En brun ko står og tygger på marken.'], ['sko', 'Jeg har mistet en sko i parken.'], ['bro', 'Vi cykler over en lang bro hver dag.'], ['ro', 'Bedstefar vil gerne have ro, når han læser.'], ['tro', 'Jeg kan ikke tro, at det er fredag igen.']],
    [['ben', 'Hunden gemmer et ben i haven.'], ['pen', 'Kan jeg låne en pen til testen?'], ['sten', 'Han kaster en flad sten ud i søen.'], ['ven', 'Min bedste ven bor ved siden af.'], ['ren', 'Min skjorte er helt ren igen nu.']],
    [['tal', 'Skriv et tal mellem et og ti.'], ['sal', 'Vi spiser i den store sal.'], ['hval', 'Vi så en hval fra båden.'], ['dal', 'Huset ligger i en grøn dal.'], ['kval', 'Det er en kval at stå op klokken fem.']]
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
    ['Nu skal du høre løjer', '👂🤡', 'Nu kommer der noget sjovt', 'Du skal til lægen', 'Du skal synge'],
    ['At have is i maven', '🧊🫃', 'At være rolig', 'At være sulten', 'At spise is'],
    ['At sidde i saksen', '✂️🪑', 'At være i en svær situation', 'At klippe papir', 'At sidde ned'],
    ['At have en skrue løs', '🔩🧠', 'At være lidt skør', 'At bygge et skab', 'At være meget klog']
  ],
  slang: [
    ['hva så? ses vi ik?', 'Hvad så? Ses vi ikke?', 'Hvor er du? Jeg kan ikke se dig', 'Hej, vi ses aldrig', 'hva så=hvad så, hej;ik=ikke'],
    ['det var vildt nice', 'Det var rigtig godt', 'Det var et vildt dyr', 'Det var lidt kedeligt', 'vildt=meget;nice=godt'],
    ['jeg er mega træt, smutter', 'Jeg er meget træt, jeg går nu', 'Jeg er en stor træ', 'Jeg er glad og bliver her', 'mega=meget;smutte=gå'],
    ['lol, han er så cringe', 'Haha, han er så pinlig', 'Han er så sød', 'Han er meget sur', 'lol=jeg griner;cringe=pinlig'],
    ['np, vi ses imorn', 'Intet problem, vi ses i morgen', 'Nej tak, vi ses aldrig', 'Ny plan, vi ses i dag', 'np=intet problem;imorn=i morgen'],
    ['skal vi hygge? kom nu', 'Skal vi have det rart sammen? Kom nu', 'Skal vi arbejde? Kom nu', 'Skal vi skændes? Gå nu', 'hygge=have det rart'],
    ['det er sgu for sejt', 'Det er virkelig rigtig sejt', 'Det er for langsomt', 'Det er ikke sejt', 'sgu=virkelig (stærkt ord);sejt=cool'],
    ['tak for i dag, kh', 'Tak for i dag, kærlig hilsen', 'Tak for maden, kom hjem', 'Undskyld, kan du hjælpe', 'kh=kærlig hilsen'],
    ['np, tak for hjælpen', 'Intet problem, tak for hjælpen', 'Nej, jeg hjælper ikke', 'Ny plan, hjælp mig', 'np=no problem, intet problem'],
    ['hvad laver du? kommer du ik?', 'Hvad laver du? Kommer du ikke?', 'Hvor er din lave cykel?', 'Du kommer aldrig', 'ik=ikke'],
    ['det er sgu for fedt', 'Det er virkelig godt', 'Det er alt for fedt mad', 'Det er lidt trist', 'sgu=virkelig;fedt=godt'],
    ['mor, jeg er hjemme om lidt', 'Mor, jeg kommer snart hjem', 'Mor, jeg bliver væk i nat', 'Mor, jeg er syg', 'om lidt=snart']
  ],
  rhyme: [
    ['Vores [kat] sover på sofaen hele dagen.', 'hat', 'nat', 'fat'],
    ['Vi bor i et lille [hus] ved havet.', 'mus', 'bus', 'lus'],
    ['Min far vasker sin [bil] hver søndag.', 'pil', 'smil', 'fil'],
    ['En gammel [mand] sidder på bænken i parken.', 'vand', 'sand', 'land'],
    ['Vi spiser [fisk] til aftensmad i dag.', 'disk', 'pisk', 'frisk'],
    ['Hun har en rød [hest] ude på landet.', 'fest', 'gæst', 'vest'],
    ['Jeg har mistet min [sko] i parken.', 'ko', 'bro', 'ro'],
    ['Min [ven] kommer på besøg i morgen.', 'igen', 'pen', 'men'],
    ['Vi drikker [te] i køkkenet om aftenen.', 'ske', 'sne', 'fe'],
    ['Der bor en lille [mus] under gulvet.', 'hus', 'bus', 'lus'],
    ['Min [bror] spiller fodbold hver dag.', 'mor', 'jord', 'nord'],
    ['Vi så en stor [hval] ude på havet.', 'sal', 'tal', 'dal']
  ],
  safe: ['Drej først hjulet til {0}, gå så til {1}, og stop til sidst ved {2}, før tiden løber ud.', 'Koden starter med {0}, det midterste tal er {1}, og det sidste er {2} på dette pengeskab.']
};


/* 🎵 the tune: public-domain recordings on Wikimedia Commons (1888 cylinder; NASA Gemini VI, 1965; U.S. Army,
   Marine and Navy bands). Each song gets an mp3 copy first and the original Ogg file as a fallback. */
PARTY.melody = {
  "Twinkle, Twinkle, Little Star": [
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1f/Twinkle%2C_twinkle_little_star_1_%281888%29.ogg/Twinkle%2C_twinkle_little_star_1_%281888%29.ogg.mp3",
    "https://upload.wikimedia.org/wikipedia/commons/1/1f/Twinkle%2C_twinkle_little_star_1_%281888%29.ogg"
  ],
  "Jingle Bells": [
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/91/Gemini_VI_Jingle_Bells.ogg/Gemini_VI_Jingle_Bells.ogg.mp3",
    "https://upload.wikimedia.org/wikipedia/commons/9/91/Gemini_VI_Jingle_Bells.ogg"
  ],
  "Auld Lang Syne": [
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d4/Auld_Lang_Syne_-_U.S._Army_Band.ogg/Auld_Lang_Syne_-_U.S._Army_Band.ogg.mp3",
    "https://upload.wikimedia.org/wikipedia/commons/d/d4/Auld_Lang_Syne_-_U.S._Army_Band.ogg"
  ],
  "Amazing Grace": [
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/21/Amazing_Grace_US_Marine_Band.ogg/Amazing_Grace_US_Marine_Band.ogg.mp3",
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Amazing_Grace_US_Marine_Band.ogg"
  ],
  "Der er et yndigt land": [
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/06/United_States_Navy_Band_-_Der_er_et_yndigt_land.ogg/United_States_Navy_Band_-_Der_er_et_yndigt_land.ogg.mp3",
    "https://upload.wikimedia.org/wikipedia/commons/0/06/United_States_Navy_Band_-_Der_er_et_yndigt_land.ogg"
  ]
};

/* 📻 DEAD AIR, the radio boss: three movie tracks of ten levels. Each level teaches one word.
   Row: [question (a full sentence, read to the helper), answer, wrong, wrong, wrong] */
PARTY.deadair = [
  { e: '🎬', t: 'Movie words', q: [
    ['What do we call the second film that continues the story of the first one?', 'sequel', 'prequel', 'remake', 'trailer'],
    ['What is the short video that shows scenes from a film before it comes out?', 'trailer', 'sequel', 'poster', 'credits'],
    ['What do we call the bad character who fights against the hero?', 'villain', 'sidekick', 'stuntman', 'narrator'],
    ['What is the music of a film called when you can buy it or stream it?', 'soundtrack', 'screenplay', 'subtitles', 'voice-over'],
    ['What do we call a very expensive film that millions of people go to see?', 'blockbuster', 'flop', 'documentary', 'short film'],
    ['What do we call a big surprise in the story that changes everything?', 'plot twist', 'happy ending', 'flashback', 'opening scene'],
    ['Who is the person who tells the actors what to do and is in charge of the whole film?', 'director', 'critic', 'extra', 'cameraman'],
    ['What are the words at the bottom of the screen that translate what people say?', 'subtitles', 'credits', 'footnotes', 'banners'],
    ['What do we call the hero\'s best friend and helper, like Robin for Batman?', 'sidekick', 'rival', 'villain', 'stranger'],
    ['What is the first public showing of a new film, with the stars on the red carpet?', 'premiere', 'rehearsal', 'audition', 'sequel']
  ] },
  { e: '💬', t: 'Famous movie quotes', q: [
    ['Which movie has the famous line "I\'ll be back", said by a robot from the future?', 'The Terminator', 'RoboCop', 'Predator', 'Total Recall'],
    ['Which movie has the famous line "May the Force be with you"?', 'Star Wars', 'Star Trek', 'Avatar', 'Dune'],
    ['Which movie has the famous line "Houston, we have a problem", said by an astronaut?', 'Apollo 13', 'Gravity', 'Interstellar', 'The Martian'],
    ['Which movie has the famous line "You\'re gonna need a bigger boat", said when the shark appears?', 'Jaws', 'Titanic', 'The Meg', 'Life of Pi'],
    ['Which movie has the famous line "I\'m the king of the world", shouted at the front of a ship?', 'Titanic', 'Avatar', 'The Lion King', 'Pearl Harbor'],
    ['Which movie has the famous line "There\'s no place like home", said by a girl in red shoes?', 'The Wizard of Oz', 'Home Alone', 'Peter Pan', 'Mary Poppins'],
    ['Which movie has the famous line "Life is like a box of chocolates"?', 'Forrest Gump', 'Charlie and the Chocolate Factory', 'Big', 'Cast Away'],
    ['Which movie has the famous line "I see dead people", whispered by a scared little boy?', 'The Sixth Sense', 'Ghostbusters', 'The Others', 'Beetlejuice'],
    ['Which movie has the famous line "To infinity and beyond", said by a toy astronaut?', 'Toy Story', 'Up', 'WALL-E', 'Cars'],
    ['Which movie has the famous line "Why so serious?", said by the Joker?', 'The Dark Knight', 'Iron Man', 'Spider-Man', 'Deadpool']
  ] },
  { e: '🌍', t: 'Movie trivia', q: [
    ['In which country were The Lord of the Rings films made, with all those green mountains?', 'New Zealand', 'Ireland', 'Norway', 'Canada'],
    ['Which city is the home of Hollywood and the American film industry?', 'Los Angeles', 'New York', 'Las Vegas', 'San Francisco'],
    ['Which golden statue do the best films and actors win every year?', 'Oscar', 'Grammy', 'Emmy', 'Nobel'],
    ['Which ocean does the ship cross in the film Titanic before it sinks?', 'Atlantic', 'Pacific', 'Indian', 'Arctic'],
    ['Bollywood is the huge film industry in Mumbai. Which country is it in?', 'India', 'Pakistan', 'Brazil', 'Egypt'],
    ['Which school of magic does Harry Potter go to?', 'Hogwarts', 'Narnia', 'Gotham', 'Atlantis'],
    ['Which dark city does Batman protect at night?', 'Gotham', 'Metropolis', 'Springfield', 'Hogwarts'],
    ['In Finding Nemo, Marlin swims all the way to Sydney to find his son. Which country is Sydney in?', 'Australia', 'New Zealand', 'South Africa', 'Canada'],
    ['The rat chef in Ratatouille cooks in the city of the Eiffel Tower. Which city is it?', 'Paris', 'Rome', 'Lyon', 'Brussels'],
    ['Which famous film festival takes place every May in a town in the south of France?', 'Cannes', 'Venice', 'Berlin', 'Sundance']
  ] }
];

/* 🍿 movie riddles (English): a funny, roundabout description on the bomb; six titles with the helper. [title, description] */
PARTY.plots = [
  ['The Lion King', 'A teenager runs away after his dad dies at work, lives on insects with two unemployed friends, then goes back home to evict his uncle.'],
  ['Titanic', 'A poor artist wins a ticket in a card game, draws a rich girl, and their first date ends badly because of some ice.'],
  ['Jurassic Park', 'A rich grandpa opens a zoo with very, very old animals, ignores every safety rule, and the guests end up on the menu.'],
  ['Finding Nemo', 'A nervous single dad crosses half an ocean, asks a forgetful stranger for directions, and finds his son in a dentist\'s waiting room.'],
  ['Home Alone', 'A big family flies to Paris and forgets one small thing at home, who then defends the house against two burglars with paint cans.'],
  ['Toy Story', 'A cowboy gets very jealous when a new guy with a laser and plastic wings becomes the favourite in the bedroom.'],
  ['Up', 'A grumpy old man ties thousands of balloons to his house and flies to South America, but forgets to check who is on the porch.'],
  ['Frozen', 'A queen with an air-conditioning problem runs away to the mountains, and her sister gets engaged to a man she met that morning.'],
  ['Shrek', 'A grumpy guy who just wants his swamp back goes on a rescue mission with a donkey who never stops talking.'],
  ['Harry Potter', 'A boy who sleeps in a cupboard under the stairs gets a letter from an owl and goes to a boarding school with a very dangerous sports team.'],
  ['The Matrix', 'A computer programmer takes a pill from a man in sunglasses and finds out that his whole life is fake.'],
  ['Jaws', 'A small beach town refuses to close for the summer, even though something big in the water keeps eating the tourists.'],
  ['Ratatouille', 'The best cook in Paris is very small, very hairy, and controls a kitchen boy by pulling his hair under his hat.'],
  ['Back to the Future', 'A teenager borrows a crazy scientist\'s car, drives it much too fast, and accidentally makes his own mum fall in love with him.'],
  ['The Wizard of Oz', 'A girl and her dog travel by tornado, then walk down a yellow road with a man made of straw, a man made of metal and a scared big cat.'],
  ['Star Wars', 'A farm boy, an old monk and a smuggler with a hairy co-pilot try to blow up something that looks like a moon but is not a moon.'],
  ['Inception', 'A team of thieves steals ideas while people sleep, and nobody is sure if the little spinning top ever stops.'],
  ['Ghostbusters', 'Three scientists lose their university jobs and start a cleaning company for houses with very unusual guests.'],
  ['Cinderella', 'A young woman with a terrible stepfamily gets a free makeover from a magical old lady and loses a shoe at midnight.'],
  ['The Terminator', 'A machine travels back in time to make sure a certain baby is never born, and the only thing in its way is a waitress.'],
  ['Spider-Man', 'A shy student gets bitten on a school trip and starts climbing walls and shooting sticky ropes from his wrists.'],
  ['E.T.', 'A lonely boy hides a short, wrinkled visitor in his wardrobe, feeds him sweets, and helps him make a very long-distance phone call.'],
  ['Avatar', 'A soldier who cannot walk gets a tall blue body on another planet and falls in love with the people he was sent to move.'],
  ['Kung Fu Panda', 'A noodle-shop worker who loves dumplings is chosen as the greatest warrior in the land, even though he can hardly climb the stairs.'],
  ['Despicable Me', 'A man who wants to steal the moon adopts three girls to help with the plan, and his small yellow workers love bananas.'],
  ['Pirates of the Caribbean', 'A sailor who has lost his ship and is never quite sober helps a blacksmith save a governor\'s daughter from a crew of skeletons.']
];

/* 🎸 starter songs for My songs: the official recordings on YouTube. Only the links live here;
   the lines come from the player, written under each song as "Artist – Title | the line". */
PARTY.starter = {
  en: [
    ['The Clash – London Calling', 'XN7iEFVLf5c'],
    ['The Mamas & The Papas – California Dreamin\'', 'oU6uUEwZ8FM'],
    ['Creedence Clearwater Revival – Fortunate Son', 'xImsdvr9Mx4'],
    ['Roy Orbison – Oh, Pretty Woman', '3KFvoDDs0XM'],
    ['Ben E. King – Stand By Me', 'hwZNL7QVJjE'],
    ['John Denver – Take Me Home, Country Roads', '1vrEljMfXYo'],
    ['Bob Marley & The Wailers – Three Little Birds', 'HNBCVM4KbUM'],
    ['The Beatles – Let It Be', 'QDYfEBY9NM4']
  ]
};
