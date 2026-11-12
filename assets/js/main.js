
// Header scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// Counter animation
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const statsSection = document.getElementById('global-impact');
if (statsSection) statsObserver.observe(statsSection);

// Tabs: valores / servicios
function showTab(tab) {
  document.getElementById('tab-valores').classList.toggle('hidden', tab !== 'valores');
  document.getElementById('tab-servicios').classList.toggle('hidden', tab !== 'servicios');
  document.getElementById('btn-valores').className = 'tab-btn px-6 py-2 uppercase tracking-widest text-sm font-bold transition-all duration-300 ' + (tab === 'valores' ? 'active' : 'inactive');
  document.getElementById('btn-servicios').className = 'tab-btn px-6 py-2 uppercase tracking-widest text-sm font-bold transition-all duration-300 ' + (tab === 'servicios' ? 'active' : 'inactive');
}

// Featured self-hosted video
const teoremaVideo = document.getElementById('teorema-video');
const teoremaPlay = document.getElementById('teorema-play');
const teoremaEnded = document.getElementById('teorema-ended');
if (teoremaVideo && teoremaPlay && teoremaEnded) {
  teoremaPlay.addEventListener('click', () => {
    if (!teoremaVideo.src) {
      teoremaVideo.src = teoremaVideo.dataset.src;
      teoremaVideo.load();
    }
    teoremaPlay.classList.add('is-hidden');
    teoremaVideo.play().catch(error => console.error('No se pudo reproducir el video:', error));
  });
  teoremaVideo.addEventListener('play', () => teoremaPlay.classList.add('is-hidden'));
  teoremaVideo.addEventListener('ended', () => teoremaEnded.classList.remove('hidden'));
}

// Video modal
function openVideo(url) {
  document.getElementById('video-iframe').src = url + '?autoplay=1';
  document.getElementById('video-modal').classList.add('modal-open');
  document.body.style.overflow = 'hidden';
}
function closeVideo(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('video-iframe').src = '';
  document.getElementById('video-modal').classList.remove('modal-open');
  document.body.style.overflow = '';
}

