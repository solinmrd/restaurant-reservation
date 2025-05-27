// js/include.js
async function includeHTML() {
  const includeElements = document.querySelectorAll('[data-include]');

  for (const el of includeElements) {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Dosya bulunamadı: ${file}`);
      const html = await response.text();
      el.innerHTML = html;
      el.setAttribute('data-loaded', 'true'); // yüklenince görünür yap
    } catch (err) {
      console.error(err);
      el.innerHTML = "<p>İçerik yüklenemedi.</p>";
    }
  }
}

window.addEventListener('DOMContentLoaded', includeHTML);
