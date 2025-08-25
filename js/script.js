// 1. Activation des liens de navigation
document.querySelectorAll('nav .main_bar a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('nav .main_bar a').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// 2. Gestion de l'ouverture/fermeture du menu
document.addEventListener('DOMContentLoaded', () => {
    const mainBar = document.querySelector('.main_bar');

    // Basculer l'état "active" sur la barre principale
    mainBar.addEventListener('click', event => {
        event.stopPropagation();
        mainBar.classList.toggle('active');
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', event => {
        if (!mainBar.contains(event.target)) mainBar.classList.remove('active');
    });

    // 3. Initialisation des carrousels
    document.querySelectorAll('.carousel-container').forEach(carouselContainer => {
        const carousel = carouselContainer.querySelector('.carousel');
        const images = carousel.querySelectorAll('picture');
        const prevButton = carouselContainer.querySelector('.prev');
        const nextButton = carouselContainer.querySelector('.next');
        let currentIndex = 0;

        const updateCarousel = () => {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    });
});

// 4. Basculer l'affichage des sous-conteneurs
function toggleSupContainer(element) {
    const supContainer = element.closest('.main-container').nextElementSibling;
    supContainer.classList.toggle("press");

    const lang = document.documentElement.lang; // Langue de la page
    const showMoreText = lang === 'fr' ? "Voir plus d'informations" : "See more information";
    const showLessText = lang === 'fr' ? "Voir moins d'informations" : "See less information";

    // Changer le texte du bouton
    element.textContent = supContainer.classList.contains("press") ? showLessText : showMoreText;
}

// Récupère toutes les images de la section
const images = document.querySelectorAll('.images img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

// Quand on clique sur une image
images.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src; // affiche la même image en grand
  });
});

// Quand on clique sur le fond noir => fermer
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});


