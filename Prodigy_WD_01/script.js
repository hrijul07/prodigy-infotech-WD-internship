
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


const ctaBtn = document.getElementById("ctaBtn");

ctaBtn.addEventListener("click", () => {
  alert("Welcome! Let's build something amazing 🚀");
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
