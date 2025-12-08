// Partículas de fundo (estrelas suaves)
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const createParticles = () => {
        particles = [];
        const count = window.innerWidth < 768 ? 50 : 120;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.5 + 0.2
            });
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(160, 160, 190, 0.4)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            p.y += p.speed;
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}
initParticles();

// Menu mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
            // Fecha menu mobile
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Modais
document.querySelectorAll('.project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'flex';
    });
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Animação ao rolar (fade-in suave)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section > .container > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});