/* ==========================================
AOS - ANIMAÇÕES DE ROLAGEM
========================================== */

document.addEventListener('DOMContentLoaded', () => {
AOS.init({
duration: 800,
once: true,
easing: 'ease-in-out'
});
});

/* ==========================================
EFEITO DE DIGITAÇÃO NO BANNER
========================================== */

if (document.querySelector('.typed-text')) {
new Typed('.typed-text', {
strings: [
'histórias únicas.',
'a espera da maternidade.',
'a essência da sua família.',
'retratos autênticos.',
'seus melhores momentos.'
],
typeSpeed: 60,
backSpeed: 40,
backDelay: 2000,
loop: true
});
}

/* ==========================================
MENU MOBILE
========================================== */

const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle && navMenu) {


mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});


}

/* ==========================================
BANCO DE IMAGENS DAS GALERIAS
========================================== */

const galleries = {


gestante: {
    title: "Gestante & Maternidade",
    images: [
        "img/ges1.jpg",
        "img/ges2.jpg",
        "img/ges3.jpg",
        "img/ges4.jpg",
        "img/ges5.jpg"
    ]
},

externo: {
    title: "Ensaios Externos",
    images: [
        "img/arlivre1.jpg",
        "img/arlivre2.jpg",
        "img/arlivre3.jpg",
        "img/arlivre4.jpg",
        "img/arlivre5.jpg"
    ]
},

feminino: {
    title: "Individual Feminino",
    images: [
        "img/indfem1.jpg",
        "img/indfem2.jpg",
        "img/indfem3.jpg",
        "img/indfem4.jpg",
        "img/indfem5.jpg"
    ]
},

casal: {
    title: "Ensaio de Casal",
    images: [
        "img/casal1.jpg",
        "img/casal2.jpg",
        "img/casal3.jpg",
        "img/casal4.jpg",
        "img/casal5.jpg"
    ]
},

tematico: {
    title: "Temático Mensal",
    images: [
        "img/tema1.jpg",
        "img/tema2.jpg",
        "img/tema3.jpg",
        "img/tema4.jpg",
        "img/tema5.jpg"
    ]
},

pet: {
    title: "Pets",
    images: [
        "img/pet1.jpg",
        "img/pet2.jpg",
        "img/pet3.jpg",
        "img/pet4.jpg",
        "img/pet5.jpg"
    ]
}


};

/* ==========================================
MODAL DE GALERIA
========================================== */

const modal = document.getElementById('galleryModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalCounter = document.getElementById('modalCounter');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentGalleryKey = null;
let currentImageIndex = 0;

/* Abrir Modal */

document.querySelectorAll('.clickable-card').forEach(card => {


card.addEventListener('click', () => {

    const category = card.getAttribute('data-category');

    if (galleries[category]) {

        currentGalleryKey = category;
        currentImageIndex = 0;

        updateModalContent();

        modal.classList.add('active');

        document.body.style.overflow = 'hidden';
    }
});


});

/* Atualizar Modal */

function updateModalContent() {


const data = galleries[currentGalleryKey];

modalTitle.innerText = data.title;

modalImage.style.opacity = '0.3';

setTimeout(() => {

    modalImage.src = data.images[currentImageIndex];

    modalImage.style.opacity = '1';

}, 150);

modalCounter.innerText =
    `${currentImageIndex + 1} / ${data.images.length}`;


}

/* Foto Anterior */

modalPrev.addEventListener('click', () => {


if (!currentGalleryKey) return;

const images = galleries[currentGalleryKey].images;

currentImageIndex =
    (currentImageIndex - 1 + images.length) % images.length;

updateModalContent();


});

/* Próxima Foto */

modalNext.addEventListener('click', () => {


if (!currentGalleryKey) return;

const images = galleries[currentGalleryKey].images;

currentImageIndex =
    (currentImageIndex + 1) % images.length;

updateModalContent();


});

/* Fechar Modal */

function closeModal() {


modal.classList.remove('active');

document.body.style.overflow = 'auto';


}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

/* Fechar com ESC */

document.addEventListener('keydown', (e) => {


if (
    e.key === 'Escape' &&
    modal.classList.contains('active')
) {
    closeModal();
}


});

/* ==========================================
FORMULÁRIO FORMSPREE
========================================== */

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {


contactForm.addEventListener('submit', async function (event) {

    event.preventDefault();

    const submitBtn =
        document.getElementById('submitBtn');

    submitBtn.disabled = true;

    submitBtn.innerHTML =
        'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';

    const data = new FormData(event.target);

    try {

        const response = await fetch(
            event.target.action,
            {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (response.ok) {

            formStatus.style.color = '#6486AC';

            formStatus.innerHTML =
                '✨ Mensagem enviada com sucesso! Em breve entrarei em contato.';

            contactForm.reset();

        } else {

            formStatus.style.color = '#ff6b6b';

            formStatus.innerHTML =
                'Ops! Houve um problema ao enviar. Tente pelo WhatsApp.';
        }

    } catch (error) {

        formStatus.style.color = '#ff6b6b';

        formStatus.innerHTML =
            'Ops! Houve um problema ao enviar. Tente pelo WhatsApp.';

    } finally {

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            'Enviar Solicitação <i class="fa-solid fa-paper-plane"></i>';
    }
});


}
