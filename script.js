document.addEventListener('DOMContentLoaded', () => {
    
    // 1. THEME SWITCHER
    // Changes the --accent color globally (White, Red, or Purple)
    window.setTheme = (themeName) => {
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Update button UI
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.classList.contains(themeName));
        });

        localStorage.setItem('selectedTheme', themeName);
    };

    // Load saved theme or default to white
    const savedTheme = localStorage.getItem('selectedTheme') || 'white';
    setTheme(savedTheme);


    // 2. CARD MOUSE GLOW (SPOTLIGHT)
    // This makes the subtle glow follow your mouse inside every card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    // 3. LIVE CLOCK SCRIPT
    const updateTime = () => {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            });
            timeDisplay.textContent = timeString;
        }
    };

    setInterval(updateTime, 1000);
    updateTime();


    // 4. MAGNETIC INTERACTION
    // This adds a slight "pull" effect to socials and discord items
    const interactiveElements = document.querySelectorAll('.social, .discord-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move the element 20% toward the mouse
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });

    console.log("✅ Portfolio fully loaded for Irfan Safi");
});
