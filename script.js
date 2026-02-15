// Smooth scroll avec offset pour la navigation fixe
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll pour les éléments
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux sections et cartes
const animateElements = document.querySelectorAll('.timeline-item, .stat-card, .profile-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navigation active selon la section visible
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.querySelector('.nav').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Effet de parallaxe léger sur le hero
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        if (scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Gestion du changement de style de la navigation au scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 14, 26, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 14, 26, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animation des statistiques au scroll (adaptée aux valeurs texte)
const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statValue = entry.target.querySelector('.stat-value');
            
            // Animation pour les valeurs numériques
            const textContent = statValue.textContent;
            const numericValue = parseInt(textContent);
            
            if (!isNaN(numericValue)) {
                // Si c'est un nombre, animation de compteur
                const suffix = textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        statValue.textContent = numericValue + suffix;
                        clearInterval(timer);
                    } else {
                        statValue.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            } else {
                // Si c'est du texte, animation de fade-in
                statValue.style.opacity = '0';
                statValue.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    statValue.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    statValue.style.opacity = '1';
                    statValue.style.transform = 'scale(1)';
                }, 100);
            }
            
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    statsObserver.observe(card);
});

// Animation des liens de contact au hover
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation de typing pour le rôle (optionnel - désactivé par défaut)
// Décommentez le code ci-dessous si vous voulez l'effet de typing
/*
const heroRole = document.querySelector('.hero-role');
if (heroRole) {
    const originalText = heroRole.textContent;
    heroRole.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < originalText.length) {
            heroRole.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Démarrer l'animation après un court délai
    setTimeout(typeWriter, 1000);
}
*/

// Easter egg : Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Effet spécial arc-en-ciel
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        // Message dans la console
        console.log('%c🎮 Konami Code activé ! Vous êtes un vrai Data Architect !', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Animation rainbow (pour l'easter egg)
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Messages console stylisés
console.log('%c🚀 Portfolio Hamid Zidelmal - Data Engineer', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%c💻 Développé avec Orbitron + JetBrains Mono', 'font-size: 14px; color: #7c3aed;');
console.log('%c💡 Astuce : Essayez le Konami Code (↑↑↓↓←→←→BA)', 'font-size: 12px; color: #94a3b8;');

// Détection du mode mobile et ajustements
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    // Désactiver certains effets lourds sur mobile pour améliorer les performances
    const orbRings = document.querySelectorAll('.orb-ring');
    orbRings.forEach(ring => {
        ring.style.animationDuration = '30s'; // Ralentir les animations
    });
}

// Performance : Utiliser Intersection Observer pour les animations coûteuses
const expensiveAnimations = document.querySelectorAll('.data-orb');
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        } else {
            // Optionnel : réduire l'opacité quand hors vue pour économiser des ressources
            // entry.target.style.opacity = '0.5';
        }
    });
}, { threshold: 0.1 });

expensiveAnimations.forEach(el => {
    performanceObserver.observe(el);
});
