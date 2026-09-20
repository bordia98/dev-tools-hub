/**
 * DevTools Hub & Context Directory
 * Interactive context table, search, category filtering, theme persistence, and command palette.
 */

// 1. Tool Catalog Registry
const TOOLS = [
  {
    id: "timestamp-converter",
    name: "Unix Timestamp Converter",
    icon: "⏱️",
    category: "Time & Date",
    shortDesc: "Convert Unix Epoch timestamps to human dates across global timezones.",
    fullDesc: "A complete Unix epoch and timestamp conversion suite. Includes real-time UTC/local live clocks, human-date to epoch and epoch-to-date conversion, simultaneous timezone comparisons (UTC, EST, PST, GMT, JST, IST), relative humanized time calculation, and bulk batch conversions. 100% client-side with zero server calls.",
    url: "https://bordia98.github.io/timestamp-converter/",
    repoUrl: "https://github.com/bordia98/timestamp-converter",
    privacy: "100% Client-Side",
    features: [
      "Real-time live epoch clock (seconds & milliseconds)",
      "Bidirectional conversion: Epoch ⇄ Human Readable Date",
      "Multi-timezone comparison table (UTC, EST, PST, GMT, JST, IST)",
      "Batch line-by-line timestamp converter with export",
      "Relative time calculator (e.g. '3 hours ago', 'in 2 days')"
    ],
    tags: ["timestamp", "epoch", "time", "date", "timezone", "utc", "clock", "epoch to date"]
  },
  {
    id: "url-encoder-decoder",
    name: "URL Encoder & Decoder",
    icon: "🔗",
    category: "Web & Network",
    shortDesc: "Percent-encoding & decoding for URLs, query parameters, and URI components.",
    fullDesc: "Fast and reliable URL percent-encoder and decoder. Decodes query strings into an interactive structured key-value table, supports RFC 3986 encoding (`encodeURIComponent`), Base64 URL-safe conversion, and automated format detection. Works completely offline in your browser.",
    url: "https://bordia98.github.io/url-encoder-decoder/",
    repoUrl: "https://github.com/bordia98/url-encoder-decoder",
    privacy: "100% Client-Side",
    features: [
      "Instant percent-encoding & percent-decoding",
      "Interactive Query Parameter parser & key-value editor",
      "RFC 3986 standard URI component compliance",
      "Base64 URL-Safe conversion mode",
      "Auto-detects encoded vs plain input automatically"
    ],
    tags: ["url", "encode", "decode", "uri", "percent-encoding", "query params", "queryString", "params"]
  },
  {
    id: "uuid-hash-generator",
    name: "UUID & Hash Generator",
    icon: "🛡️",
    category: "Security & Crypto",
    shortDesc: "Generate UUID v4/v7 and compute cryptographic hashes (SHA-256, MD5, HMAC).",
    fullDesc: "Client-side cryptographic utility powered by the Web Crypto API. Generate random UUID v4 and timestamp-ordered UUID v7 tokens, validate GUIDs, compute SHA-256, SHA-512, MD5, SHA-1 hashes, generate HMAC with custom secret keys, and calculate checksums on local files without uploading them.",
    url: "https://bordia98.github.io/uuid-hash-generator/",
    repoUrl: "https://github.com/bordia98/uuid-hash-generator",
    privacy: "100% Client-Side",
    features: [
      "Generate UUID v4 (random) & UUID v7 (time-ordered)",
      "Batch UUID generation with uppercase/lowercase & hyphen options",
      "Cryptographic hashing: SHA-256, MD5, SHA-512, SHA-1",
      "HMAC calculator with custom secret key",
      "Local file drag-and-drop checksum calculation"
    ],
    tags: ["uuid", "guid", "hash", "sha256", "md5", "sha512", "hmac", "crypto", "checksum", "v7"]
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    icon: "{ }",
    category: "Security & Auth",
    shortDesc: "Private, in-browser JSON Web Token decoder and registered claims inspector.",
    fullDesc: "Inspect and debug JSON Web Tokens right in your browser. Decodes token header and payload JSON with syntax coloring, parses standard claims (`exp`, `iat`, `nbf`, `iss`, `sub`, `aud`), and highlights token expiration status. Built strictly private: never transmits, logs, or stores your token.",
    url: "https://bordia98.github.io/JWTDecoder/",
    repoUrl: "https://github.com/bordia98/JWTDecoder",
    privacy: "100% Client-Side",
    features: [
      "Decode JWT Header and Payload JSON structures",
      "Live expiration status check (Valid vs Expired)",
      "Registered claims dictionary explanation (iss, exp, sub, aud)",
      "One-click copy for formatted JSON objects",
      "Strict zero-telemetry policy (safe for test tokens)"
    ],
    tags: ["jwt", "token", "decoder", "auth", "bearer", "claims", "json web token", "payload"]
  },
  {
    id: "json-beautifier",
    name: "JSON Beautifier & Formatter",
    icon: "✨",
    category: "Data & Formatting",
    shortDesc: "Format, validate, syntax-highlight, and minify raw JSON documents.",
    fullDesc: "Versatile JSON utility for developers. Format messy JSON with customizable indentation (2 spaces, 4 spaces, tabs), pinpoint exact syntax errors with line indicators, minify JSON for transmission payloads, and escape/unescape string quotes. Fast and responsive for large JSON payloads.",
    url: "https://bordia98.github.io/JsonBeautifier/",
    repoUrl: "https://github.com/bordia98/JsonBeautifier",
    privacy: "100% Client-Side",
    features: [
      "Beautify and pretty-print raw or minified JSON",
      "Detailed syntax error diagnosis with line/col pointer",
      "Minification and compact output formatting",
      "JSON String escape & unescape utilities",
      "Zero server processing — 100% in-memory"
    ],
    tags: ["json", "beautifier", "formatter", "minify", "validate", "prettify", "highlight", "escape"]
  },
  {
    id: "base64-converter",
    name: "Base64 Text Converter",
    icon: "🔤",
    category: "Encoding & Decoding",
    shortDesc: "In-browser Base64 text encoder and decoder with full UTF-8 Unicode support.",
    fullDesc: "Encode plain text to Base64 and decode Base64 strings back to readable text with robust UTF-8 and Unicode emoji handling. Supports standard Base64 as well as URL-safe Base64 variants. Instant real-time conversion as you type with copy shortcuts.",
    url: "https://bordia98.github.io/Base64EncoderAndDecoder/",
    repoUrl: "https://github.com/bordia98/Base64EncoderAndDecoder",
    privacy: "100% Client-Side",
    features: [
      "Bidirectional Base64 Encode & Decode",
      "Full UTF-8 and Unicode character safety",
      "URL-safe Base64 conversion mode (- and _ substitution)",
      "Live conversion feedback with error trapping",
      "Light and dark themes with one-click copy"
    ],
    tags: ["base64", "encoder", "decoder", "text", "utf-8", "unicode", "url-safe", "atob", "btoa"]
  }
];

