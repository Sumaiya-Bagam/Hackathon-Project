import { Mic, MicOff, X, AudioLines } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useSpeechRecognition } from '@/hooks/useSpeech';

interface VoiceFABProps {
  onSpeak: (text: string) => void;
  onVoiceInput: (transcript: string) => void;
  speaking: boolean;
  onStopSpeak: () => void;
}

export default function VoiceFAB({ onSpeak, onVoiceInput, speaking, onStopSpeak }: VoiceFABProps) {
  const { lang, t } = useLang();
  const { start, stop, listening, supported } = useSpeechRecognition(lang);

  const handleTap = () => {
    if (listening) {
      stop();
      return;
    }
    if (speaking) {
      onStopSpeak();
    }
    start((transcript) => {
      onVoiceInput(transcript);
    });
  };

  if (!supported) return null;

  const active = listening || speaking;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
      {(listening || speaking) && (
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg animate-fade-in ${
          listening ? 'bg-rose-600' : 'bg-emerald-600'
        }`}>
          <span className="flex items-end gap-0.5 h-4">
            <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '40%', animationDelay: '0ms' }} />
            <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '80%', animationDelay: '100ms' }} />
            <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '60%', animationDelay: '200ms' }} />
            <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '90%', animationDelay: '300ms' }} />
            <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '50%', animationDelay: '400ms' }} />
          </span>
          {listening ? t.voiceListening : t.readAloud}
          <button
            onClick={() => (listening ? stop() : onStopSpeak())}
            className="ml-1"
            aria-label="Stop"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <button
        onClick={handleTap}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
          active
            ? listening
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-emerald-600 text-white'
            : 'bg-gradient-to-br from-rose-500 to-rose-600 text-white hover:shadow-rose-300/60'
        }`}
        aria-label={t.tapToSpeak}
      >
        {listening ? (
          <MicOff className="w-7 h-7" />
        ) : speaking ? (
          <AudioLines className="w-7 h-7 animate-pulse" />
        ) : (
          <Mic className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}
