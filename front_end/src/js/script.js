// --- Configuration ---
let playerName = localStorage.getItem("playerName") || "";
let answers = JSON.parse(localStorage.getItem("answers")) || {};
const TYPING_DELAY = 1.3; 
let classData = {}; // Will be fetched from backend

const answerMapping = {
  q1:{A:{1:5,4:2,6:2},B:{2:3,4:2,1:2},C:{6:5,1:2,3:2},D:{7:3,5:3,1:1}},
  q2:{A:{2:5,4:2,5:3},B:{7:2,2:2,5:2},C:{3:5,2:2,6:2},D:{4:5,2:2,1:2}},
  q3:{A:{3:5,4:2,2:2},B:{1:5,3:2,6:2},C:{2:5,3:2,7:2},D:{6:5,3:2,1:2}},
  q4:{A:{4:5,1:2,2:2},B:{2:2,4:2,3:2},C:{6:5,4:2,1:2},D:{7:5,4:2,5:3}},
  q5:{A:{5:5,7:3,1:2},B:{1:5,5:3,6:2},C:{2:5,5:3,4:2},D:{3:5,5:3,6:2}},
  q6:{A:{6:5,1:2,3:2},B:{1:5,6:3,4:2},C:{2:5,6:3,4:2},D:{7:5,6:2,5:2}},
  q7:{A:{7:5,5:3,4:2},B:{1:5,7:2,6:2},C:{2:5,7:2,4:2},D:{3:5,7:2,2:2}}
};

const archetypeExposure = {1:13, 2:13, 3:12, 4:12, 5:12, 6:12, 7:12};

// --- Utility Functions ---
function updateProgress() {
    const countedAnswers = Object.keys(answers).filter(key => key.startsWith('q') && key.length === 2).length; 
    document.querySelectorAll('.crystal').forEach(crystal => {
        const qNum = parseInt(crystal.getAttribute('data-q'));
        if (qNum <= countedAnswers) {
            crystal.classList.add('filled');
        } else {
            crystal.classList.remove('filled');
        }
    });
}

function handleValidationError(elementId, message) {
    console.warn(`[VALIDATION FAILED] Screen: ${elementId}. Error: ${message.replace(/\*/g, '')}`);
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('validation-error');
        setTimeout(() => element.classList.remove('validation-error'), 500);
    }
    const msgBox = document.getElementById('messageBox');
    msgBox.innerText = message || "*SELECT AN OPTION TO PROCEED!*";
    msgBox.style.display = 'block';
    setTimeout(() => msgBox.style.display = 'none', 2000); 
}

// --- Authentication Page Logic ---
function startQuiz() {
    const nameInput = document.getElementById("playerName");
    const rawInput = nameInput.value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!rawInput) {
        handleValidationError("name-panel", "*THOU MUST ENGRAVE A NAME TO BEGIN THE QUEST!*");
        return;
    }

    if (!nameRegex.test(rawInput)) {
        handleValidationError("name-panel", "*ONLY LETTERS MAY BE INSCRIBED UPON THE SCROLL!*");
        return;
    }

    playerName = rawInput.substring(0, 20).toUpperCase();
    localStorage.setItem("playerName", playerName);
    localStorage.removeItem("answers");
    window.location.href = "../pages/questions.html";
}

// --- Questions Page Logic ---
function nextQuestion(currentId, nextId, inputName) {
    let input = document.getElementsByName(inputName);
    let checkedInput = [...input].find(i => i.checked);
    const panelId = inputName + '-panel';

    if (!checkedInput) {
        handleValidationError(panelId, "*CHOOSE WISELY, OR THE PATH AHEAD WILL NOT OPEN!*");
        return;
    }

    answers[inputName] = checkedInput.value;
    localStorage.setItem("answers", JSON.stringify(answers));
    
    [...input].forEach(i => i.nextElementSibling.setAttribute('aria-checked', i.checked.toString()));
    document.getElementById(currentId).classList.remove("active");
    document.getElementById(nextId).classList.add("active");
    updateProgress();
    
    setTimeout(() => {
        const firstOption = document.querySelector(`#${nextId} .option-container input[type="radio"]`);
        if (firstOption) firstOption.focus();
    }, 400);
}

async function submitQuiz() {
    const q7Input = document.getElementsByName("q7");
    const checkedQ7 = [...q7Input].find(i => i.checked);

    if (!checkedQ7) {
        handleValidationError("q7-panel", "*ANSWER THE FINAL QUESTION TO SEAL YOUR DESTINY!*");
        return;
    }

    answers["q7"] = checkedQ7.value.toString();
    localStorage.setItem("answers", JSON.stringify(answers));

    // --- calculate result first ---
    let tally = {1:0,2:0,3:0,4:0,5:0,6:0,7:0};
    for (const q in answers) {
        const letter = answers[q];
        if(answerMapping[q] && answerMapping[q][letter]) {
            const weights = answerMapping[q][letter];
            for (const id in weights) tally[id] += weights[id];
        }
    }

    for (const id in tally) tally[id] /= archetypeExposure[id];

    let max = -Infinity, finalId = 1;
    for (const [id, val] of Object.entries(tally)) {
        if (val > max) { max = val; finalId = Number(id); }
    }

    // --- prepare payload ---
    const payload = {
        playerName: playerName, // must match Pydantic
        answers: answers,       // object, not JSON string
        archetype_id: finalId   // integer
    };

    console.log("Submitting payload:", payload); // ✅ debug

    try {
        await axios.post("http://127.0.0.1:8000/results", payload, {
            headers: { "Content-Type": "application/json" }
        });
        window.location.href = "../pages/results.html";
    } catch (err) {
        console.error("Error submitting results:", err.response?.data || err);
        alert("Error submitting results. Check console for details.");
    }
}


