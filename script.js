// wait for the DOM to be fully parsed and loaded before running the script
document.addEventListener('DOMContentLoaded', function(){

    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideDots');
    let current = 0; // Tracks the index of the currently active slide

    // Build one dot per slide, generated dynamically so the count follows slides.length
    const dots = [];
    if (dotsContainer) {
        slides.forEach(function(slide, i){
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Ir para avaliação ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function(){
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

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

        // Keep the active dot in sync with the current slide
        dots.forEach(function(dot, i){
            dot.classList.toggle('active', i === current);
        });

        // Double requestAnimationFrame forces the browser to trigger the CSS opacity transition smoothly
        requestAnimationFrame(function(){
            requestAnimationFrame(function(){
                next.style.opacity = '1';
            });
        });
    }

    // Dot navigation: jump to a slide and restart the timer so it doesn't advance right after a click
    function goToSlide(index){
        showSlide(index);
        stopAutoplay();
        startAutoplay();
    }

    const newsLetterInput = document.querySelector('.newsletter input[type="email"]');
    const newsLetterBtn = document.querySelector('.btn-enviar');

    if (newsLetterInput && newsLetterBtn) {
        newsLetterBtn.addEventListener('click', function(){
            const emailValue = newsLetterInput.value.trim(); // removes empty spaces

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

            if (emailValue == '') {
                alert('Por favor, insira um endereço de email válido.');
            } else if (!emailRegex.test(emailValue)) {
                alert('Por favor, insira um endereço de email válido.');
            } else {
                alert('Obrigado por se inscrever na nossa newsletter!');
                newsLetterInput.value = ''; // Clear the input field after successful submission
            }
        })
    }

    const newLocationInput = document.querySelector('.search-field input[type="text"]');
    const newDateInput = document.querySelector('input[aria-label="Data de ida"]');
    const newDateReturn = document.querySelector('input[aria-label="Data de retorno"]');
    const newLocationBtn = document.querySelector('.btn-buscar');

    if (newLocationInput && newDateInput && newDateReturn && newLocationBtn) {
        newLocationBtn.addEventListener('click', function() {

            // Cleans and gets the values
            const locationValue = newLocationInput.value.trim();
            const dateValue = newDateInput.value;
            const returnDateValue = newDateReturn.value;

            if (locationValue === '' || dateValue === '') {
                alert('Por favor, preencha corretamente os campos obrigatórios.');
            } 
            else if (returnDateValue === '') {
                alert(`Busca realizada! Destino: ${locationValue} - Ida: ${dateValue} (Sem retorno definido).`);
                newLocationInput.value = '';
                newDateInput.value = '';
            } 
            else {
                alert(`Busca realizada! Destino: ${locationValue} - Ida: ${dateValue} - Retorno: ${returnDateValue}.`);
                newLocationInput.value = '';
                newDateInput.value = '';
                newDateReturn.value = '';
            }
        })
    }


    // Autoplay: advance every 4s, paused while the mouse is over the section
    let autoplayTimer = null;

    function startAutoplay(){
        if (slides.length === 0) return;
        autoplayTimer = setInterval(function(){
            showSlide(current + 1);
        }, 4000);
    }

    function stopAutoplay(){
        clearInterval(autoplayTimer);
    }

    // Pause autoplay while the mouse is over the reviews section, resume when it leaves
    const slideWrapper = document.querySelector('.avaliacoes');

    if (slideWrapper) {
        slideWrapper.addEventListener('mouseenter', stopAutoplay);
        slideWrapper.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay(); // kick off the auto-advance on load

    // MOBILE NAVIGATION TOGGLE
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            
            if (navLinksContainer.classList.contains('active')) {
                navToggle.innerHTML = '&times;';
            } else {
                navToggle.innerHTML = '&#9776;';
            }
        });
    }
})