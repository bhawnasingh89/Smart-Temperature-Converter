// Selecting elements
const  tempInput = document.querySelector("#tempInput");
const  speakBtn =  document.querySelector(".speakBtn");
const presetBtns = document.querySelectorAll(".presetBtn");
const slider = document.querySelector("#slider");
const thermometer = document.querySelector(".thermometer");
const thermobar = document.querySelector("#thermobar");
const result = document.querySelector("#result");
const suggestion = document.querySelector("#suggestion");
const themeToggle = document.querySelector("#themeToggle");

// Suggestions based on temperature
function giveSuggestion(tempC) {
    if(tempC <= 0) return "It's freezing";
    if(tempC >= 100) return "Boiling Hot";
    if(tempC >=20 && tempC <= 25) return "IComfortable room temperature";
    return "Stay safe and hydrated!";
}

// Function to convert temperature

function convertTemp(input) {
    const value = parseFloat(input);
    const isF = input.toLowerCase().includes("f");
    const isC = input.toLowerCase().includes("c");


if(!(value)){
    result.textContent = "Please enter a valid number";
    suggestion.textContent = "";
    return;
}
if(isF){
    const c = ((value-32) *5)/9;
    result.textContent = `${value}F = ${c.toFixed(2)}C`;
    suggestion.textContent =   giveSuggestion(c) ;
    updateThermometer(c);
} else if(isC) {
    const f = (value * 9)/ 5 + 32;
     result.textContent = `${value}C = ${f.toFixed(2)}F`;
    suggestion.textContent =  giveSuggestion(value) ;
    updateThermometer(value);
}else{
    result.textContent = "Please include unit (e.g, 32 C or 86 F";
    suggestion.textContent = "";
}

}
// Updated thermometer bar

function updateThermometer(tempC){
    const percent = Math.min(Math.max((tempC + 50),0),100);
    thermobar.style.width = percent + "%"; 
}

//Handle slider movement 

slider.addEventListener("input",()=>{
    const c = parseInt(slider.value);
    tempInput.value = `${c}C`;
    convertTemp(tempInput.value);
});

// Preset Buttons

presetBtns.forEach((btn) =>{
    btn.addEventListener("click", () =>{
        const label = btn.textContent.trim().toLowerCase();
        if(label.includes("freezing")) tempInput.value = "0 C";
        else if(label.includes("boiling")) tempInput.value = "100 C";
        else if(label.includes("room")) tempInput.value = "22 C";
        convertTemp(tempInput.value);
    });
});

// Voice Input button


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please use Chrome.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    speakBtn.addEventListener("click" ,()=>{
    recognition.start();
    });

    recognition.onresult = (event) =>{
        const spoken = event.results[0][0].transcript;
        tempInput.value = spoken;
        convertTemp(spoken);
         };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("Speech recognition failed: " + event.error);
    };
};


// Manual Input

tempInput.addEventListener("change",() =>{
    convertTemp(tempInput.value);
});

// Dark Mode Toggle
themeToggle.addEventListener("change",()=>{
    document.body.classList.toggle("dark-mode");
});
