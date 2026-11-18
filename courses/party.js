/* ===== Last Wire: party bombs — content =====
   Every sentence here is original. Songs appear only by singer and title (titles are facts, not lyrics):
   no real lyrics anywhere. Film titles and place names are facts, not quotes. */
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
  /* 🎵 famous songs: the singer, the real title with one [word] missing, two words that sound close, and an original sentence the helper hears */
  song: [
    ['Lady Gaga', 'Bad [Romance]', 'Romans', 'Ramen', 'At every party my aunt sings Bad Romance by Lady Gaga until midnight.'],
    ['Lady Gaga', 'Poker [Face]', 'Phase', 'Vase', 'My little brother dances to Poker Face in the kitchen every morning.'],
    ['Justin Bieber', 'What Do You [Mean]', 'Mine', 'Main', 'The whole bus started singing What Do You Mean when it came on the radio.'],
    ['Dua Lipa', 'New [Rules]', 'Roles', 'Rulers', 'My best friend plays New Rules by Dua Lipa in the car all the time.'],
    ['Dua Lipa', "Don't Start [Now]", 'No', 'Night', "We heard Don't Start Now at the wedding and everybody jumped up."],
    ['Ed Sheeran', '[Shape] of You', 'Ship', 'Sheep', 'The baker hums Shape of You by Ed Sheeran while he makes the bread.'],
    ['Taylor Swift', 'Shake It [Off]', 'Of', 'Up', 'My grandma sang Shake It Off at the talent show and won a cake.'],
    ['Adele', 'Rolling in the [Deep]', 'Dip', 'Deal', 'My mum sings Rolling in the Deep in the shower every single day.'],
    ['Michael Jackson', 'Billie [Jean]', 'Gin', 'Jane', 'The DJ played Billie Jean and my dad did the moonwalk on the table.'],
    ['Queen', 'Bohemian [Rhapsody]', 'Rap City', 'Rhapsodies', 'In the car we always scream Bohemian Rhapsody at the top of our lungs.'],
    ['Bruno Mars', 'Uptown [Funk]', 'Fun', 'Punk', 'The teacher put on Uptown Funk and the whole class started dancing.'],
    ['The Weeknd', 'Blinding [Lights]', 'Lies', 'Likes', 'My neighbour plays Blinding Lights so loud that I know every word.'],
    ['Billie Eilish', 'Bad [Guy]', 'Buy', 'Guide', 'My cousin whispers Bad Guy by Billie Eilish to scare her cat.'],
    ['Harry Styles', 'As It [Was]', 'Is', 'Wars', 'Everyone in the café sang As It Was by Harry Styles together.'],
    ['Beyoncé', 'Crazy in [Love]', 'Life', 'Laugh', 'The bride danced to Crazy in Love by Beyoncé with her dog.'],
    ['Coldplay', 'Viva la [Vida]', 'Vita', 'Diva', 'The football fans sang Viva la Vida by Coldplay after the match.'],
    ['Katy Perry', '[Roar]', 'Raw', 'Rear', 'My little sister sings Roar by Katy Perry to the neighbours dog.'],
    ['Rihanna', '[Umbrella]', 'Umbrellas', 'Cinderella', 'When it rains, my uncle sings Umbrella by Rihanna on the bus.']
  ],
  /* 🎤 karaoke: original lines built around famous songs */
  karaoke: [
    'We danced to Dancing Queen by ABBA all night',
    'My dad sings Bohemian Rhapsody in the shower',
    'The whole bus sang Hey Jude by the Beatles',
    'Grandma loves Billie Jean by Michael Jackson',
    'We played Shape of You at the school party',
    'My cat falls asleep when I play Hello by Adele',
    'The DJ put on Uptown Funk and we went crazy',
    'I learned Let It Be on the piano last summer',
    'My sister screams Shake It Off in the car',
    'We heard Bad Romance by Lady Gaga at the wedding',
    'The football fans sang We Are the Champions',
    'My teacher hums Imagine by John Lennon every morning',
    'Our neighbours dance to Despacito on the balcony',
    'I fell asleep listening to Someone Like You',
    'The kids sang Let It Go from Frozen again',
    'We sang Sweet Caroline at the top of our lungs'
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
    ['ikr, the bus is sooo slow', 'I know, right? The bus is very slow', 'I am in the bus, it is fast', 'The bus is gone, I am sad', 'ikr=I know, right?;sooo=very']
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
  /* 🎵 canciones famosas: el título real con una [palabra] que falta */
  song: [
    ['Luis Fonsi', '[Despacito]', 'Despacio', 'Espacio', 'Mi abuela baila Despacito en todas las bodas de la familia.'],
    ['Shakira', 'La [Tortura]', 'Tortuga', 'Tortilla', 'En el coche siempre cantamos La Tortura de Shakira muy alto.'],
    ['Shakira', 'Ojos [Así]', 'Asia', 'Hice', 'Mi profesora de baile pone Ojos Así de Shakira cada lunes.'],
    ['Enrique Iglesias', '[Bailando]', 'Bajando', 'Bañando', 'Toda la playa cantó Bailando de Enrique Iglesias al atardecer.'],
    ['Rosalía', 'Con [Altura]', 'Alturas', 'Hartura', 'Mi prima canta Con Altura de Rosalía mientras cocina.'],
    ['Bad Bunny', '[Tití] Me Preguntó', 'Tía', 'Tito', 'En la fiesta pusieron Tití Me Preguntó y nadie se quedó sentado.'],
    ['Bad Bunny', 'Me Porto [Bonito]', 'Bonita', 'Bendito', 'Mi hermano escucha Me Porto Bonito mientras hace los deberes.'],
    ['Karol G', '[Tusa]', 'Tuya', 'Musa', 'Las chicas del autobús cantaban Tusa de Karol G a gritos.'],
    ['Ricky Martin', '[María]', 'Mía', 'Marina', 'Mi padre baila María de Ricky Martin cuando está contento.'],
    ['Juanes', 'La [Camisa] Negra', 'Camino', 'Cama', 'El camarero canta La Camisa Negra mientras sirve los cafés.'],
    ['Los del Río', '[Macarena]', 'Magdalena', 'Marena', 'En el colegio bailamos Macarena de Los del Río en el patio.'],
    ['Daddy Yankee', '[Gasolina]', 'Golosina', 'Gaseosa', 'El DJ puso Gasolina de Daddy Yankee y todos saltaron.'],
    ['Alejandro Sanz', '[Corazón] Partío', 'Razón', 'Colchón', 'Mi tío canta Corazón Partío de Alejandro Sanz en el karaoke.'],
    ['Enrique Iglesias', '[Héroe]', 'Hierro', 'Huevo', 'Mi madre llora cuando suena Héroe de Enrique Iglesias en la radio.'],
    ['Camilo', 'Vida de [Rico]', 'Rizo', 'Rito', 'Mis amigos cantan Vida de Rico de Camilo en el parque.'],
    ['Marc Anthony', 'Vivir Mi [Vida]', 'Viña', 'Vía', 'Los vecinos bailan Vivir Mi Vida de Marc Anthony en el balcón.'],
    ['Shakira', '[Whenever], Wherever', 'Whatever', 'Wherever', 'En el gimnasio ponen Whenever, Wherever de Shakira cada mañana.'],
    ['Ricky Martin', 'Livin\' la Vida [Loca]', 'Lola', 'Poca', 'Mi tío canta Livin\' la Vida Loca de Ricky Martin en todas las fiestas.']
  ],
  karaoke: [
    'Bailamos Despacito en la boda de mi prima',
    'Mi padre canta La Bamba mientras cocina',
    'Toda la clase bailó Macarena en el patio',
    'Mi abuela escucha Bésame Mucho cada domingo',
    'En el coche cantamos Bailando de Enrique Iglesias',
    'Mi hermana grita La Tortura de Shakira en la ducha',
    'El DJ puso Gasolina y todos saltaron',
    'Mi gato duerme cuando suena Corazón Partío',
    'Los vecinos bailan Vivir Mi Vida en el balcón',
    'Aprendí Cielito Lindo con la guitarra',
    'En la fiesta sonó Tusa de Karol G tres veces',
    'Mi tío canta Livin\' la Vida Loca en el karaoke',
    'Los niños cantan Waka Waka en el autobús',
    'Mi madre llora con Héroe de Enrique Iglesias',
    'Mis amigos bailan La Camisa Negra en el parque',
    'Toda la playa cantó Me Porto Bonito al atardecer'
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
  /* 🎵 kendte sange: den rigtige titel med et [ord], der mangler */
  song: [
    ['Kim Larsen', 'Midt om [natten]', 'nakken', 'hatten', 'Min far synger Midt om natten af Kim Larsen, hver gang han laver mad.'],
    ["Gasolin'", 'Kvinde [min]', 'mild', 'mit', "Til festen spillede bandet Kvinde min af Gasolin', og alle sang med."],
    ['Medina', 'Kun for [mig]', 'mild', 'mod', 'Min storesøster synger Kun for mig af Medina i badet hver morgen.'],
    ['Rasmus Seebach', '[Engel]', 'Enkel', 'Angel', 'Til brylluppet dansede de til Engel af Rasmus Seebach.'],
    ['Lukas Graham', '7 [Years]', 'Ears', 'Yours', 'Hele klassen sang 7 Years af Lukas Graham til afslutningen.'],
    ['Aqua', 'Barbie [Girl]', 'Gold', 'Curl', 'Min mormor danser til Barbie Girl af Aqua i stuen.'],
    ['Shu-bi-dua', 'Den røde [tråd]', 'tår', 'træ', 'Onkel Bent spiller Den røde tråd af Shu-bi-dua på sin guitar.'],
    ['TV-2', 'Det er mig, der står herude og [banker] på', 'danser', 'tanker', 'I bilen synger vi Det er mig, der står herude og banker på af TV-2.'],
    ['Brødrene Olsen', 'Fly on the [Wings] of Love', 'Winks', 'Things', 'Til Melodi Grand Prix sang alle Fly on the Wings of Love med Brødrene Olsen.'],
    ['Emmelie de Forest', 'Only [Teardrops]', 'Teacups', 'Treetops', 'Min lillebror øver Only Teardrops af Emmelie de Forest på klaveret.'],
    ['Ed Sheeran', '[Shape] of You', 'Ship', 'Sheep', 'Bageren nynner Shape of You af Ed Sheeran, mens han bager brød.'],
    ['Dua Lipa', 'New [Rules]', 'Roles', 'Rulers', 'Min bedste ven spiller New Rules af Dua Lipa i bilen hele tiden.'],
    ['Lady Gaga', 'Poker [Face]', 'Phase', 'Vase', 'Min lillebror danser til Poker Face af Lady Gaga i køkkenet hver morgen.'],
    ['Michael Jackson', 'Billie [Jean]', 'Gin', 'Jane', 'DJ\'en spillede Billie Jean af Michael Jackson, og min far lavede moonwalk.'],
    ['Kim Larsen', '[Papirsklip]', 'Papirklip', 'Papskilt', 'Min morfar synger Papirsklip af Kim Larsen, når han maler.'],
    ['Medina', '[Vi to]', 'Vito', 'Fido', 'Til festen sang alle Vi to af Medina i køkkenet.'],
    ['Taylor Swift', 'Shake It [Off]', 'Of', 'Up', 'Min mormor sang Shake It Off af Taylor Swift til talentshowet.'],
    ['Queen', 'Bohemian [Rhapsody]', 'Rap City', 'Rhapsodies', 'I bilen skriger vi altid Bohemian Rhapsody af Queen af fuld hals.']
  ],
  karaoke: [
    'Vi dansede til Barbie Girl af Aqua hele natten',
    'Min far synger Midt om natten i køkkenet',
    'Hele bussen sang Kvinde min af Gasolin\'',
    'Mormor elsker Dancing Queen af ABBA',
    'Til festen spillede de Engel af Rasmus Seebach',
    'Min kat falder i søvn, når jeg spiller Kun for mig',
    'Vi sang Den røde tråd ved lejrbålet',
    'Min lærer nynner Shape of You hver morgen',
    'Hele klassen sang 7 Years til afslutningen',
    'Fodboldfansene sang We Are the Champions',
    'Min søster synger Let It Go fra Frost igen',
    'Vi hørte Bohemian Rhapsody i bilen til Skagen',
    'Naboerne danser til Despacito på altanen',
    'Min bror spiller Billie Jean på guitar',
    'Til brylluppet sang alle Only Teardrops',
    'Vi sang Fly on the Wings of Love i Tivoli'
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
