// Portfolio JavaScript functionality

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Modern Portfolio loaded successfully!');

    // Scroll effect for cosmic intro
    const cosmicIntro = document.getElementById('cosmic-intro');
    const mainPortfolio = document.getElementById('main-portfolio');

    window.addEventListener('scroll', function() {
        if (window.scrollY > window.innerHeight / 6) {
            cosmicIntro.style.transform = 'translateY(-100vh)';
            mainPortfolio.classList.add('active');
        }
    });
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card');
    const projectCards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.modern-btn');
    
    // Add mouse move effect to main cards
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
    
    // Add click animations to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Project cards stagger animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        projectObserver.observe(card);
    });
    
    // Add parallax effect to header
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const parallax = scrolled * 0.5;
        
        if (header) {
            header.style.transform = `translateY(${parallax}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add typing effect to header
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        headerTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                headerTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Add smooth scrolling for navigation links if they exist
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add contact items hover animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Add random floating animation to cards
    function addFloatingAnimation() {
        cards.forEach((card, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 3 + Math.random() * 2;
            
            card.style.animation += `, float-${index} ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
            
            // Create unique keyframes for each card
            const keyframes = `
                @keyframes float-${index} {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-${5 + Math.random() * 5}px) rotate(${Math.random() * 2 - 1}deg); }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
        });
    }
    
    setTimeout(addFloatingAnimation, 1000);
    
    // Message Modal Functionality
    const messageModal = document.getElementById('messageModal');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.cancel-btn');
    const messageForm = document.getElementById('messageForm');
    const notification = document.getElementById('successNotification');
    
    console.log('Modal elements:', {
        messageModal,
        sendMessageBtn,
        closeBtn,
        cancelBtn,
        messageForm,
        notification
    });

    // Show success notification function
    function showNotification() {
        notification.style.display = 'block';
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Reset form fields function
    function resetForm() {
        document.getElementById('senderName').value = '';
        document.getElementById('senderEmail').value = '';
        document.getElementById('messageText').value = '';
    }

    // Open modal when "Send Message" button is clicked
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function(e) {
            e.preventDefault();
                messageModal.classList.add('show');
        });
    }

    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            messageModal.classList.remove('show');
            resetForm();
        });
    }

    // Close modal when cancel button is clicked
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            messageModal.classList.remove('show');
            resetForm();
        });
    }

    // Close modal when clicking outside of it
    if (messageModal) {
        window.addEventListener('click', function(event) {
            if (event.target === messageModal) {
                messageModal.classList.remove('show');
                resetForm();
            }
        });
    }

    // Handle form submission
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success notification
            showNotification();
            
            // Close modal
            messageModal.classList.remove('show');
            
            // Reset form
            resetForm();
        });
    }
    
    console.log('✨ All animations and interactions loaded!');
});
