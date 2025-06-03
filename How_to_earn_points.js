function animateCounter(id, target, duration) {
    const counter = document.getElementById(id);
    let current = 0;
    const increment = Math.ceil(target / (duration / 20));
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = current.toLocaleString();
    }, 20);
}

// Animate on page load
window.onload = () => {
    animateCounter("points-counter", 1250, 2000);
    animateCounter("stars-counter", 50, 2000);
    animateCounter("rewards-counter", 5, 2000);
    updateProgressBar();
};

// Progress logic
const totalSteps = 6;
let completedSteps = JSON.parse(localStorage.getItem('completedSteps')) || Array(totalSteps).fill(false);

function completeStep(index) {
    if (!completedSteps[index]) {
        completedSteps[index] = true;
        localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
        updateProgressBar();
    }
}

function updateProgressBar() {
    const completed = completedSteps.filter(Boolean).length;
    const percent = Math.round((completed / totalSteps) * 100);
    const bar = document.getElementById('progress-bar');
    bar.style.width = percent + '%';
    bar.textContent = `${percent}% Completed`;
}

// Search QR
document.getElementById('search-btn').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (searchInput.includes('earn points')) {
        generateQRCode('https://example.com/earn-points');
        document.getElementById('qr-code-section').style.display = 'block';
    } else {
        alert('Sorry, no results found.');
    }
});

function generateQRCode(url) {
    QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, function(err, url) {
        document.getElementById('qr-code-img').src = url;
    });
}