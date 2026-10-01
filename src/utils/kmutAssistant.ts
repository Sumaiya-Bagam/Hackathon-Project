import type { Language } from '@/types';
import { quickQuestions, schemeData } from '@/data/schemeData';
import { translations } from '@/data/translations';

export function findAnswer(query: string, lang: Language): string {
  const q = query.toLowerCase();
  const combined = q + ' ' + query;
  const t = translations[lang];

  if (/1000|கிடைக்கும்|when|credit|month|மாத|15|deposit|dbt|பண|money|தொகை/.test(combined)) {
    return quickQuestions[0].answer[lang];
  }
  if (/document|ஆவண|ஆதார்|ration|bank|ரேஷன்|வங்கி|paper|கணக்கு|புத்தகம்|require|தேவை|need|carry/.test(combined)) {
    return quickQuestions[1].answer[lang];
  }
  if (/reject|நிராக|appeal|மேல்|முறை|denied|மறு|what.*do/.test(combined)) {
    return quickQuestions[2].answer[lang];
  }
  if (/eligib|தகுதி|who|யார்|qualify|qualif/.test(combined)) {
    return quickQuestions[3].answer[lang];
  }
  if (/apply|விண்ண|how|எப்படி|register|step|படி|e-sevai|இ-சேவai|camp|கேம்ப்/.test(combined)) {
    return schemeData.roadmap.map((s) => `${s.step}. ${s.title[lang]}: ${s.description[lang]}`).join('. ');
  }
  if (/helpline|உதவி|call|phone|தொடர்பு|number|எண்/.test(combined)) {
    return `${t.callHelpline}: ${schemeData.helpline}. ${t.visitPortal}: ${schemeData.portal}`;
  }

  return lang === 'ta'
    ? 'மன்னிக்கவும், இந்த கேள்விக்கு பதில் தெரியவில்லை. தகுதி, ஆவணங்கள், விண்ணப்ப படிகள், அல்லது ஹெல்ப்லைன் பற்றி கேளுங்கள்.'
    : 'Sorry, I could not answer that. Try asking about eligibility, documents, application steps, or the helpline.';
}
