// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // Animate hamburger menu
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(220, 53, 69, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(220, 53, 69, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Gallery image modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = `
        .image-modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            animation: fadeIn 0.3s;
        }

        .modal-content {
            position: relative;
            margin: auto;
            padding: 20px;
            width: 90%;
            max-width: 800px;
            top: 50%;
            transform: translateY(-50%);
        }

        .modal-image {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }

        .modal-close {
            position: absolute;
            top: 10px;
            right: 25px;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s;
        }

        .modal-close:hover {
            color: #dc3545;
        }

        .modal-caption {
            text-align: center;
            color: white;
            padding: 10px 0;
            font-size: 18px;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    // Gallery click events
    galleryItems.forEach(img => {
        img.addEventListener('click', function () {
            const modal = document.querySelector('.image-modal');
            const modalImg = modal.querySelector('.modal-image');
            const modalCaption = modal.querySelector('.modal-caption');

            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.textContent = this.alt;
        });
    });

    // Close modal events
    const modalClose = modal.querySelector('.modal-close');
    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Phone number click to call
    const phoneLinks = document.querySelectorAll('.contact-text p');
    phoneLinks.forEach(link => {
        if (link.textContent.includes('0868555543')) {
            link.style.cursor = 'pointer';
            link.style.color = '#dc3545';
            link.addEventListener('click', function () {
                window.location.href = 'tel:0868555543';
            });
        }
    });

    // LINE ID click to open LINE
    phoneLinks.forEach(link => {
        if (link.textContent.includes('mansuang')) {
            link.style.cursor = 'pointer';
            link.style.color = '#dc3545';
            link.addEventListener('click', function () {
                window.open('https://line.me/ti/p/mansuang', '_blank');
            });
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-img');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `rotate(-5deg) translateY(${speed}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function () {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <i class="fas fa-home"></i>
                <p>กำลังโหลด...</p>
            </div>
        `;

        const loaderStyles = `
            .loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
                color: #dc3545;
            }
            
            .loader-content i {
                font-size: 3rem;
                animation: pulse 1s infinite;
            }
            
            .loader-content p {
                margin-top: 1rem;
                font-size: 1.2rem;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;

        const loaderStyleSheet = document.createElement('style');
        loaderStyleSheet.textContent = loaderStyles;
        document.head.appendChild(loaderStyleSheet);

        document.body.appendChild(loader);

        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
});
