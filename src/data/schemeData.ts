import type { SchemeData, EligibilityQuestion, QuickQuestion } from '@/types';

export const schemeData: SchemeData = {
  name: {
    ta: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    en: 'Kalaignar Magalir Urimai Thogai',
  },
  fullName: {
    ta: 'கலைஞர் மகளிர் உரிமைத் தோட்டம் (KMUT)',
    en: 'Kalaignar Magalir Urimai Thogai Thittam (KMUT)',
  },
  assistance: {
    ta: 'ஒவ்வொரு மாதமும் மாதம் 15-ஆம் தேதி ₹1,000 நேரடி பணப்பரிவர்த்தனை (DBT) மூலம் வங்கி கணக்கில் செலுத்தப்படும்.',
    en: '₹1,000 per month deposited directly via DBT on the 15th of every month into the bank account.',
  },
  beneficiaries: {
    ta: 'தமிழ்நாட்டில் குடும்பத் தலைவராக இருக்கும் பெண்கள்.',
    en: 'Women heads of family in Tamil Nadu.',
  },
  description: {
    ta: 'இந்தத் திட்டம் தமிழ்நாடு அரசின் மகளிர் அதிகாரமூட்டல் திட்டமாகும். தகுதியான பெண்களுக்கு மாதம் ₹1,000 உரிமைத் தொகை வழங்கப்படுகிறது.',
    en: 'This is a women empowerment scheme by the Government of Tamil Nadu. Eligible women receive ₹1,000 monthly entitlement.',
  },
  eligibility: [
    {
      ta: 'வயது: 21 வயது மற்றும் அதற்கு மேற்பட்டவர்கள்.',
      en: 'Age: 21 years and above.',
    },
    {
      ta: 'வசிப்பிடம்: தமிழ்நாட்டின் நிரந்தர குடியிருப்பாளர், ஸ்மார்ட் குடும்ப/ரேஷன் அட்டை வைத்திருப்பவர்.',
      en: 'Residency: Permanent resident of Tamil Nadu with Smart Family/Ration card.',
    },
    {
      ta: 'குடும்பத் தலைவர்: ஸ்மார்ட் ரேஷன் அட்டையில் பெண் தலைமுறையாளராக பதிவு செய்யப்பட்டிருத்தல் (அல்லது ஆண் தலைமுறையாளரின் மனைவி). விதவைகள், தனி பெண்கள், மற்றும் திருநங்கைகள் குடும்பத் தலைவர்களாக இருந்தால் தகுதியானவர்கள்.',
      en: 'Head of Household: Woman listed as head on the Smart Ration Card (or wife of male head). Widows, single women, and trans women heading households are eligible.',
    },
    {
      ta: 'ஆண்டு வருமானம்: குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு குறைவாக இருக்க வேண்டும்.',
      en: 'Annual Income: Family annual income below ₹2.5 Lakhs.',
    },
    {
      ta: 'நில உச்சவரம்பு: நன்செய் நிலம் 5 ஏக்கர் அல்லது புன்செய் நிலம் 10 ஏக்கர் குறைவாக இருக்க வேண்டும்.',
      en: 'Land Ceiling: Less than 5 acres of wetland OR less than 10 acres of dryland.',
    },
    {
      ta: 'மின்சாரம்: ஆண்டு உள்நாட்டு மின்சார நுகர்வு 3,600 யூனிட்டுகளுக்கு குறைவாக இருக்க வேண்டும்.',
      en: 'Electricity: Annual domestic electricity consumption under 3,600 units.',
    },
    {
      ta: 'வாகனம்: குடும்பத்திற்கு நான்கு சக்கர வாகனங்கள் (கார்/ஜீப்/டிராக்டர்/வணிக வாகனங்கள்) இல்லை.',
      en: 'Vehicle: No family ownership of four-wheelers (cars/jeeps/tractors/commercial vehicles).',
    },
  ],
  exclusions: [
    {
      ta: 'அரசு ஊழியர்கள்',
      en: 'Government employees',
    },
    {
      ta: 'PSU / வங்கி ஊழியர்கள்',
      en: 'PSU / Bank workers',
    },
    {
      ta: 'வருமான வரி செலுத்துவோர்',
      en: 'Income Tax payers',
    },
    {
      ta: 'தொழில் வரி செலுத்துவோர்',
      en: 'Professional tax payers',
    },
    {
      ta: 'மற்ற சமூக நல ஓய்வூதியம் பெறுவோர்',
      en: 'Holders of other social welfare pensions',
    },
  ],
  documents: [
    {
      id: 'ration',
      icon: 'CreditCard',
      title: { ta: 'ஸ்மார்ட் ரேஷன் அட்டை', en: 'Smart Ration Card' },
      description: {
        ta: 'உங்கள் குடும்ப அட்டையை கட்டாயம் கொண்டு வரவும்.',
        en: 'Bring your family card (ration card) — it is mandatory.',
      },
    },
    {
      id: 'aadhaar',
      icon: 'Fingerprint',
      title: { ta: 'ஆதார் அட்டை', en: 'Aadhaar Card' },
      description: {
        ta: 'மொபைல் எண்ணுடன் இணைக்கப்பட்ட ஆதார் அட்டை.',
        en: 'Aadhaar card linked to your mobile number.',
      },
    },
    {
      id: 'bank',
      icon: 'BookMarked',
      title: { ta: 'வங்கி கணக்கு புத்தகம்', en: 'Bank Passbook' },
      description: {
        ta: 'ஆதார் எண் இணைக்கப்பட்ட வங்கி கணக்கு புத்தகம்.',
        en: 'Aadhaar-seeded bank passbook for DBT transfer.',
      },
    },
    {
      id: 'electricity',
      icon: 'Zap',
      title: { ta: 'மின் இணைப்பு அட்டை', en: 'Electricity Bill' },
      description: {
        ta: 'மின் கட்டண பில் அல்லது நுகர்வோர் எண்.',
        en: 'Electricity bill or consumer number.',
      },
    },
  ],
  roadmap: [
    {
      step: 1,
      icon: 'Store',
      title: { ta: 'ரேஷன் கடை / இ-சேவை மையம்', en: 'Ration Shop / e-Sevai Centre' },
      description: {
        ta: 'உங்கள் பகுதி ரேஷன் கடை அல்லது இ-சேவை மையத்தில் விண்ணப்பிக்கவும்.',
        en: 'Visit your local ration shop camp or e-Sevai centre to apply.',
      },
    },
    {
      step: 2,
      icon: 'ScanFace',
      title: { ta: 'பயோமெட்ரிக் ஆதார் சரிபார்ப்பு', en: 'Biometric Aadhaar Verification' },
      description: {
        ta: 'கேம்ப் அதிகாரி மூலம் இ-கேஒய்சி (e-KYC) செய்யப்படும்.',
        en: 'e-KYC biometric verification done by the camp officer.',
      },
    },
    {
      step: 3,
      icon: 'MessageSquare',
      title: { ta: 'எஸ்எம்எஸ் உறுதிப்படுத்தல்', en: 'SMS Acknowledgment' },
      description: {
        ta: 'தனிப்பட்ட குறிப்பு எண்ணுடன் எஸ்எம்எஸ் வரும்.',
        en: 'SMS with a unique reference code will be sent to your mobile.',
      },
    },
    {
      step: 4,
      icon: 'Landmark',
      title: { ta: 'நேரடி பணப்பரிவர்த்தனை (DBT)', en: 'Direct Benefit Transfer (DBT)' },
      description: {
        ta: 'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கில் நேரடியாக பணம் செலுத்தப்படும்.',
        en: 'Money is deposited directly into your Aadhaar-seeded bank account.',
      },
    },
  ],
  grievance: {
    ta: 'விண்ணப்பம் நிராகரிக்கப்பட்டால், 30 நாட்களுக்குள் வருவாய் அலுவலகம் அல்லது அதிகாரப்பூர்வ போர்ட்டலில் மேல்முறையீடு செய்யலாம்.',
    en: 'If your application is rejected, you can appeal within 30 days at the Revenue office or the official portal.',
  },
  helpline: '044-25619208',
  portal: 'kmut.tn.gov.in',
};

