(function () {
    const g = window.FLG;
    const text = window.I18N.text;
    const problems = [
        { pt: "A colheita falhou, e as reservas não durarão até a próxima estação.", en: "The harvest failed, and the stores will not last until the next season." },
        { pt: "Uma disputa por terras ameaça dividir famílias que sempre viveram juntas.", en: "A land dispute threatens to divide families that have lived together for generations." },
        { pt: "Algo ronda os rebanhos durante a noite, deixando marcas impossíveis de explicar.", en: "Something prowls around the herds at night, leaving inexplicable tracks." },
        { pt: "Uma dívida antiga voltou à tona, e o credor exige pagamento imediato.", en: "An old debt has resurfaced, and the creditor demands payment at once." },
        { pt: "A água está turva e amarga desde que as últimas chuvas passaram.", en: "The water has turned cloudy and bitter since the last rains." },
        { pt: "Um forasteiro desapareceu; cada morador conta uma versão diferente do caso.", en: "A stranger has vanished, and every villager tells a different version of the story." },
        { pt: "Uma doença se espalha devagar, sem que os curandeiros reconheçam seus sinais.", en: "A sickness is spreading slowly, and the healers do not recognize its signs." },
        { pt: "A patrulha local sumiu, deixando a estrada sem proteção.", en: "The local patrol has disappeared, leaving the road unguarded." },
        { pt: "Uma presença no bosque faz os moradores evitarem o caminho depois do anoitecer.", en: "A presence in the woods keeps villagers off the trail after dark." },
        { pt: "O líder e o conselho discordam sobre para quem a aldeia deve lealdade.", en: "The leader and the council disagree over whom the village should serve." },
        { pt: "Um grupo recém-chegado pede abrigo, mas ninguém concorda em recebê-lo.", en: "A newly arrived group asks for shelter, but no one agrees to take them in." },
        { pt: "Um objeto encontrado nas redondezas despertou cobiça e desconfiança.", en: "An object found nearby has stirred greed and suspicion." }
    ];
    const leaders = [
        { pt: "uma anciã respeitada", en: "a respected elder" },
        { pt: "um caçador que conhece cada trilha", en: "a hunter who knows every trail" },
        { pt: "uma representante escolhida pelas famílias", en: "a representative chosen by the families" },
        { pt: "um antigo soldado", en: "a former soldier" },
        { pt: "uma comerciante de fala mansa", en: "a silver-tongued trader" },
        { pt: "um curandeiro que também julga disputas", en: "a healer who also settles disputes" },
        { pt: "um jovem herdeiro de uma linhagem antiga", en: "a young heir to an old lineage" },
        { pt: "um construtor que organizou a defesa local", en: "a builder who organized the local defense" },
        { pt: "um sacerdote sem templo fixo", en: "a priest with no permanent shrine" },
        { pt: "uma pessoa eleita após uma crise recente", en: "someone elected after a recent crisis" },
        { pt: "um guardião de costumes antigos", en: "a keeper of old customs" },
        { pt: "um recém-chegado que conquistou a confiança local", en: "a newcomer who earned the locals' trust" }
    ];
    const leaderTraits = [
        { pt: "fala pouco e observa tudo.", en: "speaks little and watches everything." },
        { pt: "promete mais do que consegue cumprir.", en: "promises more than they can deliver." },
        { pt: "prefere acordos a confrontos.", en: "prefers bargains to confrontation." },
        { pt: "guarda rancor de uma família influente.", en: "holds a grudge against an influential family." },
        { pt: "protege os moradores mais vulneráveis.", en: "protects the most vulnerable villagers." },
        { pt: "acredita que um presságio recente exige ação.", en: "believes a recent omen demands action." },
        { pt: "não aceita ser questionado em público.", en: "will not be challenged in public." },
        { pt: "mantém contatos secretos fora da aldeia.", en: "keeps secret contacts outside the village." },
        { pt: "faz questão de dividir os recursos com justiça.", en: "insists on distributing resources fairly." },
        { pt: "tem uma história pessoal que ninguém conhece por inteiro.", en: "has a personal history no one knows in full." },
        { pt: "é corajoso, mas age antes de pensar.", en: "is brave, but acts before thinking." },
        { pt: "acredita que a aldeia precisa mudar para sobreviver.", en: "believes the village must change to survive." }
    ];
    const reputations = [
        { pt: "Seus moradores acolhem viajantes, mas fazem perguntas demais.", en: "Its people welcome travelers, but ask too many questions." },
        { pt: "A aldeia é famosa por artesãos habilidosos.", en: "The village is known for its skilled craftspeople." },
        { pt: "Vizinhos dizem que aqui ninguém esquece uma ofensa.", en: "Neighbors say no one here forgets an insult." },
        { pt: "O lugar oferece abrigo seguro quando o tempo vira.", en: "The place offers safe shelter when the weather turns." },
        { pt: "Um costume curioso atrai visitantes de longe.", en: "A curious custom draws visitors from far away." },
        { pt: "Poucos confiam em quem nasceu fora de suas fronteiras.", en: "Few trust anyone born beyond its borders." }
    ];
    const institutions = [
        { pt: "Praça central", en: "Town square" }, { pt: "Santuário", en: "Shrine" },
        { pt: "Oficina", en: "Workshop" }, { pt: "Armazém", en: "Storehouse" },
        { pt: "Posto de vigia", en: "Watch post" }, { pt: "Salão de reuniões", en: "Meeting hall" },
        { pt: "Moinho", en: "Mill" }, { pt: "Defumadouro", en: "Smokehouse" },
        { pt: "Banca de comércio", en: "Trading stall" }, { pt: "Erveiro", en: "Herbalist" },
        { pt: "Ponto de travessia", en: "Ferry landing" }, { pt: "Poço antigo", en: "Old well" }
    ];
    const peculiarities = [
        { pt: "Os moradores deixam uma tigela de comida junto à estrada para visitantes inesperados.", en: "Villagers leave a bowl of food by the road for unexpected visitors." },
        { pt: "Ninguém assobia depois do pôr do sol.", en: "No one whistles after sunset." },
        { pt: "As casas têm marcas coloridas que indicam antigas alianças familiares.", en: "Houses bear colored marks denoting old family alliances." },
        { pt: "Toda decisão importante começa com uma história contada em voz alta.", en: "Every important decision begins with a story told aloud." },
        { pt: "Os moradores enterram ferramentas quebradas em vez de descartá-las.", en: "Villagers bury broken tools rather than throw them away." },
        { pt: "Um sino toca sempre que alguém parte para uma viagem longa.", en: "A bell rings whenever someone leaves on a long journey." },
        { pt: "Os nomes dos mortos são repetidos em cada refeição comunitária.", en: "The dead are named at every communal meal." },
        { pt: "As portas ficam abertas durante o dia, mesmo quando ninguém está em casa.", en: "Doors remain open during the day, even when no one is home." }
    ];
    const innMoods = [
        { pt: "A estalagem é quente e barulhenta, mas as conversas param quando um estranho entra.", en: "The inn is warm and loud, but conversations stop when a stranger enters." },
        { pt: "O salão é simples; o dono oferece notícias junto com a refeição.", en: "The hall is plain; the owner serves news with every meal." },
        { pt: "A casa tem quartos confortáveis e uma reputação duvidosa.", en: "The house has comfortable rooms and a questionable reputation." },
        { pt: "O lugar funciona como ponto de encontro para caçadores e batedores.", en: "The place serves as a meeting spot for hunters and scouts." },
        { pt: "A estalagem é antiga e cheia de objetos que ninguém sabe identificar.", en: "The inn is old and filled with objects no one can identify." },
        { pt: "As refeições são excelentes; a hospitalidade depende do humor do dono.", en: "The meals are excellent; hospitality depends on the owner's mood." }
    ];
    const innSpecialties = [
        { pt: "ensopado de raízes defumadas", en: "stew of smoked roots" },
        { pt: "cerveja escura com ervas locais", en: "dark ale brewed with local herbs" },
        { pt: "pão achatado assado sobre pedra", en: "flatbread baked on a stone" },
        { pt: "peixe seco com molho azedo", en: "dried fish with a sharp sauce" },
        { pt: "torta salgada de caça", en: "savory game pie" },
        { pt: "chá forte servido em canecas de madeira", en: "strong tea served in wooden cups" }
    ];
    const innGuests = [
        { pt: "um mensageiro que não revela de onde veio", en: "a messenger who will not say where they came from" },
        { pt: "uma contadora de histórias com uma versão diferente para cada mesa", en: "a storyteller with a different tale for every table" },
        { pt: "um mercador à procura de um guia", en: "a trader looking for a guide" },
        { pt: "um viajante ferido que pede para não ser reconhecido", en: "an injured traveler asking not to be recognized" },
        { pt: "uma família que espera notícias de alguém desaparecido", en: "a family waiting for news of someone missing" },
        { pt: "um músico cuja canção irrita os moradores", en: "a musician whose song irritates the locals" }
    ];
    const nameStarts = [
        { pt: "O", en: "The" }, { pt: "A", en: "The" }, { pt: "Javali", en: "Boar" },
        { pt: "Corvo", en: "Raven" }, { pt: "Trilha", en: "Trail" }, { pt: "Lareira", en: "Hearth" }
    ];
    const nameEnds = [
        { pt: "da Fronteira", en: "at the Border" }, { pt: "do Último Marco", en: "of the Last Marker" },
        { pt: "e do Machado", en: "and Axe" }, { pt: "da Lua Baixa", en: "of the Low Moon" },
        { pt: "do Caminho Velho", en: "of the Old Road" }, { pt: "dos Viajantes", en: "for Travelers" }
    ];
    let institutionCount = 0;

    function choose(options) {
        return text(g.chooseD66(options));
    }

    function villageSize() {
        const roll = g.rollD6();
        if (roll <= 2) {
            return window.I18N.getLanguage() === "pt"
                ? "Posto avançado — 5–20 habitantes"
                : "Outpost — 5–20 inhabitants";
        }
        if (roll <= 5) {
            return window.I18N.getLanguage() === "pt"
                ? "Vila — 20–100 habitantes"
                : "Village — 20–100 inhabitants";
        }
        return window.I18N.getLanguage() === "pt"
            ? "Aldeia — 100–400 habitantes"
            : "Large village — 100–400 inhabitants";
    }

    function villageAge() {
        const result = g.rollD66().value;
        if (result <= 16) {
            return window.I18N.getLanguage() === "pt"
                ? "Antes da Névoa de Sangue — 300–1.100 anos"
                : "Before the Blood Mist — 300–1,100 years";
        }
        if (result <= 25) {
            return window.I18N.getLanguage() === "pt"
                ? "Durante as Guerras do Amieiro — 305–360 anos"
                : "During the Alder Wars — 305–360 years";
        }
        if (result <= 56) {
            return window.I18N.getLanguage() === "pt"
                ? "Durante a Névoa de Sangue — 5–280 anos"
                : "During the Blood Mist — 5–280 years";
        }
        const years = g.rollD6();
        return window.I18N.getLanguage() === "pt"
            ? `Depois da Névoa de Sangue — ${years} anos`
            : `After the Blood Mist — ${years} years`;
    }

    g.addGroup("Village overview");
    g.registerField("village-size", "Village size", villageSize);
    g.registerField("village-age", "Age", villageAge);
    g.registerField("village-problem", "Current problem", () => choose(problems));

    g.addGroup("Village character");
    g.registerField("village-leader", "Leader", () => `${choose(leaders)} ${choose(leaderTraits)}`);
    g.registerField("village-reputation", "Reputation", () => choose(reputations));
    g.registerField("village-peculiarity", "Local peculiarity", () => choose(peculiarities));

    g.addGroup("Village life");
    g.registerField("institution-count", "Number of institutions", () => {
        institutionCount = g.rollPool(1, 5);
        const suffix = window.I18N.getLanguage() === "pt" ? "instituições" : "institutions";
        return `${institutionCount} ${suffix}`;
    }, {
        afterRun: seed => g.rerollWithSeed("village-institutions", g.deriveSeed(seed, 0x51a7))
    });
    g.registerField("village-institutions", "Institutions", () => {
        const available = institutions.slice();
        const chosen = [];
        for (let index = 0; index < institutionCount; index++) {
            const selected = g.chooseD66(available);
            chosen.push(text(selected));
            available.splice(available.indexOf(selected), 1);
        }
        return chosen;
    });
    g.registerField("village-inn", "Inn", () => {
        const mood = choose(innMoods);
        const specialty = choose(innSpecialties);
        const guest = choose(innGuests);
        return `${mood}\n${window.I18N.getLanguage() === "pt" ? "Especialidade" : "Specialty"}: ${specialty}\n${window.I18N.getLanguage() === "pt" ? "Visitante" : "Guest"}: ${guest}`;
    });
    g.registerField("village-inn-name", "Inn name", () => `${choose(nameStarts)} ${choose(nameEnds)}`);
}());
