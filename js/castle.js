(function () {
    const g = window.FLG;
    const text = window.I18N.text;
    const castleTypes = [
        { min: 11, max: 14, name: { pt: "Posto avançado", en: "Outpost" }, size: "small" },
        { min: 15, max: 23, name: { pt: "Fortim", en: "Fortlet" }, size: "small" },
        { min: 24, max: 31, name: { pt: "Torre", en: "Tower" }, size: "small" },
        { min: 32, max: 41, name: { pt: "Forte", en: "Fort" }, size: "medium" },
        { min: 42, max: 52, name: { pt: "Torre de menagem", en: "Keep" }, size: "medium" },
        { min: 53, max: 62, name: { pt: "Fortaleza", en: "Fortress" }, size: "large" },
        { min: 63, max: 66, name: { pt: "Palácio", en: "Palace" }, size: "large" }
    ];
    const purposes = [
        { pt: "controlar uma rota de comércio", en: "to control a trade route" },
        { pt: "proteger uma comunidade próxima", en: "to protect a nearby community" },
        { pt: "manter prisioneiros e reféns", en: "to hold prisoners and hostages" },
        { pt: "vigiar uma região onde algo perigoso foi visto", en: "to watch a region where something dangerous was seen" },
        { pt: "exibir o poder de uma família", en: "to display the power of a family" },
        { pt: "guardar uma passagem estreita entre territórios", en: "to guard a narrow passage between territories" },
        { pt: "dar abrigo a viajantes durante o inverno", en: "to shelter travelers through the winter" },
        { pt: "ocultar uma câmara ou objeto sob suas fundações", en: "to conceal a chamber or object beneath its foundations" },
        { pt: "servir de sede para uma ordem religiosa", en: "to serve as the seat of a religious order" },
        { pt: "manter a população local sob vigilância", en: "to keep the local population under watch" },
        { pt: "servir de refúgio após a queda de outro poder", en: "to serve as a refuge after another power fell" },
        { pt: "marcar um limite que ninguém deveria atravessar", en: "to mark a boundary no one should cross" }
    ];
    const founders = [
        { pt: "um líder militar que recebeu terras como recompensa", en: "a military leader rewarded with land" },
        { pt: "uma família que queria se afastar de seus rivais", en: "a family seeking distance from its rivals" },
        { pt: "um grupo de sobreviventes que construiu um lugar seguro", en: "a group of survivors who built a safe place" },
        { pt: "um governante cujo nome foi removido dos registros", en: "a ruler whose name was removed from the records" },
        { pt: "uma ordem que jurou guardar um segredo", en: "an order sworn to guard a secret" },
        { pt: "um construtor famoso que desapareceu antes da conclusão", en: "a famed builder who vanished before it was finished" },
        { pt: "um senhor local que tomou a construção de seus antigos donos", en: "a local lord who seized it from its former owners" },
        { pt: "uma comunidade que reuniu recursos para erguer defesas comuns", en: "a community that pooled resources to build shared defenses" },
        { pt: "um comandante estrangeiro que nunca voltou para casa", en: "a foreign commander who never returned home" },
        { pt: "um herdeiro sem terras que convenceu outros a segui-lo", en: "a landless heir who persuaded others to follow" },
        { pt: "um artesão que transformou uma ruína em fortaleza", en: "an artisan who turned a ruin into a fortress" },
        { pt: "uma pessoa cuja identidade ainda é debatida", en: "someone whose identity is still disputed" }
    ];
    const histories = [
        { pt: "O castelo mudou de mãos após uma traição durante uma trégua.", en: "The castle changed hands after a betrayal during a truce." },
        { pt: "Um cerco longo terminou sem batalha; os ocupantes simplesmente partiram.", en: "A long siege ended without battle; the occupants simply left." },
        { pt: "Um incêndio destruiu uma ala e os sobreviventes nunca a reconstruíram.", en: "A fire destroyed one wing, and the survivors never rebuilt it." },
        { pt: "O lugar foi abandonado depois que uma família inteira desapareceu.", en: "The place was abandoned after an entire family vanished." },
        { pt: "Uma disputa de herança dividiu o castelo e seus arredores.", en: "An inheritance dispute split the castle and its lands." },
        { pt: "Uma epidemia levou os moradores a selar parte dos aposentos.", en: "An epidemic led residents to seal off part of the chambers." },
        { pt: "Um ocupante transformou a fortaleza em um centro de estudos.", en: "One occupant turned the fortress into a center of study." },
        { pt: "A guarnição se revoltou e expulsou seus próprios comandantes.", en: "The garrison rebelled and expelled its own commanders." },
        { pt: "Uma passagem subterrânea foi descoberta durante uma reforma.", en: "An underground passage was found during renovations." },
        { pt: "O castelo sobreviveu a uma guerra, mas perdeu sua importância política.", en: "The castle survived a war but lost its political importance." },
        { pt: "Um acordo de paz proibiu que suas muralhas fossem reparadas.", en: "A peace agreement forbade repairs to its walls." },
        { pt: "Os moradores contam histórias de uma sala que não aparece nas plantas.", en: "Residents tell of a room missing from every plan." }
    ];
    const occupants = [
        { min: 11, max: 14, group: { pt: "um bando de foras da lei", en: "a band of outlaws" }, counts: ["D6", "2D6", "4D6"] },
        { min: 15, max: 16, group: { pt: "uma caravana de comerciantes", en: "a traveling merchant caravan" }, counts: ["D6", "2D6", "4D6"] },
        { min: 21, max: 23, group: { pt: "uma irmandade armada", en: "an armed brotherhood" }, counts: ["D6", "2D6", "3D6"] },
        { min: 24, max: 25, group: { pt: "um grupo de soldados", en: "a group of soldiers" }, counts: ["D6", "2D6", "4D6"] },
        { min: 26, max: 32, group: { pt: "uma patrulha montada", en: "a mounted patrol" }, counts: ["D6", "2D6", "4D6"] },
        { min: 33, max: 36, group: { pt: "um bando de invasores", en: "a band of raiders" }, counts: ["D6", "2D6", "4D6"] },
        { min: 41, max: 43, group: { pt: "um clã de saqueadores pequenos", en: "a clan of small scavengers" }, counts: ["D6", "3D6", "5D6"] },
        { min: 44, max: 45, group: { pt: "um grande grupo de errantes", en: "a large group of wanderers" }, counts: ["4D6", "6D6", "8D6"] },
        { min: 46, max: 51, group: { pt: "uma família de criaturas enormes", en: "a family of hulking creatures" }, counts: ["D6", "2D6", "2D6"] },
        { min: 52, max: 52, group: { pt: "um grupo de anões viajantes", en: "a group of traveling dwarves" }, counts: ["D6", "2D6", "4D6"] },
        { min: 53, max: 53, group: { pt: "uma comunidade de pequenos colonos", en: "a community of small folk settlers" }, counts: ["D6", "2D6", "4D6"] },
        { min: 54, max: 54, group: { pt: "um grupo de humanoides lupinos", en: "a group of wolf-like folk" }, counts: ["D6", "2D6", "4D6"] },
        { min: 55, max: 55, group: { pt: "uma família élfica", en: "an elven family" }, counts: ["D6", "2D6", "2D6"] },
        { min: 56, max: 56, group: { pt: "um pequeno círculo de feiticeiros", en: "a small circle of sorcerers" }, counts: ["1", "D6", "2D6"] },
        { min: 61, max: 61, group: { pt: "um grupo de ladrões", en: "a band of thieves" }, counts: ["D6", "D6", "D6"] },
        { min: 62, max: 66, group: { pt: "uma criatura solitária e perigosa", en: "a single dangerous creature" }, counts: ["1", "1", "1"] }
    ];
    const emptyCastleResults = [
        { min: 11, max: 16, result: { pt: "Uma colônia de criaturas aladas vive aqui.", en: "A colony of winged creatures lives here." } },
        { min: 21, max: 26, result: { pt: "Um predador solitário se abriga entre as ruínas.", en: "A solitary predator shelters among the ruins." } },
        { min: 31, max: 36, result: null },
        { min: 41, max: 51, result: null },
        { min: 52, max: 65, result: { pt: "O lugar parece vazio, mas uma maldição o assombra: a cada turno de 15 minutos, cada aventureiro sofre um ataque de medo com seis Dados Base.", en: "The place seems empty, but a curse lingers: every 15-minute turn, each adventurer suffers a fear attack with six Base Dice." } },
        { min: 66, max: 66, result: { pt: "O castelo está realmente vazio. Por enquanto.", en: "The castle is truly empty. For now." } }
    ];
    const lurkingCreatures = [
        { pt: "um réptil alado", en: "a winged reptile" },
        { pt: "um troll das cavernas", en: "a cave troll" },
        { pt: "um gigante errante", en: "a wandering giant" },
        { pt: "um caçador de chifres", en: "an antlered hunter" },
        { pt: "um demônio", en: "a demon" },
        { pt: "um dragão antigo", en: "an ancient dragon" }
    ];
    const peculiarities = [
        { pt: "Uma torre projeta sombra na direção errada.", en: "One tower casts its shadow in the wrong direction." },
        { pt: "O portão principal nunca fecha por completo.", en: "The main gate never closes all the way." },
        { pt: "Um brasão desconhecido aparece em vários pontos da pedra.", en: "An unknown crest appears in several places on the stone." },
        { pt: "Um aposento permanece aquecido mesmo nos dias mais frios.", en: "One chamber stays warm even on the coldest days." },
        { pt: "As aves evitam pousar nas ameias.", en: "Birds refuse to land on the battlements." },
        { pt: "Um sino toca quando ninguém está perto da torre.", en: "A bell rings when no one is near the tower." },
        { pt: "As fechaduras têm formatos diferentes em cada ala.", en: "Locks have different shapes in every wing." },
        { pt: "Uma árvore cresce no centro do pátio sem qualquer terra visível.", en: "A tree grows in the middle of the yard with no visible soil." }
    ];
    const nameFirst = [
        { pt: "Torre", en: "Tower" }, { pt: "Castelo", en: "Castle" }, { pt: "Bastião", en: "Bastion" },
        { pt: "Fortaleza", en: "Fortress" }, { pt: "Vigia", en: "Watch" }, { pt: "Refúgio", en: "Haven" }
    ];
    const nameSecond = [
        { pt: "da Névoa", en: "of Mist" }, { pt: "do Corvo", en: "of the Raven" },
        { pt: "das Pedras Partidas", en: "of Broken Stone" }, { pt: "do Vale Cinzento", en: "of the Grey Vale" },
        { pt: "da Última Chama", en: "of the Last Flame" }, { pt: "da Vigília", en: "of the Watch" }
    ];
    let sizeClass = "small";
    let castleAgeModifier = 0;

    function choose(options) {
        return text(g.chooseD66(options));
    }

    function selectRange(table, value) {
        return table.find(entry => value >= entry.min && value <= entry.max);
    }

    function castleTypeAndSize() {
        const roll = g.rollD66().value;
        const result = selectRange(castleTypes, roll);
        sizeClass = result.size;
        const sizeLabel = {
            small: { pt: "pequeno", en: "small" },
            medium: { pt: "médio", en: "medium" },
            large: { pt: "grande", en: "large" }
        }[sizeClass];
        return `${text(result.name)} — ${text(sizeLabel)}`;
    }

    function castleAge() {
        const result = g.rollD66().value;
        if (result <= 12) {
            castleAgeModifier = -3;
            return window.I18N.getLanguage() === "pt"
                ? "Antes da Mudança — mais de 1.100 anos"
                : "Before the Shift — over 1,100 years";
        }
        if (result <= 26) {
            castleAgeModifier = -2;
            return window.I18N.getLanguage() === "pt"
                ? "Antes da Névoa de Sangue — 300–1.100 anos"
                : "Before the Blood Mist — 300–1,100 years";
        }
        if (result <= 43) {
            castleAgeModifier = 0;
            return window.I18N.getLanguage() === "pt"
                ? "Durante as Guerras do Amieiro — 305–360 anos"
                : "During the Alder Wars — 305–360 years";
        }
        if (result <= 61) {
            castleAgeModifier = 0;
            return window.I18N.getLanguage() === "pt"
                ? "Durante a Névoa de Sangue — 5–280 anos"
                : "During the Blood Mist — 5–280 years";
        }
        castleAgeModifier = 0;
        const years = g.rollD6();
        return window.I18N.getLanguage() === "pt"
            ? `Depois da Névoa de Sangue — ${years} anos`
            : `After the Blood Mist — ${years} years`;
    }

    function castleCondition() {
        const adjustedRoll = g.rollD6(castleAgeModifier);
        const result = Math.max(1, Math.min(6, adjustedRoll));
        if (result <= 2) {
            return window.I18N.getLanguage() === "pt" ? "Arruinado." : "Ruined.";
        }
        if (result === 3) {
            return window.I18N.getLanguage() === "pt" ? "Decadente." : "Decadent.";
        }
        if (result <= 5) {
            return window.I18N.getLanguage() === "pt" ? "Desgastado." : "Worn.";
        }
        return window.I18N.getLanguage() === "pt" ? "Bem cuidado." : "Well kept.";
    }

    function emptyCastleResult() {
        const roll = g.rollD66().value;
        const result = selectRange(emptyCastleResults, roll);
        if (result.min === 31) {
            const count = g.rollPool(4);
            return window.I18N.getLanguage() === "pt"
                ? `${count} mortos inquietos aguardam na escuridão.`
                : `${count} restless dead wait in the darkness.`;
        }
        if (result.min === 41) {
            const creature = text(lurkingCreatures[g.rollD6() - 1]);
            return window.I18N.getLanguage() === "pt"
                ? `Um grande monstro usa o castelo como covil e logo retornará: ${creature}.`
                : `A great monster uses the castle as a lair and will soon return: ${creature}.`;
        }
        return text(result.result);
    }

    function rollFormula(formula) {
        if (formula === "1") {
            return 1;
        }
        const match = formula.match(/^(\d*)D6$/);
        if (!match) {
            throw new Error(`Unsupported occupant dice formula: ${formula}`);
        }
        return g.rollPool(Number(match[1] || 1));
    }

    function occupantResult() {
        const roll = g.rollD66().value;
        const group = selectRange(occupants, roll);
        const countFormula = group.counts[{ small: 0, medium: 1, large: 2 }[sizeClass]];
        const count = rollFormula(countFormula);
        return window.I18N.getLanguage() === "pt"
            ? `Novo grupo: ${count} — ${text(group.group)} (rolagem: ${countFormula}).`
            : `New group: ${count} — ${text(group.group)} (roll: ${countFormula}).`;
    }

    g.addGroup("Castle overview");
    g.registerField("castle-name", "Castle name", () => `${choose(nameFirst)} ${choose(nameSecond)}`);
    g.registerField("castle-type-size", "Type and size", castleTypeAndSize, {
        afterRun: seed => g.rerollWithSeed("castle-occupants", g.deriveSeed(seed, 0xCA57))
    });
    g.registerField("castle-age", "Age", castleAge, {
        afterRun: seed => g.rerollWithSeed("castle-condition", g.deriveSeed(seed, 0xA6E))
    });
    g.registerField("castle-purpose", "Purpose", () => choose(purposes));
    g.registerField("castle-founder", "Founder", () => choose(founders));
    g.registerField("castle-history", "History", () => choose(histories));
    g.registerField("castle-condition", "Condition", castleCondition);
    g.registerField("castle-empty", "Is it truly empty?", emptyCastleResult);

    g.addGroup("Castle occupants");
    g.registerField("castle-occupants", "New occupants", occupantResult);
    g.registerField("castle-peculiarity", "Castle peculiarity", () => choose(peculiarities));
}());
