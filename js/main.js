/* =========================================
   West Wood Design — Main JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // === Sticky Nav ===
  const header = document.querySelector('.site-header');
  const updateHeader = () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
      header?.classList.remove('light');
    } else {
      header?.classList.remove('scrolled');
      header?.classList.add('light');
    }
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // === Hero parallax (subtle) ===
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      heroBg.style.transform = `scale(1.05) translateY(${offset * 0.12}px)`;
    }, { passive: true });
  }

  // === Mobile nav ===
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');

  toggle?.addEventListener('click', () => {
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  mobileClose?.addEventListener('click', () => {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  });
  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // === Portfolio filter (portfolio page) ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-full-grid .portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // === Scroll reveal ===
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // === Quote form submission (Power Automate) ===
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(quoteForm);
        const payload = {};
        formData.forEach((value, key) => { payload[key] = value; });

        const response = await fetch(quoteForm.dataset.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          quoteForm.innerHTML = `
            <div style="text-align:center; padding: 3rem 0;">
              <div style="font-size:3rem; margin-bottom:1rem;">✓</div>
              <h3 style="margin-bottom:0.75rem;">Request Received</h3>
              <p>Thanks! We'll get back to you within 1–2 business days.</p>
            </div>`;
        } else {
          throw new Error('Form submission failed');
        }
      } catch {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please email us at info@westwooddsgn.com');
      }
    });
  }

});
