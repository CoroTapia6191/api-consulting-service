export interface GeminiResponse {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
}

export interface Candidate {
  content: Content;
  finishReason: string;
  avgLogprobs: number;
}

export interface Content {
  parts: Part[];
  role: string;
}

export interface Part {
  text: string;
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  promptTokensDetails: TokenDetail[];
  candidatesTokensDetails: TokenDetail[];
}

export interface TokenDetail {
  modality: string;
  tokenCount: number;
}
