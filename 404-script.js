// Set the countdown time
let seconds = 5;
const countdownElement = document.getElementById('countdown');

const timer = setInterval(() => {
    seconds--;
    countdownElement.textContent = seconds;

    if (seconds <= 0) {
        clearInterval(timer);
        // Change this URL to your main site link
        window.location.href = "https://irfan-safi00.github.io/Links/";
    }
}, 1000);
