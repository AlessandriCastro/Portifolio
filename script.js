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