import { Heart } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-stone-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-base font-bold text-white">{t.appName}</span>
        </div>
        <p className="text-xs text-stone-400 leading-relaxed max-w-md mx-auto">{t.footerText}</p>
      </div>
    </footer>
  );
}
