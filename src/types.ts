export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type MUNFormat = 'UNA-USA' | 'THIMUN' | 'HMUN' | 'General';

export interface SessionSettings {
  country: string;
  committee: string;
  agenda: string;
}

export interface AppState {
  messages: Message[];
  isListening: boolean;
  isTyping: boolean;
  currentFormat: MUNFormat;
  settings: SessionSettings;
}
