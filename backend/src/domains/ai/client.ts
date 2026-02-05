/**
 * AI client.
 *
 * Responsibilities:
 * - Provide unified interface to AI providers (OpenAI, Anthropic, etc.)
 * - Handle API calls, retries, and rate limiting
 * - Abstract provider-specific details from domain logic
 *
 * This is the ONLY file that should import AI provider SDKs.
 */

export interface AICompletionRequest {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AICompletionResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
  };
}

export async function complete(_request: AICompletionRequest): Promise<AICompletionResponse> {
  // TODO: Implement AI completion call
  // Choose provider based on env config
  throw new Error("Not implemented");
}

export async function streamComplete(
  _request: AICompletionRequest,
  _onChunk: (chunk: string) => void
): Promise<void> {
  // TODO: Implement streaming AI completion
  throw new Error("Not implemented");
}
