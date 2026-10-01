import { useState } from 'react';
import { CreditCard, Fingerprint, BookMarked, Zap, Check, Volume2 } from 'lucide-react';
import { Volume2 as SpeakerIcon } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { schemeData } from '@/data/schemeData';

interface DocumentChecklistProps {
  onSpeak: (text: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  Fingerprint,
  BookMarked,
  Zap,
};

export default function DocumentChecklist({ onSpeak }: DocumentChecklistProps) {
  const { lang, t } = useLang();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allText = schemeData.documents
    .map((d) => d.title[lang] + ': ' + d.description[lang])
    .join('. ');

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = (checkedCount / schemeData.documents.length) * 100;

  return (
    <section id="documents" className="py-12 sm:py-16 bg-amber-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-1">{t.documentsTitle}</h3>
            <p className="text-sm text-stone-500">{t.documentsSubtitle}</p>
          </div>
          <button
            onClick={() => onSpeak(allText)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all min-h-[44px] shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.readAloud}</span>
          </button>
        </div>

        {checkedCount > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-500">
                {checkedCount} / {schemeData.documents.length}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {schemeData.documents.map((doc) => {
            const Icon = iconMap[doc.icon] || CreditCard;
            const isChecked = checked[doc.id];

            return (
              <button
                key={doc.id}
                onClick={() => toggle(doc.id)}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                  isChecked
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${isChecked ? 'text-emerald-600' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-bold mb-1 ${isChecked ? 'text-emerald-700' : 'text-stone-800'}`}>
                      {doc.title[lang]}
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{doc.description[lang]}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(`${doc.title[lang]}. ${doc.description[lang]}`);
                    }}
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
                    aria-label={t.readAloud}
                  >
                    <SpeakerIcon className="w-4 h-4" />
                  </button>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-stone-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
