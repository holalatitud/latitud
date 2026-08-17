  //import Swal from 'sweetalert2'

  
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
 const quoteForm = document.getElementById('searchForm');
const serviceInput = document.getElementById('selectedService');
const tabButtons = document.querySelectorAll('.tab-btn');


// Cambiar servicio
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    // Quitar active de todos
    tabButtons.forEach(button => {
      button.classList.remove('active');
    });

    // Activar botón seleccionado
    btn.classList.add('active');

    // Guardar servicio seleccionado
    serviceInput.value = btn.dataset.service;
  });
});

const tripOptions = document.querySelectorAll(".trip-option");
const tripType = document.getElementById("tripType");

tripOptions.forEach(option => {
    option.addEventListener("click", () => {

        tripOptions.forEach(button => {
            button.classList.remove("active");
        });

        option.classList.add("active");

        tripType.value = option.dataset.trip;
        const dateInput = document.getElementById('regreso-date')
        if (option.dataset.trip === "Ida") {
            dateInput.disabled = true;
        } else {
            dateInput.disabled = false;
        }

    });
});

// Enviar formulario
quoteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(quoteForm);

  try {

    const response = await fetch(
      'https://formsubmit.co/ajax/46a04361f88e7902d571f96d94952d9c',
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

      //alert('¡Solicitud enviada correctamente!');
  
      Swal.fire({
        text: "¡Solicitud enviada correctamente!",
        icon: "success"
      });

      quoteForm.reset();

      // Volver a Vuelos después de enviar
      serviceInput.value = 'Vuelos';

      tabButtons.forEach(button => {
        button.classList.remove('active');
      });

      tabButtons[0].classList.add('active');

    } else {

      console.error(result);
      Swal.fire({
        icon: "error",
        text: "Hubo un problema al enviar la solicitud",
        confirmButtonText: "Contactar por WhatsApp",
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(
                "https://wa.me/XXXXXXX?text=¡Hola%2C%20estoy%20interesado%2Fa%20en%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios!",
                "_blank"
            );
        }
    });

    }

  } catch (error) {

    console.error(error);
    Swal.fire({
        icon: "error",
        text: "No se pudo enviar la solicitud",
        confirmButtonText: "Contactar por WhatsApp",
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(
                "https://wa.me/XXXXXXX?text=¡Hola%2C%20estoy%20interesado%2Fa%20en%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios!",
                "_blank"
            );
        }
    });

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



