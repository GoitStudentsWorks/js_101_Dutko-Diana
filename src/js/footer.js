const modal = document.getElementById('thankYouModal');
const closeButton = document.querySelector('.close-button');
const form = document.getElementById('contactForm');
const emailInput = form.querySelector('input[type="email"]');
const successMessage = document.querySelector('.message.green');
const errorMessage = document.querySelector('.message.red');

// Функція для відкриття модального вікна
function showModal() {
    modal.style.display = 'flex';
}

// Функція для закриття модального вікна
function hideModal() {
    modal.style.display = 'none';
}

// Обробка відправки форми
form.onsubmit = function(event) {
    event.preventDefault();
    
    // Збираємо дані з форми
    const email = form.querySelector('input[type="email"]').value;
    const comment = form.querySelector('input[placeholder="comments"]').value;
    const requestBody = JSON.stringify({ email: email, comment: comment });

    fetch('https://portfolio-js.b.goit.study/api/requests', { // Замініть URL на ваш endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Невідома помилка');
            });
        }
        return response.json();
    })
    .then(data => {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        emailInput.style.borderBottomColor = '#3CBC81'; // Зміна кольору лінії на зелений
        showModal();
        form.reset(); // Очищення форми
    })
    .catch(error => {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        emailInput.style.borderBottomColor = '#E74A3B'; // Зміна кольору лінії на червоний
    });
};

// Обробка закриття модального вікна
closeButton.onclick = hideModal;
window.onclick = function(event) {
    if (event.target === modal) {
        hideModal();
    }
};

// Додамо обробник події для закриття модального вікна через Esc
window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        hideModal();
    }
};
