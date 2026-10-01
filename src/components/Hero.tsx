import { Sparkles, CheckCircle2, Info, Volume2, AudioLines } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

interface HeroProps {
  onCheckEligibility: () => void;
  onLearnMore: () => void;
  onSpeak: (text: string) => void;
  onStopSpeak: () => void;
  speaking: boolean;
}

export default function Hero({ onCheckEligibility, onLearnMore, onSpeak, onStopSpeak, speaking }: HeroProps) {
  const { lang, t } = useLang();

  const handleReadAloud = () => {
    if (speaking) {
      onStopSpeak();
      return;
    }
    onSpeak('கலைஞர் மகளிர் உரிமைத் தொகை வழிகாட்டி');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, #be123c 1px, transparent 1px), radial-gradient(circle at 80% 70%, #059669 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            {t.tagline}
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-rose-800 leading-tight mb-3">
            {t.heroTitle}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6 max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Prominent Read Aloud button */}
          <button
            onClick={handleReadAloud}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base shadow-lg transition-all min-h-[56px] mb-4 ${
              speaking
                ? 'bg-emerald-500 text-white shadow-emerald-300/50 animate-pulse'
                : 'bg-emerald-600 text-white shadow-emerald-300/50 hover:bg-emerald-700 hover:shadow-xl active:scale-95'
            }`}
            aria-label={t.readAloud}
          >
            {speaking ? (
              <>
                <AudioLines className="w-5 h-5 animate-pulse" />
                <span className="flex items-center gap-1">
                  <span className="flex gap-0.5 items-end h-4">
                    <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '40%', animationDelay: '0ms' }} />
                    <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '80%', animationDelay: '100ms' }} />
                    <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '60%', animationDelay: '200ms' }} />
                    <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '90%', animationDelay: '300ms' }} />
                    <span className="w-1 bg-white rounded-full animate-[wave_600ms_ease-in-out_infinite]" style={{ height: '50%', animationDelay: '400ms' }} />
                  </span>
                  {t.stopReading}
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                {t.readAloudPhrase}
              </>
            )}
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onCheckEligibility}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-rose-600 text-white font-bold text-base shadow-lg shadow-rose-300/50 hover:bg-rose-700 hover:shadow-xl active:scale-95 transition-all min-h-[56px]"
            >
              <CheckCircle2 className="w-5 h-5" />
              {t.heroCta}
            </button>
            <button
              onClick={onLearnMore}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-rose-700 font-bold text-base border-2 border-rose-200 shadow-sm hover:bg-rose-50 hover:border-rose-300 active:scale-95 transition-all min-h-[56px]"
            >
              <Info className="w-5 h-5" />
              {t.heroCtaSecondary}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 text-stone-600">
              <span className="text-xl font-bold text-rose-700">₹1,000</span>
              <span className="text-sm text-stone-500">/ {lang === 'ta' ? 'மாதம்' : 'month'}</span>
            </div>
            <div className="w-px h-8 bg-rose-200" />
            <div className="flex items-center gap-2 text-stone-600">
              <span className="text-sm font-semibold text-emerald-700">DBT</span>
              <span className="text-sm text-stone-500">{lang === 'ta' ? 'நேரடி பரிவர்த்தனை' : 'Direct Transfer'}</span>
            </div>
            <div className="w-px h-8 bg-rose-200" />
            <div className="flex items-center gap-2 text-stone-600">
              <span className="text-sm font-semibold text-amber-700">15</span>
              <span className="text-sm text-stone-500">{lang === 'ta' ? 'மாதம் தோறும்' : 'every month'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
