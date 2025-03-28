let slideIndex = 0; // Initialize slide index
const slides = document.querySelectorAll('.slideshow .slide'); // Select all slides

function showSlides() {
    slides.forEach((slide) => {
        slide.style.display = "none"; // Hide all slides
    });
    
    slideIndex++; // Increment slide index
    if (slideIndex >= slides.length) { // Reset to first slide if at the end
        slideIndex = 0;
    }
    
    slides[slideIndex].style.display = "block"; // Show the current slide
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

showSlides(); // Start the slideshow