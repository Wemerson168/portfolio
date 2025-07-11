document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };


    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
 
                entry.target.querySelectorAll('.animate__animated').forEach(el => {
                    const animationClass = el.dataset.animation || 'fadeInUp'; 
                    const animationDelay = el.dataset.delay || '0s'; 

                    el.style.setProperty('--animate-delay', animationDelay);
                    el.style.visibility = 'visible'; 
                    el.classList.add(animationClass); 

 
                    el.addEventListener('animationend', () => {
                        el.style.removeProperty('--animate-delay');
                    }, { once: true });
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('section').forEach(section => {

        section.querySelectorAll('.animate__animated').forEach(el => {
            el.style.visibility = 'hidden';
        });
        observer.observe(section);
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const backToTopButton = document.createElement('button');
    backToTopButton.innerText = '↑'; 
    backToTopButton.id = 'backToTop'; 
    document.body.appendChild(backToTopButton); 

    Object.assign(backToTopButton.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: 'var(--primary)',
        color: 'var(--bg-color)',
        border: 'none',
        borderRadius: '50%',
        width: '50px', 
        height: '50px', 
        fontSize: '28px', 
        cursor: 'pointer',
        display: 'none', 
        zIndex: '999',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    });


    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.background = 'var(--primary-dark)';
        backToTopButton.style.transform = 'translateY(-5px) scale(1.1)';
        backToTopButton.style.boxShadow = '0 8px 20px var(--accent-glow)';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.background = 'var(--primary)';
        backToTopButton.style.transform = 'translateY(0) scale(1)';
        backToTopButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    });

    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { 
            backToTopButton.style.display = 'flex'; 
            backToTopButton.style.alignItems = 'center';
            backToTopButton.style.justifyContent = 'center';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});