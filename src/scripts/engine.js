const state = {
    view: {
        window: document.querySelectorAll(".window"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions: {
        timerId: setInterval(randomWindow, 900),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.curretTime--;
    state.view.time.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result + "! Aperte F5 para recomeçar!");
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomWindow() {
    state.view.window.forEach((window) => {
        window.classList.remove("enemy-visible");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomWindow = state.view.window[randomNumber];
    randomWindow.classList.add("enemy-visible");
    state.values.hitPosition = randomWindow.id;
}

function addListenerHitBox() {
    state.view.window.forEach((window) => {
        window.addEventListener("mousedown", () => {
            if (window.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function initialize() {
    alert("Aperte Ok para começar o jogo!");
    addListenerHitBox();
}

initialize();