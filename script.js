// Enhanced Portfolio Interactions and Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive features
    initScrollReveal();
    initProjectInteractions();
    initReferenceInteractions();
    initSkillInteractions();
    initTypingEffect();
    initParticleSystem();
    initSmoothScrolling();
    initPageLoadAnimation();
    
    // Scroll Reveal Animation
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // Enhanced Project Card Interactions
    function initProjectInteractions() {
        const projects = document.querySelectorAll('.project');
        
        projects.forEach(project => {
            // Click animation
            project.addEventListener('click', function() {
                this.style.transform = 'scale(1.08) rotateY(10deg)';
                
                // Add ripple effect
                createRippleEffect(this);
                
                setTimeout(() => {
                    this.style.transform = 'scale(1.05) rotateY(5deg)';
                }, 200);
            });

            // Mouse leave reset
            project.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotateY(0deg)';
            });
            
            // Add hover sound effect (optional)
            project.addEventListener('mouseenter', function() {
                // Uncomment to add hover sound
                // playHoverSound();
            });
        });
    }
    
    // Reference Card Hover Effects
    function initReferenceInteractions() {
        const references = document.querySelectorAll('.reference');
        
        references.forEach(reference => {
            reference.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                
                // Add glow effect
                this.style.boxShadow = '0 25px 50px rgba(79, 172, 254, 0.3)';
            });

            reference.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Skill Category Animations
    function initSkillInteractions() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach((category, index) => {
            category.style.animationDelay = `${index * 0.2}s`;
            
            category.addEventListener('mouseenter', function() {
                const items = this.querySelectorAll('li');
                
                items.forEach((item, itemIndex) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(10px)';
                        item.style.opacity = '1';
                        item.style.color = '#ffffff';
                    }, itemIndex * 50);
                });
            });

            category.addEventListener('mouseleave', function() {
                const items = this.querySelectorAll('li');
                
                items.forEach(item => {
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '0.95';
                    item.style.color = '';
                });
            });
        });
    }
    
    // Typing Effect for Subtitle
    function initTypingEffect() {
        const subtitle = document.querySelector('.subtitle');
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Add blinking cursor effect
                setTimeout(() => {
                    subtitle.innerHTML += '<span class="cursor">|</span>';
                    
                    // Animate cursor
                    const cursor = document.querySelector('.cursor');
                    if (cursor) {
                        setInterval(() => {
                            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                        }, 500);
                    }
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Floating Particles System
    function initParticleSystem() {
        function createParticle() {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 4;
            
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${left}vw;
                top: 100vh;
                animation: float-particle ${animationDuration}s linear infinite;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, animationDuration * 1000);
        }

        // Create particles periodically
        setInterval(createParticle, 300);
        
        // Add particle animation CSS
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float-particle {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                .cursor {
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Smooth Scrolling
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add scroll-to-top functionality
        window.addEventListener('scroll', function() {
            const scrollButton = document.querySelector('.scroll-to-top');
            
            if (window.pageYOffset > 300) {
                if (!scrollButton) {
                    createScrollToTopButton();
                }
            } else if (scrollButton) {
                scrollButton.remove();
            }
        });
    }
    
    // Page Load Animation
    function initPageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    // Helper Functions
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: 50%;
            top: 50%;
            margin-left: -${size/2}px;
            margin-top: -${size/2}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add ripple animation if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.3)';
        });
        
        document.body.appendChild(button);
    }
    
    // Optional: Add hover sound effects
    function playHoverSound() {
        // Create a subtle hover sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add scroll performance optimization
    window.addEventListener('scroll', throttle(() => {
        // Handle scroll-dependent animations here
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for background
        document.body.style.backgroundPosition = `center ${rate}px`;
    }, 16));
    
    // Add intersection observer for better performance
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.section, .project, .reference').forEach(el => {
        observer.observe(el);
    });
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('✨ All interactive features initialized');
});

// Add loading screen (optional)
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 300);
    }
});

// Add error handling for better user experience
window.addEventListener('error', function(e) {
    console.warn('Portfolio Error:', e.message);
    // Gracefully handle any JavaScript errors
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollReveal,
        initProjectInteractions,
        initParticleSystem
    };
}
