const scenarios = [
    { 
        p: "The town street is dirty. Who can fix it?", 
        options: ["Sweeper", "Hammer", "Map"], 
        correct: "Sweeper",
        img: "assets/dirty-street.png"
    },
    { 
        p: "We are lost and need to find the library. What do we need?", 
        options: ["Map", "Broom", "Firefighter"], 
        correct: "Map",
        img: "assets/lost-map.png"
    },
    { 
        p: "Sandy's magic wand is broken. What is a good tool to fix it?", 
        options: ["Glue", "Phone", "Map"], 
        correct: "Glue",
        img: "assets/broken-wand.png"
    },
    { 
        p: "There is a fire! Who can help?", 
        options: ["Firefighter", "Computer", "Pen"], 
        correct: "Firefighter",
        img: "assets/fire.png"
    },
    { 
        p: "They want to talk to each other but are far away. What is a good tool?", 
        options: ["Phone", "Hammer", "Sweeper"], 
        correct: "Phone",
        img: "assets/phone.png"
    }
];

let current = 0;
let score = 0;
let firstTry = true; // Tracks if they get it right on the first click

const probText = document.getElementById('problem-text');
const choicesDiv = document.getElementById('choices');
const feedDiv = document.getElementById('feedback');
const sceneImg = document.getElementById('scene-img');

function loadScenario() {
    firstTry = true; // Reset for the new question
    let s = scenarios[current];
    
    probText.innerText = s.p;
    sceneImg.src = s.img; 
    choicesDiv.innerHTML = '';
    
    let shuffledOptions = [...s.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = opt;
        btn.onclick = () => check(opt, btn);
        choicesDiv.appendChild(btn);
    });
}

function check(choice, btnElement) {
    if (choice === scenarios[current].correct) {
        feedDiv.style.color = "green";
        feedDiv.innerText = "It worked!";
        
        // Award a point only if they didn't make a mistake first
        if (firstTry) {
            score++;
        }

        // Lock all buttons to prevent double-clicking during the transition
        Array.from(choicesDiv.children).forEach(b => b.disabled = true);

        setTimeout(() => {
            current++;
            feedDiv.innerText = "";
            
            // Check if the game is over
            if (current < scenarios.length) {
                loadScenario();
            } else {
                showScore();
            }
        }, 1500);
    } else {
        firstTry = false; // They missed the perfect score for this question
        btnElement.disabled = true; // Disable the wrong button so they can't click it again
        btnElement.style.opacity = "0.5";
        feedDiv.style.color = "red";
        feedDiv.innerText = "Not quite, try another!";
    }
}

function showScore() {
    probText.innerText = "Mission Complete!";
    choicesDiv.innerHTML = ''; // Clears the answer buttons
    
    // 1. Display the appropriate victory or score screen
    if (score === scenarios.length) {
        sceneImg.src = "assets/sandy-jump.png";
        feedDiv.style.color = "green";
        feedDiv.innerHTML = "<h1>100% Perfect!</h1>";
    } else {
        feedDiv.style.color = "#333";
        feedDiv.innerHTML = `<h1>Score: ${score} / ${scenarios.length}</h1>`;
    }

    // 2. Dynamically create the Replay Button
    let replayBtn = document.createElement('button');
    replayBtn.className = 'btn';
    replayBtn.style.marginTop = "20px";
    replayBtn.style.background = "#FFD700"; // Slick Time Yellow
    replayBtn.style.color = "#333";
    replayBtn.innerText = "Play Again";
    replayBtn.onclick = resetGame;
    
    // 3. Add the button to the screen
    choicesDiv.appendChild(replayBtn);
}

// 4. Reset variables and restart the game loop
function resetGame() {
    current = 0;
    score = 0;
    feedDiv.innerHTML = ""; // Clear the score text/graphics
    loadScenario();
}
loadScenario();