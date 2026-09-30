/**
 * LOVE NAILS KZ — Main Application & Interactive Components
 * Concept Beauty Studio Astana
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ================= 1. Price List Data (Altegio: Manicure & Pedicure ONLY) ================= */
  const servicesData = [
    // Маникюр
    { id: 13697646, title: "Маникюр с покрытием к мастеру", category: "manicure", catName: "Маникюр", price: 8000, duration: "90 мин" },
    { id: 13697649, title: "Маникюр без покрытия", category: "manicure", catName: "Маникюр", price: 6000, duration: "60 мин" },
    { id: 13697651, title: "Маникюр с покрытием к Junior мастеру", category: "manicure", catName: "Маникюр", price: 6000, duration: "90 мин" },
    { id: 13697655, title: "Маникюр без покрытия к Junior мастеру", category: "manicure", catName: "Маникюр", price: 4000, duration: "60 мин" },
    { id: 13697949, title: "Мужской маникюр", category: "manicure", catName: "Маникюр", price: 8000, duration: "60 мин" },
    { id: 13698265, title: "Японский маникюр к мастеру", category: "manicure", catName: "Маникюр", price: 7000, duration: "75 мин" },
    { id: 13697657, title: "Снятие гель покрытия", category: "manicure", catName: "Маникюр", price: 2000, duration: "30 мин" },
    { id: 13697658, title: "Снятие нарощенных ногтей", category: "manicure", catName: "Маникюр", price: 3000, duration: "40 мин" },

    // Smart Педикюр
    { id: 13697669, title: "Smart педикюр с покрытием к мастеру", category: "pedicure", catName: "Smart-педикюр", price: 10000, duration: "90 мин" },
    { id: 13697670, title: "Smart педикюр без покрытия к мастеру", category: "pedicure", catName: "Smart-педикюр", price: 8000, duration: "75 мин" },
    { id: 13697673, title: "Smart педикюр с покрытием к Junior мастеру", category: "pedicure", catName: "Smart-педикюр", price: 8000, duration: "90 мин" },
    { id: 13697676, title: "Smart педикюр без покрытия к Junior мастеру", category: "pedicure", catName: "Smart-педикюр", price: 6000, duration: "75 мин" },
    { id: 13697679, title: "Снятие гель покрытия (педикюр)", category: "pedicure", catName: "Smart-педикюр", price: 2000, duration: "30 мин" },

    // Наращивание & Моделирование ногтей
    { id: 13697662, title: "Наращивание ногтей к мастеру", category: "extension", catName: "Наращивание ногтей", price: 12000, duration: "120 мин" },
    { id: 13697664, title: "Коррекция нарощенных ногтей к мастеру", category: "extension", catName: "Наращивание ногтей", price: 10000, duration: "100 мин" },
    { id: 13697663, title: "Наращивание ногтей к Junior мастеру", category: "extension", catName: "Наращивание ногтей", price: 10000, duration: "120 мин" },
    { id: 13697665, title: "Коррекция нарощенных ногтей к Junior мастеру", category: "extension", catName: "Наращивание ногтей", price: 8000, duration: "100 мин" }
  ];

  const baseBookingUrl = "https://n807439.alteg.io/company/758710/personal/menu";

  /* ================= 2. Price Modal Logic ================= */
  const priceModal = document.getElementById('price-modal');
  const priceListContainer = document.getElementById('price-items-list');
  const priceSearchInput = document.getElementById('price-search');
  const priceTabs = document.querySelectorAll('.price-tab-btn');
  let currentCategory = 'all';

  function renderPriceList(items) {
    if (!priceListContainer) return;
    if (items.length === 0) {
      priceListContainer.innerHTML = '<div style="padding: 24px; text-align: center; color: #888;">Услуги не найдены</div>';
      return;
    }

    priceListContainer.innerHTML = items.map(s => {
      const priceDisplay = typeof s.price === 'number' ? s.price.toLocaleString('ru-RU') + ' ₸' : s.price + ' ₸';
      return `
        <div class="price-item-row" data-category="${s.category}">
          <div class="price-item-info">
            <span class="price-item-title">${s.title}</span>
            <span class="price-item-cat">${s.catName} • ${s.duration}</span>
          </div>
          <div class="price-item-action">
            <span class="price-item-cost">${priceDisplay}</span>
            <a href="${baseBookingUrl}" target="_blank" rel="noopener" class="price-item-book-btn">Записаться</a>
          </div>
        </div>
      `;
    }).join('');
  }

  function filterPriceList() {
    const query = (priceSearchInput?.value || '').toLowerCase().trim();
    const filtered = servicesData.filter(item => {
      const matchesCat = (currentCategory === 'all' || item.category === currentCategory);
      const matchesQuery = item.title.toLowerCase().includes(query) || item.catName.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
    renderPriceList(filtered);
  }

  priceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      priceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-cat') || 'all';
      filterPriceList();
    });
  });

  if (priceSearchInput) {
    priceSearchInput.addEventListener('input', filterPriceList);
  }

  // Initial render
  renderPriceList(servicesData);

  /* Modal open/close handlers */
  window.openPriceModal = function(cat = 'all') {
    if (cat && cat !== 'all') {
      currentCategory = cat;
      priceTabs.forEach(t => {
        if (t.getAttribute('data-cat') === cat) t.classList.add('active');
        else t.classList.remove('active');
      });
    } else {
      currentCategory = 'all';
      priceTabs.forEach(t => {
        if (t.getAttribute('data-cat') === 'all') t.classList.add('active');
        else t.classList.remove('active');
      });
    }
    if (priceSearchInput) priceSearchInput.value = '';
    filterPriceList();
    priceModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closePriceModal = function() {
    priceModal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ================= 3. Reliable Online Booking Link ================= */
  window.openBookingModal = function(masterId = null) {
    let targetUrl = baseBookingUrl;
    if (masterId) {
      targetUrl = `https://n807439.alteg.io/company/758710/personal/select-services?master_id=${masterId}`;
    }
    // Direct popup-safe navigation
    window.open(targetUrl, '_blank', 'noopener');
  };

  // Close modals on click outside
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open, .lightbox-modal.open').forEach(m => {
        m.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });

  /* ================= 4. Hero Auto Slider ================= */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slider-dots .slider-dot');
  let currentHeroSlide = 0;
  let heroTimer = null;

  function showHeroSlide(index) {
    if (!heroSlides.length) return;
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));
    
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
    if (heroDots[currentHeroSlide]) heroDots[currentHeroSlide].classList.add('active');
  }

  function startHeroTimer() {
    heroTimer = setInterval(() => {
      showHeroSlide(currentHeroSlide + 1);
    }, 3800);
  }

  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(heroTimer);
      showHeroSlide(idx);
      startHeroTimer();
    });
  });

  if (heroSlides.length > 0) {
    showHeroSlide(0);
    startHeroTimer();
  }

  /* ================= 5. Master Works Carousel ================= */
  const worksTrack = document.getElementById('works-track');
  const worksPrevBtn = document.getElementById('works-prev');
  const worksNextBtn = document.getElementById('works-next');
  const worksDotsContainer = document.getElementById('works-dots');
  
  if (worksTrack) {
    const slides = worksTrack.querySelectorAll('.works-slide-item');
    const totalSlides = slides.length;
    let itemsPerView = window.innerWidth <= 639 ? 1 : (window.innerWidth <= 959 ? 2 : 3);
    let maxIndex = Math.max(0, totalSlides - itemsPerView);
    let currentWorksIndex = 0;

    function updateCarousel() {
      itemsPerView = window.innerWidth <= 639 ? 1 : (window.innerWidth <= 959 ? 2 : 3);
      maxIndex = Math.max(0, totalSlides - itemsPerView);
      if (currentWorksIndex > maxIndex) currentWorksIndex = maxIndex;

      const slidePercentage = 100 / itemsPerView;
      worksTrack.style.transform = `translateX(-${currentWorksIndex * slidePercentage}%)`;

      // Update dots
      if (worksDotsContainer) {
        const dots = worksDotsContainer.querySelectorAll('.works-dot');
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === currentWorksIndex);
        });
      }
    }

    // Generate dots
    function renderDots() {
      if (!worksDotsContainer) return;
      worksDotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.className = `works-dot ${i === currentWorksIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          currentWorksIndex = i;
          updateCarousel();
        });
        worksDotsContainer.appendChild(dot);
      }
    }

    renderDots();

    worksPrevBtn?.addEventListener('click', () => {
      currentWorksIndex = currentWorksIndex > 0 ? currentWorksIndex - 1 : maxIndex;
      updateCarousel();
    });

    worksNextBtn?.addEventListener('click', () => {
      currentWorksIndex = currentWorksIndex < maxIndex ? currentWorksIndex + 1 : 0;
      updateCarousel();
    });

    window.addEventListener('resize', () => {
      itemsPerView = window.innerWidth <= 639 ? 1 : (window.innerWidth <= 959 ? 2 : 3);
      maxIndex = Math.max(0, totalSlides - itemsPerView);
      renderDots();
      updateCarousel();
    });

    // Touch swipe support for works carousel
    let startX = 0;
    let endX = 0;
    worksTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    worksTrack.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        // swipe left -> next
        currentWorksIndex = currentWorksIndex < maxIndex ? currentWorksIndex + 1 : 0;
        updateCarousel();
      } else if (endX - startX > 50) {
        // swipe right -> prev
        currentWorksIndex = currentWorksIndex > 0 ? currentWorksIndex - 1 : maxIndex;
        updateCarousel();
      }
    }, { passive: true });
  }

  /* ================= 6. Lightbox for Galleries ================= */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');

  window.openLightbox = function(src) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    lightboxModal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-close-btn')) {
      closeLightbox();
    }
  });

  // Attach lightbox to previewable images
  document.querySelectorAll('.works-img-frame, .aesthetic-item-card, .bottom-ribbon-item').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img && img.src) {
        openLightbox(img.src);
      }
    });
  });

  /* ================= 7. Mobile Drawer Navigation ================= */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function toggleDrawer() {
    const isOpen = mobileDrawer?.classList.contains('open');
    if (isOpen) {
      mobileDrawer?.classList.remove('open');
      mobileOverlay?.classList.remove('active');
      mobileToggle?.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileDrawer?.classList.add('open');
      mobileOverlay?.classList.add('active');
      mobileToggle?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  mobileToggle?.addEventListener('click', toggleDrawer);
  mobileOverlay?.addEventListener('click', toggleDrawer);

  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.remove('open');
      mobileOverlay?.classList.remove('active');
      mobileToggle?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ================= 8. Sticky Header Scroll Effect ================= */
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

});