// State
let currentCategory = "all";
let searchQuery = "";
let currentView = localStorage.getItem("devtools_view") || "table"; // 'table' or 'grid'

// DOM Elements
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");
const categoryFilters = document.getElementById("category-filters");
const viewTableBtn = document.getElementById("view-table-btn");
const viewGridBtn = document.getElementById("view-grid-btn");
const tableContainer = document.getElementById("table-container");
const gridContainer = document.getElementById("grid-container");
const tableBody = document.getElementById("table-body");
const emptyState = document.getElementById("empty-state");
const resetFiltersBtn = document.getElementById("reset-filters-btn");
const themeToggleBtn = document.getElementById("theme-toggle");
const toast = document.getElementById("toast");

// Modal Elements
const toolModal = document.getElementById("tool-modal");
const modalTitle = document.getElementById("modal-tool-title");
const modalIcon = document.getElementById("modal-tool-icon");
const modalCategory = document.getElementById("modal-tool-category");
const modalDesc = document.getElementById("modal-tool-desc");
const modalFeatures = document.getElementById("modal-tool-features");
const modalUrl = document.getElementById("modal-tool-url");
const modalRepo = document.getElementById("modal-tool-repo");
const modalCopyBtn = document.getElementById("modal-copy-btn");
const modalLaunchBtn = document.getElementById("modal-launch-btn");
const modalTags = document.getElementById("modal-tool-tags");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");

// Command Palette Elements
const cmdDialog = document.getElementById("cmd-dialog");
const cmdTrigger = document.getElementById("cmd-k-trigger");
const cmdInput = document.getElementById("cmd-input");
const cmdResults = document.getElementById("cmd-results");
let cmdSelectedIndex = 0;

