const lamp = document.getElementById('lamp');

function isLampOn() {
    return lamp.src.includes('lampada-on');
}

function turnOn() {
    lamp.src = 'images/lampada-on.png';
    document.body.classList.remove('dark-mode');
}

function turnOff() {
    lamp.src = 'images/lampada-off.png';
    document.body.classList.add('dark-mode');
}

lamp.addEventListener('click', () => {
    isLampOn() ? turnOff() : turnOn();
});
