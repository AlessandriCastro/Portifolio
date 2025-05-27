// Animação de digitação para o título
const typeWriter = () => {
    const title = document.querySelector('.hero-content h1');
    const text = "Olá, eu sou Alessandri Castro";
    title.innerHTML = '';
    let i = 0;

    const type = () => {
        if (i < text.length) {
            if (i === 12) { // Posição onde começa o nome
                title.innerHTML += ' <span class="highlight">';
            }
            title.innerHTML += text.charAt(i);
            if (i === text.length - 1) { // Fecha a tag span no final
                title.innerHTML += '</span>';
            }
            i++;
            setTimeout(type, 100);
        }
    };

    type();
};

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de habilidades com contador
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => observer.observe(skill));
};

// Tema escuro/claro
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Verifica se há um tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Alterna o tema
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Animação das habilidades
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const progress = card.querySelector('.progress');
            const level = card.getAttribute('data-progress');
            
            card.classList.add('animate');
            progress.style.width = `${level}%`;
            
            observer.unobserve(card);
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    observer.observe(card);
});

// Animação dos projetos
const projectCards = document.querySelectorAll('.projeto-card');

projectCards.forEach(card => {
    observer.observe(card);
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    animateSkills();
    animateSkillProgress();
});

// Filtro de projetos
document.addEventListener('DOMContentLoaded', function() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const projetoCards = document.querySelectorAll('.projeto-card');
    const projetosGrid = document.querySelector('.projetos-grid');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filtroBtns.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Ajusta o espaçamento do grid baseado no filtro
            if (filterValue === 'web') {
                projetosGrid.style.gap = '0.2rem';
            } else {
                projetosGrid.style.gap = '2rem';
            }

            projetoCards.forEach(card => {
                if (filterValue === 'todos') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Menu hambúrguer
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
});

// Fechar o menu ao clicar em um link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Adiciona um pequeno delay ao follower para criar um efeito de "arrasto"
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Adiciona efeito hover em elementos interativos
const interactiveElements = document.querySelectorAll('a, button, input, textarea');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// Esconde o cursor quando sair da janela
document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
});

document.addEventListener('mouseover', () => {
    cursor.style.display = 'block';
    cursorFollower.style.display = 'block';
});

// Sistema de partículas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Configuração do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Classe Partícula
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(37, 99, 235, ${Math.random() * 0.5 + 0.1})`;
    }

    update(mouseX, mouseY) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Interação com o mouse
        if (mouseX && mouseY) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                this.speedX -= Math.cos(angle) * force * 0.5;
                this.speedY -= Math.sin(angle) * force * 0.5;
            }
        }

        // Limites da tela
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Velocidade máxima
        const maxSpeed = 2;
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (speed > maxSpeed) {
            this.speedX = (this.speedX / speed) * maxSpeed;
            this.speedY = (this.speedY / speed) * maxSpeed;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Criar partículas
const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Variáveis do mouse
let mouseX = null;
let mouseY = null;

// Atualizar posição do mouse
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
});

// Função de animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar partículas
    particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw();
    });

    // Desenhar conexões
    particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x;
            const dy = particle.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 * (1 - distance / 100)})`;
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