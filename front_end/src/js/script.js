// --- Configuration ---
let playerName = localStorage.getItem("playerName") || "";
let answers = JSON.parse(localStorage.getItem("answers")) || {};
const TYPING_DELAY = 1.3; 

const classData = {
    1: { // Tagapaghinuha
        flavor: `
        <h2 class="archetype-title">Tagapaghinuha</h2>
        <p class="subtitle">The One Who Deduces / The Seer</p>
        <p class="ds-meta"><strong> Data Science Archetype:</strong> Analyst</p>
        <p class="desc">From hinuha (to infer or deduce).The Tagapaghinuha sees meaning where others see noise. They connect scattered data into insight—much like a seer reading signs in the stars or a Wakandan strategist reading vibranium readings.</p>
        <p class="vibe"><strong>Mythic Vibe:</strong> A modern babaylan of numbers—quiet, observant, deadly accurate.</p>
        <p class="traits"><strong>Core Skills:</strong> Critical thinking, logic, pattern recognition, inference.</p>
        <div class="target-audience">
            <strong>Perfect for those who:</strong>
            <ul>
                <li>Enjoy puzzles and logic</li>
                <li>Like finding “hidden meaning” in data</li>
                <li>Prefer thinking before acting</li>
            </ul>
        </div>`,
        imagePath: "../assets/tagapaghinuha.png",
        color: "#3E8EBA",
        bgStyle: "radial-gradient(circle, rgba(62,142,186,0.6) 0%, rgba(34,46,35,0) 70%)"
    },
    2: { // Tagapagsalaysay
        flavor: `
        <h2 class="archetype-title">Tagapagsalaysay</h2>
        <p class="subtitle">The Story-Carrier / The Messenger</p>
        <p class="ds-meta"><strong>Data Science Archetype:</strong> Visualization Expert</p>
        <p class="desc">From salaysay (to narrate). This archetype transforms raw data into stories that move people—policy makers, communities, or entire nations. In a Wakandan sense, they are the ones who translate science into collective vision.</p>
        <p class="vibe"><strong>Mythic Vibe:</strong> A techno-makata (poet) who speaks in graphs, colors, and meaning.</p>
        <p class="traits"><strong>Core Skills:</strong> Storytelling, visualization, communication</p>
        <div class="target-audience">
            <strong>Perfect for those who:</strong>
            <ul>
                <li>Love explaining "the why" behind things</li>
                <li>Enjoy design, writing, or presenting</li>
                <li>Believe data should feel human</li>
            </ul>
        </div>`,
        imagePath: "../assets/tagapagsalaysay.png",
        color: "#C45A29",
        bgStyle: "radial-gradient(circle, rgba(196,90,41,0.6) 0%, rgba(34,46,35,0) 70%)"
    },
    3: { // Tagapangalaga
        flavor: `
        <h2 class="archetype-title">Tagapangalaga</h2>
        <p class="subtitle">The Guardian / The Steward</p>
        <p class="ds-meta"><strong>Data Science Archetype:</strong> Ethical Analyst</p>
        <p class="desc">From alaga (to care for). The Tagapangalaga ensures data is used ethically, accurately, and with respect for people. In a Filipino context, this aligns with kapwa—shared humanity.</p>
        <p class="vibe"><strong>Mythic Vibe:</strong> A Wakandan-style protector of sacred knowledge—data is power, and power must be guarded.</p>
        <p class="traits"><strong>Core Skills:</strong> Integrity, responsibility, fairness, risk awareness</p>
        <div class="target-audience">
            <strong>Perfect for those who:</strong>
            <ul>
                <li>VCare about fairness and ethics</li>
                <li>Are cautious and detail-oriented</li>
                <li>Think about the impact of technology</li>
            </ul>
        </div>`,
        imagePath: "../assets/tagapangalaga.png",
        color: "#4E7C52",
        bgStyle: "radial-gradient(circle, rgba(78,124,82,0.6) 0%, rgba(34,46,35,0) 70%)"
    },
    4: { // Tagapag-ugnay
        flavor: `
        <h2 class="archetype-title">Tagapag-ugnay</h2>
        <p class="subtitle">The Connector / The Weaver</p>
        <p class="ds-meta"><strong>Data Science Archetype:</strong> Integrator</p>
        <p class="desc">From ugnay (to connect). This archetype bridges people, datasets, and disciplines—tech, society, culture. They understand that data science doesn’t exist in isolation.</p>
        <p class="vibe"><strong>Mythic Vibe:</strong> A diplomatic engineer—like Wakandan liaisons who unite tribes through shared intelligence.</p>
        <p class="traits"><strong>Core Skills:</strong>Collaboration, systems thinking, interdisciplinary work</p>
        <div class="target-audience">
            <strong>Perfect for those who:</strong>
            <ul>
                <li>Work well in teams</li>
                <li>Enjoy seeing the “big picture”</li>
                <li>Love combining ideas from different fields</li>
            </ul>
        </div>`,
        imagePath: "../assets/tagapag-ugnay.png",
        color: "#d64270",
        bgStyle: "radial-gradient(circle, rgba(214,66,112,0.6) 0%, rgba(34,46,35,0) 70%)"
    },
    5: { // Tagapagsubok
        flavor: `
        <h2 class="archetype-title">Tagapagsubok</h2>
        <p class="subtitle">The Experimenter / The Alchemist</p>
        <p class="ds-meta"><strong>Data Science Archetype:</strong> Model Builder</p>
        <p class="desc"> From subok (to test or experiment). The Tagapagsubok isn’t afraid to fail. They tweak models, test assumptions, and push boundaries—very Wakandan R&D energy.</p>
        <p class="vibe"><strong>Mythic Vibe:</strong> A fearless innovator playing with future-tech and probabilities.</p>
        <p class="traits"><strong>Core Skills:</strong> Curiosity, experimentation, iteration, hypothesis testing</p>
        <div class="target-audience">
            <strong>Perfect for those who:</strong>
            <ul>
                <li>Love trying new approaches</li>
                <li>Aren’t afraid of mistakes</li>
                <li>Enjoy “what if?” questions</li>
            </ul>
        </div>`,
        imagePath: "../assets/tagapagsubok.png",
        color: "#A52A2A",
        bgStyle: "radial-gradient(circle, rgba(165,42,42,0.6) 0%, rgba(34,46,35,0) 70%)"
    },
    6: { // Tagapagmasid
        flavor: `
        <h2 class="archetype-title">Tagapagmasid</h2>
        <p class="subtitle">The Watcher / The Sentinel</p>
        <p class="ds-meta"><strong>Data Science Archetype:</strong> Data Explorer</p>
        <p class="desc"> From masid (to observe closely). This archetype believes understanding comes before action. They sit with the data, question it, and notice anomalies others miss.</p>
        <p class="vibe"><strong>Mythic Vibe:</strong> A sentinel of truth—watching streams of information like a guardian watching the horizon.</p>
        <p class="traits"><strong>Core Skills:</strong> Observation, patience, data cleaning, exploration</p>
        <div class="target-audience">
            <strong>Perfect for those who:</strong>
            <ul>
                <li>Are detail-oriented</li>
                <li>Enjoy research and exploration</li>
                <li>Prefer depth over speed</li>
            </ul>
        </div>`,
        imagePath: "../assets/tagapagmasid.png",
        color: "#6A5ACD",
        bgStyle: "radial-gradient(circle, rgba(106,90,205,0.6) 0%, rgba(34,46,35,0) 70%)"
    },
    7: { // Tagapaglikha
        flavor: `
        <h2 class="archetype-title">Tagapaglikha</h2>
        <p class="subtitle">The Creator / The Architect</p>
        <p class="ds-meta"><strong>Data Science Archetype:</strong> Innovator</p>
        <p class="desc">From likha (to create). This archetype turns insight into action—apps, systems, solutions. They build things that exist in the world. Like Wakandan engineers, they blend creativity with cutting-edge tech.</p>
        <p class="vibe"><strong>Mythic Vibe:</strong> A Wakandan technosmith—where code meets culture.</p>
        <p class="traits"><strong>Core Skills:</strong> Creativity, problem-solving, applied thinking</p>
        <div class="target-audience">
            <strong>Perfect for those who:</strong>
            <ul>
                <li>Want to build real-world solutions</li>
                <li>Like applying theory into practice</li>
                <li>Are creatively technical</li>
            </ul>
        </div>`,
        imagePath: "../assets/tagapaglikha.png",
        color: "#D6A639",
        bgStyle: "radial-gradient(circle, rgba(214,166,57,0.6) 0%, rgba(34,46,35,0) 70%)"
    }
};

