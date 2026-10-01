import { Store, ScanFace, MessageSquare, Landmark, Volume2 } from 'lucide-react';
import { Volume2 as SpeakerIcon } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { schemeData } from '@/data/schemeData';

interface RoadmapProps {
  onSpeak: (text: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Store,
  ScanFace,
  MessageSquare,
  Landmark,
};

export default function Roadmap({ onSpeak }: RoadmapProps) {
  const { lang, t } = useLang();

  const allText = schemeData.roadmap
    .map((s) => `Step ${s.step}: ${s.title[lang]}. ${s.description[lang]}`)
    .join('. ');

  return (
    <section id="roadmap" className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-1">{t.roadmapTitle}</h3>
            <p className="text-sm text-stone-500">{t.roadmapSubtitle}</p>
          </div>
          <button
            onClick={() => onSpeak(allText)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all min-h-[44px] shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.readAloud}</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-amber-200 to-emerald-200 sm:left-8" />

          <div className="space-y-6">
            {schemeData.roadmap.map((step) => {
              const Icon = iconMap[step.icon] || Store;

              return (
                <div key={step.step} className="relative flex items-start gap-4 sm:gap-5">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md sm:w-16 sm:h-16 ${
                    step.step === 1
                      ? 'bg-rose-500'
                      : step.step === 2
                      ? 'bg-amber-500'
                      : step.step === 3
                      ? 'bg-sky-500'
                      : 'bg-emerald-500'
                  }`}>
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-600 sm:w-7 sm:h-7 sm:text-xs">
                      {step.step}
                    </span>
                  </div>

                  <div className="flex-1 pt-2">
                    <div className={`p-4 sm:p-5 rounded-2xl border-2 ${
                      step.step === 1
                        ? 'border-rose-100 bg-rose-50/50'
                        : step.step === 2
                        ? 'border-amber-100 bg-amber-50/50'
                        : step.step === 3
                        ? 'border-sky-100 bg-sky-50/50'
                        : 'border-emerald-100 bg-emerald-50/50'
                    }`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-base font-bold text-stone-800 mb-1">
                            {step.title[lang]}
                          </h4>
                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                            {step.description[lang]}
                          </p>
                        </div>
                        <button
                          onClick={() => onSpeak(`Step ${step.step}. ${step.title[lang]}. ${step.description[lang]}`)}
                          className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
                          aria-label={t.readAloud}
                        >
                          <SpeakerIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-700 mb-2">{t.grievanceTitle}</h4>
              <p className="text-sm text-stone-600 leading-relaxed">{schemeData.grievance[lang]}</p>
            </div>
            <button
              onClick={() => onSpeak(`${t.grievanceTitle}. ${schemeData.grievance[lang]}`)}
              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
              aria-label={t.readAloud}
            >
              <SpeakerIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