export const eligibilityQuestions: EligibilityQuestion[] = [
  {
    id: 'age_resident',
    icon: 'MapPin',
    question: {
      ta: 'நீங்கள் 21 வயது மற்றும் அதற்கு மேற்பட்டவரா? தமிழ்நாடு குடியிருப்பாளரா?',
      en: 'Are you 21+ and a resident of Tamil Nadu?',
    },
    help: {
      ta: 'வயது 21+ மற்றும் தமிழ்நாடு ரேஷன் அட்டை வைத்திருக்க வேண்டும்.',
      en: 'Must be 21+ and have a Tamil Nadu ration card.',
    },
    passOnYes: true,
  },
  {
    id: 'income',
    icon: 'Wallet',
    question: {
      ta: 'உங்கள் குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு குறைவாக உள்ளதா?',
      en: 'Is your family annual income below ₹2.5 Lakhs?',
    },
    help: {
      ta: 'குடும்ப வருமானம் ₹2,50,000-க்கு குறைவாக இருக்க வேண்டும்.',
      en: 'Family income must be below ₹2,50,000 per year.',
    },
    passOnYes: true,
  },
  {
    id: 'exclusions',
    icon: 'Ban',
    question: {
      ta: 'உங்கள் குடும்பத்திற்கு கார்/டிராக்டர் அல்லது அரசு வேலை உள்ளதா?',
      en: 'Does your family own a car/tractor or have a government job?',
    },
    help: {
      ta: 'கார், டிராக்டர், அரசு வேலை இருந்தால் தகுதி இல்லை.',
      en: 'Cars, tractors, or government jobs disqualify you.',
    },
    passOnYes: false,
  },
  {
    id: 'bank',
    icon: 'BookMarked',
    question: {
      ta: 'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு புத்தகம் உண்டா?',
      en: 'Do you have an Aadhaar-linked bank passbook?',
    },
    help: {
      ta: 'ஆதார் எண் இணைக்கப்பட்ட வங்கி கணக்கு கட்டாயம்.',
      en: 'Aadhaar-seeded bank account is required for DBT.',
    },
    passOnYes: true,
  },
];