// --- Backend Fetch ---
async function fetchArchetypes() {
    try {
        const res = await axios.get('http://localhost:8000/archetypes');
        res.data.forEach(arch => {
            classData[arch.id] = {
                flavor: `
                    <h2 class="archetype-title">${arch.name}</h2>
                    <p class="subtitle">${arch.subtitle}</p>
                    <p class="ds-meta"><strong>Data Science Archetype:</strong> ${arch.ds_archetype}</p>
                    <p class="desc">${arch.desc}</p>
                    <p class="vibe"><strong>Mythic Vibe:</strong> ${arch.vibe}</p>
                    <p class="traits"><strong>Core Skills:</strong> ${arch.traits}</p>
                    <div class="target-audience">
                        <strong>Perfect for those who:</strong>
                        <ul>${arch.target_audience.split(';').map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>`,
                imagePath: arch.image_path,
                color: arch.color,
                bgStyle: arch.bg_style
            };
        });
    } catch(err) {
        console.error("Failed to fetch archetypes", err);
    }
}

// --- Results Page Logic ---
async function initResultPage() {
    if(!document.getElementById('page-results')) return;
    if (!answers || Object.keys(answers).length === 0) {
        window.location.href = "../pages/authentication.html";
        return;
    }

    await fetchArchetypes(); // ensure classData is ready
    await calculateResult();
}

async function calculateResult() {
    console.log('=== CALCULATING RESULT ===');
    let tally = {1:0,2:0,3:0,4:0,5:0,6:0,7:0};
    
    for (const q in answers) {
        const letter = answers[q];
        if(answerMapping[q] && answerMapping[q][letter]) {
            const weights = answerMapping[q][letter];
            for (const id in weights) tally[id] += weights[id];
        }
    }

    for (const id in tally) tally[id] /= archetypeExposure[id];

    let max = -Infinity, finalId = 1;
    for (const [id, val] of Object.entries(tally)) {
        if (val > max) { max = val; finalId = Number(id); }
    }

    const resultInfo = classData[finalId];
    if (!resultInfo) return;

    // --- Visual Feedback ---
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.style.boxShadow = `0 0 0 4px ${resultInfo.color}, 4px 4px 0 var(--pixel-border-thick) ${resultInfo.color}`;

    const finalClassNameElement = document.getElementById("finalClassName");
    finalClassNameElement.innerText = `Behold thy fate, ${playerName}!`;
    finalClassNameElement.style.color = resultInfo.color;
    finalClassNameElement.style.overflow = 'hidden';

    const isMobile = window.innerWidth <= 600;
    if (isMobile) {
        finalClassNameElement.style.whiteSpace = 'normal'; 
        finalClassNameElement.style.animation = 'fadeIn 1s forwards'; 
    } else {
        finalClassNameElement.style.whiteSpace = 'nowrap';
        finalClassNameElement.style.animation = `typing ${TYPING_DELAY}s steps(30, end), blink-caret 2s step-end infinite`;
    }

    const resultFlavorTextElement = document.getElementById("resultFlavorText");
    resultFlavorTextElement.innerHTML = resultInfo.flavor;
    resultFlavorTextElement.style.opacity = 0;
    resultFlavorTextElement.style.animation = `fadeIn 1s forwards ${TYPING_DELAY + 0.2}s`;

    const resultImageContainer = document.getElementById("finalClassImage");
    resultImageContainer.style.backgroundImage = `url('${resultInfo.imagePath}')`;
    resultImageContainer.style.backgroundColor = `transparent`;
    resultImageContainer.style.border = `4px solid ${resultInfo.color}`;
    resultImageContainer.style.opacity = 0;
    resultImageContainer.style.animation = `fadeIn 1.5s forwards ${TYPING_DELAY + 0.2}s`;


}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('page-auth')) {
        document.getElementById('playerName').focus();
    } else if(document.getElementById('page-questions')) {
        updateProgress();
    } else if(document.getElementById('page-results')) {
        initResultPage();
    }
});

// Keyboard navigation for questions
document.addEventListener('keydown', (e) => {
    const currentScreen = document.querySelector('.screen.active');
    if (!currentScreen) return; 

    const currentOptions = Array.from(currentScreen.querySelectorAll('input[type="radio"]'));
    
    if (e.key === 'Enter') {
        if (document.activeElement.tagName === 'BUTTON') {
            e.preventDefault(); 
            document.activeElement.click(); 
            return;
        }
        
        if (document.getElementById('page-auth') && document.activeElement.id === 'playerName') {
             e.preventDefault();
             currentScreen.querySelector('button').click();
             return;
        }
        
        if (currentOptions.length > 0 && document.activeElement.type === 'radio') {
            e.preventDefault();
            document.activeElement.checked = true;
            currentScreen.querySelector('button').click();
            return;
        }
    }
    
    if (currentOptions.length === 0) return;

    let currentIndex = currentOptions.findIndex(o => document.activeElement === o);
    if (currentIndex === -1) currentIndex = 0; 
    let nextIndex = currentIndex;

    if (e.key === 'ArrowDown' || e.key === 's') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % currentOptions.length;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + currentOptions.length) % currentOptions.length;
    }

    if (nextIndex !== currentIndex) {
        currentOptions[nextIndex].focus();
        currentOptions.forEach((opt, index) => {
            opt.nextElementSibling.setAttribute('aria-checked', (index === nextIndex).toString());
        });
    }
});
