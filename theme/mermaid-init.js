(function () {
  "use strict";

  function currentTheme() {
    return document.documentElement.classList.contains("navy")
      ? "dark"
      : "default";
  }

  function renderMermaid() {
    if (!window.mermaid) {
      return;
    }

    var blocks = Array.from(
      document.querySelectorAll("pre > code.language-mermaid")
    );

    if (blocks.length === 0) {
      return;
    }

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: currentTheme(),
    });

    blocks.forEach(function (code, index) {
      var container = document.createElement("div");
      container.className = "mermaid-diagram";
      container.setAttribute("role", "img");
      container.setAttribute("aria-label", "Agentic AI engineering diagram");
      container.textContent = code.textContent;
      container.dataset.mermaidSource = code.textContent;
      code.parentElement.replaceWith(container);
      container.dataset.mermaidId = "diagram-" + index;
    });

    window.mermaid.run({
      querySelector: ".mermaid-diagram",
    });
  }

  function rerenderForTheme() {
    var diagrams = Array.from(document.querySelectorAll(".mermaid-diagram"));
    if (diagrams.length === 0) {
      return;
    }

    diagrams.forEach(function (diagram) {
      diagram.textContent = diagram.dataset.mermaidSource;
    });

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: currentTheme(),
    });
    window.mermaid.run({
      querySelector: ".mermaid-diagram",
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMermaid);
  } else {
    renderMermaid();
  }

  new MutationObserver(rerenderForTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
})();
