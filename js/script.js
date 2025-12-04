document.addEventListener("DOMContentLoaded", function () {
  // --- On-scroll animations --- //
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  const elementsToAnimate = document.querySelectorAll(".animated-element");
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // --- Typing effect --- //
  const textPart1 = " Desenvolvedor Android";
  const textPart2 = " Web Full Stack em Formação";
  const element1 = document.getElementById("typing-text-1");
  const element2 = document.getElementById("typing-text-2");
  const cursor = document.querySelector(".typing-cursor");
  const typingSpeed = 70;
  function type(element, text, callback) {
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, typingSpeed);
      } else if (callback) {
        callback();
      }
    }
    typeChar();
  }
  setTimeout(() => {
    cursor.style.display = "inline-block";
    type(element1, textPart1, () => {
      type(element2, textPart2, () => {});
    });
  }, 500);

  // --- Modal Video Handler --- //
  const videoModal = document.getElementById("videoModal");
  const videoIframe = document.getElementById("youtube-video-iframe");
  videoModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const videoSrc = button.getAttribute("data-video-src");
    videoIframe.setAttribute("src", videoSrc + "?autoplay=1&rel=0");
  });
  videoModal.addEventListener("hide.bs.modal", function () {
    videoIframe.setAttribute("src", "");
  });

  // Adição sugerida: Integre particles.js aqui se quiser (ex.: descomente o div no HTML e adicione a biblioteca via CDN)
  particlesJS("particles-js", {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#0d6efd' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 2 }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' } } }
  });
});
