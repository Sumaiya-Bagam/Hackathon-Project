import { Heart, Languages } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function Header() {
  const { lang, toggleLang, t } = useLang();

  return (
    <header className="sticky top-0 z-40 bg-rose-50/95 backdrop-blur-md border-b border-rose-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-md shadow-rose-300/50 shrink-0">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-rose-800 leading-tight truncate">{t.appName}</h1>
            <p className="text-[11px] text-rose-500 leading-tight truncate">{t.tagline}</p>
          </div>
        </div>

        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-700 font-semibold text-sm shadow-sm hover:bg-rose-100 hover:border-rose-300 active:scale-95 transition-all min-h-[44px]"
          aria-label="Toggle language"
        >
          <Languages className="w-4 h-4" />
          {t.langToggle}
        </button>
      </div>
    </header>
  );
}
