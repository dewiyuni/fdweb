const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Fungsi utama: Tambah/Hapus class 'active' saat diklik
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open"); // tanda X

  // Opsional: Animasi simpel biar ketahuan kalau diklik
  hamburger.style.opacity = "0.5";
  setTimeout(() => {
    hamburger.style.opacity = "1";
  }, 100);
});
// Menutup menu saat salah satu link diklik
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
  });
});

// clear form before unload
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

document.querySelectorAll(".read-more-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const detail = btn.previousElementSibling;
    detail.classList.toggle("expanded");

    if (detail.classList.contains("expanded")) {
      detail.style.maxHeight = "none";
      btn.textContent = "Tutup";
    } else {
      detail.style.maxHeight = "180px";
      btn.textContent = "Baca Selengkapnya";
    }
  }); // <-- Pastikan ada tutup kurung ini
});

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  if (menu && overlay) {
    menu.classList.toggle("translate-x-full");
    overlay.classList.toggle("hidden");
  }
}
