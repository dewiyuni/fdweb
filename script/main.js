// --- 1. DEKLARASI VARIABEL UTAMA ---
const hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("nav-links"); // Mengganti nama agar tidak tertukar
const navLinks = document.querySelectorAll(".nav-links a"); // Mengambil semua link <a> untuk scroll spy & click
const sections = document.querySelectorAll("section[id]");

// --- 2. HAMBURGER MENU & ANIMASI X ---
if (hamburger && navContainer) {
  hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  // Klik menu apa saja langsung menutup panel mobile
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });
}

// --- 3. FITUR SOROTAN MENU SAAT SCROLL (INTERSECTION OBSERVER) ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Jika section masuk ke layar browser sebesar minimal 40%
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // PERBAIKAN: Sekarang berjalan lancar karena navLinks berupa QuerySelectorAll
        navLinks.forEach((link) => link.classList.remove("active"));

        // Tambahkan class 'active' ke menu yang cocok dengan id section saat ini
        const activeLink = document.querySelector(
          `.nav-links a[href="#${id}"]`,
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    // Mengatur area deteksi agar pas di tengah layar saat di-scroll
    rootMargin: "-30% 0px -50% 0px",
  },
);

// Daftarkan semua section ke sistem pemantau scroll
sections.forEach((section) => observer.observe(section));

// --- 4. FITUR BACA SELENGKAPNYA ---
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

// --- 5. RESET FORM SAAT HALAMAN DIREFRESH ---
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

// --- 6. LOGIKA PENGIRIMAN FORMULIR KE WHATSAPP ---
const waForm = document.getElementById("wa-form");
if (waForm) {
  waForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah muat ulang halaman bawaan browser

    const nama = document.getElementById("nama").value;
    const paket = document.getElementById("paket").value;
    const pesan = document.getElementById("pesan").value;

    // PERBAIKAN: Format nomor dan link wa.me diubah menjadi standar internasional yang benar
    const nomorWA = "6285865334840";

    // Format susunan teks teks chat agar rapi terbaca
    const teksChat = `Halo Fdweb.id,%0A%0ASaya ingin konsultasi pembuatan website.%0A%0A*Nama:* ${nama}%0A*Pilihan Paket:* ${paket}%0A*Detail Kebutuhan:* ${pesan}`;

    // Buka tautan WhatsApp secara otomatis di tab baru
    window.open(`https://wa.me{nomorWA}?text=${teksChat}`, "_blank");

    waForm.reset(); // Mengosongkan form kembali setelah dikirim
  });
}
// --- 7. LOGIKA TOMBOL PLAY / PAUSE VIDEO PORTOFOLIO ---
const controlButtons = document.querySelectorAll(".video-control-btn");

controlButtons.forEach((btn) => {
  // Ambil elemen video yang berada tepat sebelum posisi tombol ini
  const video = btn.previousElementSibling;

  if (video && video.tagName === "VIDEO") {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Mencegah klik tombol mengacaukan hover kartu

      // Jika video sedang berhenti/pause, maka putar videonya
      if (video.paused) {
        video.play();
        btn.textContent = "⏸"; // Ubah ikon jadi Pause (Garis dua)
        btn.style.background = "rgba(0, 180, 216, 0.8)"; // Beri warna cyan tanda video jalan
      } else {
        // Jika video sedang berjalan, maka hentikan videonya
        video.pause();
        btn.textContent = "▶"; // Kembalikan ikon jadi Play (Segitiga)
        btn.style.background = "rgba(15, 23, 42, 0.7)"; // Kembalikan warna gelap transparan
      }
    });
  }
});
