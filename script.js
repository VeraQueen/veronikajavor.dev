"use strict";

const navList = document.querySelector(".nav-list");
const heroBtnsContainer = document.querySelector(".hero-btn-box");
const header = document.querySelector(".header");
const sectionHero = document.querySelector(".section-hero");

/////////////////////////////////////////
// SMOOTH SCROLLING //
/////////////////////////////////////////

// Smooth scrolling navigation
const scrollToHref = function (e) {
  const href = e.target.getAttribute("href");
  document.querySelector(href).scrollIntoView({ behavior: "smooth" });
};

navList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-list__link")) {
    scrollToHref(e);
    if (header.classList.contains("nav-open")) {
      toggleMobileSettings();
    }
  }
});

// Smooth scrolling hero btns
heroBtnsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains("btn") ||
    e.target.classList.contains("btn-mirror")
  ) {
    scrollToHref(e);
  }
});

// Smooth scrolling logo links
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("logo")) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (header.classList.contains("nav-open")) {
      toggleMobileSettings();
    }
  }
});

/////////////////////////////////////////
// STICKY NAVIGATION //
/////////////////////////////////////////
const headerHeight = header.getBoundingClientRect();

const stickyHeader = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const stickyHeaderLight = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add("sticky-light");
  else header.classList.remove("sticky-light");
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight.height}px`,
};

const secHeroObserver = new IntersectionObserver(stickyHeader, observerOptions);
secHeroObserver.observe(sectionHero);

/////////////////////////////////////////
// REVEAL SECTIONS ON SCROLL //
/////////////////////////////////////////

const allSections = document.querySelectorAll(".section");

const revealSections = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
  });
};

const sectionsObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionsObserver.observe(section);
});

/////////////////////////////////////////
// SLIDER //
/////////////////////////////////////////
const slider = function () {
  const slides = document.querySelectorAll(".illustration");
  const btnLeft = document.querySelector(".btn-left");
  const btnRight = document.querySelector(".btn-right");

  let curSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS
  const goToSlide = function (slide) {
    slides.forEach(function (s, i) {
      const translateXNum = 90 * (i - slide);
      let translateYNum, rotateDeg, grayscaleNum, zIndexNum, opacityNum;
      if (translateXNum === 0) {
        translateYNum = 0;
        rotateDeg = 0;
        grayscaleNum = 0;
        zIndexNum = 1;
        opacityNum = 100;
      } else if (translateXNum < 0) {
        translateYNum = 10;
        rotateDeg = -5;
        grayscaleNum = 1;
        zIndexNum = -1;
        opacityNum = 10;
      } else {
        translateYNum = 10;
        rotateDeg = 5;
        grayscaleNum = 1;
        zIndexNum = -1;
        opacityNum = 10;
      }
      s.style.transform = `translate(${translateXNum}%, ${translateYNum}%) rotate(${rotateDeg}deg)`;
      s.style.filter = `grayscale(${grayscaleNum})`;
      s.style.zIndex = zIndexNum;
      s.style.opacity = `${opacityNum}%`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // EVENT HANDLERS
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });
};
slider();

/////////////////////////////////////////
// MOBILE NAVIGATION //
/////////////////////////////////////////
const btnMobileMenu = document.querySelector(".btn-mobile-nav");
const overlay = document.querySelector(".overlay");
const logoImg = document.querySelector(".logo");

const toggleMobileSettings = function () {
  header.classList.toggle("nav-open");
  overlay.classList.toggle("hidden");
};

btnMobileMenu.addEventListener("click", toggleMobileSettings);
overlay.addEventListener("click", toggleMobileSettings);

/////////////////////////////////////////
// PROJECT IMAGE ANIMATION //
/////////////////////////////////////////

const projectImg = document.querySelectorAll(".project-img");

const projectImgContainer = document.querySelectorAll(
  ".project-image-container"
);
const projectImgContainerArr = Array.from(projectImgContainer);

const projectInfoBox = document.querySelectorAll(".project-info-box");
const projectInfoBoxArr = Array.from(projectInfoBox);

projectImg.forEach((img, i) => {
  img.addEventListener("mouseover", function () {
    projectImgContainerArr[i].style.zIndex = 2;
    projectInfoBoxArr[i].style.opacity = 0.3;
  });

  img.addEventListener("mouseout", function () {
    projectImgContainerArr[i].style.zIndex = 0;
    projectInfoBoxArr[i].style.opacity = 1;
  });
});
