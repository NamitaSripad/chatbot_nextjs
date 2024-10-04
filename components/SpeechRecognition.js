// components/SpeechRecognition.js
import { useState, useEffect } from 'react';
import styles from '../styles/SpeechRecognition.module.css';  // Import custom CSS module

const SpeechRecognitionComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech Recognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interimTranscript += event.results[i][0].transcript;
      }
      setTranscript(interimTranscript);
    };

    recognition.onerror = (event) => {
      setError('Error occurred in speech recognition: ' + event.error);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start();
      }
    };

    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.abort();
    };
  }, [isRecording]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Speech to Text</h1>
      {error && <p className={styles.error}>{error}</p>}
      <button
        className={isRecording ? styles.recordingButton : styles.defaultButton}
        onClick={() => setIsRecording(!isRecording)}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}>Recorded Speech:</h2>
        <p className={styles.transcript}>{transcript || 'No speech recorded yet.'}</p>
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
