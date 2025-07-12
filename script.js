document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initParticles();
    initTypingEffect();
    initSmoothScrolling();
    initIntersectionObserver();
    initCursorEffects();
    initPortfolioModal();
    initEmailFunctionality();
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

function initAnimations() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = card.querySelector('.social-icon img');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.social-icon img');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    const projectCard = document.querySelector('.project-card-large');
    if (projectCard) {
        projectCard.addEventListener('mousemove', function(e) {
            const rect = projectCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            projectCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        projectCard.addEventListener('mouseleave', function() {
            projectCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }
}

function initParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 3}px;
            height: ${Math.random() * 6 + 3}px;
            background: ${i % 4 === 0 ? '#00d4ff' : i % 4 === 1 ? '#ff6b6b' : i % 4 === 2 ? '#4ecdc4' : '#ffd93d'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatRandom ${Math.random() * 15 + 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 8}s;
            box-shadow: 0 0 ${Math.random() * 20 + 10}px currentColor;
        `;
        particleContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatRandom {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
                opacity: 0.3; 
            }
            25% { 
                transform: translateY(-40px) translateX(30px) rotate(90deg) scale(1.2); 
                opacity: 0.8; 
            }
            50% { 
                transform: translateY(-15px) translateX(-25px) rotate(180deg) scale(0.8); 
                opacity: 1; 
            }
            75% { 
                transform: translateY(-35px) translateX(15px) rotate(270deg) scale(1.1); 
                opacity: 0.6; 
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initTypingEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    let delay = 1800;

    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px) scale(0.8)';
            
            const text = line.innerHTML;
            line.innerHTML = '';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0) scale(1)';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    if (text.charAt(charIndex) === '<') {
                        const tagEnd = text.indexOf('>', charIndex);
                        line.innerHTML += text.substring(charIndex, tagEnd + 1);
                        charIndex = tagEnd + 1;
                    } else {
                        line.innerHTML += text.charAt(charIndex);
                        charIndex++;
                    }
                } else {
                    clearInterval(typeInterval);
                }
            }, 30);
        }, delay + (index * 400));
    });
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const signatureSection = document.querySelector('#signature-project');
            if (signatureSection) {
                signatureSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('portfolio-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, delay);
                }
                
                if (entry.target.classList.contains('social-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, delay);
                }

                if (entry.target.classList.contains('project-card-large')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.portfolio-card, .social-card, .contact-card, .section-header, .project-card-large');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
        display: none;
    `;
    document.body.appendChild(cursor);

    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .social-card, .project-card-large');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2.5)';
                cursor.style.background = 'rgba(255, 107, 107, 0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 212, 255, 0.6)';
            });
        });
    }
}

