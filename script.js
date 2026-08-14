// ── Custom cursor ──
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top  = e.clientY - 4 + 'px';
});

// ── Scroll animations ──
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Active nav link ──
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('[id]').forEach(el => navObserver.observe(el));

// ── WhatsApp direto ──
function openWhatsApp() {
    const phoneNumber = "5531996062065";
    const message = encodeURIComponent("Olá, Yuri! Gostaria de saber mais sobre seus serviços.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// ── Formulário → WhatsApp ──
function sendOrderToWhatsApp(event) {
    event.preventDefault();

    const name       = document.getElementById('customerName').value;
    const phone      = document.getElementById('customerPhone').value;
    const item       = document.getElementById('orderItem').value;
    const additional = document.getElementById('additionalInfo').value;

    if (!name || !phone || !item) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
        alert('Por favor, digite um número de telefone válido (com DDD).');
        return;
    }

    let message = `*CONTATO VIA SITE - YC STUDIO*%0A%0A`;
    message += `*Nome:* ${name}%0A`;
    message += `*Telefone:* ${phone}%0A`;
    message += `*Serviço:* ${item}%0A`;
    if (additional) message += `*Observações:* ${additional}%0A`;
    message += `%0A_Mensagem enviada pelo site_`;

    const studioPhone = "5531996062065";
    window.open(`https://wa.me/${studioPhone}?text=${message}`, '_blank');

    document.getElementById('orderForm').reset();
}

document.getElementById('orderForm')?.addEventListener('submit', sendOrderToWhatsApp);

// ── Máscara de telefone ──
document.getElementById('customerPhone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = value.replace(/^(\d{0,2})/, '($1');
        } else if (value.length <= 6) {
            value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
        } else {
            value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
        }
        e.target.value = value;
    }
});

// ── Typing effect ──
const words = ['Designer Digital'];
let wi = 0, ci = 0, deleting = false;
const target = document.querySelector('.hero-title span');

function type() {
    const word = words[wi];
    target.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1400); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
    setTimeout(type, deleting ? 55 : 95);
}
type();