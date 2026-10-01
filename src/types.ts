export type Language = 'ta' | 'en';

export interface EligibilityQuestion {
  id: string;
  icon: string;
  question: { ta: string; en: string };
  help: { ta: string; en: string };
  passOnYes: boolean;
}

export interface EligibilityResult {
  eligible: boolean;
  answeredCount: number;
  results: Record<string, boolean>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface QuickQuestion {
  id: string;
  icon: string;
  question: { ta: string; en: string };
  answer: { ta: string; en: string };
}

export interface DocItem {
  id: string;
  icon: string;
  title: { ta: string; en: string };
  description: { ta: string; en: string };
}

export interface RoadmapStep {
  step: number;
  icon: string;
  title: { ta: string; en: string };
  description: { ta: string; en: string };
}

export interface SchemeData {
  name: { ta: string; en: string };
  fullName: { ta: string; en: string };
  assistance: { ta: string; en: string };
  beneficiaries: { ta: string; en: string };
  description: { ta: string; en: string };
  eligibility: { ta: string; en: string }[];
  exclusions: { ta: string; en: string }[];
  documents: DocItem[];
  roadmap: RoadmapStep[];
  grievance: { ta: string; en: string };
  helpline: string;
  portal: string;
}
