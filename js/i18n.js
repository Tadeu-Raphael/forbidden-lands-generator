(function () {
    const LANGUAGE_KEY = "forbidden-lands-language";
    const REPLAY_KEY = "forbidden-lands-replay";
    const translations = {
        "Forbidden Lands Generator": "Gerador de Forbidden Lands",
        "Village — Forbidden Lands Generator": "Aldeia — Gerador de Forbidden Lands",
        "Dungeon — Forbidden Lands Generator": "Masmorra — Gerador de Forbidden Lands",
        "Castle — Forbidden Lands Generator": "Castelo — Gerador de Forbidden Lands",
        "Main navigation": "Navegação principal",
        "Generation actions": "Ações de geração",
        "Language": "Idioma",
        "Brazil": "Brasil",
        "UK / USA": "Reino Unido / EUA",
        "Switch to Portuguese": "Mudar para português",
        "Switch to English": "Mudar para inglês",
        "Choose what to create for your adventure:": "Escolha o que deseja criar para sua aventura:",
        "Village": "Aldeia",
        "Dungeon": "Masmorra",
        "Castle": "Castelo",
        "G-City": "G-City",
        "Create a remote settlement and its inhabitants.": "Crie um assentamento isolado e seus habitantes.",
        "Explore ancient ruins, dangers, and forgotten treasures.": "Explore ruínas antigas, perigos e tesouros esquecidos.",
        "Create a stronghold, its defenses, and secrets.": "Crie uma fortaleza, suas defesas e seus segredos.",
        "Forbidden Lands Generator · Tools for RPG adventures": "Gerador de Forbidden Lands · Ferramentas para aventuras de RPG",
        "Export TXT": "Exportar TXT",
        "Back to G-City": "Voltar ao G-City",
        "← Back to G-City": "← Voltar ao G-City",
        "⬇ Export TXT": "⬇ Exportar TXT",
        "← Main menu": "← Menu principal",
        "FORBIDDEN LANDS": "FORBIDDEN LANDS",
        "Village generator": "Gerador de aldeias",
        "Dungeon generator": "Gerador de masmorras",
        "Castle generator": "Gerador de castelos",
        "Build a settlement with its own character and troubles.": "Crie um assentamento com identidade e problemas próprios.",
        "Create a ruin with a past, dangers, and rooms to explore.": "Crie uma ruína com passado, perigos e salas para explorar.",
        "Shape a fortress, its history, and whoever claims it now.": "Defina a fortaleza, sua história e quem a reivindica hoje.",
        "Generate again": "Gerar novamente",
        "Roll again": "Gerar novamente",
        "How rolls work": "Como funcionam as rolagens",
        "Roll guide": "Guia de rolagens",
        "D66 uses two six-sided dice: the first is the tens digit and the second is the units digit.": "D66 usa dois dados de seis lados: o primeiro forma a dezena e o segundo, a unidade.",
        "Dice pools add every die; a written modifier is applied after the sum.": "Em uma parada de dados, some os resultados; o modificador indicado é aplicado depois.",
        "Use the die button beside a result to reroll only that field.": "Use o dado ao lado de um resultado para rerrolar apenas aquele campo.",
        "Close": "Fechar",
        "Roll log": "Registro de rolagens",
        "No rolls have been recorded.": "Nenhuma rolagem foi registrada.",
        "Field": "Campo",
        "Dice": "Dados",
        "Result": "Resultado",
        "Modifier": "Modificador",
        "Total": "Total",
        "Applied modifier": "Modificador aplicado",
        "None": "Nenhum",
        "Reroll this field": "Rerrolar este campo",
        "Export this generation as a text file": "Exportar esta geração como arquivo de texto",
        "Village overview": "Visão geral da aldeia",
        "Village character": "Identidade da aldeia",
        "Village life": "Vida na aldeia",
        "Dungeon overview": "Visão geral da masmorra",
        "Dungeon rooms": "Salas da masmorra",
        "Castle overview": "Visão geral do castelo",
        "Castle occupants": "Ocupantes do castelo",
        "Village size": "Porte da aldeia",
        "Age": "Idade",
        "Current problem": "Problema atual",
        "Leader": "Liderança",
        "Reputation": "Reputação",
        "Institutions": "Instituições",
        "Number of institutions": "Quantidade de instituições",
        "Local peculiarity": "Peculiaridade local",
        "Inn": "Estalagem",
        "Inn name": "Nome da estalagem",
        "Dungeon name": "Nome da masmorra",
        "Size and rooms": "Porte e salas",
        "Size": "Porte",
        "Creator and motive": "Criador e motivo",
        "Purpose": "Propósito",
        "History": "História",
        "Inhabitants": "Habitantes",
        "Entrance": "Entrada",
        "Doors": "Portas",
        "Items": "Itens",
        "Rooms and discoveries": "Salas e descobertas",
        "Rooms and discoveries": "Salas e descobertas",
        "Dungeon peculiarity": "Peculiaridade da masmorra",
        "Castle name": "Nome do castelo",
        "Type": "Tipo",
        "Type and size": "Tipo e porte",
        "Founder": "Fundador",
        "Condition": "Condição",
        "Is it truly empty?": "Está realmente vazio?",
        "New occupants": "Novos ocupantes",
        "Castle peculiarity": "Peculiaridade do castelo",
        "Town square": "Praça central",
        "Shrine": "Santuário",
        "Workshop": "Oficina",
        "Storehouse": "Armazém",
        "Watch post": "Posto de vigia",
        "Meeting hall": "Salão de reuniões",
        "Mill": "Moinho",
        "Smokehouse": "Defumadouro",
        "Trading stall": "Banca de comércio",
        "Herbalist": "Erveiro",
        "Ferry landing": "Ponto de travessia",
        "Old well": "Poço antigo",
        "Old": "Antiga",
        "Young": "Jovem",
        "A settlement of": "Uma aldeia com",
        "people": "habitantes",
        "rooms": "salas",
        "No settled group is present; signs of past occupation remain.": "Não há um grupo instalado; restam sinais de ocupação antiga.",
        "The site is empty, though something may still lurk below.": "O local está vazio, embora algo possa se esconder nas profundezas.",
        "The castle is abandoned, but its halls are not safe.": "O castelo está abandonado, mas seus salões não são seguros.",
        "The castle is occupied by": "O castelo é ocupado por",
        "D6": "D6",
        "D66": "D66",
        "Rolls": "Rolagens"
    };

    const requestedLanguage = new URLSearchParams(location.search).get("lang");
    let language = requestedLanguage === "pt" || requestedLanguage === "en"
        ? requestedLanguage
        : localStorage.getItem(LANGUAGE_KEY) || "pt";
    if (language !== "pt" && language !== "en") {
        language = "pt";
    }
    if (requestedLanguage === "pt" || requestedLanguage === "en") {
        try {
            localStorage.setItem(LANGUAGE_KEY, language);
        } catch (error) {
            console.error("Could not save the requested Forbidden Lands language.", error);
        }
    }

    let replay = null;
    const storedReplay = sessionStorage.getItem(REPLAY_KEY);
    if (storedReplay) {
        try {
            replay = JSON.parse(storedReplay);
        } catch (error) {
            console.error("Could not read the Forbidden Lands replay state.", error);
        }
        sessionStorage.removeItem(REPLAY_KEY);
    }
    if (!replay || replay.page !== location.pathname) {
        replay = null;
    }

    function translate(key) {
        return language === "pt" ? (translations[key] || key) : key;
    }

    function apply(root) {
        root.querySelectorAll("[data-i18n]").forEach(node => {
            node.textContent = translate(node.dataset.i18n);
        });
        root.querySelectorAll("[data-i18n-aria]").forEach(node => {
            node.setAttribute("aria-label", translate(node.dataset.i18nAria));
        });
        root.querySelectorAll("[data-i18n-title]").forEach(node => {
            node.title = translate(node.dataset.i18nTitle);
        });
        document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
        document.querySelectorAll("[data-lang-switch]").forEach(button => {
            button.setAttribute("aria-pressed", String(button.dataset.langSwitch === language));
        });
    }

    function text(value) {
        if (value && typeof value === "object") {
            return value[language] || value.en || value.pt || "";
        }
        return translate(String(value));
    }

    function setLanguage(nextLanguage) {
        if (nextLanguage !== "pt" && nextLanguage !== "en") {
            throw new Error(`Unsupported Forbidden Lands language: ${nextLanguage}`);
        }
        if (nextLanguage === language) return;
        if (window.FLG) {
            sessionStorage.setItem(REPLAY_KEY, JSON.stringify(window.FLG.getReplayState()));
        }
        language = nextLanguage;
        localStorage.setItem(LANGUAGE_KEY, language);
        location.reload();
    }

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-lang-switch]");
        if (button) {
            setLanguage(button.dataset.langSwitch);
        }
    });

    window.I18N = {
        apply,
        getLanguage: () => language,
        getReplay: () => replay,
        t: translate,
        text,
        setLanguage
    };
}());
