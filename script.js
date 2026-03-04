// Common JavaScript for all pages

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Dropdown toggle on mobile
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(drop => {
    drop.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        drop.classList.toggle('open');
      }
    });
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Typing animation (only on index page)
  const typingSpan = document.getElementById('typing');
  if (typingSpan) {
    const strings = [
      'Construction & Infrastructure',
      'Engineering Excellence',
      'Mining & Industrial Solutions',
      'Agriculture & Development',
      'Medical & Safety Supply',
      '"We Integrate, You Benefit."'
    ];
    let i = 0, j = 0, isDeleting = false;
    function type() {
      const fullText = strings[i];
      if (isDeleting) {
        typingSpan.textContent = fullText.substring(0, j--);
      } else {
        typingSpan.textContent = fullText.substring(0, j++);
      }
      if (!isDeleting && j === fullText.length + 1) {
        isDeleting = true;
        setTimeout(type, 1500);
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % strings.length;
        setTimeout(type, 300);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    }
    type();
  }

  // Populate services on services.html (detailed cards)
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    const services = [
      { id: 'general-construction', title: 'General Construction', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070',
        bullets: [
          'Residential and Commercial Buildings',
          'Petrol Stations',
          'Tarmac and Marram Roads',
          'Bridges and Flyovers',
          'Site Clearing and Hill Leveling',
          'Supply of Construction Materials'
        ],
        desc: 'With modern machinery and experienced engineers, we construct durable infrastructure designed to last for generations — even in challenging rural or hilly environments.' },
      { id: 'real-estate', title: 'Real Estate', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073',
        bullets: ['Luxury housing', 'Commercial complexes', 'Urban planning'],
        desc: 'Developing premium properties that combine aesthetics with functionality.' },
      { id: 'road-bridge', title: 'Road & Bridge Construction', img: 'https://images.unsplash.com/photo-1624397640490-5c0b8b3e4b9c?q=80&w=2070',
        bullets: ['Highways', 'Bridges', 'Flyovers', 'Earthworks'],
        desc: 'State-of-the-art equipment for heavy civil engineering projects.' },
      { id: 'gold-mining', title: 'Gold Mining', img: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2073',
        bullets: ['Exploration', 'Extraction', 'Processing'],
        desc: 'Responsible mining practices with maximum yield.' },
      { id: 'agriculture', title: 'Agriculture & Livestock', img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=2070',
        bullets: ['Commercial farming', 'Livestock breeding', 'Agri-supply'],
        desc: 'Modern techniques to ensure food security and export quality.' },
      { id: 'medical-equipment', title: 'Medical Equipment Supply', img: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=2070',
        bullets: ['Diagnostic devices', 'Surgical instruments', 'Hospital furniture'],
        desc: 'Partnerships with global manufacturers for reliable medical technology.' },
      { id: 'safety-materials', title: 'Safety Materials & PPE', img: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070',
        bullets: ['Protective gear', 'Workwear', 'Site safety equipment'],
        desc: 'Comprehensive safety solutions for industrial workplaces.' },
      { id: 'import-export', title: 'Import & Export', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
        bullets: ['Commodities', 'Machinery', 'Consumer goods'],
        desc: 'Efficient logistics and trade networks across East Africa.' },
      { id: 'petroleum-supply', title: 'Petroleum Supply', img: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070',
        bullets: ['Fuel distribution', 'Lubricants', 'Storage solutions'],
        desc: 'Reliable downstream petroleum services.' },
      { id: 'solar-installation', title: 'Solar Installation', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072',
        bullets: ['Off-grid systems', 'Commercial solar farms', 'Maintenance'],
        desc: 'Renewable energy expertise to power the future.' },
      { id: 'heavy-equipment', title: 'Heavy Equipment Hire', img: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070',
        bullets: ['Excavators', 'Loaders', 'Graders', 'Cranes'],
        desc: 'Well-maintained fleet with experienced operators.' }
    ];
    servicesGrid.innerHTML = services.map(s => `
      <div class="service-card" id="${s.id}">
        <div class="service-img" style="background-image: url('${s.img}');"></div>
        <div class="service-info">
          <h3>${s.title}</h3>
          <ul class="service-bullets">
            ${s.bullets.map(b => `<li><i class="fas fa-chevron-right"></i> ${b}</li>`).join('')}
          </ul>
          <p class="service-desc">${s.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Lightbox functionality (only on projects page)
  const projectsGrid = document.querySelector('.projects-grid');
  const lightbox = document.getElementById('lightbox');
  if (projectsGrid && !lightbox) {
    // Create lightbox if not exists (for projects page)
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.id = 'lightbox';
    lb.innerHTML = '<span class="close-lightbox">&times;</span><img id="lightboxImg" src="">';
    document.body.appendChild(lb);
  }
  const lightboxElem = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (projectsGrid && lightboxElem) {
    projectsGrid.addEventListener('click', (e) => {
      const img = e.target.closest('.project-item')?.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxElem.classList.add('active');
      }
    });
    const closeBtn = document.querySelector('.close-lightbox');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => lightboxElem.classList.remove('active'));
      lightboxElem.addEventListener('click', (e) => {
        if (e.target === lightboxElem) lightboxElem.classList.remove('active');
      });
    }
  }

  // Smooth scroll for anchor links on the same page (services.html)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
