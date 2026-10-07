// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
});

// ===== HAMBURGER MENU =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ===== TYPED TEXT =====
const roles = ['Full-Stack Developer', 'React Developer', 'Node.js Developer', 'MERN Stack Developer'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.querySelector('.typed-text');

function type() {
  const current = roles[roleIndex];
  typedEl.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
  if (!deleting && charIndex > current.length) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1 });

document.querySelectorAll('section > *, .project-card, .info-card, .skill-category').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== SKILL BARS =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  e.target.reset();
  setTimeout(() => success.classList.remove('show'), 4000);
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();
