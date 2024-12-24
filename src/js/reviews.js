// бібліотека swiper завантажена:
import Swiper from 'swiper';
import 'swiper/css';
// додав ізітост
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// запит на сервер
async function fetchReviews() {
      try {
        const response = await fetch('https://portfolio-js.b.goit.study/api/reviews');
        
        if (!response.ok) {
          iziToast.error({
            title: 'Error',
            message: 'Not Found',
            position: 'topRight',
          });
          throw new Error('Not Found');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          createReviews(data); 
        } else {
          console.error("Data format is incorrect");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

// формуємо картки
function createReviews(images) {
  const reviewContainer = document.getElementById('gallery-container');

  images.forEach(({ avatar_url, author, review }) => {
    const imgCard = document.createElement('li');
    imgCard.classList.add('review-gallery-item', 'swiper-slide');

    imgCard.innerHTML = `
            <img src="${avatar_url}" alt="${author}'s avatar" class="avatar"/>
              <h3 class='review-author'>${author}</h3>
              <p class='review-text'>${review}</p>
        `;

    reviewContainer.appendChild(imgCard);
  });
    initializeSwiper();
}
    
// свайпер
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.btn-next',
    prevEl: '.btn-prev',
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
// грузимо при завантаженні
window.onload = fetchReviews;