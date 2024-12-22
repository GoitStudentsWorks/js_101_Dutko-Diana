document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("thankYouModal");
    var closeButton = document.querySelector(".close-button");

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        modal.style.display = "flex";
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