function initPortfolioModal() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const modal = document.getElementById('demo-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalClose = document.querySelector('.modal-close');
    const demoContainer = document.getElementById('demo-container');

    const demos = {
        'data-visualization': {
            title: 'Interactive Data Visualization Dashboard',
            content: createDataVisualizationDemo()
        },
        'recipe-finder': {
            title: 'Dynamic Recipe Finder',
            content: createRecipeFinderDemo()
        },
        'ecommerce-page': {
            title: 'Minimalist E-commerce Product Page',
            content: createEcommerceDemo()
        },
        'blog-layout': {
            title: 'Responsive Blog Layout',
            content: createBlogLayoutDemo()
        },
        'startup-landing': {
            title: 'Animated Tech Startup Landing',
            content: createStartupLandingDemo()
        },
        'quiz-app': {
            title: 'Gamified Quiz Application',
            content: createQuizAppDemo()
        },
        'art-gallery': {
            title: 'Virtual Art Gallery',
            content: createArtGalleryDemo()
        },
        'weather-widget': {
            title: 'Weather Forecast Widget',
            content: createWeatherWidgetDemo()
        },
        'portfolio-grid': {
            title: 'Creative Portfolio Grid',
            content: createPortfolioGridDemo()
        },
        'timeline-visualizer': {
            title: 'Timeline Event Visualizer',
            content: createTimelineVisualizerDemo()
        }
    };

    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const demoType = this.getAttribute('data-demo');
            const demo = demos[demoType];
            
            if (demo) {
                modalTitle.textContent = demo.title;
                demoContainer.innerHTML = demo.content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    initDemoInteractivity(demoType);
                }, 100);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        demoContainer.innerHTML = '';
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function createDataVisualizationDemo() {
    return `
        <div style="padding: 2rem; background: linear-gradient(135deg, #1a1a1a, #2a2a2a); height: 100%; overflow-y: auto;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
                    <h3 style="color: #00d4ff; margin-bottom: 1rem;">Revenue Analytics</h3>
                    <div style="font-size: 2rem; color: white; font-weight: bold;">$127,543</div>
                    <div style="color: #4ecdc4; font-size: 0.9rem;">+12.5% from last month</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,107,107,0.2);">
                    <h3 style="color: #ff6b6b; margin-bottom: 1rem;">Active Users</h3>
                    <div style="font-size: 2rem; color: white; font-weight: bold;">8,429</div>
                    <div style="color: #4ecdc4; font-size: 0.9rem;">+8.2% from last week</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(78,205,196,0.2);">
                    <h3 style="color: #4ecdc4; margin-bottom: 1rem;">Conversion Rate</h3>
                    <div style="font-size: 2rem; color: white; font-weight: bold;">3.24%</div>
                    <div style="color: #ff6b6b; font-size: 0.9rem;">-2.1% from last month</div>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <h3 style="color: white; margin-bottom: 1.5rem;">Interactive Chart</h3>
                <div id="chart-container" style="height: 300px; position: relative; overflow: hidden;">
                    <canvas id="demo-chart" style="width: 100%; height: 100%;"></canvas>
                </div>
            </div>
        </div>
    `;
}

function createRecipeFinderDemo() {
    return `
        <div style="padding: 2rem; background: linear-gradient(135deg, #2a1810, #3a2520); height: 100%; overflow-y: auto;">
            <div style="max-width: 800px; margin: 0 auto;">
                <h2 style="color: #ffd93d; text-align: center; margin-bottom: 2rem;">Recipe Finder</h2>
                <div style="margin-bottom: 2rem;">
                    <input type="text" id="recipe-search" placeholder="Search for recipes..." 
                           style="width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,217,61,0.3); 
                                  background: rgba(255,255,255,0.1); color: white; font-size: 1rem;">
                </div>
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                    <button class="filter-btn" data-filter="vegetarian" 
                            style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid #4ecdc4; 
                                   background: transparent; color: #4ecdc4; cursor: pointer;">Vegetarian</button>
                    <button class="filter-btn" data-filter="quick" 
                            style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid #ff6b6b; 
                                   background: transparent; color: #ff6b6b; cursor: pointer;">Quick (< 30 min)</button>
                    <button class="filter-btn" data-filter="healthy" 
                            style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid #00d4ff; 
                                   background: transparent; color: #00d4ff; cursor: pointer;">Healthy</button>
                </div>
                <div id="recipe-results" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                </div>
            </div>
        </div>
    `;
}

