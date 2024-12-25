//

const target = document.querySelector('.covers-container');
const covers = document.querySelectorAll('.marquee__line');

const observerOptions = {
  root: null, 
  threshold: 0,
};

function onIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        [...covers].forEach(cover => cover.classList.add('is-active'));
    } else {
        [...covers].forEach(cover => cover.classList.remove('is-active'));
    }
  });
}

const observer = new IntersectionObserver(onIntersection, observerOptions);
observer.observe(target);

