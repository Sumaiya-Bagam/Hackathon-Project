import { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Volume2,
  MapPin,
  Wallet,
  Ban,
  BookMarked,
  Check,
  X,
} from 'lucide-react';
import { Volume2 as SpeakerIcon } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { eligibilityQuestions } from '@/data/schemeData';
import type { EligibilityQuestion } from '@/types';

interface EligibilityCheckerProps {
  onSpeak: (text: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  Wallet,
  Ban,
  BookMarked,
};

export default function EligibilityChecker({ onSpeak }: EligibilityCheckerProps) {
  const { lang, t } = useLang();
  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>({});
  const [showResult, setShowResult] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const answeredCount = Object.values(answers).filter((v) => v !== undefined).length;
  const allAnswered = answeredCount === eligibilityQuestions.length;

  const handleAnswer = (id: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const computeResult = () => {
    let allPass = true;
    for (const q of eligibilityQuestions) {
      const ans = answers[q.id];
      if (ans === undefined) return null;
      if (q.passOnYes && !ans) allPass = false;
      if (!q.passOnYes && ans) allPass = false;
    }
    return allPass;
  };

  const handleCheck = () => {
    setShowResult(true);
    const result = computeResult();
    if (result === true) {
      onSpeak(t.eligibleResult + ' ' + t.eligibleDesc);
    } else if (result === false) {
      onSpeak(t.notEligibleResult + ' ' + t.notEligibleDesc);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  useEffect(() => {
    if (showResult && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showResult]);

  const result = showResult ? computeResult() : null;

  return (
    <section ref={sectionRef} id="eligibility" className="py-12 sm:py-16 bg-gradient-to-b from-rose-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-start justify-between mb-8 gap-3">
          <div className="text-center flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-2">{t.eligibilityTitle}</h3>
            <p className="text-sm text-stone-500">{t.eligibilitySubtitle}</p>
          </div>
          <button
            onClick={() => onSpeak(t.eligibilityTitle + '. ' + t.eligibilitySubtitle + '. ' + eligibilityQuestions.map((q, i) => `${i + 1}. ${q.question[lang]}. ${q.help[lang]}`).join('. '))}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all min-h-[44px]"
            aria-label={t.readAloud}
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.readAloud}</span>
          </button>
        </div>

        <div className="space-y-4">
          {eligibilityQuestions.map((q: EligibilityQuestion, idx) => {
            const Icon = iconMap[q.icon] || CheckCircle2;
            const answer = answers[q.id];
            const answered = answer !== undefined;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  answered
                    ? answer === q.passOnYes
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : 'border-amber-200 bg-amber-50/50'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    answered
                      ? answer === q.passOnYes
                        ? 'bg-emerald-100'
                        : 'bg-amber-100'
                      : 'bg-rose-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      answered
                        ? answer === q.passOnYes
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                        : 'text-rose-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-stone-400">{idx + 1}</span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-stone-800 leading-relaxed">
                      {q.question[lang]}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">{q.help[lang]}</p>
                  </div>
                  <button
                    onClick={() => onSpeak(`Question ${idx + 1}. ${q.question[lang]}. ${q.help[lang]}`)}
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
                    aria-label={t.readAloud}
                  >
                    <SpeakerIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-3 ml-0 sm:ml-13">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all min-h-[56px] ${
                      answer === true
                        ? q.passOnYes
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-amber-500 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                  >
                    <Check className="w-5 h-5" />
                    {t.yes}
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all min-h-[56px] ${
                      answer === false
                        ? !q.passOnYes
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-amber-500 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-rose-100 hover:text-rose-700'
                    }`}
                  >
                    <X className="w-5 h-5" />
                    {t.no}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!showResult && (
          <button
            onClick={handleCheck}
            disabled={!allAnswered}
            className={`w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all min-h-[56px] ${
              allAnswered
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-300/50 hover:bg-rose-700 active:scale-95'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {t.checkEligibility}
          </button>
        )}

        {showResult && result !== null && (
          <div className={`mt-6 p-6 rounded-2xl border-2 text-center ${
            result
              ? 'border-emerald-300 bg-emerald-50'
              : 'border-amber-300 bg-amber-50'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              result ? 'bg-emerald-500' : 'bg-amber-500'
            }`}>
              {result ? (
                <CheckCircle2 className="w-9 h-9 text-white" />
              ) : (
                <AlertTriangle className="w-9 h-9 text-white" />
              )}
            </div>
            <h4 className={`text-xl font-bold mb-2 ${result ? 'text-emerald-700' : 'text-amber-700'}`}>
              {result ? t.eligibleResult : t.notEligibleResult}
            </h4>
            <p className={`text-sm mb-5 ${result ? 'text-emerald-600' : 'text-amber-600'}`}>
              {result ? t.eligibleDesc : t.notEligibleDesc}
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 font-semibold text-sm hover:bg-stone-50 active:scale-95 transition-all min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              {t.retry}
            </button>
          </div>
        )}

        {showResult && result === null && (
          <div className="mt-6 p-6 rounded-2xl border-2 border-stone-200 bg-stone-50 text-center">
            <p className="text-sm text-stone-500 mb-4">{t.partialResult}</p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 font-semibold text-sm hover:bg-stone-50 active:scale-95 transition-all min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              {t.retry}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