export const quickQuestions: QuickQuestion[] = [
  {
    id: 'when',
    icon: 'CalendarClock',
    question: {
      ta: 'எப்போது ₹1000 கிடைக்கும்?',
      en: 'When will ₹1000 be credited?',
    },
    answer: {
      ta: 'ஒவ்வொரு மாதமும் 15-ஆம் தேதி உங்கள் ஆதார் இணைக்கப்பட்ட வங்கி கணக்கில் ₹1,000 நேரடியாக செலுத்தப்படும்.',
      en: '₹1,000 is deposited directly into your Aadhaar-seeded bank account on the 15th of every month.',
    },
  },
  {
    id: 'docs',
    icon: 'FileText',
    question: {
      ta: 'விண்ணப்பிக்க என்னென்ன ஆவணங்கள் தேவை?',
      en: 'What documents are required?',
    },
    answer: {
      ta: 'ஸ்மார்ட் ரேஷன் அட்டை, ஆதார் அட்டை (மொபைல் இணைப்புடன்), ஆதார் இணைக்கப்பட்ட வங்கி புத்தகம், மற்றும் மின் இணைப்பு பில் தேவை.',
      en: 'You need: Smart Ration Card, Aadhaar Card (linked to mobile), Aadhaar-seeded bank passbook, and electricity bill.',
    },
  },
  {
    id: 'rejected',
    icon: 'HelpCircle',
    question: {
      ta: 'நிராகரிக்கப்பட்டால் என்ன செய்வது?',
      en: 'What to do if rejected?',
    },
    answer: {
      ta: 'நிராகரிக்கப்பட்டால், 30 நாட்களுக்குள் உங்கள் வட்டாட்சியர் அலுவலகம் அல்லது kmut.tn.gov.in போர்ட்டலில் மேல்முறையீடு செய்யலாம்.',
      en: 'If rejected, you can appeal within 30 days at your Revenue office or on the kmut.tn.gov.in portal.',
    },
  },
  {
    id: 'eligible',
    icon: 'CheckCircle',
    question: {
      ta: 'யார் தகுதியானவர்கள்?',
      en: 'Who is eligible?',
    },
    answer: {
      ta: '21 வயது மேற்பட்ட தமிழ்நாடு பெண் குடும்பத் தலைவர்கள், ஆண்டு வருமானம் ₹2.5L குறைவு, 5 ஏக்கர் நன்செய் அல்லது 10 ஏக்கர் புன்செய் நிலம், மின் நுகர்வு 3600 யூனிட் குறைவு, நான்கு சக்கர வாகனம் இல்லாதவர்கள்.',
      en: 'Women 21+ who are Tamil Nadu household heads, with family income below ₹2.5L, under 5 acres wetland or 10 acres dryland, electricity under 3600 units, and no four-wheelers.',
    },
  },
];
