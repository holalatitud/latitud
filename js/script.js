  // Header background on scroll
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Reveal on scroll
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in-view'));
  }

  // Quote form (front-end only placeholder)
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.getElementById('formSuccess');
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    try {
    const response = await fetch(
      'https://formsubmit.co/ajax/40fcd315400363f4f2c42c3eabdb1cbe',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      }
    );


     const result = await response.json();

    if (result.success) {
      formSuccess.classList.add('show');
      quoteForm.reset();
    } else {
      console.error(result);
      alert('Hubo un problema al enviar la solicitud.');
    }

  } catch (error) {
    console.error(error);
    alert('No se pudo enviar la solicitud.');
  }
  });

  //Resize logo
  let image = document.getElementById('imageScroll'); 
window.addEventListener('scroll' , function () {
     if (window.scrollY > 0) {
        image.classList.add('resize');
    } else {
        image.classList.remove('resize');
    }
});
//Scroll to the top Logo
let logoLinks = document.querySelectorAll('.logoLink')
logoLinks.forEach(logo =>{
  logo.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo(0, 0);
  })
});