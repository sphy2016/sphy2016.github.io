(function () {
  var AUTOPLAY_DELAY = 5000;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initCarousel(carousel) {
    var slides = Array.prototype.slice.call(
      carousel.querySelectorAll(".research-carousel-slide")
    );
    var prevButton = carousel.querySelector("[data-carousel-prev]");
    var nextButton = carousel.querySelector("[data-carousel-next]");
    var dots = Array.prototype.slice.call(
      carousel.querySelectorAll("[data-carousel-dot]")
    );
    var activeIndex = Math.max(
      0,
      slides.findIndex(function (slide) {
        return slide.classList.contains("is-active");
      })
    );
    var timer = null;

    if (!slides.length) {
      return;
    }

    if (slides.length <= 1) {
      carousel.classList.add("is-single");
    }

    function showSlide(nextIndex) {
      activeIndex = (nextIndex + slides.length) % slides.length;

      slides.forEach(function (slide, index) {
        slide.classList.toggle("is-active", index === activeIndex);
      });

      dots.forEach(function (dot, index) {
        var isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function isPausedByUser() {
      return carousel.matches(":hover") || carousel.contains(document.activeElement);
    }

    function startAutoplay() {
      if (slides.length <= 1 || reduceMotion || timer || isPausedByUser()) {
        return;
      }

      timer = window.setInterval(function () {
        showSlide(activeIndex + 1);
      }, AUTOPLAY_DELAY);
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        showSlide(activeIndex - 1);
        stopAutoplay();
        startAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        showSlide(activeIndex + 1);
        stopAutoplay();
        startAutoplay();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var nextIndex = Number(dot.getAttribute("data-carousel-dot"));
        if (!Number.isNaN(nextIndex)) {
          showSlide(nextIndex);
          stopAutoplay();
          startAutoplay();
        }
      });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    showSlide(activeIndex);
    startAutoplay();
  }

  function initAllCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllCarousels);
  } else {
    initAllCarousels();
  }
})();
