document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME & CUSTOM COLOR LOGIC ---
    
    window.setTheme = (themeName) => {
        document.documentElement.setAttribute('data-theme', themeName);
        // Clean up any custom styles if a preset is picked
        document.documentElement.style.removeProperty('--accent');
        document.documentElement.style.removeProperty('--accent-glow');
        
        updateActiveBtn(themeName);
        localStorage.setItem('selectedTheme', themeName);
    };

    window.triggerColorPicker = () => {
        document.getElementById('colorPicker').click();
    };

    window.applyCustomColor = (hex) => {
        document.documentElement.setAttribute('data-theme', 'custom');
        document.documentElement.style.setProperty('--accent', hex);
        
        // Generate a soft glow (RGBA) from the Hex code
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.15)`);
        
        updateActiveBtn('plus-btn');
        localStorage.setItem('selectedTheme', 'custom');
        localStorage.setItem('customColor', hex);
    };

    const updateActiveBtn = (activeClass) => {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.classList.contains(activeClass));
        });
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'white';
    if (savedTheme === 'custom') {
        applyCustomColor(localStorage.getItem('customColor'));
    } else {
        setTheme(savedTheme);
    }


    // --- 2. MUSIC SLIDER INTERACTION ---
    // Makes each album clickable to search on YouTube
    const albums = document.querySelectorAll('.album-item');
    albums.forEach(album => {
        album.addEventListener('click', () => {
            const song = album.querySelector('h4').textContent;
            const artist = album.querySelector('p').textContent;
            const searchQuery = encodeURIComponent(`${song} ${artist}`);
            window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
        });
    });


    // --- 3. MOUSE TRACKING (SPOTLIGHT EFFECT) ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });


    // --- 4. CLOCK SYSTEM ---
    const updateClock = () => {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
        }
    };
    setInterval(updateClock, 1000);
    updateClock();


    // --- 5. MAGNETIC SOCIAL LINKS ---
    const socialLinks = document.querySelectorAll('.social');
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            link.style.transform = `translate(${x}px, ${y}px)`;
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = `translate(0px, 0px)`;
        });
    });

});