// Event details modal
const eventDetails = {
  'zonal-beatbox': {
    title: 'Zonal de Beatbox',
    subtitle: 'Torneo Beat Brothers (Liga Nacional de Beatbox)',
    logo: 'assets/img/beatbrother-logo.png',
    accent: '#aaa',
    points: [
      'Beatbox es el arte de hacer música con el cuerpo, y principalmente con la voz.',
      '9 fechas mensuales en un año.',
      'Jueces son reconocidos beatboxers y músicos de relevancia nacional.',
      'Shows de elementos Hip Hop, como break dance; rap y graffiti.',
      '+100 personas como público.',
      '10 competidores aprox. por fecha.',
      'Surge campeón de la fecha, seleccionado a final nacional anual.',
      '1 final nacional anual.'
    ]
  },
  'selectivo-zonal': {
    title: 'Selectivo Zonal de Rap Freestyle',
    subtitle: 'Inicio de circuito mundial BDM. Inscripción abierta.',
    logo: 'assets/img/bdm-logo.png',
    accent: '#a81c24',
    points: [
      'Rap es ritmo y poesía (rhythm and poetry).',
      '4 selectivos zonales por región.',
      'Podio seleccionado y becado para la final regional.',
      'Shows de elementos Hip Hop, como break dance; rap y graffiti.',
      '+100 personas como público.',
      '20 competidores aprox. por fecha.',
      'Surge campeón de la fecha, seleccionado a final regional.',
      '4 comunas por región.'
    ]
  },
  'final-regional': {
    title: 'Final Regional de Rap Freestyle',
    subtitle: '1 final regional por circuito (1,5 años)',
    logo: 'assets/img/bdm-logo.png',
    accent: '#a81c24',
    points: [
      'Rap es ritmo y poesía (rhythm and poetry).',
      'Freestyle es improvisación libre. Batalla temáticas.',
      '1 final regional en cada región de Chile por cada ciclo (1,5 años).',
      'Shows de elementos Hip Hop, como DJ; beatbox; break dance; rap; graffiti; estilo callejero.',
      '+200 personas como público.',
      '32 competidores. 16 seleccionados de selectivos zonales previos.',
      'Incluye selectivo zonal última oportunidad regional.',
      'Surge campeón regional.',
      'Campeón representa a su región en la final regional. Viaje becado.'
    ]
  },
  'final-nacional-gold': {
    title: 'Final Nacional de Rap Freestyle',
    subtitle: 'Final Nacional de Chile (Circuito 2025-2026)',
    logo: 'assets/img/bdm-logo-gold.png',
    accent: '#d99b2b',
    points: [
      'Rap es ritmo y poesía (rhythm and poetry).',
      'Freestyle es improvisación libre. Batalla temáticas.',
      '1 final nacional de Chile por cada ciclo (1,5 años).',
      'Shows Hip Hop: DJ; beatbox; break dance; rap; graffiti. Nivel nacional.',
      '+300 personas como público.',
      '18 competidores (16 campeones regionales y podio anterior).',
      'Incluye selectivo última oportunidad nacional.',
      'Surge campeón nacional.',
      'Campeón representa al país en la final mundial. Viaje becado.',
      'Evento dura un fin de semana.',
      'Clases; filmaciones; cyphers; turismo; contenido audiovisual.'
    ]
  },
  'final-mundial-deluxe': {
    title: 'Final Mundial BDM Deluxe',
    subtitle: 'Final del circuito mundial 2025-2026',
    logo: 'assets/img/bdm-logo-platinium.png',
    accent: '#d8dce2',
    points: [
      'Rap es ritmo y poesía (rhythm and poetry).',
      'Freestyle es improvisación libre. Batalla temáticas.',
      'Gran final mundial de circuito.',
      'Shows Hip Hop: DJ; beatbox; break dance; rap; graffiti. Nivel nacional.',
      '+2.000 personas como público.',
      '26 campeones nacionales de 4 continentes.',
      'Evento dura un fin de semana.',
      'Clases; filmaciones; cyphers; turismo; contenido audiovisual.',
      'Surge campeón mundial BDM.',
      'Campeones mundiales: Aczino; Teorema; Chuty; Les3; Joqker; Filósofo MC.'
    ]
  }
};

const eventModal = document.getElementById('event-modal');
const eventModalTitle = document.getElementById('event-modal-title');
const eventModalSubtitle = document.getElementById('event-modal-subtitle');
const eventModalLogo = document.getElementById('event-modal-logo');
const eventModalPoints = document.getElementById('event-modal-points');
const eventModalFooter = document.getElementById('event-modal-footer');
const eventModalWhatsapp = document.getElementById('event-modal-whatsapp');
let activeEventTrigger = null;

function openEventModal(eventId, trigger) {
  const event = eventDetails[eventId];
  if (!event || !eventModal) return;
  activeEventTrigger = trigger;
  eventModalTitle.textContent = event.title;
  eventModalSubtitle.textContent = event.subtitle;
  eventModalLogo.src = event.logo;
  eventModalLogo.alt = `Logo ${event.title}`;
  eventModal.style.setProperty('--event-accent', event.accent);
  eventModalPoints.innerHTML = event.points.map(point => `<li>${point}</li>`).join('');
  eventModalFooter.textContent = 'En todos los casos, cliente pone a disposición espacios, baño y escenario.';
  eventModalWhatsapp.href = `https://wa.me/56912345678?text=${encodeURIComponent(`Hola, quiero cotizar el evento ${event.title}`)}`;
  eventModal.classList.add('open');
  eventModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeEventModal() {
  if (!eventModal) return;
  eventModal.classList.remove('open');
  if (activeEventTrigger) activeEventTrigger.focus();
  eventModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  activeEventTrigger = null;
}

document.querySelectorAll('.event-details-button').forEach(button => {
  button.addEventListener('click', () => openEventModal(button.dataset.event, button));
});
document.getElementById('event-modal-close')?.addEventListener('click', closeEventModal);
eventModal?.addEventListener('click', event => { if (event.target === eventModal) closeEventModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && eventModal?.classList.contains('open')) closeEventModal(); });

