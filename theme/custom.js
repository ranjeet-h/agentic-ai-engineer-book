(() => {
  const DARK_THEMES = new Set(["ayu", "coal", "navy"]);
  const LIGHT_THEMES = new Set(["light", "rust"]);

  const themeClassList = () => document.documentElement.classList;

  const isDarkMode = () => {
    for (const theme of themeClassList()) {
      if (DARK_THEMES.has(theme)) return true;
      if (LIGHT_THEMES.has(theme)) return false;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const updateToggle = (button) => {
    const dark = isDarkMode();
    button.textContent = dark ? "☀" : "☾";
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode",
    );
    button.title = dark ? "Switch to light mode" : "Switch to dark mode";
  };

  const installThemeToggle = () => {
    const toolbar =
      document.querySelector("#menu-bar .right-buttons") ||
      document.querySelector("#menu-bar");
    if (!toolbar || document.getElementById("book-theme-toggle")) return;

    const button = document.createElement("button");
    button.id = "book-theme-toggle";
    button.className = "icon-button";
    button.type = "button";
    button.addEventListener("click", () => {
      const nextTheme = isDarkMode() ? "light" : "navy";
      try {
        // mdBook uses this key for an explicit choice. With no key, its
        // built-in theme script follows prefers-color-scheme.
        localStorage.setItem("mdbook-theme", nextTheme);
      } catch (_) {
        // Private browsing may deny storage; the native theme picker remains.
      }
      window.location.reload();
    });

    updateToggle(button);
    toolbar.prepend(button);

    new MutationObserver(() => updateToggle(button)).observe(
      document.documentElement,
      { attributes: true, attributeFilter: ["class"] },
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installThemeToggle);
  } else {
    installThemeToggle();
  }
})();