function createEcommerceDemo() {
    return `
        <div style="padding: 2rem; background: linear-gradient(135deg, #f8f9fa, #e9ecef); height: 100%; overflow-y: auto; color: #333;">
            <div style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                <div>
                    <div style="position: relative; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                        <img id="product-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23667eea'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='0.3em' fill='white' font-size='24'%3EPremium Headphones%3C/text%3E%3C/svg%3E" 
                             style="width: 100%; height: 400px; object-fit: cover; transition: transform 0.3s ease;" 
                             onmouseover="this.style.transform='scale(1.05)'" 
                             onmouseout="this.style.transform='scale(1)'">
                    </div>
                </div>
                <div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #2c3e50;">Premium Wireless Headphones</h1>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                        <span style="font-size: 2rem; font-weight: bold; color: #e74c3c;">$299</span>
                        <span style="font-size: 1.2rem; text-decoration: line-through; color: #95a5a6;">$399</span>
                        <span style="background: #e74c3c; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">25% OFF</span>
                    </div>
                    <p style="color: #7f8c8d; margin-bottom: 2rem; line-height: 1.6;">
                        Experience crystal-clear audio with our premium wireless headphones. 
                        Featuring active noise cancellation, 30-hour battery life, and premium comfort design.
                    </p>
                    <div style="margin-bottom: 2rem;">
                        <h4 style="margin-bottom: 1rem; color: #2c3e50;">Color Options:</h4>
                        <div style="display: flex; gap: 0.5rem;">
                            <div class="color-option" data-color="black" style="width: 40px; height: 40px; background: #2c3e50; border-radius: 50%; cursor: pointer; border: 3px solid #3498db;"></div>
                            <div class="color-option" data-color="white" style="width: 40px; height: 40px; background: #ecf0f1; border-radius: 50%; cursor: pointer; border: 3px solid transparent;"></div>
                            <div class="color-option" data-color="red" style="width: 40px; height: 40px; background: #e74c3c; border-radius: 50%; cursor: pointer; border: 3px solid transparent;"></div>
                        </div>
                    </div>
                    <button style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); 
                                   color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; 
                                   cursor: pointer; transition: transform 0.2s ease;" 
                            onmouseover="this.style.transform='translateY(-2px)'" 
                            onmouseout="this.style.transform='translateY(0)'"
                            onclick="alert('Added to cart! (Demo)')">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createBlogLayoutDemo() {
    return `
        <div style="background: #fafafa; height: 100%; overflow-y: auto;">
            <header style="background: white; padding: 1rem 2rem; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 100;">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                    <h1 style="color: #2c3e50; font-size: 1.5rem;">TechBlog</h1>
                    <nav style="display: flex; gap: 2rem;">
                        <a href="#" style="color: #7f8c8d; text-decoration: none;">Home</a>
                        <a href="#" style="color: #7f8c8d; text-decoration: none;">Articles</a>
                        <a href="#" style="color: #7f8c8d; text-decoration: none;">About</a>
                    </nav>
                </div>
            </header>
            <main style="max-width: 800px; margin: 2rem auto; padding: 0 2rem;">
                <article style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                    <h2 style="color: #2c3e50; margin-bottom: 1rem;">The Future of Web Development</h2>
                    <div style="color: #7f8c8d; margin-bottom: 1.5rem; font-size: 0.9rem;">
                        Published on March 15, 2024 • 5 min read
                    </div>
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='300' viewBox='0 0 800 300'%3E%3Crect width='800' height='300' fill='%2334495e'/%3E%3Ctext x='400' y='150' text-anchor='middle' dy='0.3em' fill='white' font-size='20'%3EFeatured Image%3C/text%3E%3C/svg%3E" 
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">
                    <p style="line-height: 1.7; color: #555; margin-bottom: 1.5rem;">
                        Web development continues to evolve at a rapid pace. From the rise of JAMstack architectures 
                        to the increasing adoption of WebAssembly, developers have more tools than ever to create 
                        fast, scalable, and maintainable web applications.
                    </p>
                    <p style="line-height: 1.7; color: #555; margin-bottom: 1.5rem;">
                        In this article, we'll explore the latest trends shaping the future of web development, 
                        including serverless computing, edge computing, and the growing importance of web performance.
                    </p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <span style="background: #3498db; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">JavaScript</span>
                        <span style="background: #2ecc71; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">React</span>
                        <span style="background: #e74c3c; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">Performance</span>
                    </div>
                </article>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                    <article style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">CSS Grid vs Flexbox</h3>
                        <p style="color: #7f8c8d; font-size: 0.9rem; line-height: 1.6;">
                            Understanding when to use CSS Grid versus Flexbox for your layouts.
                        </p>
                    </article>
                    <article style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">Modern JavaScript Features</h3>
                        <p style="color: #7f8c8d; font-size: 0.9rem; line-height: 1.6;">
                            Exploring the latest ECMAScript features that improve developer productivity.
                        </p>
                    </article>
                </div>
            </main>
        </div>
    `;
}

function createStartupLandingDemo() {
    return `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; overflow-y: auto; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'); opacity: 0.3;"></div>
            <div style="position: relative; z-index: 1; padding: 2rem;">
                <nav style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem;">
                    <div style="color: white; font-size: 1.5rem; font-weight: bold;">InnovateTech</div>
                    <div style="display: flex; gap: 2rem;">
                        <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Features</a>
                        <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Pricing</a>
                        <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Contact</a>
                    </div>
                </nav>
                <div style="text-align: center; max-width: 800px; margin: 0 auto 4rem;">
                    <h1 style="color: white; font-size: 3rem; margin-bottom: 1.5rem; animation: fadeInUp 1s ease-out;">
                        Revolutionize Your Workflow
                    </h1>
                    <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 2rem; animation: fadeInUp 1s ease-out 0.2s both;">
                        Streamline your business processes with our cutting-edge AI-powered platform. 
                        Increase productivity by 300% and reduce operational costs.
                    </p>
                    <button style="background: rgba(255,255,255,0.2); color: white; border: 2px solid white; 
                                   padding: 1rem 2rem; border-radius: 50px; font-size: 1.1rem; cursor: pointer; 
                                   backdrop-filter: blur(10px); transition: all 0.3s ease; animation: fadeInUp 1s ease-out 0.4s both;"
                            onmouseover="this.style.background='white'; this.style.color='#667eea';"
                            onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.color='white';">
                        Start Free Trial
                    </button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto;">
                    <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px); text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                        <h3 style="color: white; margin-bottom: 1rem;">Lightning Fast</h3>
                        <p style="color: rgba(255,255,255,0.8);">Process data 10x faster than traditional solutions</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px); text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div>
                        <h3 style="color: white; margin-bottom: 1rem;">Secure</h3>
                        <p style="color: rgba(255,255,255,0.8);">Enterprise-grade security with end-to-end encryption</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px); text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                        <h3 style="color: white; margin-bottom: 1rem;">Analytics</h3>
                        <p style="color: rgba(255,255,255,0.8);">Real-time insights and comprehensive reporting</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createQuizAppDemo() {
    return `
        <div style="padding: 2rem; background: linear-gradient(135deg, #1e3c72, #2a5298); height: 100%; overflow-y: auto;">
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h1 style="color: white; margin-bottom: 2rem;">JavaScript Quiz Challenge</h1>
                <div id="quiz-container" style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px);">
                    <div id="question-counter" style="color: #ffd93d; margin-bottom: 1rem;">Question 1 of 5</div>
                    <div id="score" style="color: #4ecdc4; margin-bottom: 2rem;">Score: 0</div>
                    <div id="question" style="color: white; font-size: 1.2rem; margin-bottom: 2rem;">
                        What is the correct way to declare a variable in JavaScript?
                    </div>
                    <div id="answers" style="display: flex; flex-direction: column; gap: 1rem;">
                        <button class="answer-btn" data-answer="0" style="padding: 1rem; border: 2px solid rgba(255,255,255,0.3); 
                                background: rgba(255,255,255,0.1); color: white; border-radius: 8px; cursor: pointer; 
                                transition: all 0.3s ease;">
                            var myVariable = "Hello";
                        </button>
                        <button class="answer-btn" data-answer="1" style="padding: 1rem; border: 2px solid rgba(255,255,255,0.3); 
                                background: rgba(255,255,255,0.1); color: white; border-radius: 8px; cursor: pointer; 
                                transition: all 0.3s ease;">
                            let myVariable = "Hello";
                        </button>
                        <button class="answer-btn" data-answer="2" style="padding: 1rem; border: 2px solid rgba(255,255,255,0.3); 
                                background: rgba(255,255,255,0.1); color: white; border-radius: 8px; cursor: pointer; 
                                transition: all 0.3s ease;">
                            const myVariable = "Hello";
                        </button>
                        <button class="answer-btn" data-answer="3" style="padding: 1rem; border: 2px solid rgba(255,255,255,0.3); 
                                background: rgba(255,255,255,0.1); color: white; border-radius: 8px; cursor: pointer; 
                                transition: all 0.3s ease;">
                            All of the above
                        </button>
                    </div>
                    <div id="feedback" style="margin-top: 2rem; min-height: 50px; color: white;"></div>
                </div>
            </div>
        </div>
    `;
}

