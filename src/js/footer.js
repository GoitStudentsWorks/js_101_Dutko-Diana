window.onload = function() {
    const modal = document.getElementById('thankYouModal');
    const closeButton = document.querySelector('.close-button');
    const form = document.getElementById('contactForm');
    const emailInput = form.querySelector('input[type="email"]');

    // Функція для відкриття модального вікна
    function showModal() {
        modal.style.display = 'flex';
    }

    // Функція для закриття модального вікна
    function hideModal() {
        modal.style.display = 'none';
    }

    // Функція для показу повідомлень під полем вводу email
    function showMessage(message, color) {
        let messageContainer = form.querySelector('.message-container');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'message-container';
            messageContainer.style.position = 'relative';
            emailInput.parentNode.appendChild(messageContainer);
        }

        let messageElement = messageContainer.querySelector('.message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.style.position = 'absolute';
            messageElement.style.top = `${emailInput.offsetHeight + 5}px`; // позиціонуємо під полем вводу email
            messageElement.style.left = '0';
            messageElement.style.color = color;
            messageElement.style.fontSize = '14px'; // встановлення розміру шрифту
            messageContainer.appendChild(messageElement);
        }

        messageElement.textContent = message;
        messageElement.style.color = color;
        emailInput.style.borderBottomColor = color;
    }

    // Функція для видалення повідомлень
    function clearMessages() {
        const messageContainer = form.querySelector('.message-container');
        if (messageContainer) {
            messageContainer.parentNode.removeChild(messageContainer);
        }
        emailInput.style.borderBottomColor = '';
    }

    // Додаткова перевірка email
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Обробка відправки форми
    form.onsubmit = async function(event) {
        event.preventDefault();
        
        // Збираємо дані з форми
        const email = form.querySelector('input[type="email"]').value;
        const comment = form.querySelector('input[placeholder="comments"]').value;
        const requestBody = JSON.stringify({ email: email, comment: comment });

        // Перевірка, чи всі поля заповнені та чи правильний формат email
        if (!form.reportValidity() || !validateEmail(email)) {
            showMessage('Invalid email, try again.', '#E74A3B');
            return;
        }

        try {
            const response = await fetch('https://portfolio-js.b.goit.study/api/requests', { // Замініть URL на ваш endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Помилка при створенні заявки: ' + (errorData.message || 'Невідома помилка'));
            }

            const data = await response.json();
            clearMessages(); // Видалення повідомлень після успішного запиту
            showMessage('Success!', '#3CBC81');
            showModal();
            form.reset(); // Очищення форми
        } catch (error) {
            clearMessages();
            if (error.message === 'Failed to fetch') {
                showMessage('Відсутнє інтернет-з\'єднання. Перевірте ваше підключення і спробуйте знову.', '#E74A3B');
            } else if (error.message.includes('Помилка при створенні заявки')) {
                showMessage('Сталася помилка при надсиланні заявки. Будь ласка, перевірте введені дані і спробуйте знову. Деталі: ' + error.message, '#E74A3B');
            } else {
                showMessage('Сталася непередбачувана помилка. Будь ласка, спробуйте знову пізніше.', '#E74A3B');
            }
        }
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
}
