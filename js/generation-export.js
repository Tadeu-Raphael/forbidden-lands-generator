(function () {
    function exportGeneration() {
        const title = document.querySelector("#page-title").textContent.trim();
        const lines = [title, ""];
        document.querySelectorAll(".generation-content h2, .generated-field").forEach(item => {
            if (item.matches("h2")) {
                lines.push(item.textContent.trim());
            } else {
                const heading = item.querySelector("h3");
                const result = item.querySelector(".field-result");
                lines.push("", `${heading.childNodes[0].textContent.trim()}:`, result.textContent.trim());
            }
        });
        lines.push("", window.I18N.t("Roll log"));
        document.querySelectorAll("#generation-info tbody tr").forEach(row => {
            lines.push(Array.from(row.cells, cell => cell.textContent.trim()).join(" | "));
        });
        const file = new Blob(["\uFEFF", lines.join("\r\n")], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        link.href = url;
        link.download = `${document.body.dataset.page}-generation-${timestamp}.txt`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    document.addEventListener("click", event => {
        if (event.target.closest('[data-action="export"]')) {
            exportGeneration();
        }
    });
}());