// Tabs: gallery
function showGallery(type) {
  document.getElementById('gallery-fotos').classList.toggle('hidden', type !== 'fotos');
  document.getElementById('gallery-videos').classList.toggle('hidden', type !== 'videos');
  document.getElementById('btn-fotos').className = 'tab-btn px-6 py-2 uppercase tracking-widest text-sm font-bold transition-all ' + (type === 'fotos' ? 'active' : 'inactive');
  document.getElementById('btn-videos').className = 'tab-btn px-6 py-2 uppercase tracking-widest text-sm font-bold transition-all ' + (type === 'videos' ? 'active' : 'inactive');
}

// Tabs: global impact
function showImpact(type) {
  document.getElementById('impact-global').classList.toggle('hidden', type !== 'global');
  document.getElementById('impact-chile').classList.toggle('hidden', type !== 'chile');
  document.getElementById('btn-global').className = 'tab-btn px-6 py-2 uppercase tracking-widest text-sm font-bold transition-all ' + (type === 'global' ? 'active' : 'inactive');
  document.getElementById('btn-chile').className = 'tab-btn px-6 py-2 uppercase tracking-widest text-sm font-bold transition-all ' + (type === 'chile' ? 'active' : 'inactive');
}

// Visor de la galería local
const galleryItems = [...document.querySelectorAll('[data-gallery-image]')];
const galleryLightbox = document.getElementById('gallery-lightbox');
const galleryLightboxImage = document.getElementById('gallery-lightbox-image');
const galleryCarouselTrack = document.getElementById('gallery-carousel-track');
const galleryCarouselPrev = document.getElementById('gallery-carousel-prev');
const galleryCarouselNext = document.getElementById('gallery-carousel-next');
let activeGalleryImage = 0;
let galleryAutoplayTimer;

function moveGalleryCarousel(direction) {
  if (!galleryCarouselTrack || !galleryItems.length) return;
  const itemWidth = galleryItems[0].getBoundingClientRect().width + 16;
  const atStart = galleryCarouselTrack.scrollLeft <= 2;
  const atEnd = galleryCarouselTrack.scrollLeft + galleryCarouselTrack.clientWidth >= galleryCarouselTrack.scrollWidth - 2;
  if (direction < 0 && atStart) {
    galleryCarouselTrack.scrollTo({ left: galleryCarouselTrack.scrollWidth, behavior: 'smooth' });
  } else if (direction > 0 && atEnd) {
    galleryCarouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    galleryCarouselTrack.scrollBy({ left: itemWidth * direction, behavior: 'smooth' });
  }
}

