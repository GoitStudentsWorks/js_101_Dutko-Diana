const modal = document.getElementById('thankYouModal');
const closeButton = document.querySelector('.close-button');
const form = document.getElementById('contactForm');
const emailInput = form.querySelector('input[type="email"]');
const successMessage = document.querySelector('.message.green');
const errorMessage = document.querySelector('.message.red');

function showModal() {
    modal.style.display = 'flex';
}

function hideModal() {
    modal.style.display = 'none';
    successMessage.style.display = 'none';
    emailInput.style.borderBottomColor = 'rgba(250, 250, 250, 0.2)';
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    const comment = form.querySelector('input[placeholder="comments"]').value;

    const postToAdd = {
        email,
        comment,
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(postToAdd),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    };

    fetch('https://portfolio-js.b.goit.study/api/requests', options)
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Невідома помилка');
            });
        }
        return response.json();
    })
    .then(() => {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        emailInput.style.borderBottomColor = '#3CBC81';
        showModal();
        form.reset();
    })
    .catch(() => {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        emailInput.style.borderBottomColor = '#E74A3B';
    });
});

closeButton.onclick = hideModal;
window.onclick = function(event) {
    if (event.target === modal) {
        hideModal();
    }
};

window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        hideModal();
    }
};
