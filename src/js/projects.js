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
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});
