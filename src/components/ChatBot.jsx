import { useEffect, useState } from "react";
import postChat from "../apis/eliceChat";

const ChatBot = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const [tts, setTts] = useState();

  useEffect(() => {
    if (tts != undefined) {
      tts.rate = 2;
      tts.pitch = 0.5;
      window.speechSynthesis.speak(tts);
    }
  }, [tts]);
  return (
    <>
      챗임
      <br />
      <input
        type="text"
        onChange={e => {
          setText(e.target.value);
          // console.log(text);
        }}
      />
      <button
        onClick={async e => {
          const response = await postChat(text);
          // console.log(response.data)
          setResult(response.data?.choices[0]?.message?.content);

          setTts(new SpeechSynthesisUtterance(response.data?.choices[0]?.message?.content));
        }}
      >
        보내기
      </button>
      <div>
        <span>{result}</span>
      </div>
      {tts && (
        <>
          <button
            onClick={e => {
              // console.log(window.speechSynthesis.getVoices()[12]);
              tts.rate = 2;
              tts.pitch = 0.5;
              // tts.voice = window.speechSynthesis.getVoices()[12];
              window.speechSynthesis.speak(tts);
            }}
          >
            재생
          </button>
          <button onClick={(e)=>{
            window.speechSynthesis.cancel();
          }}>멈춤</button>
        </>
      )}
    </>
  );
};

export default ChatBot;
