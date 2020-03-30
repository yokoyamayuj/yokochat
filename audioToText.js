

const startBtn = document.querySelector('#start-text');
const stopBtn = document.querySelector('#stop-text');
const onTranscription = document.querySelector('#onTranscription');

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
// recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = ''; 

recognition.onresult = (event) => {
  let interimTranscript = ''; 
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;

      $('#messages').append($('<li>').text(finalTranscript));
      let message = { type: 'audioText', message: finalTranscript };

      socket.emit('audioText', message);
      finalTranscript='';

    } 
    // TODO :　いい感じに見せたい
    // else {
    //   onTranscription.innerHTML =  '<i style="color:#ddd;">' + transcript + '</i>';
    // onTranscription.innerHTML =   transcript ;
    // }
  }


}

startBtn.onclick = () => {
  recognition.start();
}
stopBtn.onclick = () => {
  recognition.stop();
}