// ---------------- Filtering & Search Logic ---------------- //
function getFilteredTools() {
  return TOOLS.filter(tool => {
    const matchesCat = (currentCategory === "all" || tool.category.toLowerCase() === currentCategory.toLowerCase());
    if (!matchesCat) return false;

    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.shortDesc.toLowerCase().includes(query) ||
      tool.fullDesc.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });
}

// ---------------- Rendering Context Table ---------------- //
function renderTable(tools) {
  if (tools.length === 0) {
    tableBody.innerHTML = "";
    return;
  }

  tableBody.innerHTML = tools.map(tool => `
    <tr data-id="${tool.id}">
      <td class="tool-cell">
        <div class="tool-avatar">${tool.icon}</div>
        <div class="tool-meta">
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-name-link">
            ${escapeHtml(tool.name)}
          </a>
          <span class="tool-id">${escapeHtml(tool.id)}</span>
        </div>
      </td>
      <td>
        <span class="category-badge" data-cat="${escapeHtml(tool.category)}">
          ${escapeHtml(tool.category)}
        </span>
      </td>
      <td>
        <p class="work-desc">${escapeHtml(tool.shortDesc)}</p>
        <div class="tag-list">
          ${tool.tags.slice(0, 3).map(tag => `<span class="tag-chip">#${escapeHtml(tag)}</span>`).join("")}
        </div>
      </td>
      <td>
        <div class="route-cell">
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="route-link" title="${tool.url}">
            ${cleanUrl(tool.url)}
          </a>
          <button class="copy-mini-btn" data-copy="${tool.url}" title="Copy Routing URL">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </td>
      <td>
        <span class="status-pill">
          <span class="status-dot-sm"></span>
          ${tool.privacy}
        </span>
      </td>
      <td>
        <div class="action-group">
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="btn-launch" title="Launch ${tool.name}">
            <span>Launch</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <button class="btn-inspect" data-inspect="${tool.id}" title="Inspect Context Specs">
            Details
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

// ---------------- Rendering Card Grid ---------------- //
function renderGrid(tools) {
  if (tools.length === 0) {
    gridContainer.innerHTML = "";
    return;
  }

  gridContainer.innerHTML = tools.map(tool => `
    <article class="tool-card" data-id="${tool.id}">
      <div class="card-header">
        <div class="card-header-left">
          <div class="card-icon">${tool.icon}</div>
          <div>
            <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="card-title">
              ${escapeHtml(tool.name)}
            </a>
            <div>
              <span class="category-badge" data-cat="${escapeHtml(tool.category)}">
                ${escapeHtml(tool.category)}
              </span>
            </div>
          </div>
        </div>
        <span class="status-pill">
          <span class="status-dot-sm"></span> Client
        </span>
      </div>

      <p class="card-desc">${escapeHtml(tool.shortDesc)}</p>

      <ul class="card-features">
        ${tool.features.slice(0, 3).map(feat => `
          <li class="card-feature-item">${escapeHtml(feat)}</li>
        `).join("")}
      </ul>

      <div class="card-route-box">
        <span>${cleanUrl(tool.url)}</span>
        <button class="copy-mini-btn" data-copy="${tool.url}" title="Copy URL">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>

      <div class="card-footer">
        <a href="${tool.repoUrl}" target="_blank" rel="noopener noreferrer" class="repo-link" title="GitHub Repository">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          Source Code
        </a>
        <div class="action-group">
          <button class="btn-inspect" data-inspect="${tool.id}">Inspect</button>
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="btn-launch">
            Launch &rarr;
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

// ---------------- Update Master View ---------------- //
function updateCatalog() {
  const filtered = getFilteredTools();

  if (filtered.length === 0) {
    emptyState.hidden = false;
    tableContainer.hidden = true;
    gridContainer.hidden = true;
  } else {
    emptyState.hidden = true;
    if (currentView === "table") {
      tableContainer.hidden = false;
      gridContainer.hidden = true;
      renderTable(filtered);
    } else {
      tableContainer.hidden = true;
      gridContainer.hidden = false;
      renderGrid(filtered);
    }
  }

  // Update clear button
  clearSearchBtn.hidden = !searchQuery;
}

// ---------------- Inspector Modal ---------------- //
function openInspector(toolId) {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  modalIcon.textContent = tool.icon;
  modalTitle.textContent = tool.name;
  modalCategory.textContent = tool.category;
  modalCategory.setAttribute("data-cat", tool.category);
  modalDesc.textContent = tool.fullDesc;

  modalFeatures.innerHTML = tool.features.map(f => `<li>${escapeHtml(f)}</li>`).join("");

  modalUrl.textContent = tool.url;
  modalCopyBtn.setAttribute("data-copy", tool.url);

  modalRepo.href = tool.repoUrl;
  modalRepo.textContent = tool.repoUrl.replace("https://github.com/", "");

  modalLaunchBtn.href = tool.url;

  modalTags.innerHTML = tool.tags.map(t => `<span class="tag-chip">#${escapeHtml(t)}</span>`).join("");

  if (typeof toolModal.showModal === "function") {
    toolModal.showModal();
  } else {
    toolModal.setAttribute("open", "");
  }
}

function closeInspector() {
  if (typeof toolModal.close === "function") {
    toolModal.close();
  } else {
    toolModal.removeAttribute("open");
  }
}

// ---------------- Command Palette (Cmd+K) ---------------- //
function openCommandPalette() {
  cmdInput.value = "";
  cmdSelectedIndex = 0;
  renderCommandResults("");
  if (typeof cmdDialog.showModal === "function") {
    cmdDialog.showModal();
  } else {
    cmdDialog.setAttribute("open", "");
  }
  cmdInput.focus();
}

function closeCommandPalette() {
  if (typeof cmdDialog.close === "function") {
    cmdDialog.close();
  } else {
    cmdDialog.removeAttribute("open");
  }
}

function renderCommandResults(query) {
  const q = query.toLowerCase().trim();
  const matches = TOOLS.filter(t => {
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

  if (matches.length === 0) {
    cmdResults.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching tools</div>`;
    return;
  }

  cmdResults.innerHTML = matches.map((tool, idx) => `
    <div class="cmd-item ${idx === cmdSelectedIndex ? 'selected' : ''}" data-url="${tool.url}" data-idx="${idx}">
      <div class="cmd-item-left">
        <span class="cmd-item-icon">${tool.icon}</span>
        <div>
          <div class="cmd-item-title">${escapeHtml(tool.name)}</div>
          <div class="cmd-item-desc">${escapeHtml(tool.shortDesc)}</div>
        </div>
      </div>
      <div class="cmd-item-right">
        <span class="category-badge" data-cat="${escapeHtml(tool.category)}">${escapeHtml(tool.category)}</span>
      </div>
    </div>
  `).join("");
}

// ---------------- Toast Notification ---------------- //
let toastTimeout;
function showToast(message) {
  clearTimeout(toastTimeout);
  toast.innerHTML = `<span>✓</span> <span>${escapeHtml(message)}</span>`;
  toast.classList.add("show");
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

// ---------------- Helpers ---------------- //
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, match => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return map[match];
  });
}

function cleanUrl(url) {
  return url.replace("https://", "");
}

// ---------------- Event Listeners ---------------- //

// Search Input
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value;
  updateCatalog();
});

clearSearchBtn.addEventListener("click", () => {
  searchQuery = "";
  searchInput.value = "";
  searchInput.focus();
  updateCatalog();
});

// Category Filter Pills
categoryFilters.addEventListener("click", e => {
  const pill = e.target.closest(".filter-pill");
  if (!pill) return;

  categoryFilters.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
  pill.classList.add("active");
  currentCategory = pill.getAttribute("data-category");
  updateCatalog();
});

// View Toggle
viewTableBtn.addEventListener("click", () => {
  currentView = "table";
  viewTableBtn.classList.add("active");
  viewTableBtn.setAttribute("aria-checked", "true");
  viewGridBtn.classList.remove("active");
  viewGridBtn.setAttribute("aria-checked", "false");
  localStorage.setItem("devtools_view", "table");
  updateCatalog();
});

viewGridBtn.addEventListener("click", () => {
  currentView = "grid";
  viewGridBtn.classList.add("active");
  viewGridBtn.setAttribute("aria-checked", "true");
  viewTableBtn.classList.remove("active");
  viewTableBtn.setAttribute("aria-checked", "false");
  localStorage.setItem("devtools_view", "grid");
  updateCatalog();
});

// Reset Filters
resetFiltersBtn.addEventListener("click", () => {
  searchQuery = "";
  searchInput.value = "";
  currentCategory = "all";
  categoryFilters.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.getAttribute("data-category") === "all");
  });
  updateCatalog();
});

// Delegated Clicks: Copy Buttons and Inspect Buttons
document.addEventListener("click", e => {
  // Copy URL action
  const copyBtn = e.target.closest("[data-copy]");
  if (copyBtn) {
    e.preventDefault();
    const textToCopy = copyBtn.getAttribute("data-copy");
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(`Copied URL: ${cleanUrl(textToCopy)}`);
    }).catch(() => {
      showToast(`Unable to copy automatically`);
    });
    return;
  }

  // Inspect Modal action
  const inspectBtn = e.target.closest("[data-inspect]");
  if (inspectBtn) {
    const toolId = inspectBtn.getAttribute("data-inspect");
    openInspector(toolId);
    return;
  }
});

// Modal Close Triggers
modalCloseBtn.addEventListener("click", closeInspector);
modalCancelBtn.addEventListener("click", closeInspector);
toolModal.addEventListener("click", e => {
  if (e.target === toolModal) closeInspector();
});

// Command Palette Keyboard Navigation
cmdTrigger.addEventListener("click", openCommandPalette);

cmdInput.addEventListener("input", e => {
  cmdSelectedIndex = 0;
  renderCommandResults(e.target.value);
});

cmdInput.addEventListener("keydown", e => {
  const items = cmdResults.querySelectorAll(".cmd-item");
  if (items.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    cmdSelectedIndex = (cmdSelectedIndex + 1) % items.length;
    highlightCmdItem(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    cmdSelectedIndex = (cmdSelectedIndex - 1 + items.length) % items.length;
    highlightCmdItem(items);
  } else if (e.key === "Enter") {
    e.preventDefault();
    const activeItem = items[cmdSelectedIndex];
    if (activeItem) {
      const url = activeItem.getAttribute("data-url");
      window.open(url, "_blank", "noopener,noreferrer");
      closeCommandPalette();
    }
  }
});

function highlightCmdItem(items) {
  items.forEach((item, idx) => {
    item.classList.toggle("selected", idx === cmdSelectedIndex);
  });
  const selected = items[cmdSelectedIndex];
  if (selected) {
    selected.scrollIntoView({ block: "nearest" });
  }
}

cmdResults.addEventListener("click", e => {
  const item = e.target.closest(".cmd-item");
  if (item) {
    const url = item.getAttribute("data-url");
    window.open(url, "_blank", "noopener,noreferrer");
    closeCommandPalette();
  }
});

cmdDialog.addEventListener("click", e => {
  if (e.target === cmdDialog) closeCommandPalette();
});

// Global Keyboard Shortcuts
window.addEventListener("keydown", e => {
  // Slash to focus search
  if (e.key === "/" && document.activeElement !== searchInput && document.activeElement !== cmdInput) {
    e.preventDefault();
    searchInput.focus();
    return;
  }

  // Cmd+K or Ctrl+K to toggle Command Palette
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    if (cmdDialog.hasAttribute("open")) {
      closeCommandPalette();
    } else {
      openCommandPalette();
    }
    return;
  }

  // Escape to close modals
  if (e.key === "Escape") {
    if (cmdDialog.hasAttribute("open")) closeCommandPalette();
    if (toolModal.hasAttribute("open")) closeInspector();
  }
});

// ---------------- Theme Management ---------------- //
function initTheme() {
  const savedTheme = localStorage.getItem("devtools_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", initialTheme);
}

themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("devtools_theme", next);
});

// ---------------- Initialization ---------------- //
function init() {
  initTheme();

  // Set initial view button state
  if (currentView === "grid") {
    viewGridBtn.classList.add("active");
    viewGridBtn.setAttribute("aria-checked", "true");
    viewTableBtn.classList.remove("active");
    viewTableBtn.setAttribute("aria-checked", "false");
  } else {
    viewTableBtn.classList.add("active");
    viewTableBtn.setAttribute("aria-checked", "true");
    viewGridBtn.classList.remove("active");
    viewGridBtn.setAttribute("aria-checked", "false");
  }

  updateCatalog();
}

document.addEventListener("DOMContentLoaded", init);
