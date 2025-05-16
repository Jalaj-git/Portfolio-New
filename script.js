// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon(!isDark);
});

function updateThemeIcon(isDark) {
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll down functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
const projectsSection = document.getElementById('projects');

scrollIndicator.addEventListener('click', () => {
    projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Scroll up button functionality
const scrollUpButton = document.querySelector('.scroll-up');

function toggleScrollUpButton() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show button when user has scrolled more than 80% of the page
    if (scrollPosition + windowHeight >= documentHeight * 0.8) {
        scrollUpButton.classList.add('visible');
    } else {
        scrollUpButton.classList.remove('visible');
    }
}

// Show/hide scroll up button on scroll
window.addEventListener('scroll', toggleScrollUpButton);

// Scroll to top when button is clicked
scrollUpButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Check initial scroll position
toggleScrollUpButton();

// Update Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Project Data
const projects = [
    {
        title: 'Project ',
        description: 'Soon!!!',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['Soon'],
        link: '#'
    },
    {
        title: 'Project 2',
        description: 'A brief description of your second project.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: '#'
    },
    {
        title: 'Project 3',
        description: 'A brief description of your third project.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['Python', 'Django', 'PostgreSQL'],
        link: '#'
    }
];

// Load Projects
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="btn primary" target="_blank">View Project</a>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// Contact Form
const contactForm = document.getElementById('contact-form');
const messageTextarea = contactForm.querySelector('textarea');

messageTextarea.addEventListener('input', function() {
    const words = this.value.trim().split(/\s+/);
    const wordCount = this.value.trim() === '' ? 0 : words.length;
    
    if (wordCount > 250) {
        this.value = words.slice(0, 250).join(' ');
    }
    
    // Update placeholder to show remaining words
    const remainingWords = 250 - wordCount;
    this.setAttribute('placeholder', `Message (${remainingWords} words remaining)`);
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
    messageTextarea.setAttribute('placeholder', 'Message (max 250 words)');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();

    // Typed Text Animation
    const introSpan = document.querySelector('.typed-intro');
    const nameSpan = document.querySelector('.typed-name');
    const description = document.querySelector('.typed-description');

    function typeText(element, text, speed = 70, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                callback();
            }
        }
        typing();
    }

    // Clear the text and start typing effect
    if (introSpan && nameSpan && description) {
        introSpan.textContent = '';
        nameSpan.textContent = '';
        description.textContent = '';

        const intro = "Hi, I'm ";
        const name = "Prince J";
        const descText = "A passionate web developer crafting beautiful digital experiences";

        // Animate intro, then name, then description
        typeText(introSpan, intro, 70, () => {
            typeText(nameSpan, name, 100, () => {
                setTimeout(() => {
                    typeText(description, descText, 30);
                }, 400);
            });
        });
    }
});

// Particle Animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = body.getAttribute('data-theme') === 'dark' 
            ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`
            : `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.2})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((particle, index) => {
        for (let j = index + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x;
            const dy = particle.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = body.getAttribute('data-theme') === 'dark'
                    ? `rgba(255, 255, 255, ${0.1 * (1 - distance/100)})`
                    : `rgba(0, 0, 0, ${0.1 * (1 - distance/100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}

animate();

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll to top button
const scrollUp = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollUp.classList.add('visible');
    } else {
        scrollUp.classList.remove('visible');
    }
});

scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.hidden');
const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));

// Function to create a particle splash animation effect
function createParticleSplash(x, y) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = x + 'px';
    container.style.top = y + 'px';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    const particleCount = 20;
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = particleColor;
        particle.style.borderRadius = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        container.appendChild(particle);

        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        let posX = 0;
        let posY = 0;
        let opacity = 1;

        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        requestAnimationFrame(animate);
    }

    setTimeout(() => {
        container.remove();
    }, 1000);
}

// Add click event listener to all buttons on the page
document.querySelectorAll('button, .btn, a.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createParticleSplash(x, y);
    });
}); 