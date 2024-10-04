import Head from 'next/head';
import SpeechRecognitionComponent from '../components/SpeechRecognition';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Speech to Text</title>
        <meta name="description" content="Convert speech to text" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SpeechRecognitionComponent />
      </main>
    </div>
  );
}
