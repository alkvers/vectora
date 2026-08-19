/* ============================================
   VECTORA — Digital Agency
   Main JavaScript — Interactivity & Automation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Cursor Glow ---
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // --- Navbar Scroll ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Back to Top ---
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksEl.classList.toggle('active');
        });

        // Close menu on link click
        navLinksEl.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksEl.classList.remove('active');
            });
        });
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('vectora-theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            if (current === 'light') {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('vectora-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('vectora-theme', 'light');
            }
        });
    }

    // --- Animated Counter ---
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach((counter) => {
            if (counter.dataset.animated) return;
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    counter.dataset.animated = 'true';
                }
            }

            updateCounter();
        });
    }

    // --- Scroll Reveal ---
    function setupReveal() {
        const revealElements = document.querySelectorAll(
            '.section-header, .about-card, .service-card, .portfolio-card, .process-step, .testimonial-card, .pricing-card, .faq-item, .contact-card, .contact-form'
        );

        revealElements.forEach((el) => {
            el.classList.add('reveal');
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        revealElements.forEach((el) => observer.observe(el));
    }
    setupReveal();

    // --- Counter Observer ---
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        statsObserver.observe(statsSection);
    }

    // --- Portfolio Filters ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioCards.forEach((card) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach((fi) => fi.classList.remove('active'));

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Pricing Toggle ---
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            const isYearly = pricingToggle.checked;
            
            monthlyLabel.classList.toggle('active', !isYearly);
            yearlyLabel.classList.toggle('active', isYearly);

            document.querySelectorAll('.amount').forEach((amount) => {
                const monthly = amount.dataset.monthly;
                const yearly = amount.dataset.yearly;
                
                // Animate the price change
                amount.style.transition = 'transform 0.3s ease';
                amount.style.transform = 'translateY(-10px)';
                amount.style.opacity = '0';
                
                setTimeout(() => {
                    amount.textContent = isYearly ? yearly : monthly;
                    amount.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        amount.style.transform = 'translateY(0)';
                        amount.style.opacity = '1';
                    }, 50);
                }, 200);
            });
        });
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value,
            };

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success toast
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 4000);
                }

                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;

                console.log('Form submitted:', formData);
            }, 1500);
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Tilt Effect ---
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // --- Parallax Blobs ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, i) => {
            const speed = 0.05 * (i + 1);
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // --- Typing Effect for Hero (optional enhancement) ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    // --- Auto-typing subtitle ---
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }

    // --- Stagger animation for hero buttons ---
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, i) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 800 + i * 200);
    });

    // --- Stagger animation for hero badge ---
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(15px)';
        setTimeout(() => {
            heroBadge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 100);
    }

    // --- Fade in hero stats ---
    const heroStats = document.querySelectorAll('.stat-item');
    heroStats.forEach((stat, i) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        setTimeout(() => {
            stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 1200 + i * 150);
    });

    // --- Fade in orbit ---
    const orbitContainer = document.querySelector('.orbit-container');
    if (orbitContainer) {
        orbitContainer.style.opacity = '0';
        orbitContainer.style.transform = 'scale(0.8)';
        setTimeout(() => {
            orbitContainer.style.transition = 'opacity 1s ease, transform 1s ease';
            orbitContainer.style.opacity = '1';
            orbitContainer.style.transform = 'scale(1)';
        }, 500);
    }

    // --- Dynamic copyright year ---
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }

    // --- Add fadeInUp keyframe ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // --- Keyboard navigation: press 'Esc' to close mobile menu ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksEl.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinksEl.classList.remove('active');
        }
    });

    console.log('%c🚀 Vectora Digital Agency', 'font-size: 24px; font-weight: bold; color: #6C63FF;');
    console.log('%cCrafted with ❤️', 'font-size: 12px; color: #FF6B9D;');
});