function createArtGalleryDemo() {
    return `
        <div style="background: #1a1a1a; height: 100%; overflow-y: auto;">
            <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #2c1810, #3a2520);">
                <h1 style="color: #ffd93d; margin-bottom: 1rem;">Virtual Art Gallery</h1>
                <p style="color: rgba(255,255,255,0.8);">Explore masterpieces in an immersive digital experience</p>
            </div>
            <div style="padding: 2rem;">
                <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    <div class="artwork" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; 
                                              transition: transform 0.3s ease; cursor: pointer;"
                         onmouseover="this.style.transform='translateY(-10px) rotateY(5deg)'"
                         onmouseout="this.style.transform='translateY(0) rotateY(0deg)'">
                        <div style="height: 250px; background: linear-gradient(45deg, #ff6b6b, #ffd93d); 
                                    display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                            Abstract Composition #1
                        </div>
                        <div style="padding: 1.5rem;">
                            <h3 style="color: white; margin-bottom: 0.5rem;">Digital Dreams</h3>
                            <p style="color: #b3b3b3; font-size: 0.9rem;">Contemporary Digital Art • 2024</p>
                        </div>
                    </div>
                    <div class="artwork" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; 
                                              transition: transform 0.3s ease; cursor: pointer;"
                         onmouseover="this.style.transform='translateY(-10px) rotateY(-5deg)'"
                         onmouseout="this.style.transform='translateY(0) rotateY(0deg)'">
                        <div style="height: 250px; background: linear-gradient(45deg, #4ecdc4, #00d4ff); 
                                    display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                            Ocean Waves
                        </div>
                        <div style="padding: 1.5rem;">
                            <h3 style="color: white; margin-bottom: 0.5rem;">Fluid Motion</h3>
                            <p style="color: #b3b3b3; font-size: 0.9rem;">Abstract Expressionism • 2024</p>
                        </div>
                    </div>
                    <div class="artwork" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; 
                                              transition: transform 0.3s ease; cursor: pointer;"
                         onmouseover="this.style.transform='translateY(-10px) rotateY(5deg)'"
                         onmouseout="this.style.transform='translateY(0) rotateY(0deg)'">
                        <div style="height: 250px; background: linear-gradient(45deg, #667eea, #764ba2); 
                                    display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                            Cosmic Journey
                        </div>
                        <div style="padding: 1.5rem;">
                            <h3 style="color: white; margin-bottom: 0.5rem;">Space Odyssey</h3>
                            <p style="color: #b3b3b3; font-size: 0.9rem;">Surreal Digital Art • 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createWeatherWidgetDemo() {
    return `
        <div style="padding: 2rem; background: linear-gradient(135deg, #74b9ff, #0984e3); height: 100%; overflow-y: auto;">
            <div style="max-width: 400px; margin: 0 auto;">
                <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 20px; backdrop-filter: blur(10px); text-align: center;">
                    <div style="color: white; font-size: 1.2rem; margin-bottom: 1rem;">📍 San Francisco, CA</div>
                    <div style="font-size: 4rem; margin-bottom: 1rem;">☀️</div>
                    <div style="color: white; font-size: 3rem; font-weight: bold; margin-bottom: 0.5rem;">72°F</div>
                    <div style="color: rgba(255,255,255,0.8); margin-bottom: 2rem;">Sunny</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Humidity</div>
                            <div style="color: white; font-size: 1.2rem; font-weight: bold;">65%</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 12px;">
                            <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Wind</div>
                            <div style="color: white; font-size: 1.2rem; font-weight: bold;">8 mph</div>
                        </div>
                    </div>
                    <div style="text-align: left;">
                        <h4 style="color: white; margin-bottom: 1rem;">5-Day Forecast</h4>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="color: rgba(255,255,255,0.8);">Today</span>
                            <span style="font-size: 1.5rem;">☀️</span>
                            <span style="color: white;">72° / 58°</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="color: rgba(255,255,255,0.8);">Tomorrow</span>
                            <span style="font-size: 1.5rem;">⛅</span>
                            <span style="color: white;">68° / 55°</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="color: rgba(255,255,255,0.8);">Wednesday</span>
                            <span style="font-size: 1.5rem;">🌧️</span>
                            <span style="color: white;">62° / 50°</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createPortfolioGridDemo() {
    return `
        <div style="background: #f8f9fa; height: 100%; overflow-y: auto; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h1 style="color: #2c3e50; margin-bottom: 1rem;">Creative Portfolio</h1>
                <p style="color: #7f8c8d;">Showcasing innovative design solutions</p>
            </div>
            <div class="masonry-grid" style="columns: 3; column-gap: 1.5rem; max-width: 1200px; margin: 0 auto;">
                <div style="background: white; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; 
                           box-shadow: 0 4px 20px rgba(0,0,0,0.1); break-inside: avoid; transition: transform 0.3s ease;"
                     onmouseover="this.style.transform='translateY(-5px)'"
                     onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); 
                               display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem;">
                        Brand Identity Design
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">Tech Startup Branding</h3>
                        <p style="color: #7f8c8d; font-size: 0.9rem;">Complete brand identity for innovative tech company</p>
                    </div>
                </div>
                <div style="background: white; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; 
                           box-shadow: 0 4px 20px rgba(0,0,0,0.1); break-inside: avoid; transition: transform 0.3s ease;"
                     onmouseover="this.style.transform='translateY(-5px)'"
                     onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 300px; background: linear-gradient(45deg, #ff6b6b, #ffd93d); 
                               display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem;">
                        Web Application UI
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">E-commerce Platform</h3>
                        <p style="color: #7f8c8d; font-size: 0.9rem;">Modern interface design for online marketplace</p>
                    </div>
                </div>
                <div style="background: white; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; 
                           box-shadow: 0 4px 20px rgba(0,0,0,0.1); break-inside: avoid; transition: transform 0.3s ease;"
                     onmouseover="this.style.transform='translateY(-5px)'"
                     onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 250px; background: linear-gradient(45deg, #4ecdc4, #00d4ff); 
                               display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem;">
                        Mobile App Design
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">Fitness Tracking App</h3>
                        <p style="color: #7f8c8d; font-size: 0.9rem;">Intuitive mobile interface for health monitoring</p>
                    </div>
                </div>
                <div style="background: white; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; 
                           box-shadow: 0 4px 20px rgba(0,0,0,0.1); break-inside: avoid; transition: transform 0.3s ease;"
                     onmouseover="this.style.transform='translateY(-5px)'"
                     onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 180px; background: linear-gradient(45deg, #a8edea, #fed6e3); 
                               display: flex; align-items: center; justify-content: center; color: #2c3e50; font-size: 1.1rem;">
                        Print Design
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">Magazine Layout</h3>
                        <p style="color: #7f8c8d; font-size: 0.9rem;">Editorial design for lifestyle publication</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createTimelineVisualizerDemo() {
    return `
        <div style="padding: 2rem; background: linear-gradient(135deg, #2c3e50, #34495e); height: 100%; overflow-y: auto;">
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: white; text-align: center; margin-bottom: 2rem;">Web Development Timeline</h1>
                <div style="position: relative;">
                    <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: #3498db; transform: translateX(-50%);"></div>
                    
                    <div style="display: flex; align-items: center; margin-bottom: 3rem; position: relative;">
                        <div style="flex: 1; text-align: right; padding-right: 2rem;">
                            <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; backdrop-filter: blur(10px);">
                                <h3 style="color: #3498db; margin-bottom: 0.5rem;">1990s</h3>
                                <h4 style="color: white; margin-bottom: 0.5rem;">Birth of the Web</h4>
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">HTML and CSS emerge, creating the foundation of web development</p>
                            </div>
                        </div>
                        <div style="width: 20px; height: 20px; background: #3498db; border-radius: 50%; position: relative; z-index: 1;"></div>
                        <div style="flex: 1; padding-left: 2rem;"></div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 3rem; position: relative;">
                        <div style="flex: 1; padding-right: 2rem;"></div>
                        <div style="width: 20px; height: 20px; background: #e74c3c; border-radius: 50%; position: relative; z-index: 1;"></div>
                        <div style="flex: 1; text-align: left; padding-left: 2rem;">
                            <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; backdrop-filter: blur(10px);">
                                <h3 style="color: #e74c3c; margin-bottom: 0.5rem;">2000s</h3>
                                <h4 style="color: white; margin-bottom: 0.5rem;">JavaScript Revolution</h4>
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">AJAX and dynamic web applications transform user experiences</p>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 3rem; position: relative;">
                        <div style="flex: 1; text-align: right; padding-right: 2rem;">
                            <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; backdrop-filter: blur(10px);">
                                <h3 style="color: #2ecc71; margin-bottom: 0.5rem;">2010s</h3>
                                <h4 style="color: white; margin-bottom: 0.5rem;">Mobile-First Era</h4>
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Responsive design and mobile optimization become essential</p>
                            </div>
                        </div>
                        <div style="width: 20px; height: 20px; background: #2ecc71; border-radius: 50%; position: relative; z-index: 1;"></div>
                        <div style="flex: 1; padding-left: 2rem;"></div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 3rem; position: relative;">
                        <div style="flex: 1; padding-right: 2rem;"></div>
                        <div style="width: 20px; height: 20px; background: #f39c12; border-radius: 50%; position: relative; z-index: 1;"></div>
                        <div style="flex: 1; text-align: left; padding-left: 2rem;">
                            <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; backdrop-filter: blur(10px);">
                                <h3 style="color: #f39c12; margin-bottom: 0.5rem;">2020s</h3>
                                <h4 style="color: white; margin-bottom: 0.5rem;">Modern Frameworks</h4>
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">React, Vue, and Angular dominate frontend development</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initDemoInteractivity(demoType) {
    switch(demoType) {
        case 'data-visualization':
            initChartDemo();
            break;
        case 'recipe-finder':
            initRecipeDemo();
            break;
        case 'ecommerce-page':
            initEcommerceDemo();
            break;
        case 'quiz-app':
            initQuizDemo();
            break;
    }
}

function initChartDemo() {
    const canvas = document.getElementById('demo-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const data = [65, 78, 85, 92, 88, 95, 102, 98, 105, 112, 108, 115];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    function drawChart() {
        ctx.clearRect(0, 0, width, height);
        
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const valueRange = maxValue - minValue;
        
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            ctx.fillStyle = '#00d4ff';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.closePath();
        ctx.fill();
    }
    
    drawChart();
}

function initRecipeDemo() {
    const searchInput = document.getElementById('recipe-search');
    const resultsContainer = document.getElementById('recipe-results');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    const recipes = [
        { name: 'Vegetarian Pasta', time: '25 min', tags: ['vegetarian', 'quick'], image: '🍝' },
        { name: 'Healthy Salad Bowl', time: '15 min', tags: ['vegetarian', 'healthy', 'quick'], image: '🥗' },
        { name: 'Grilled Chicken', time: '45 min', tags: ['healthy'], image: '🍗' },
        { name: 'Quick Stir Fry', time: '20 min', tags: ['quick', 'healthy'], image: '🥘' },
        { name: 'Veggie Burger', time: '30 min', tags: ['vegetarian', 'healthy'], image: '🍔' },
        { name: 'Fish Tacos', time: '35 min', tags: ['healthy'], image: '🌮' }
    ];
    
    let activeFilters = [];
    
    function displayRecipes(recipesToShow) {
        resultsContainer.innerHTML = recipesToShow.map(recipe => `
            <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; text-align: center; 
                        backdrop-filter: blur(10px); transition: transform 0.3s ease; cursor: pointer;"
                 onmouseover="this.style.transform='translateY(-5px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${recipe.image}</div>
                <h3 style="color: white; margin-bottom: 0.5rem;">${recipe.name}</h3>
                <p style="color: #ffd93d; font-size: 0.9rem;">${recipe.time}</p>
            </div>
        `).join('');
    }
    
    function filterRecipes() {
        let filtered = recipes;
        
        if (searchInput.value) {
            filtered = filtered.filter(recipe => 
                recipe.name.toLowerCase().includes(searchInput.value.toLowerCase())
            );
        }
        
        if (activeFilters.length > 0) {
            filtered = filtered.filter(recipe => 
                activeFilters.some(filter => recipe.tags.includes(filter))
            );
        }
        
        displayRecipes(filtered);
    }
    
    searchInput.addEventListener('input', filterRecipes);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            if (activeFilters.includes(filter)) {
                activeFilters = activeFilters.filter(f => f !== filter);
                this.style.background = 'transparent';
            } else {
                activeFilters.push(filter);
                this.style.background = this.style.borderColor;
            }
            
            filterRecipes();
        });
    });
    
    displayRecipes(recipes);
}