// --- Weighted Answer Mapping ---
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

// --- Page Logic ---

// 1. Authentication Page Logic
function startQuiz() {
    const nameInput = document.getElementById("playerName");
    const input = nameInput.value.trim();
    
    if (!input) {
        handleValidationError("name-panel", "*THOU MUST ENGRAVE A NAME TO BEGIN THE QUEST!*");
        return;
    }
    
    playerName = input.substring(0, 20).toUpperCase();
    localStorage.setItem("playerName", playerName);
    localStorage.removeItem("answers"); // Clear old answers
    
    window.location.href = "../pages/questions.html"; // Redirect to Questions Page
}

// 2. Questions Page Logic
function nextQuestion(currentId, nextId, inputName) {
    let val;
    let isValid = false;
    let input = document.getElementsByName(inputName);
    let checkedInput = [...input].find(i => i.checked);
    const panelId = inputName + '-panel';

    if (checkedInput) {
        val = checkedInput.value;
        isValid = true;
    }
    
    if (!isValid) {
        handleValidationError(panelId, "*CHOOSE WISELY, OR THE PATH AHEAD WILL NOT OPEN!*");
        return;
    }
    
    // Save to local variable AND storage
    answers[inputName] = val;
    localStorage.setItem("answers", JSON.stringify(answers));
    
    // UI Updates
    [...input].forEach(i => i.nextElementSibling.setAttribute('aria-checked', i.checked.toString()));
    document.getElementById(currentId).classList.remove("active");
    document.getElementById(nextId).classList.add("active");
    updateProgress();
    
    // Focus next option
    setTimeout(() => {
        const firstOption = document.querySelector(`#${nextId} .option-container input[type="radio"]`);
        if (firstOption) firstOption.focus();
    }, 400);
}

