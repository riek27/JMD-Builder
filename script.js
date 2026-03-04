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

  // Lightbox functionality (only on projects page)
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid && !document.getElementById('lightbox')) {
    // Create lightbox if not exists
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
