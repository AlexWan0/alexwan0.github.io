document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll("#publications .pub-filter");
  const rows = document.querySelectorAll("#publications .categorized");

  function setActiveFilter(filterName) {
    filters.forEach((a) => {
        const isActive = a.dataset.filter === filterName;
        a.classList.toggle("is-active", isActive);
        a.setAttribute("aria-pressed", String(isActive));
    });

    rows.forEach((row) => {
        const show = (filterName === "all") || row.classList.contains(filterName);
        row.style.display = show ? "" : "none";
    });
  }

  setActiveFilter("all");

  filters.forEach((a) => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveFilter(a.dataset.filter);
    });
  });
});
