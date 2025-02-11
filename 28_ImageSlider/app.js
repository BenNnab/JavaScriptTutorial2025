let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    }

    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    slides[currentSlide].style.display = "block";
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function startAutoSlide(interval = 3000) {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, interval);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

showSlide(currentSlide);
startAutoSlide();

const slider = document.querySelector(".slider");
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", () => startAutoSlide());