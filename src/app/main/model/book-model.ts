export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type SectionType = 'BEGIN' | 'NODE' | 'END';
export type ConsequenceType = 'LOSE_HEALTH' | 'GAIN_HEALTH';

export interface PossibleValues {
  field: string;
  value: string[];
}

export interface Book {
  id: number
  title: string;
  author: string;
  difficulty: string;
  sections: Section[];
}

export interface Section {
  id: number;
  text: string;
  type: string;
  options?: SectionOption[];
}

export interface SectionOption {
  description: string;
  gotoId: number;
  consequence?: Consequence;
}

export interface Consequence {
  type: string;
  value: number;
  text: string;
}

export interface BookResponse {
  id: number
  title: string;
  author: string;
  difficulty: Difficulty | string;
  sections: SectionResponse[];
}

export interface SectionResponse {
  id: number;
  text: string;
  type: SectionType | string;
  options?: SectionOptionResponse[];
}

export interface SectionOptionResponse {
  description: string;
  gotoId: number;
  consequence?: ConsequenceResponse;
}

export interface ConsequenceResponse {
  type: ConsequenceType | string;
  value: number;
  text: string;
}
