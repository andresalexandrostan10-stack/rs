document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    let player;

    // --- Efecto de Corazones Cayendo (sin cambios) ---
    const heartsContainer = document.querySelector('.hearts-container');
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 15 + 10}px`;
        const duration = Math.random() * 5 + 5;
        heart.style.animation = `fall ${duration}s linear forwards`;
        heartsContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, duration * 1000);
    }
    setInterval(createHeart, 300);

    // --- Efecto de Escritura a Máquina (sin cambios) ---
    const typingElement = document.querySelector('.hero h2');
    const textToType = typingElement.textContent;
    typingElement.textContent = '';
    function typeWriter(text, i) {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 100);
        }
    }
    setTimeout(() => typeWriter(textToType, 0), 1000);

    // --- Efecto de aparecer al hacer Scroll (MODIFICADO para incluir nueva sección) ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    // Añadimos la nueva clase '.gifts' a los elementos a animar
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .reason-card, .gallery-grid img, .letter, section h2, .gifts');
    elementsToAnimate.forEach(el => { observer.observe(el); });

    // --- API de YouTube (sin cambios) ---
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-video', {});
    }

    // =======================================================
    // --- LÓGICA PARA LOS 3 REGALOS (NUEVA) ---
    // =======================================================
    const giftCards = document.querySelectorAll('.gift-card');

    giftCards.forEach(card => {
        card.addEventListener('click', () => {
            // Solo actuar si la tarjeta no ha sido revelada ya
            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
                
                // Comprobar si esta tarjeta contiene el vídeo
                const videoIframe = card.querySelector('#youtube-video');
                if (videoIframe && player) {
                    // Esperar un poco a que la animación de giro termine
                    setTimeout(() => {
                        player.playVideo();
                    }, 700);
                }
            }
        }, { once: true }); // El evento solo se dispara una vez por tarjeta
    });


    // --- Lógica del Gato (sin cambios) ---
    const speechBubble = document.querySelector('.cat-speech-bubble');
    const comments = [
        { scrollPercent: 0, text: "¡Hola, Sara! ¡Soy Simba! 🐾" },
        { scrollPercent: 15, text: "¡Aqui empezo todo con tu chico!" },
        { scrollPercent: 40, text: "Este chico me encanta para ti ✨" },
        { scrollPercent: 65, text: "Wow, cuantos recuerdos, que bonito" },
        { scrollPercent: 80, text: "Ahora vienen unas sorpresas... 🎁" }, // Mensaje actualizado
        { scrollPercent: 95, text: "¡Feliz mesiversario! ❤️" }
    ];
    let currentCommentIndex = -1;
    let commentTimeout;
    function showComment(text) {
        speechBubble.textContent = text;
        speechBubble.classList.add('active');
        clearTimeout(commentTimeout);
        commentTimeout = setTimeout(() => {
            speechBubble.classList.remove('active');
        }, 4000);
    }
    function handleScroll() {
        const scrollY = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
        for (let i = 0; i < comments.length; i++) {
            if (scrollPercent >= comments[i].scrollPercent && i > currentCommentIndex) {
                showComment(comments[i].text);
                currentCommentIndex = i;
                break;
            }
        }
        if (scrollPercent < comments[0].scrollPercent) {
            currentCommentIndex = -1;
        }
    }
    setTimeout(() => {
        showComment(comments[0].text);
        currentCommentIndex = 0;
    }, 1500);
    window.addEventListener('scroll', handleScroll);
});