const startButton = document.getElementById('startButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const tabs = document.getElementById('tabs');
const content = document.getElementById('content');

let money = 0;

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
        <div>Money: $${money}</div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
    `;
    activateTab('farmTab');
}

function showBeatTab() {
    content.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: calc(100vh - 60px);">
            <div id="moneyDisplay" style="font-size: 24px; margin-bottom: 20px;">Money: ${money}</div>
            <div id="beatSquare" style="width: 100px; height: 100px; background-color: green; cursor: pointer;"></div>
        </div>
    `;
    activateTab('beatTab');

    const beatSquare = document.getElementById('beatSquare');
    const moneyDisplay = document.getElementById('moneyDisplay');

    beatSquare.addEventListener('click', () => {
        money++;
        moneyDisplay.textContent = `Money: ${money}`;
        playSoundEffect();
    });
}

function showSettingsTab() {
    content.innerHTML = `
        <h2>Settings</h2>
        <input type="range" id="volumeSlider" min="0" max="100" value="50">
        <label for="volumeSlider">Volume</label>
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
