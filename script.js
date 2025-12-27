/**
 * Irfan Safi Hub - Core Engine
 * Handled: Themes, Custom Colors, Countdown, Clock, and Mouse Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SYSTEM CLOCK (24H Format) ---
    const startClock = () => {
        const clockEl = document.getElementById('clock');
        if (!clockEl) return;
        
        setInterval(() => {
            const now = new Date();
            clockEl.innerText = now.toLocaleTimeString('en-GB');
        }, 1000);
    };

    // --- 2. BIRTHDAY COUNTDOWN (July 28) ---
    const updateBirthday = () => {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('mins');
        if (!daysEl) return;

        const now = new Date();
        let bday = new Date(now.getFullYear(), 6, 28); // 6 is July

        if (now > bday) bday.setFullYear(now.getFullYear() + 1);

        const diff = bday - now;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);

        daysEl.innerText = d.toString().padStart(2, '0');
        hoursEl.innerText = h.toString().padStart(2, '0');
        minsEl.innerText = m.toString().padStart(2, '0');
    };

    // --- 3. CUSTOM COLOR ENGINE ---
    window.applyCustomColor = (hex) => {
        document.documentElement.setAttribute('data-theme', 'custom');
        
        // Apply the main accent color
        document.documentElement.style.setProperty('--accent', hex);
        
        // Generate RGBA for the background glow and card spotlight
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const rgba = `rgba(${r}, ${g}, ${b}, 0.15)`;
        
        document.documentElement.style.setProperty('--accent-glow', rgba);
        
        // UI Updates: Activate the "+" button
        document.querySelectorAll('.t-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.custom-trigger').classList.add('active');
        
        // Memory
        localStorage.setItem('hub-theme', 'custom');
        localStorage.setItem('hub-custom-hex', hex);
    };

    // --- 4. PRESET THEME CONTROLLER ---
    window.setTheme = (theme) => {
        if (theme !== 'custom') {
            document.documentElement.style.removeProperty('--accent');
            document.documentElement.style.removeProperty('--accent-glow');
            document.querySelector('.custom-trigger').classList.remove('active');
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        
        document.querySelectorAll('.t-btn').forEach(btn => btn.classList.remove('active'));
        const btnClass = theme === 'white' ? '.lime' : `.${theme}`;
        const targetBtn = document.querySelector(btnClass);
        if (targetBtn) targetBtn.classList.add('active');
        
        localStorage.setItem('hub-theme', theme);
    };

    // --- 5. EMAIL COPY FEATURE ---
    window.copyEmail = () => {
        const email = "safi22744@gmail.com";
        const status = document.getElementById('copy-status');
        const text = document.getElementById('email-text');

        navigator.clipboard.writeText(email).then(() => {
            text.innerText = email;
            status.style.opacity = "1";
            setTimeout(() => {
                status.style.opacity = "0";
                text.innerText = "Click to Copy";
            }, 2000);
        });
    };

    // --- 6. MOUSE SPOTLIGHT ---
    const initSpotlight = () => {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    };

    // --- INITIALIZATION ---
    startClock();
    updateBirthday();
    initSpotlight();

    // Check Memory for Saved Styles
    const savedTheme = localStorage.getItem('hub-theme') || 'white';
    if (savedTheme === 'custom') {
        const savedHex = localStorage.getItem('hub-custom-hex');
        applyCustomColor(savedHex);
    } else {
        setTheme(savedTheme);
    }

    // Update countdown every minute
    setInterval(updateBirthday, 60000);
});
