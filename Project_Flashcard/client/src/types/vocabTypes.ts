export interface Vocab {
  id: number;
  word: string;
  meaning: string;
  categoryId: number;
  isLearned: boolean;
}

export interface VocabFormData {
  word: string;
  meaning: string;
  categoryId: number;
  isLearned?: boolean; 
}
