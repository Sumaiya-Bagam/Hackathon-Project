import { Coins, Users, FileText, Volume2, CheckCircle2, Ban } from 'lucide-react';
import { Volume2 as SpeakerIcon } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { schemeData } from '@/data/schemeData';

interface OverviewProps {
  onSpeak: (text: string) => void;
}

export default function Overview({ onSpeak }: OverviewProps) {
  const { lang, t } = useLang();

  const overviewText = `${t.overviewAssistance}: ${schemeData.assistance[lang]}. ${t.overviewBeneficiaries}: ${schemeData.beneficiaries[lang]}. ${schemeData.description[lang]}`;

  return (
    <section id="overview" className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-1">{t.overviewTitle}</h3>
            <p className="text-sm text-stone-500">{schemeData.fullName[lang]}</p>
          </div>
          <button
            onClick={() => onSpeak(overviewText)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all min-h-[44px]"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.readAloud}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center">
                <Coins className="w-5.5 h-5.5 text-rose-600" />
              </div>
              <button
                onClick={() => onSpeak(`${t.overviewAssistance}. ${schemeData.assistance[lang]}`)}
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
                aria-label={t.readAloud}
              >
                <SpeakerIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-1">{t.overviewAssistance}</p>
            <p className="text-sm text-stone-700 leading-relaxed">{schemeData.assistance[lang]}</p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Users className="w-5.5 h-5.5 text-emerald-600" />
              </div>
              <button
                onClick={() => onSpeak(`${t.overviewBeneficiaries}. ${schemeData.beneficiaries[lang]}`)}
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
                aria-label={t.readAloud}
              >
                <SpeakerIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">{t.overviewBeneficiaries}</p>
            <p className="text-sm text-stone-700 leading-relaxed">{schemeData.beneficiaries[lang]}</p>
          </div>
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                <FileText className="w-5.5 h-5.5 text-amber-600" />
              </div>
              <button
                onClick={() => onSpeak(`${t.overviewDescription}. ${schemeData.description[lang]}`)}
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
                aria-label={t.readAloud}
              >
                <SpeakerIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-1">{t.overviewDescription}</p>
            <p className="text-sm text-stone-700 leading-relaxed">{schemeData.description[lang]}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {t.eligibilityTitle}
              </h4>
              <button
                onClick={() => onSpeak(schemeData.eligibility.map((item) => item[lang]).join('. '))}
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-white text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all border border-emerald-200"
                aria-label={t.readAloud}
              >
                <SpeakerIcon className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-3">
              {schemeData.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm text-stone-700 leading-relaxed">{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-rose-700 flex items-center gap-2">
                <Ban className="w-5 h-5" />
                {t.exclusionsTitle}
              </h4>
              <button
                onClick={() => onSpeak(schemeData.exclusions.map((item) => item[lang]).join('. '))}
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-white text-rose-600 hover:bg-rose-100 active:scale-95 transition-all border border-rose-200"
                aria-label={t.readAloud}
              >
                <SpeakerIcon className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-3">
              {schemeData.exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-sm text-stone-700 leading-relaxed">{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
