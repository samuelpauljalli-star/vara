document.addEventListener('DOMContentLoaded', () => {
    // Adding reveal class to sections for scroll animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Intersection Observer for scroll animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 10%';
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.padding = '1rem 10%';
            navbar.style.background = 'rgba(13, 17, 23, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cursor Blob trailing effect (optional cool effect)
    const blob1 = document.querySelector('.blob-bg');
    const blob2 = document.querySelector('.blob-2');
    
    // Animate blobs slightly towards mouse position for a dynamic feel
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Gentle follow effect
    const animateBlobs = () => {
        // Blob 1 follows loosely
        const targetX1 = mouseX * 0.05;
        const targetY1 = mouseY * 0.05;
        
        // Blob 2 follows inversely
        const targetX2 = -mouseX * 0.05;
        const targetY2 = -mouseY * 0.05;

        if (blob1) blob1.style.transform = `translate(${targetX1}px, ${targetY1}px)`;
        if (blob2) blob2.style.transform = `translate(${targetX2}px, ${targetY2}px)`;

        requestAnimationFrame(animateBlobs);
    };

    // The CSS animation handles the main floating, we just add a subtle parallax
    // animateBlobs(); // Uncomment to enable subtle mouse follow on blobs
});
