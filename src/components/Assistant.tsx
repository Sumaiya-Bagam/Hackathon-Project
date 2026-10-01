import { useState, useRef, useEffect } from 'react';
import {
  CalendarClock,
  FileText,
  HelpCircle,
  CheckCircle,
  Send,
  Mic,
  MicOff,
  Volume2,
  Bot,
  User as UserIcon,
} from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useSpeechRecognition } from '@/hooks/useSpeech';
import { quickQuestions } from '@/data/schemeData';
import { findAnswer } from '@/utils/kmutAssistant';
import type { ChatMessage, QuickQuestion } from '@/types';

interface AssistantProps {
  onSpeak: (text: string) => void;
  speaking: boolean;
  onStopSpeak: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarClock,
  FileText,
  HelpCircle,
  CheckCircle,
};

const uid = () => Math.random().toString(36).substring(2, 11);

export default function Assistant({ onSpeak, speaking, onStopSpeak }: AssistantProps) {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { start, stop, listening, supported: recognitionSupported } = useSpeechRecognition(lang);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (role: 'user' | 'assistant', text: string) => {
    setMessages((prev) => [...prev, { id: uid(), role, text, timestamp: Date.now() }]);
  };

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage('user', trimmed);
    setInput('');
    setTimeout(() => {
      const answer = findAnswer(trimmed, lang);
      addMessage('assistant', answer);
      onSpeak(answer);
    }, 400);
  };

  const handleQuickQuestion = (q: QuickQuestion) => {
    setActiveId(q.id);
    addMessage('user', q.question[lang]);
    setTimeout(() => {
      addMessage('assistant', q.answer[lang]);
      onSpeak(q.answer[lang]);
    }, 400);
  };

  const handleVoiceInput = () => {
    if (listening) {
      stop();
      return;
    }
    if (speaking) {
      onStopSpeak();
    }
    start((transcript) => {
      setInput(transcript);
      handleSend(transcript);
    });
  };

  return (
    <section id="assistant" className="py-12 sm:py-16 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 border border-rose-200 mb-3">
            <Bot className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-bold text-rose-700">{t.assistantTitle}</span>
          </div>
          <p className="text-sm text-stone-500">{t.assistantSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickQuestions.map((q) => {
            const Icon = iconMap[q.icon] || HelpCircle;
            return (
              <div
                key={q.id}
                onClick={() => handleQuickQuestion(q)}
                className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 text-left transition-all active:scale-[0.97] min-h-[56px] cursor-pointer ${
                  activeId === q.id
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-stone-200 bg-white hover:border-rose-200 hover:bg-rose-50/50'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-rose-600" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-700 leading-tight flex-1">
                  {q.question[lang]}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSpeak(q.question[lang] + '. ' + q.answer[lang]);
                  }}
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
                  aria-label={t.readAloud}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border-2 border-stone-200 bg-white overflow-hidden shadow-sm">
          <div ref={scrollRef} className="h-64 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-stone-400">
                <Bot className="w-12 h-12 mb-2 text-rose-200" />
                <p className="text-sm">{t.assistantPlaceholder}</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-rose-100' : 'bg-emerald-100'
                }`}>
                  {msg.role === 'user' ? (
                    <UserIcon className="w-4 h-4 text-rose-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-rose-500 text-white rounded-tr-sm'
                    : 'bg-white border border-stone-200 text-stone-700 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 border-t border-stone-200 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder={t.assistantPlaceholder}
              className="flex-1 px-4 py-3 rounded-xl bg-stone-100 text-stone-700 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-rose-200 transition-all min-h-[44px]"
            />
            {recognitionSupported && (
              <button
                onClick={handleVoiceInput}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  listening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                }`}
                aria-label={t.tapToSpeak}
              >
                {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => handleSend(input)}
              className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 active:scale-95 transition-all shrink-0"
              aria-label={t.send}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {speaking && (
          <div className="flex justify-center mt-4">
            <button
              onClick={onStopSpeak}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all"
            >
              <span className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-emerald-500 rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '40%', animationDelay: '0ms' }} />
                <span className="w-1 bg-emerald-500 rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '80%', animationDelay: '100ms' }} />
                <span className="w-1 bg-emerald-500 rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '60%', animationDelay: '200ms' }} />
                <span className="w-1 bg-emerald-500 rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '90%', animationDelay: '300ms' }} />
                <span className="w-1 bg-emerald-500 rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '50%', animationDelay: '400ms' }} />
              </span>
              {t.stopReading}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
