const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect();
        if (elementPosition.top > 0) {
            element.classList.add('reveal_active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
