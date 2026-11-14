
"use strict";

// ===================================
// ZEROFAB — PERSONAL PORTFOLIO
// ===================================


// 1. ANO AUTOMÁTICO

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 2. MENU MOBILE

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );

  });

  // Fechar menu ao clicar em um link

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");

    });

  });

}


// 3. ANIMAÇÕES DE ENTRADA

const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  reducedMotion ||
  !("IntersectionObserver" in window)
) {

  revealElements.forEach(element => {
    element.classList.add("active");
  });

} else {

  const observer = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });

}


// 4. CURSOR PERSONALIZADO

const cursor = document.querySelector(".cursor");
const cursorOutline = document.querySelector(".cursor-outline");

const finePointer = window.matchMedia(
  "(pointer: fine)"
).matches;

if (cursor && cursorOutline && finePointer) {

  let mouseX = 0;
  let mouseY = 0;

  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener("pointermove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

  });

  function animateCursor() {

    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  // Efeito ao passar sobre elementos clicáveis

  document.querySelectorAll("a, button").forEach(element => {

    element.addEventListener("mouseenter", () => {

      cursorOutline.style.width = "55px";
      cursorOutline.style.height = "55px";

    });

    element.addEventListener("mouseleave", () => {

      cursorOutline.style.width = "34px";
      cursorOutline.style.height = "34px";

    });

  });

}


// 5. MOVIMENTO SUTIL DOS ELEMENTOS DO HERO

const hero = document.querySelector(".hero");
const heroArt = document.querySelector(".hero-art");

if (hero && heroArt && finePointer && !reducedMotion) {

  hero.addEventListener("pointermove", event => {

    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroArt.style.transform = `
      translate(${x * 15}px, ${y * 15}px)
    `;

  });

  hero.addEventListener("pointerleave", () => {

    heroArt.style.transform = "translate(0, 0)";

  });

}


// 6. MENSAGEM NO CONSOLE

console.log(
  "%cZeroFab",
  "font-size: 30px; font-weight: bold; color: #a78bfa;"
);

console.log(
  "Bem-vindo ao meu portfólio. Construído com curiosidade e código."
);
