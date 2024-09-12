const startButton = document.getElementById('startButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const tabs = document.getElementById('tabs');
const content = document.getElementById('content');

let money = 0;
let moneyPerSecond = 0;
backgroundMusic.volume = 0;

function startGame() {
    startButton.style.display = 'none';
    tabs.style.display = 'flex'; // Show tabs
    content.style.display = 'block'; // Show content
    backgroundMusic.play().catch(error => {
        console.error('Music playback failed:', error);
    });

    showFarmTab();
}

function showFarmTab() {
    content.innerHTML = `
        <div id="farmContent">
            <div id="moneyDisplay" style="font-size: 72px; margin-top: 20px; position: relative; top: 50px;">Money: ${money}</div>
            <div id="moneyPerSecondDisplay" style="font-size: 36px; margin-top: 10px;">Money Per Second: ${moneyPerSecond}</div>
            <div class="squares-container">
                <div class="square-container">
                    <div class="square"></div>
                    <button class="purchase-button" id="purchase10">$10</button>
                </div>
                <div class="square-container">
                    <div class="square"></div>
                    <button class="purchase-button" id="purchase250">$250</button>
                </div>
                <div class="square-container">
                    <div class="square"></div>
                    <button class="purchase-button" id="purchase5000">$5000</button>
                </div>
                <div class="square-container">
                    <div class="square"></div>
                    <button class="purchase-button" id="purchase150000">$150000</button>
                </div>
            </div>
        </div>
    `;
    activateTab('farmTab');

    // Add event listeners for buttons
    document.getElementById('purchase10').addEventListener('click', () => purchaseItem(10, 'purchase10'));
    document.getElementById('purchase250').addEventListener('click', () => purchaseItem(250, 'purchase250'));
    document.getElementById('purchase5000').addEventListener('click', () => purchaseItem(5000, 'purchase5000'));
    document.getElementById('purchase150000').addEventListener('click', () => purchaseItem(150000, 'purchase150000'));

    // Update money and money per second displays
    updateDisplays();
}

// Add the animateValue function
// Add the animateValue function
function animateValue(element, startValue, endValue, duration) {
    const startTime = performance.now();
    
    function update() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.round(startValue + (endValue - startValue) * progress);
        
        element.textContent = `Money: ${currentValue}`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Modify the updateDisplays function to use animateValue
function updateDisplays() {
    const moneyDisplay = document.getElementById('moneyDisplay');
    const moneyPerSecondDisplay = document.getElementById('moneyPerSecondDisplay');

    animateValue(moneyDisplay, parseInt(moneyDisplay.textContent.replace('Money: ', '')), money, 1000);
    moneyPerSecondDisplay.textContent = `Money Per Second: ${moneyPerSecond}`;
}

// Modify the incrementMoney function to use animateValue
function incrementMoney() {
    const moneyDisplay = document.getElementById('moneyDisplay');
    const startValue = parseInt(moneyDisplay.textContent.replace('Money: ', ''));
    money += moneyPerSecond;

    animateValue(moneyDisplay, startValue, money, 1000);
}

setInterval(incrementMoney, 1000); // Increment money every second

// Rest of your code...


// Modify the purchaseItem function to use animateValue
function purchaseItem(amount, buttonId) {
    if (money >= amount) {
        money -= amount;

        // Update the money display with animation
        const moneyDisplay = document.getElementById('moneyDisplay');
        animateValue(moneyDisplay, parseInt(moneyDisplay.textContent.replace('Money: ', '')), money, 1000);

        // Play the money sound effect, skipping the first 0.3 seconds
        const audio = new Audio('money-sound-effect.mp3');
        audio.currentTime = 0.3; // Skip the first 0.3 seconds
        audio.play();

        // Get the square associated with the button
        const button = document.getElementById(buttonId);
        const square = button.previousElementSibling; // Get the square element above the button

        // Apply the effect to the square
        square.classList.add('purchase-effect');

        // Remove the effect after a short delay
        setTimeout(() => {
            square.classList.remove('purchase-effect');
        }, 500);

        // Increase money per second based on the purchase
        if (amount === 10) {
            moneyPerSecond += 1;
        } else if (amount === 250) {
            moneyPerSecond += 10;
        } else if (amount === 5000) {
            moneyPerSecond += 50;
        } else if (amount === 150000) {
            moneyPerSecond += 250;
        }

        // Update the money per second display
        document.getElementById('moneyPerSecondDisplay').textContent = `Money Per Second: ${moneyPerSecond}`;
    } else {
        alert('Not enough money!');
    }
}


function showBeatTab() {
    content.innerHTML = `
        <div id="beatContent">
            <div id="moneyDisplay" style="font-size: 72px; margin-top: 20px; position: relative; top: 50px;">Money: ${money}</div>
            <div id="moneyPerSecondDisplay" style="font-size: 36px; margin-top: 10px;">Money Per Second: ${moneyPerSecond}</div>
            <div style="margin-left: calc(50% - 100px); margin-top: 10%;" id="beatSquare"></div>
        </div>
    `;
    activateTab('beatTab');

    const beatSquare = document.getElementById('beatSquare');
    const moneyDisplay = document.getElementById('moneyDisplay');
    const moneyPerSecondDisplay = document.getElementById('moneyPerSecondDisplay');

    beatSquare.addEventListener('click', (event) => {
        // Immediately increment the money value
        money++;
        
        // Update the money display immediately
        moneyDisplay.textContent = `Money: ${money}`;

        // Animate the money display
        const startValue = parseInt(moneyDisplay.textContent.replace('Money: ', ''));
        animateValue(moneyDisplay, startValue, money, 1000);

        // Play the money sound effect, skipping the first 0.3 seconds
        playSoundEffect();

        // Trigger particle and click effects
        triggerParticleEffect(event);
        triggerClickEffect(beatSquare);

        // Update the money per second display in case it changes
        moneyPerSecondDisplay.textContent = `Money Per Second: ${moneyPerSecond}`;
    });

    // Update the money per second display in case it changes
    moneyPerSecondDisplay.textContent = `Money Per Second: ${moneyPerSecond}`;
}



function showSettingsTab() {
    content.innerHTML = `
        <div id="settingsContent">
            <h2 style="margin-top: 20px; font-size: 58px; position: relative; top: 20px;">Settings</h2>
            <input type="range" id="volumeSlider" min="0" max="100" value="${backgroundMusic.volume * 100}">
            <label for="volumeSlider">Volume</label>
        </div>
    `;
    activateTab('settingsTab');

    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', () => {
        backgroundMusic.volume = volumeSlider.value / 100;
    });
}

function activateTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show the content for the active tab
    document.getElementById(`${tabId.replace('Tab', 'Content')}`).style.display = 'block';
}

function triggerParticleEffect(event) {
    const numberOfParticles = 15;
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'absolute';
    particleContainer.style.left = `${event.clientX}px`;
    particleContainer.style.top = `${event.clientY}px`;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        particleContainer.appendChild(particle);

        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

    document.body.appendChild(particleContainer);

    // Remove container after a short delay
    setTimeout(() => {
        particleContainer.remove();
    }, 500);
}

function triggerClickEffect(element) {
    element.style.transform = 'scale(1.2)';
    element.style.backgroundColor = 'yellowgreen';

    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.backgroundColor = 'limegreen';
    }, 200);
}

function playSoundEffect() {
    const audio = new Audio('smash-sound-effect.mp3');
    const cutTime = 0.3; // Time to skip (in seconds)

    // Set the start time to skip the first half-second
    audio.currentTime = cutTime;

    audio.play();
}

startButton.addEventListener('click', startGame);

document.getElementById('farmTab').addEventListener('click', showFarmTab);
document.getElementById('beatTab').addEventListener('click', showBeatTab);
document.getElementById('settingsTab').addEventListener('click', showSettingsTab);
