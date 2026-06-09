// wait for the DOM to be fully parsed and loaded before running the script
document.addEventListener('DOMContentLoaded', function(){

    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('slidePrev');
    const btnNext = document.getElementById('slideNext');
    let current = 0; // Tracks the index of the currently active slide

    function showSlide(index){
        if (slides.length === 0) return;

        slides[current].classList.remove('active');

        // Infinite loop logic: handle boundary constraints for the array index
        if (index >= slides.length) current = 0;
        else if (index < 0) current = slides.length - 1;
        else current = index;

        const next = slides[current];
        next.style.opacity= '0'; // Reset opacity before making the element visible
        next.classList.add('active');

        // Double requestAnimationFrame forces the browser to trigger the CSS opacity transition smoothly
        requestAnimationFrame(function(){
            requestAnimationFrame(function(){
                next.style.opacity = '1';
            });
        });
    }

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', function(){
            showSlide(current - 1);
        });

        btnNext.addEventListener('click', function(){
            showSlide(current + 1);
        })
    }
})