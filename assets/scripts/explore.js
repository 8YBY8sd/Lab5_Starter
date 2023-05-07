// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  //Loaded and populate the “Select Voice” dropdown
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById("voice-select");

  let voices = [];
  // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event
  synth.onvoiceschanged = () => {

    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.value = i;
      voiceSelect.appendChild(option);
    }

  }


  // // Get text and Speak
  const input = document.getElementById("text-to-speak");
  const speakBu = document.querySelector("button");
  const faceImg = document.querySelector("img");


  // // input.addEventListener("input", inputText);
  // let speaking = false;
  // function speak (tt) {
  //   if (tt != "") {

  //     speaking = true;
  //     const utterThis = new SpeechSynthesisUtterance(tt);

  //     const selectedVoice = voices[voiceSelect.value];
  //     utterThis.voice = selectedVoice;
  //     synth.speak(utterThis);
  //   }
  // }

  speakBu.addEventListener("click", () => {
    
    const utterThis = new SpeechSynthesisUtterance(input.value);
    const selectedVoice = voices[voiceSelect.value];
    utterThis.voice = selectedVoice;

    // Only while the synthesizer is speaking, the face should swap to being open mouthed
    /// onstart https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/start_event
    utterThis.onstart = () => {
      faceImg.src = "assets/images/smiling-open.png"
    }

    utterThis.onend = () => {
      faceImg.src = "assets/images/smiling.png"
    }

    synth.speak(utterThis);
  });

}