document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".lazy");
  if ("IntersectionObserver" in window) {
    const options = {
      root: document.querySelector(".container"),
      rootMargin: "0px",
      threshold: 0.5,
    };
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          io.unobserve(img);
        }
      });
    }, options);

    images.forEach((img) => {
      io.observe(img);
    });
  } else {
    const lazyload = () => {
      let lazyloadTimeOut = null;

      if (lazyloadTimeOut) {
        clearTimeout(lazyloadTimeOut);
      }

      lazyloadTimeOut = setTimeout(() => {
        let scrollTop = window.pageYOffset;
        images.forEach((img) => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });
        if (images.length === 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationchange", lazyload);
        }
      });
    };
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationchange", lazyload);
  }
});
