document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const btnNext = document.querySelector('.arrow.next');
    const btnPrev = document.querySelector('.arrow.prev');
    const slider = document.querySelector('.slider');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let timerId = null;
    let isAnimating = false;

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function clearTimer() {
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    function startTimer() {
        clearTimer();
        timerId = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3000);
    }

    btnNext.addEventListener('click', (event) => {
        event.preventDefault();
        goToSlide(currentIndex + 1);
        startTimer();
    });

    btnPrev.addEventListener('click', (event) => {
        event.preventDefault();
        goToSlide(currentIndex - 1);
        startTimer();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startTimer();
        });
    });

    slider.addEventListener('mouseenter', clearTimer);
    slider.addEventListener('mouseleave', startTimer);

    startTimer();
});