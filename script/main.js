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
  });
});
