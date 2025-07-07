// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to load a component from a file into an element
    const loadComponent = (elementId, filePath) => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                }
            })
            .catch(error => console.error('Error loading component:', error));
    };

    // Load header and footer
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});

document.addEventListener('DOMContentLoaded', () => {
  // Carregar header.html no placeholder
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      const toggleBtn = document.getElementById('theme-toggle');
      const iconSun = document.getElementById('icon-sun');
      const iconMoon = document.getElementById('icon-moon');

      // Aponta os elementos relevantes do DOM
      const mainContainer = document.querySelector('.main-container');
      const heroSection = document.querySelector('.hero-section');
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const button = document.querySelector('.btn');
      const button2 = document.querySelector('.btn2');
      const footer = document.querySelector('.footer-section');
      const serviceCards = document.querySelectorAll('.service-card');
      const serviceTexts = document.querySelectorAll('.service-content h3, .service-content p');

      // Estado persistente
      const isDark = localStorage.getItem('theme') === 'dark';

      function applyTheme(darkMode) {
        if (darkMode) {
          mainContainer.style.backgroundColor = '#CEB1AD';
          iconSun.style.display = 'inline';
          iconMoon.style.display = 'none';
          if (heroSection) {
            heroSection.style.backgroundColor = '#814541';
            heroTitle && (heroTitle.style.color = '#CEB1AD');
            heroSubtitle && (heroSubtitle.style.color = '#CEB1AD');
          }
          button && (button.style.backgroundColor = '#CEB1AD');
          button2 && (button2.style.color = '#814541');
          footer && footer.style.setProperty('color', '#CEB1AD', 'important');

          // Serviços (modo escuro)
          serviceCards.forEach((card, i) => {
            card.style.backgroundColor = i % 2 === 0 ? '#814541' : '#CEB1AD';
            card.style.color = i % 2 === 0 ? '#CEB1AD' : '#814541';
          });
          serviceTexts.forEach(el => el.style.color = el.closest('.service-card').style.color);
        } else {
          mainContainer.style.backgroundColor = 'white';
          iconSun.style.display = 'none';
          iconMoon.style.display = 'inline';
          if (heroSection) {
            heroSection.style.backgroundColor = '#814541';
            heroTitle && (heroTitle.style.color = 'white');
            heroSubtitle && (heroSubtitle.style.color = 'white');
          }
          button && (button.style.backgroundColor = 'white');
          button2 && (button2.style.color = 'white');
          footer && footer.style.setProperty('color', 'white', 'important');

          // Serviços (modo claro)
          serviceCards.forEach((card, i) => {
            card.style.backgroundColor = i % 2 === 0 ? 'white' : 'white';
            card.style.color = '#814541';
          });
          serviceTexts.forEach(el => el.style.color = '#814541');
        }
      }

      // Inicializar com tema salvo
      applyTheme(isDark);

      // Alternar ao clicar
      toggleBtn.addEventListener('click', () => {
        const currentlyDark = mainContainer.style.backgroundColor !== 'white';
        const newDark = !currentlyDark;
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
        applyTheme(newDark);
      });
    })
    .catch(err => console.error('Erro ao carregar header:', err));

  // Carregar footer também
  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Erro ao carregar footer:', err));
});



