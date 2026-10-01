import { Phone, Globe, MapPin, ExternalLink } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { schemeData } from '@/data/schemeData';

export default function Helpline() {
  const { t } = useLang();

  return (
    <section className="py-12 sm:py-16 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-6 text-center">{t.helplineTitle}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={`tel:${schemeData.helpline}`}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-rose-50 border-2 border-rose-100 hover:border-rose-300 hover:bg-rose-100/50 active:scale-[0.98] transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-500 flex items-center justify-center shadow-md shadow-rose-300/50">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-rose-700">{t.callHelpline}</p>
              <p className="text-lg font-bold text-stone-800 mt-1">{schemeData.helpline}</p>
            </div>
          </a>

          <a
            href={`https://${schemeData.portal}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100/50 active:scale-[0.98] transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-300/50">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-emerald-700">{t.visitPortal}</p>
              <p className="text-sm font-semibold text-stone-800 mt-1 flex items-center justify-center gap-1">
                {schemeData.portal}
                <ExternalLink className="w-3 h-3" />
              </p>
            </div>
          </a>

          <a
            href="https://www.tnesevai.tn.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-amber-50 border-2 border-amber-100 hover:border-amber-300 hover:bg-amber-100/50 active:scale-[0.98] transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-md shadow-amber-300/50">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-amber-700">e-Sevai</p>
              <p className="text-sm font-semibold text-stone-800 mt-1 flex items-center justify-center gap-1">
                tnesevai.tn.gov.in
                <ExternalLink className="w-3 h-3" />
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
