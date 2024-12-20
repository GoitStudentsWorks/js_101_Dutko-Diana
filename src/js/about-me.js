// бібліотека Accordion вже завантажена, потрібно тільки використати згідно з документацією)))
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
// так само бібліотека swiper завантажена:
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const acc = new Accordion('.info-list');
acc.open(0);

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    allowSlidePrev: false,
    slidesPerView: 2,

  breakpoints: {
      768: {
          slidesPerView: 3,
    },
   1440: {
       slidesPerView: 6,
    }
  },

  navigation: {
      nextEl: '.swiper-button-next',
    },
  keyboard: {
    enabled: true,
  },
    mousewheel: {
    invert: true,
    },
 
});
