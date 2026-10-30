(function () {
    const g = window.FLG;
    const text = window.I18N.text;
    const nameFirst = [
        { pt: "Cripta", en: "Crypt" }, { pt: "Covil", en: "Lair" }, { pt: "Poço", en: "Well" },
        { pt: "Ruína", en: "Ruin" }, { pt: "Câmara", en: "Chamber" }, { pt: "Labirinto", en: "Maze" }
    ];
    const nameSecond = [
        { pt: "das Cinzas", en: "of Ash" }, { pt: "sob a Colina", en: "Beneath the Hill" },
        { pt: "dos Ecos", en: "of Echoes" }, { pt: "do Rei Esquecido", en: "of the Forgotten King" },
        { pt: "da Raiz Negra", en: "of the Black Root" }, { pt: "dos Sussurros", en: "of Whispers" }
    ];
    const creators = [
        { pt: "Um senhor local a mandou erguer para esconder seus bens.", en: "A local lord ordered it built to hide their wealth." },
        { pt: "Uma comunidade antiga buscava abrigo de um perigo externo.", en: "An ancient community sought shelter from an outside threat." },
        { pt: "Um grupo de devotos escavou o local para cumprir um voto.", en: "A group of devotees dug the site to fulfill a vow." },
        { pt: "Mineradores abriram os primeiros túneis e descobriram algo abaixo.", en: "Miners opened the first tunnels and found something below." },
        { pt: "Um estrategista transformou uma gruta em posto de defesa.", en: "A strategist turned a cavern into a defensive outpost." },
        { pt: "A construção começou como projeto de uma pessoa obcecada.", en: "Construction began as the project of an obsessed individual." },
        { pt: "Prisioneiros foram forçados a escavar por ordem de um governante.", en: "Prisoners were forced to dig on a ruler's orders." },
        { pt: "A ruína cresceu ao redor de um marco natural considerado sagrado.", en: "The ruin grew around a natural landmark considered sacred." },
        { pt: "Uma sociedade secreta precisava de um lugar para se reunir.", en: "A secret society needed a place to gather." },
        { pt: "O local foi adaptado de uma construção muito mais antiga.", en: "The site was adapted from a much older structure." },
        { pt: "Um artesão projetou as passagens para confundir invasores.", en: "An artisan designed the passages to confuse intruders." },
        { pt: "Ninguém sabe quem iniciou a obra; cada sala parece de uma época diferente.", en: "No one knows who began the work; each chamber seems to belong to a different era." }
    ];
    const purposes = [
        { pt: "guardar uma relíquia que não deveria ser encontrada", en: "to guard a relic that should not be found" },
        { pt: "servir de abrigo durante uma guerra", en: "to serve as shelter during a war" },
        { pt: "conter algo perigoso", en: "to contain something dangerous" },
        { pt: "proteger uma rota secreta entre regiões", en: "to protect a hidden route between regions" },
        { pt: "abrigar uma comunidade isolada", en: "to house an isolated community" },
        { pt: "ocultar uma fonte de riqueza", en: "to conceal a source of wealth" },
        { pt: "realizar cerimônias longe de olhares curiosos", en: "to hold ceremonies away from prying eyes" },
        { pt: "experimentar técnicas de construção incomuns", en: "to experiment with unusual building methods" },
        { pt: "vigiar uma passagem por onde algo poderia retornar", en: "to watch a passage through which something might return" },
        { pt: "manter prisioneiros longe de qualquer povoado", en: "to keep prisoners far from any settlement" },
        { pt: "preservar registros e conhecimentos de outra era", en: "to preserve records and knowledge from another age" },
        { pt: "dar a impressão de que o lugar estava abandonado", en: "to make the place appear abandoned" }
    ];
    const histories = [
        { pt: "Um incêndio interrompeu a vida no local; marcas de fuligem ainda cobrem o teto.", en: "A fire ended life here; soot still stains the ceiling." },
        { pt: "Os ocupantes partiram às pressas, deixando para trás objetos pessoais.", en: "The occupants fled in haste, leaving personal belongings behind." },
        { pt: "Uma disputa interna dividiu o lugar em áreas rivais.", en: "An internal feud split the site into rival sections." },
        { pt: "Um deslizamento bloqueou a saída principal e alterou o fluxo de água.", en: "A collapse blocked the main exit and changed the water flow." },
        { pt: "O local foi tomado por um grupo que não conhecia sua estrutura.", en: "The site was seized by a group unfamiliar with its layout." },
        { pt: "Uma cerimônia saiu do controle e deixou sinais difíceis de explicar.", en: "A ceremony went wrong and left signs that are hard to explain." },
        { pt: "Uma parte da construção foi desmontada para reaproveitar suas pedras.", en: "Part of the structure was dismantled for its stone." },
        { pt: "Um antigo morador continua voltando, embora ninguém saiba por quê.", en: "An old resident keeps returning, though no one knows why." },
        { pt: "A passagem do tempo foi interrompida por uma inundação repentina.", en: "The passage of time was interrupted by a sudden flood." },
        { pt: "Os registros locais dizem que o lugar foi selado por decisão coletiva.", en: "Local records say the place was sealed by a collective decision." },
        { pt: "Uma expedição recente desapareceu sem deixar trilha de volta.", en: "A recent expedition vanished without leaving a trail back." },
        { pt: "A ruína mudou de função tantas vezes que ninguém conhece sua planta original.", en: "The ruin changed purpose so often that no one knows its original layout." }
    ];
    const inhabitants = [
        { pt: "um bando de saqueadores que conhece as entradas laterais", en: "a band of scavengers who know the side entrances" },
        { pt: "animais que fizeram seus ninhos em áreas secas", en: "animals nesting in the dry areas" },
        { pt: "um pequeno grupo que evita acender luzes", en: "a small group that avoids lighting fires" },
        { pt: "uma criatura solitária que defende seu território", en: "a solitary creature defending its territory" },
        { pt: "guardas que acreditam estar cumprindo ordens recentes", en: "guards who believe they are following recent orders" },
        { pt: "ninguém à vista, embora haja sinais de presença recente", en: "no one in sight, though signs of recent activity remain" },
        { pt: "um bando de criaturas que se comunica por ruídos no escuro", en: "a group of creatures that communicates with sounds in the dark" },
        { pt: "um eremita que transformou uma sala em moradia", en: "a hermit who turned one chamber into a home" },
        { pt: "um grupo de viajantes preso após o colapso de um corredor", en: "a group of travelers trapped by a collapsed passage" },
        { pt: "um guardião que não distingue visitantes de invasores", en: "a guardian unable to distinguish visitors from intruders" },
        { pt: "uma comunidade escondida que não quer ser encontrada", en: "a hidden community that does not want to be found" },
        { pt: "rastros recentes, mas nenhum habitante pode ser localizado", en: "fresh tracks, but no inhabitant can be found" }
    ];
    const entrances = [
        { pt: "Uma escadaria desce por trás de uma parede caída.", en: "A stairway descends behind a fallen wall." },
        { pt: "A entrada fica no fundo de um poço seco.", en: "The entrance lies at the bottom of a dry well." },
        { pt: "Uma fenda estreita se abre apenas quando a água baixa.", en: "A narrow cleft opens only when the water recedes." },
        { pt: "A porta está escondida sob raízes grossas.", en: "The door is hidden beneath thick roots." },
        { pt: "Um arco de pedra leva a uma passagem parcialmente soterrada.", en: "A stone arch leads to a partly buried passage." },
        { pt: "A entrada parece uma abertura natural, mas suas paredes são talhadas.", en: "The entrance looks natural, but its walls are carved." },
        { pt: "Um alçapão enferrujado fica no piso de uma construção em ruínas.", en: "A rusted hatch lies in the floor of a ruined building." },
        { pt: "Um túnel emerge junto ao leito de um rio.", en: "A tunnel emerges beside a riverbed." },
        { pt: "A passagem está atrás de uma queda d'água estreita.", en: "The passage lies behind a narrow waterfall." },
        { pt: "Uma trilha íngreme leva a uma porta no alto do rochedo.", en: "A steep path leads to a door high on the cliff." },
        { pt: "A entrada fica no interior de uma árvore oca.", en: "The entrance is inside a hollow tree." },
        { pt: "Uma porta de pedra está nivelada com o chão e coberta por detritos.", en: "A stone door sits level with the ground, covered in debris." }
    ];
    const doors = [
        { pt: "A porta está destrancada, mas inchada pela umidade.", en: "The door is unlocked but swollen from damp." },
        { pt: "Uma tranca simples pode ser aberta pelo lado de dentro.", en: "A simple latch can be opened from the inside." },
        { pt: "A porta está presa por pedras e exige força para se mover.", en: "The door is jammed with stones and takes force to move." },
        { pt: "Uma fechadura antiga ainda funciona.", en: "An old lock still works." },
        { pt: "A porta foi reforçada recentemente com metal reaproveitado.", en: "The door was recently reinforced with salvaged metal." },
        { pt: "O acesso está livre, mas o piso logo depois cede sob peso.", en: "The way is open, but the floor just beyond gives under weight." }
    ];
    const roomTypes = [
        { pt: "corredor estreito", en: "narrow corridor" },
        { pt: "câmara baixa com teto sustentado por pilares", en: "low chamber with a pillar-supported ceiling" },
        { pt: "salão amplo com marcas de uso", en: "broad hall bearing signs of use" },
        { pt: "escadaria ou mudança abrupta de nível", en: "stairway or abrupt change in level" },
        { pt: "sala fechada com uma única saída visível", en: "sealed room with one visible exit" },
        { pt: "espaço irregular formado por uma rachadura na rocha", en: "uneven space formed by a split in the rock" }
    ];
    const roomContents = [
        { pt: "restos de uma refeição deixada sobre uma mesa", en: "remains of a meal left on a table" },
        { pt: "ferramentas quebradas e fragmentos de madeira", en: "broken tools and scraps of wood" },
        { pt: "um acúmulo de água escura", en: "a pool of dark water" },
        { pt: "marcas recentes no pó, indo até a próxima passagem", en: "fresh marks in the dust leading to the next passage" },
        { pt: "um monte de ossos coberto por tecido apodrecido", en: "a pile of bones under rotting cloth" },
        { pt: "uma parede coberta por símbolos e riscos sobrepostos", en: "a wall covered in overlapping symbols and scratches" },
        { pt: "um ninho feito de palha, cordas e pedaços de roupa", en: "a nest woven from straw, rope, and scraps of clothing" },
        { pt: "móveis presos ao chão por ferrugem ou raízes", en: "furniture fixed to the floor by rust or roots" }
    ];
    const exits = [
        { pt: "Uma passagem baixa segue para a esquerda.", en: "A low passage continues to the left." },
        { pt: "Duas portas ficam frente a frente.", en: "Two doors face each other." },
        { pt: "Um corredor leva a uma escadaria descendente.", en: "A corridor leads to a descending stairway." },
        { pt: "A sala não tem outra saída aparente.", en: "The room has no other apparent exit." },
        { pt: "Uma abertura estreita permite avançar de lado.", en: "A narrow opening can only be crossed sideways." },
        { pt: "Uma passagem sobe até uma área mais seca.", en: "A passage rises toward a drier area." }
    ];
    const traps = [
        { pt: "placas soltas ocultam um fosso raso", en: "loose flagstones conceal a shallow pit" },
        { pt: "um mecanismo dispara uma chuva de estilhaços", en: "a mechanism releases a spray of shards" },
        { pt: "um fio quase invisível aciona uma grade", en: "a nearly invisible wire drops a portcullis" },
        { pt: "um gás irritante escapa de uma abertura na parede", en: "irritating gas leaks from a wall vent" },
        { pt: "o piso inclinado conduz a uma câmara alagada", en: "a sloped floor leads into a flooded chamber" },
        { pt: "um contrapeso solta pedras sobre a passagem", en: "a counterweight drops stones across the passage" }
    ];
    const treasures = [
        { pt: "um estojo de couro com um mapa incompleto", en: "a leather case holding an incomplete map" },
        { pt: "uma lâmina bem conservada com marca de um antigo dono", en: "a well-kept blade marked with its former owner's sign" },
        { pt: "um conjunto de moedas de épocas diferentes", en: "a collection of coins from several eras" },
        { pt: "um frasco selado que ainda contém um líquido escuro", en: "a sealed vial still holding a dark liquid" },
        { pt: "uma peça de joalheria escondida dentro de uma estátua oca", en: "a piece of jewelry hidden inside a hollow statue" },
        { pt: "um caderno de anotações escrito em código", en: "a notebook written in code" },
        { pt: "um objeto de osso polido que vibra perto de água", en: "a polished bone object that vibrates near water" },
        { pt: "uma chave sem fechadura conhecida", en: "a key with no known lock" }
    ];
    const peculiarities = [
        { pt: "As chamas ficam azuladas em certas salas.", en: "Flames turn blue in certain rooms." },
        { pt: "O eco chega antes do som original.", en: "The echo arrives before the original sound." },
        { pt: "Uma parede parece mudar de lugar quando ninguém a observa.", en: "One wall seems to shift when no one is watching." },
        { pt: "A água corre para cima em um trecho curto do corredor.", en: "Water flows uphill along a short stretch of corridor." },
        { pt: "Todos os relógios e ampulhetas param no mesmo ponto.", en: "Every clock and hourglass stops at the same point." },
        { pt: "Há uma sala limpa e seca em meio ao restante da ruína.", en: "One chamber is clean and dry amid the rest of the ruin." },
        { pt: "Vozes distantes repetem palavras ditas pelos visitantes.", en: "Distant voices repeat words spoken by visitors." },
        { pt: "As marcas nas paredes ficam mais recentes à medida que se desce.", en: "The wall marks grow more recent as one descends." }
    ];
    let roomCount = 0;
    let sizeDescription = "";

    function choose(options) {
        return text(g.chooseD66(options));
    }

    function dungeonAge() {
        const result = g.rollD66().value;
        if (result <= 12) {
            return window.I18N.getLanguage() === "pt"
                ? "Antes da Mudança — mais de 1.100 anos"
                : "Before the Shift — over 1,100 years";
        }
        if (result <= 26) {
            return window.I18N.getLanguage() === "pt"
                ? "Antes da Névoa de Sangue — 300–1.100 anos"
                : "Before the Blood Mist — 300–1,100 years";
        }
        if (result <= 36) {
            return window.I18N.getLanguage() === "pt"
                ? "Durante as Guerras do Amieiro — 305–360 anos"
                : "During the Alder Wars — 305–360 years";
        }
        if (result <= 64) {
            return window.I18N.getLanguage() === "pt"
                ? "Durante a Névoa de Sangue — 5–280 anos"
                : "During the Blood Mist — 5–280 years";
        }
        const years = g.rollD6();
        return window.I18N.getLanguage() === "pt"
            ? `Depois da Névoa de Sangue — ${years} anos`
            : `After the Blood Mist — ${years} years`;
    }

    function sizeResult() {
        const category = g.rollD6();
        let formula;
        if (category <= 2) {
            sizeDescription = window.I18N.getLanguage() === "pt" ? "Pequena" : "Small";
            formula = "1D6";
            roomCount = g.rollPool(1);
        } else if (category <= 4) {
            sizeDescription = window.I18N.getLanguage() === "pt" ? "Média" : "Medium";
            formula = "3D6";
            roomCount = g.rollPool(3);
        } else if (category === 5) {
            sizeDescription = window.I18N.getLanguage() === "pt" ? "Grande" : "Large";
            formula = "4D6 + 10";
            roomCount = g.rollPool(4, 10);
        } else {
            sizeDescription = window.I18N.getLanguage() === "pt" ? "Imensa" : "Immense";
            formula = "6D6 + 50";
            roomCount = g.rollPool(6, 50);
        }
        return `${sizeDescription} — ${roomCount} ${window.I18N.getLanguage() === "pt" ? "salas" : "rooms"} (${formula})`;
    }

    g.addGroup("Dungeon overview");
    g.registerField("dungeon-name", "Dungeon name", () => `${choose(nameFirst)} ${choose(nameSecond)}`);
    g.registerField("dungeon-age", "Age", dungeonAge);
    g.registerField("dungeon-size", "Size and rooms", sizeResult, {
        afterRun: seed => g.rerollWithSeed("dungeon-rooms", g.deriveSeed(seed, 0xD06))
    });
    g.registerField("dungeon-creator", "Creator and motive", () => choose(creators));
    g.registerField("dungeon-purpose", "Purpose", () => choose(purposes));
    g.registerField("dungeon-history", "History", () => choose(histories));
    g.registerField("dungeon-inhabitants", "Inhabitants", () => choose(inhabitants));
    g.registerField("dungeon-entrance", "Entrance", () => choose(entrances));
    g.registerField("dungeon-doors", "Doors", () => choose(doors));

    g.addGroup("Dungeon rooms");
    g.registerField("dungeon-rooms", "Rooms and discoveries", () => {
        const results = [];
        for (let room = 1; room <= roomCount; room++) {
            const type = text(roomTypes[g.rollD6() - 1]);
            const content = text(roomContents[g.rollD6() - 1]);
            const exit = text(exits[g.rollD6() - 1]);
            const hasTrap = g.rollD6() <= 2;
            const trap = hasTrap ? text(g.chooseD66(traps)) : (window.I18N.getLanguage() === "pt" ? "sem armadilha evidente" : "no obvious trap");
            results.push(`${window.I18N.getLanguage() === "pt" ? "Sala" : "Room"} ${room}: ${type}; ${content}; ${exit}; ${window.I18N.getLanguage() === "pt" ? "perigo" : "hazard"}: ${trap}.`);
        }
        return results.join("\n\n");
    });
    g.registerField("dungeon-treasure", "Items", () => choose(treasures));
    g.registerField("dungeon-peculiarity", "Dungeon peculiarity", () => choose(peculiarities));
}());