function submitQuiz() {
    let q7Input = document.getElementsByName("q7");
    let checkedQ7 = [...q7Input].find(i => i.checked);
    
    if (!checkedQ7) {
        handleValidationError("q7-panel", "*ANSWER THE FINAL QUESTION TO SEAL YOUR DESTINY!*");
        return;
    }
    
    answers["q7"] = checkedQ7.value;
    localStorage.setItem("answers", JSON.stringify(answers));

    window.location.href = "../pages/results.html"; // Redirect to Results Page
}

// 3. Results Page Logic
function initResultPage() {
    if(!document.getElementById('page-results')) return;

    // Check if data exists
    if (!answers || Object.keys(answers).length === 0) {
        // If no answers, redirect back to start
        window.location.href = "../pages/authentication.html";
        return;
    }

    calculateResult();
}

function calculateResult() {
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

    // Thematic visual feedback
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.style.boxShadow = `0 0 0 4px ${resultInfo.color}, 4px 4px 0 var(--pixel-border-thick) ${resultInfo.color}`;

    // Result Text
    const finalClassNameElement = document.getElementById("finalClassName");
    finalClassNameElement.innerText = `Behold thy fate, ${playerName}!`;
    finalClassNameElement.style.color = resultInfo.color;
    finalClassNameElement.style.overflow = 'hidden';

    // Animation Logic
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
    // Determine which page we are on
    if(document.getElementById('page-auth')) {
        document.getElementById('playerName').focus();
    } else if(document.getElementById('page-questions')) {
        updateProgress();
    } else if(document.getElementById('page-results')) {
        initResultPage();
    }
});

// Generic Keydown for Questions (only active on Questions page)
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