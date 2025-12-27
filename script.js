document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // 1. SPOTLIGHT EFFECT
    // This tracks the mouse position to move the radial gradient glow
    const handleMouseMove = (e) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    for (const card of cards) {
        card.onmousemove = e => handleMouseMove(e);
    }

    // 2. MAGNETIC LINKS
    // Makes social buttons feel tactile by pulling slightly toward the cursor
    const socialLinks = document.querySelectorAll('.social');
    
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = `translate(0px, 0px)`;
        });
    });

    // 3. CONSOLE LOG (Easter Egg)
    console.log(
        "%c 🚀 Portfolio Loaded! Design: Minimal Dark Bento ", 
        "color: #cfff04; font-size: 14px; font-weight: bold; background: #111; padding: 5px 10px; border-radius: 5px;"
    );
});
