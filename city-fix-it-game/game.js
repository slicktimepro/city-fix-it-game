const scenarios = [
    { 
        p: "The town street is dirty. Who can fix it?", 
        options: ["Builder", "Hammer", "Map"], 
        correct: "Builder" 
    },
    { 
        p: "We are lost and need to find the station. What do we need?", 
        options: ["Map", "Hammer", "Fighter"], 
        correct: "Map" 
    },
    { 
        p: "Sandy's magic wand is broken. What is a good tool to fix it?", 
        options: ["Hammer", "Phone", "Map"], 
        correct: "Hammer" 
    },
    { 
        p: "There is a fire at the station! Who can help?", 
        options: ["Fighter", "Computer", "Pen"], 
        correct: "Fighter" 
    },
    { 
        p: "They want to talk to each other but are far away. What is a good tool?", 
        options: ["Phone", "Hammer", "Builder"], 
        correct: "Phone" 
    }
];

let current = 0;
const probText = document.getElementById('problem-text');
const choicesDiv = document.getElementById('choices');
const feedDiv = document.getElementById('feedback');

function loadScenario() {
    let s = scenarios[current];
    probText.innerText = s.p;
    choicesDiv.innerHTML = '';
    s.options.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = opt;
        btn.onclick = () => check(opt);
        choicesDiv.appendChild(btn);
    });
}

function check(choice) {
    if (choice === scenarios[current].correct) {
        feedDiv.style.color = "green";
        feedDiv.innerText = "It worked!";
        setTimeout(() => {
            current = (current + 1) % scenarios.length;
            feedDiv.innerText = "";
            loadScenario();
        }, 1500);
    } else {
        feedDiv.style.color = "red";
        feedDiv.innerText = "Not quite, try another!";
    }
}

// Start the game
loadScenario();