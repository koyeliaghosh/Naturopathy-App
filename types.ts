export type Language = 'English' | 'Hindi' | 'Bengali';

export interface UserProfile {
  age: string;
  weight: string; // kg
  height: string; // cm
  gender: string;
  location: string;
  condition: string;
  language: Language;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface HealthResponse {
  markdown: string;
  sources: GroundingSource[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  sources?: GroundingSource[];
}