function initEcommerceDemo() {
    const colorOptions = document.querySelectorAll('.color-option');
    const productImage = document.getElementById('product-image');
    
    const colorImages = {
        'black': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%232c3e50'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='0.3em' fill='white' font-size='24'%3EPremium Headphones%3C/text%3E%3C/svg%3E",
        'white': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23ecf0f1'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='0.3em' fill='%232c3e50' font-size='24'%3EPremium Headphones%3C/text%3E%3C/svg%3E",
        'red': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23e74c3c'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='0.3em' fill='white' font-size='24'%3EPremium Headphones%3C/text%3E%3C/svg%3E"
    };
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.style.border = '3px solid transparent');
            this.style.border = '3px solid #3498db';
            
            const color = this.getAttribute('data-color');
            productImage.src = colorImages[color];
        });
    });
}

function initQuizDemo() {
    const questions = [
        {
            question: "What is the correct way to declare a variable in JavaScript?",
            answers: ["var myVariable = 'Hello';", "let myVariable = 'Hello';", "const myVariable = 'Hello';", "All of the above"],
            correct: 3
        },
        {
            question: "Which method is used to add an element to the end of an array?",
            answers: ["push()", "pop()", "shift()", "unshift()"],
            correct: 0
        },
        {
            question: "What does DOM stand for?",
            answers: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
            correct: 0
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const scoreElement = document.getElementById('score');
    const counterElement = document.getElementById('question-counter');
    const feedbackElement = document.getElementById('feedback');
    
    function displayQuestion() {
        const q = questions[currentQuestion];
        questionElement.textContent = q.question;
        counterElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        
        answersElement.innerHTML = q.answers.map((answer, index) => `
            <button class="answer-btn" data-answer="${index}" 
                    style="padding: 1rem; border: 2px solid rgba(255,255,255,0.3); 
                           background: rgba(255,255,255,0.1); color: white; border-radius: 8px; 
                           cursor: pointer; transition: all 0.3s ease;">
                ${answer}
            </button>
        `).join('');
        
        const answerBtns = document.querySelectorAll('.answer-btn');
        answerBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedAnswer = parseInt(this.getAttribute('data-answer'));
                const correct = questions[currentQuestion].correct;
                
                answerBtns.forEach(b => b.style.pointerEvents = 'none');
                
                if (selectedAnswer === correct) {
                    this.style.background = '#2ecc71';
                    this.style.borderColor = '#2ecc71';
                    score += 10;
                    feedbackElement.textContent = 'Correct! Well done!';
                    feedbackElement.style.color = '#2ecc71';
                } else {
                    this.style.background = '#e74c3c';
                    this.style.borderColor = '#e74c3c';
                    answerBtns[correct].style.background = '#2ecc71';
                    answerBtns[correct].style.borderColor = '#2ecc71';
                    feedbackElement.textContent = 'Incorrect. The correct answer is highlighted.';
                    feedbackElement.style.color = '#e74c3c';
                }
                
                scoreElement.textContent = `Score: ${score}`;
                
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        displayQuestion();
                        feedbackElement.textContent = '';
                    } else {
                        questionElement.textContent = 'Quiz Complete!';
                        answersElement.innerHTML = '';
                        feedbackElement.innerHTML = `
                            <div style="text-align: center; padding: 2rem;">
                                <h3 style="color: #ffd93d; margin-bottom: 1rem;">Final Score: ${score}/${questions.length * 10}</h3>
                                <p style="color: white;">Thanks for playing!</p>
                            </div>
                        `;
                        counterElement.textContent = '';
                    }
                }, 2000);
            });
        });
    }
    
    displayQuestion();
}

function initEmailFunctionality() {
    const mailButtons = document.querySelectorAll('.mail-btn');
    mailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            window.location.href = 'mailto:izzaaalproductionltd@gmail.com?subject=Project Inquiry&body=Hello, I would like to discuss a project with you.';
        });
    });
}

window.addEventListener('resize', function() {
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        if (window.innerWidth <= 768) {
            customCursor.style.display = 'none';
        } else {
            customCursor.style.display = 'block';
        }
    }
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

