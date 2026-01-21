/**
 * PORTFOLIO - PEDAT Evan
 * Script de gestion des interactions (Navigation, Menu, Carrousel, Zoom)
 * Design & Code par Calia Dev.
 */

// 1. Basculer l'affichage des sous-conteneurs (Fonction globale)
function toggleSupContainer(element) {
    const mainContainer = element.closest('.main-container');
    const supContainer = mainContainer.nextElementSibling;
    
    if (supContainer) {
        supContainer.classList.toggle("press");

        const lang = document.documentElement.lang; // Détection de la langue
        const showMoreText = lang === 'fr' ? "Voir plus d'informations" : "See more information";
        const showLessText = lang === 'fr' ? "Voir moins d'informations" : "See less information";

        // Changer le texte du bouton selon l'état
        element.textContent = supContainer.classList.contains("press") ? showLessText : showMoreText;
    }
}

// 2. Initialisation des composants après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PARTIE A : Activation des liens de navigation ---
    const navLinks = document.querySelectorAll('nav .main_bar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- PARTIE B : Gestion du menu mobile (Burger) ---
    const mainBar = document.querySelector('.main_bar');
    if (mainBar) {
        // Basculer l'état "active" sur la barre principale
        mainBar.addEventListener('click', event => {
            event.stopPropagation();
            mainBar.classList.toggle('active');
        });

        // Fermer le menu si on clique ailleurs sur la page
        document.addEventListener('click', event => {
            if (!mainBar.contains(event.target)) {
                mainBar.classList.remove('active');
            }
        });
    }

    // --- PARTIE C : Initialisation des carrousels ---
    document.querySelectorAll('.carousel-container').forEach(carouselContainer => {
        const carousel = carouselContainer.querySelector('.carousel');
        const images = carousel.querySelectorAll('picture');
        const prevButton = carouselContainer.querySelector('.prev');
        const nextButton = carouselContainer.querySelector('.next');
        let currentIndex = 0;

        if (carousel && images.length > 0) {
            const updateCarousel = () => {
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            };

            prevButton.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                updateCarousel();
            });

            nextButton.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }
    });

    // --- PARTIE D : Gestion du Zoom (Lightbox) ---
    // On place le code ici pour être sûr que les images sont chargées
    const galleryImages = document.querySelectorAll('.images img');
    const lightbox = document.getElementById('lightbox');

    if (lightbox && galleryImages.length > 0) {
        const lightboxImg = lightbox.querySelector('img');

        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src; // Utilise la source de l'image cliquée
                lightboxImg.alt = img.alt;
            });
        });

        // Fermeture de la lightbox au clic sur le fond
        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }
});