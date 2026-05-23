const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// 1. Hamburger Menu & Animasi X
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });
}

// 2. Fitur Baca Selengkapnya (Sudah Digabung & Otomatis Sembunyi Jika Teks Pendek)
const readMoreButtons = document.querySelectorAll(".read-more-btn");

readMoreButtons.forEach((btn) => {
  const detail = btn.previousElementSibling;

  if (detail) {
    // Sembunyikan tombol otomatis di awal jika teks aslinya pendek
    if (detail.scrollHeight <= 85) {
      btn.style.display = "none";
    }

    // Logika interaksi saat tombol diklik
    btn.addEventListener("click", () => {
      detail.classList.toggle("expanded");

      if (detail.classList.contains("expanded")) {
        detail.style.maxHeight = detail.scrollHeight + "px"; // Terbuka pas sesuai isi teks
        btn.textContent = "Tutup";
      } else {
        detail.style.maxHeight = "75px"; // Kembali terpotong rapi
        btn.textContent = "Baca Selengkapnya";
      }
    });
  }
});

// 3. Reset Form Saat Halaman Direfresh
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};
