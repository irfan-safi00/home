// Game Variables
let score = 0;
let lives = 3;
let gameActive = false;
let spawnRate = 1000;
let gameInterval;

// Start Game Function
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    gameActive = true;
    spawnLoop();
}

// Main Game Loop
function spawnLoop() {
    if (!gameActive) return;

    createTarget();

    // Increase difficulty: Reduce spawn delay as score rises
    let nextSpawn = Math.max(350, spawnRate - (score * 1.5));
    gameInterval = setTimeout(spawnLoop, nextSpawn);
}

// Create Falling Icon
function createTarget() {
    const target = document.createElement('div');
    target.className = 'target';
    target.innerHTML = '🎮';
    
    // Random Horizontal Position
    const xPos = Math.random() * (window.innerWidth - 80);
    target.style.left = xPos + 'px';
    
    // Fall Speed (Gets faster every 100 points)
    const duration = Math.max(1.2, 3.5 - (score / 150));
    target.style.animationDuration = duration + 's';

    // Click Logic
    target.onclick = function() {
        if (!gameActive) return;
        
        score += 10;
        // FIXED: Corrected the 'I' in getElementById
        document.getElementById('score').innerText = score;
        
        // Super Mode Effect at 500+ points
        if (score === 500) {
            document.body.classList.add('super-mode');
        }

        this.style.transform = 'scale(0)';
        setTimeout(() => this.remove(), 100);
    };

    // Fail Logic: Icon hits the bottom
    target.addEventListener('animationend', () => {
        if (target.parentElement) {
            lives--;
            document.getElementById('lives').innerText = lives;
            target.remove();
            
            if (lives <= 0) {
                endGame();
            }
        }
    });

    document.body.appendChild(target);
}

// Game Over Function
function endGame() {
    gameActive = false;
    clearTimeout(gameInterval);
    
    // Clean up all icons on screen
    document.querySelectorAll('.target').forEach(t => t.remove());
    
    // Display the Promo/Result Card
    document.getElementById('lose-screen').style.display = 'block';
    document.getElementById('final-score').innerText = score;
    document.body.classList.remove('super-mode');
}