function startGalleryAutoplay() {
  if (!galleryCarouselTrack || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  clearInterval(galleryAutoplayTimer);
  galleryAutoplayTimer = setInterval(() => moveGalleryCarousel(1), 3000);
}

function stopGalleryAutoplay() {
  clearInterval(galleryAutoplayTimer);
}

function showGalleryImage(index) {
  activeGalleryImage = (index + galleryItems.length) % galleryItems.length;
  galleryLightboxImage.src = galleryItems[activeGalleryImage].dataset.galleryImage;
}

function closeGalleryLightbox() {
  galleryLightbox.classList.remove('open');
  galleryLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  startGalleryAutoplay();
}

if (galleryItems.length && galleryLightbox && galleryLightboxImage) {
  galleryCarouselPrev?.addEventListener('click', () => { moveGalleryCarousel(-1); startGalleryAutoplay(); });
  galleryCarouselNext?.addEventListener('click', () => { moveGalleryCarousel(1); startGalleryAutoplay(); });
  galleryCarouselTrack?.addEventListener('mouseenter', stopGalleryAutoplay);
  galleryCarouselTrack?.addEventListener('mouseleave', startGalleryAutoplay);
  galleryCarouselTrack?.addEventListener('pointerdown', stopGalleryAutoplay);
  galleryCarouselTrack?.addEventListener('pointerup', startGalleryAutoplay);
  galleryCarouselTrack?.addEventListener('focusin', stopGalleryAutoplay);
  galleryCarouselTrack?.addEventListener('focusout', startGalleryAutoplay);
  document.addEventListener('visibilitychange', () => document.hidden ? stopGalleryAutoplay() : startGalleryAutoplay());
  startGalleryAutoplay();
  galleryItems.forEach((item, index) => item.addEventListener('click', () => {
    stopGalleryAutoplay();
    showGalleryImage(index);
    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }));
  galleryLightbox.querySelector('.gallery-close').addEventListener('click', closeGalleryLightbox);
  galleryLightbox.querySelector('.gallery-prev').addEventListener('click', () => showGalleryImage(activeGalleryImage - 1));
  galleryLightbox.querySelector('.gallery-next').addEventListener('click', () => showGalleryImage(activeGalleryImage + 1));
  galleryLightbox.addEventListener('click', event => { if (event.target === galleryLightbox) closeGalleryLightbox(); });
  document.addEventListener('keydown', event => {
    if (!galleryLightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeGalleryLightbox();
    if (event.key === 'ArrowLeft') showGalleryImage(activeGalleryImage - 1);
    if (event.key === 'ArrowRight') showGalleryImage(activeGalleryImage + 1);
  });
}





//Función genérica para enviar datos al backend
async function logInteraction(data) {
    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log('Interacción registrada:', result);
    } catch (error) {
        console.error('Error al registrar:', error);
    }
}

// // Ejemplo: Capturar el formulario de contacto
// document.querySelector('#form-contacto').addEventListener('submit', function(e) {
//     const emailValue = document.querySelector('#input-email').value;
    
//     logInteraction({
//         tipo: 'lead',
//         email: emailValue,
//         seccion: 'contacto'
//     });
// });

// Ejemplo: Capturar clics en botones de "Ver más" (Etapas del campeón)
document.querySelectorAll('.btn-ver-mas').forEach(btn => {
    btn.addEventListener('click', () => {
        logInteraction({
            tipo: 'click',
            elemento: btn.getAttribute('data-id'),
            seccion: 'camino-campeon'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // Función de envío centralizada
    async function logInteraction(data) {
        try {
            const response = await fetch('save_data.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return { status: 'error', message: 'No se pudo completar la suscripción. Intenta nuevamente.' };
        }
    }

    // Manejador del Newsletter
    const newsletterForm = document.querySelector('#form-newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se recargue
            
            const emailValue = document.querySelector('#email-newsletter').value;
            const websiteValue = newsletterForm.querySelector('[name="website"]').value;
            const message = document.querySelector('#newsletter-message');
            
            const resultado = await logInteraction({
                tipo: 'lead',
                email: emailValue,
                website: websiteValue,
                seccion: 'newsletter'
            });

            if (resultado && resultado.status === 'success') {
                message.textContent = '¡Gracias por suscribirte!';
                message.style.color = '#7ee787';
                newsletterForm.reset();
            } else if (resultado && resultado.message === 'Este correo ya fue enviado para suscribirse') {
                message.textContent = resultado.message;
                message.style.color = '#ffcc66';
            } else {
                message.textContent = resultado?.message || 'No se pudo completar la suscripción. Intenta nuevamente.';
                message.style.color = '#ff8b8b';
            }
        });
    }
});
