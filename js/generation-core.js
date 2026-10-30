(function () {
    const replay = window.I18N.getReplay();
    const pageSeed = replay ? replay.seed : createSeed();
    const rerollHistory = replay && Array.isArray(replay.rerolls) ? replay.rerolls.slice() : [];
    const pageRandom = mulberry32(pageSeed);
    const fields = new Map();
    const generationLog = { rolls: [] };
    const content = document.getElementById("generation-content");
    let random = null;
    let activeField = "";

    function createSeed() {
        const values = new Uint32Array(1);
        crypto.getRandomValues(values);
        return values[0];
    }

    function mulberry32(seed) {
        let state = seed >>> 0;
        return function () {
            state = (state + 0x6D2B79F5) >>> 0;
            let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
            mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
            return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
        };
    }

    function nextSeed() {
        return Math.floor(pageRandom() * 4294967296) >>> 0;
    }

    function rollD6(modifier) {
        const value = Math.floor(random() * 6) + 1;
        const bonus = modifier || 0;
        generationLog.rolls.push({
            field: activeField,
            notation: "D6",
            faces: [value],
            value,
            modifier: bonus,
            total: value + bonus
        });
        return value + bonus;
    }

    function rollD66() {
        const tens = Math.floor(random() * 6) + 1;
        const units = Math.floor(random() * 6) + 1;
        const index = (tens - 1) * 6 + units - 1;
        const value = tens * 10 + units;
        generationLog.rolls.push({
            field: activeField,
            notation: "D66",
            faces: [tens, units],
            value,
            modifier: 0,
            total: value
        });
        return { index, value };
    }

    function rollPool(count, modifier) {
        const faces = [];
        for (let index = 0; index < count; index++) {
            faces.push(Math.floor(random() * 6) + 1);
        }
        const value = faces.reduce((sum, face) => sum + face, 0);
        const bonus = modifier || 0;
        const notation = `${count}D6${bonus ? ` ${bonus > 0 ? "+" : ""}${bonus}` : ""}`;
        generationLog.rolls.push({
            field: activeField,
            notation,
            faces,
            value,
            modifier: bonus,
            total: value + bonus
        });
        return value + bonus;
    }

    function chooseD66(options) {
        const result = rollD66();
        const index = Math.floor(result.index * options.length / 36);
        return options[index];
    }

    function addGroup(title) {
        const heading = document.createElement("h2");
        heading.textContent = window.I18N.t(title);
        content.appendChild(heading);
    }

    function renderField(record, seed) {
        const oldRolls = new Set(record.rolls || []);
        generationLog.rolls = generationLog.rolls.filter(item => !oldRolls.has(item));
        record.rolls = [];
        record.seed = seed;
        activeField = record.id;
        random = mulberry32(seed);
        const rollStart = generationLog.rolls.length;
        let result;
        try {
            result = record.generate();
        } finally {
            record.rolls = generationLog.rolls.slice(rollStart);
            random = null;
            activeField = "";
        }
        record.output.textContent = Array.isArray(result) ? result.join("\n") : String(result);
        if (record.afterRun) {
            record.afterRun(seed, result);
        }
        renderRollLog();
        return result;
    }

    function registerField(id, title, generate, options) {
        const config = options || {};
        const section = document.createElement("section");
        const heading = document.createElement("h3");
        const output = document.createElement("p");
        const button = document.createElement("button");
        const record = {
            id,
            title,
            generate,
            afterRun: config.afterRun,
            output,
            rolls: [],
            seed: nextSeed()
        };

        section.className = "generated-field";
        section.dataset.fieldId = id;
        heading.textContent = window.I18N.t(title);
        button.className = "field-reroll";
        button.type = "button";
        button.textContent = "🎲";
        button.addEventListener("click", () => reroll(id, true));
        heading.appendChild(button);
        output.className = "field-result";
        section.append(heading, output);
        content.appendChild(section);
        fields.set(id, record);
        renderField(record, record.seed);
        return record;
    }

    function reroll(id, recordHistory) {
        const record = fields.get(id);
        if (!record) {
            throw new Error(`Unknown generation field: ${id}`);
        }
        const seed = nextSeed();
        if (recordHistory) {
            rerollHistory.push(id);
        }
        return renderField(record, seed);
    }

    function rerollWithSeed(id, seed) {
        const record = fields.get(id);
        if (!record) {
            return;
        }
        renderField(record, seed >>> 0);
    }

    function deriveSeed(seed, salt) {
        let value = (seed ^ salt) >>> 0;
        value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
        value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
        return (value ^ (value >>> 16)) >>> 0;
    }

    function replayRerolls() {
        rerollHistory.forEach(id => reroll(id, false));
    }

    function refresh() {
        document.querySelectorAll(".field-reroll").forEach(button => {
            const label = window.I18N.t("Reroll this field");
            button.setAttribute("aria-label", label);
            button.title = label;
        });
    }

    function renderRollLog() {
        const container = document.getElementById("generation-info");
        if (!container) {
            return;
        }
        const title = document.createElement("h2");
        title.textContent = window.I18N.t("Roll log");
        container.replaceChildren(title);
        if (!generationLog.rolls.length) {
            const note = document.createElement("p");
            note.textContent = window.I18N.t("No rolls have been recorded.");
            container.appendChild(note);
            return;
        }
        const table = document.createElement("table");
        const head = table.createTHead().insertRow();
        ["Field", "Dice", "Result", "Modifier", "Total"].forEach(label => {
            const cell = document.createElement("th");
            cell.scope = "col";
            cell.textContent = window.I18N.t(label);
            head.appendChild(cell);
        });
        const body = table.createTBody();
        generationLog.rolls.forEach(roll => {
            const row = body.insertRow();
            const field = fields.get(roll.field);
            [
                window.I18N.t(field ? field.title : roll.field),
                roll.notation,
                `${roll.faces.join(roll.notation === "D66" ? " / " : " + ")} = ${roll.value}`,
                roll.modifier ? (roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier) : "—",
                roll.total
            ].forEach(value => {
                const cell = row.insertCell();
                cell.textContent = String(value);
            });
        });
        container.appendChild(table);
    }

    function getReplayState() {
        return {
            page: location.pathname,
            seed: pageSeed,
            rerolls: rerollHistory.slice()
        };
    }

    function regenerate() {
        sessionStorage.removeItem("forbidden-lands-replay");
        location.reload();
    }

    document.addEventListener("click", event => {
        const action = event.target.closest("[data-action]")?.dataset.action;
        if (action === "regenerate") {
            regenerate();
        } else if (action === "show-roll-help") {
            const dialog = document.getElementById("roll-help");
            if (dialog && typeof dialog.showModal === "function") {
                dialog.showModal();
            }
        }
    });

    document.addEventListener("i18n:change", refresh);

    window.FLG = {
        addGroup,
        chooseD66,
        deriveSeed,
        getReplayState,
        registerField,
        renderRollLog,
        reroll,
        rerollWithSeed,
        rollD6,
        rollD66,
        rollPool,
        refresh,
        replayRerolls,
        t: key => window.I18N.t(key),
        text: value => window.I18N.text(value)
    };
}());
