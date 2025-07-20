document.addEventListener("DOMContentLoaded", function () {
  // Language toggle logic
  const langLinks = document.querySelectorAll(".language-toggle .lang");
  const defaultLang = "en";
  const savedLang = localStorage.getItem("selectedLang") || defaultLang;

  langLinks.forEach(link => {
    const lang = link.dataset.lang;
    link.classList.toggle("selected", lang === savedLang);
  });

  langLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const clickedLang = this.dataset.lang;

      langLinks.forEach(l => l.classList.remove("selected"));
      this.classList.add("selected");
      localStorage.setItem("selectedLang", clickedLang);

      console.log("Switched to language:", clickedLang);
      if (clickedLang === "fr") {
        window.location.href = "index-fr.html";
      } else {
        window.location.href = "index.html";
      }
    });
  });

  // Archive folder toggle logic
  const toggle = document.getElementById("archive-toggle");
  const subfolders = document.getElementById("archive-subfolders");

  if (subfolders && !subfolders.classList.contains("hidden")) {
    subfolders.classList.add("hidden");
    void subfolders.offsetWidth;

  }

  if (toggle && subfolders) {
    toggle.addEventListener("click", () => {
      console.log("Archive folder clicked");
      console.log("Before toggle, classes:", subfolders.className);
      subfolders.classList.toggle("hidden");
      console.log("After toggle, classes:", subfolders.className);
    });
  }
});