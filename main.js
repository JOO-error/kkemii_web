document.addEventListener('DOMContentLoaded', () => {
    const glow = document.querySelector('.cursor-glow');
    
    // Follow mouse cursor with a slight delay using requestAnimationFrame
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    // Check if device supports hover (not a mobile touch device)
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
    }

    if (!isTouchDevice()) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            // Easing factor
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            
            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;
            
            requestAnimationFrame(animateGlow);
        }

        animateGlow();

        // Enhance glow on hover over interactable elements
        const interactiveElements = document.querySelectorAll('a, .logo, .gradient-text');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                glow.style.width = '80dvv';
                glow.style.height = '80dvv';
                glow.style.opacity = '0.35';
                glow.style.filter = 'blur(60px)';
            });

            el.addEventListener('mouseleave', () => {
                glow.style.width = '60dvv';
                glow.style.height = '60dvv';
                glow.style.opacity = '0.2';
                glow.style.filter = 'blur(80px)';
            });
        });
    } else {
        // Fallback for mobile: static animated glow in the background
        let angle = 0;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.1;

        function animateMobileGlow() {
            angle += 0.01;
            
            glowX = centerX + Math.cos(angle) * radius;
            glowY = centerY + Math.sin(angle) * radius;
            
            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;
            
            requestAnimationFrame(animateMobileGlow);
        }
        
        animateMobileGlow();
    }
});
