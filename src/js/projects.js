// бібліотека swiper завантажена:
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  slidesPerView: 1,
  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
    disabledClass: 'swiper-button-disabled',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  mousewheel: true,
});
