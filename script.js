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

    const newsLetterInput = document.querySelector('.newsletter input[type="email"]');
    const newsLetterBtn = document.querySelector('.btn-enviar');

    if (newsLetterInput && newsLetterBtn) {
        newsLetterBtn.addEventListener('click', function(){
            const emailValue = newsLetterInput.value.trim(); // removes empty spaces

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

            if (emailRegex == '') {
                alert('Por favor, insira um endereço de email válido.');
            } else if (!emailRegex.test(emailValue)) {
                alert('Por favor, insira um endereço de email válido.');
            } else {
                alert('Obrigado por se inscrever na nossa newsletter!');
                newsLetterInput.value = ''; // Clear the input field after successful submission
            }
        })
    }

    const newLocaationInput = document.querySelector('.search-field input[type="text"]');
    const newDateInput = document.querySelector('input[aria-label="Data de ida"]');
    const newDateReturn = document.querySelector('input[aria-label="Data de retorno"]');
    const newLocaationBnt = document.querySelector('.btn-buscar');

    if (newLocaationInput && newDateInput && newDateReturn && newLocaationBnt) {
        newLocaationBnt.addEventListener('click', function() {

            // Cleans and gets the values
            const locationValue = newLocaationInput.value.trim();
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


    // contextual keyboard navigation for carrousel slider
    const slideWrapper = document.querySelector('.avaliacoes');
    let isMouseOverSlider = false;

    if (slideWrapper) {
        slideWrapper.addEventListener('mouseenter', function() {
            isMouseOverSlider = true;
        });

        slideWrapper.addEventListener('mouseleave', function() {
            isMouseOverSlider = false;
        });
    }

    // Global keydown listener: 'e' is the event object automatically passed by the browser containing key metadata
    document.addEventListener('keydown', function (e) {
        if (slides.length > 0 && isMouseOverSlider) {
            if (e.key === 'ArrowLeft') {
                showSlide(current - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(current + 1);
            }
        }
    });

})