// бібліотека swiper завантажена:
import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const reviewContainer = document.getElementById('gallery-container');

const reviewsSection = document.getElementById('reviews');

async function fetchReviews() {
  const response = await axios.get(
    'https://portfolio-js.b.goit.study/api/reviews'
  );
  return response.data;
}

async function reviews() {
  try {
    const review = await fetchReviews();

    createReviews(review);
    const swiper = new Swiper('.reviews-container.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
        nextEl: '.reviews-btn.btn-next',
        prevEl: '.reviews-btn.btn-prev',
        disabledClass: 'swiper-button-disabled',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1440: {
          slidesPerView: 4,
        },
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
  } catch (error) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (reviewContainer.children.length === 0) {
              iziToast.error({
                title: 'Error',
                message: 'Reviews not found.',
                position: 'topRight',
                backgroundColor: 'red',
                theme: 'dark',
                overlay: false,
                titleColor: 'white',
                messageColor: 'white',
                overlayColor: 'rgba(0, 0, 0, 0.6)',
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(reviewsSection);
  }
}

reviews();

// формуємо картки
function createReviews(images) {
  const reviews = images
    .map(({ avatar_url, author, review }) => {
      return `
    <li class="review-gallery-item swiper-slide">
            <img src="${avatar_url}" alt="${author}'s avatar" class="avatar"/>
              <h3 class='review-author'>${author}</h3>
              <p class='review-text'>${review}</p>
              </li>
        `;
    })
    .join('');

  reviewContainer.insertAdjacentHTML('beforeend', reviews);
}

const swiper = new Swiper('.reviews-container.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.reviews-btn.btn-next',
    prevEl: '.reviews-btn.btn-prev',
    disabledClass: 'swiper-button-disabled',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 4,
    },
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
