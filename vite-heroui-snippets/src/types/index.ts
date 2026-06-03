// src/types/index.ts

export interface Snippet {
  id: string;
  name: string;
  code: string;
  notes?: string;
}

export interface SnippetGroup {
  id: string;
  name: string;
  snippets: Snippet[];
  createdAt: number;
}