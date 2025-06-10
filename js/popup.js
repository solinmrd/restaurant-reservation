
function overflowAuto() {
  document.body.style.overflow = "auto";

  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }

  dialog.style.opacity = "0";
  dialog.style.transform = "scale(0.9)";

  setTimeout(() => {
    dialog.close();
  }, 300);
}

function overflowHidden() {
  // Scroll'u engelle
  document.body.style.overflow = "hidden";

  // Eğer overlay daha önce eklenmemişse, oluştur ve ekle
  let overlay = document.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  }

  // Overlay'i aktif et
  overlay.classList.add("active");

  // Popup animasyonu
  dialog.style.opacity = "0";
  dialog.style.transform = "scale(0.9)";

  setTimeout(() => {
    dialog.style.transition = "opacity 0.5s ease-in-out, transform 0.3s ease-in-out";
    dialog.style.opacity = "1";
    dialog.style.transform = "scale(1)";
  }, 10);
}

