import { useCallback, useEffect, useRef, useState } from 'react';
import type { Language } from '@/types';

export function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string, lang: Language) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const langPrefix = lang === 'ta' ? 'ta' : 'en';
      const preferred = voices.find((v) => v.lang.startsWith(langPrefix));
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      utteranceRef.current = utterance;
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { speak, stop, speaking, supported };
}

export function useSpeechRecognition(lang: Language) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');
  const onResultRef = useRef<((transcript: string) => void) | null>(null);

  useEffect(() => {
    const SR =
      (typeof window !== 'undefined' && (window as any).SpeechRecognition) ||
      (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition);
    setSupported(!!SR);
  }, []);

  const start = useCallback(
    (onResult: (transcript: string) => void) => {
      const SR =
        (typeof window !== 'undefined' && (window as any).SpeechRecognition) ||
        (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition);
      if (!SR) return;

      transcriptRef.current = '';
      onResultRef.current = onResult;

      const recognition = new SR();
      recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        transcriptRef.current += finalTranscript + ' ';
      };

      recognition.onend = () => {
        setListening(false);
        const finalText = transcriptRef.current.trim();
        if (finalText) {
          onResultRef.current?.(finalText);
        }
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
      setListening(true);
      recognition.start();
    },
    [lang]
  );

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return { start, stop, listening, supported };
}
