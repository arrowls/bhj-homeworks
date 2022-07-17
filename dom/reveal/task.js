const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect();
        if (elementPosition.top < window.innerHeight && elementPosition.bottom < window.innerHeight) {
            element.classList.add('reveal_active');
        }
        if (elementPosition.top < 0 || elementPosition.bottom > (window.innerHeight + elementPosition.height)) {
            element.classList.remove('reveal_active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
