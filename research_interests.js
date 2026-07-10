(function () {
    // Sorted oldest -> newest. Newest entry's text should match what's in the HTML span.
    const ENTRIES = [
        { label: "Jan 2022", text: "machine learning and NLP, especially large language models." },
        { label: "May 2023", text: "machine learning and NLP, especially interpretability and multimodal models." },
        { label: "Nov 2023", text: "machine learning and NLP, particularly in approaches inspired by cognitive science" },
        { label: "Jul 2024", text: "machine learning and NLP, focusing on model evaluation and public policy." },
        { label: "Jan 2026", text: "machine learning and NLP, particularly in building better model evaluations.", default: true},
        { label: "Currently", text: "doing research." },
    ];

    document.addEventListener("DOMContentLoaded", function () {
        const span = document.querySelector(".research_interests");
        if (!span) return;
        const defaultIdx = ENTRIES.findIndex(e => e.default);
        if (defaultIdx !== -1) span.textContent = ENTRIES[defaultIdx].text;

        let popup = null;
        let fadeTimeout = null;

        function setText(idx) {
            if (fadeTimeout) clearTimeout(fadeTimeout);
            span.classList.add("fading");
            fadeTimeout = setTimeout(() => {
                span.textContent = ENTRIES[idx].text;
                span.classList.remove("fading");
                fadeTimeout = null;
            }, 200);
        }

        function position() {
            if (!popup) return;
            const r = span.getBoundingClientRect();
            popup.style.top = (r.bottom + window.scrollY + 6) + "px";
            popup.style.left = (r.left + window.scrollX) + "px";
        }

        function close() {
            if (!popup) return;
            popup.remove();
            popup = null;
            document.removeEventListener("click", onDocClick);
        }

        function onDocClick(e) {
            if (popup && !popup.contains(e.target) && e.target !== span) close();
        }

        function open() {
            popup = document.createElement("div");
            popup.className = "ri_popup";

            const dateLabel = document.createElement("div");
            dateLabel.className = "ri_date";
            popup.appendChild(dateLabel);

            const slider = document.createElement("input");
            slider.type = "range";
            slider.min = 0;
            slider.max = ENTRIES.length - 1;
            slider.step = 1;

            // Match current text if possible, else newest
            let idx = ENTRIES.findIndex(e => e.text === span.textContent.trim());
            if (idx === -1) idx = ENTRIES.length - 1;
            slider.value = idx;
            dateLabel.textContent = ENTRIES[idx].label;

            slider.addEventListener("input", function () {
                const i = parseInt(slider.value, 10);
                dateLabel.textContent = ENTRIES[i].label;
                setText(i);
            });

            popup.appendChild(slider);
            document.body.appendChild(popup);
            position();

            setTimeout(() => document.addEventListener("click", onDocClick), 0);
        }

        span.addEventListener("click", function (e) {
            e.stopPropagation();
            popup ? close() : open();
        });

        document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
        window.addEventListener("resize", position);
        window.addEventListener("scroll", position, true);
    });
})();