import { useCallback } from 'react';
import { LanguageProvider, useLang } from '@/context/LanguageContext';
import { useSpeechSynthesis } from '@/hooks/useSpeech';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import EligibilityChecker from '@/components/EligibilityChecker';
import DocumentChecklist from '@/components/DocumentChecklist';
import Roadmap from '@/components/Roadmap';
import Assistant from '@/components/Assistant';
import Helpline from '@/components/Helpline';
import Footer from '@/components/Footer';
import VoiceFAB from '@/components/VoiceFAB';

function AppContent() {
  const { lang, t } = useLang();
  const { speak, stop, speaking } = useSpeechSynthesis();

  const handleSpeak = useCallback(
    (text: string) => {
      if (!text) {
        stop();
        return;
      }
      speak(text, lang);
    },
    [speak, stop, lang]
  );

  const scrollToEligibility = () => {
    document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOverview = () => {
    document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Bidirectional voice loop: STT transcript → resolve answer → TTS speaks it back
  const handleVoiceInput = (transcript: string) => {
    const el = document.getElementById('assistant');
    el?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const input = el?.querySelector('input') as HTMLInputElement;
      if (input) {
        input.value = transcript;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero
          onCheckEligibility={scrollToEligibility}
          onLearnMore={scrollToOverview}
          onSpeak={handleSpeak}
          onStopSpeak={stop}
          speaking={speaking}
        />
        <Overview onSpeak={handleSpeak} />
        <EligibilityChecker onSpeak={handleSpeak} />
        <DocumentChecklist onSpeak={handleSpeak} />
        <Roadmap onSpeak={handleSpeak} />
        <Assistant onSpeak={handleSpeak} speaking={speaking} onStopSpeak={stop} />
        <Helpline />
      </main>
      <Footer />
      <VoiceFAB onSpeak={handleSpeak} onVoiceInput={handleVoiceInput} speaking={speaking} onStopSpeak={stop} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
