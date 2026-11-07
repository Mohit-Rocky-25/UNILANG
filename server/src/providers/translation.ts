export interface TranslationOptions {
  formality?: 'formal' | 'informal' | 'neutral';
}

export interface TranslationResult {
  translatedText: string;
  formality: string;
  tokens: Array<{ word: string; pos?: string; lemma?: string }>;
  detectedLanguage?: string;
  provider: string;
  alternatives?: Array<{ formality: string; text: string; context: string }>;
  idiomsAndNuances?: Array<{ phrase: string; literal: string; figurative: string; culturalOrigin: string }>;
}

export interface ITranslationProvider {
  translate(
    text: string,
    sourceLang: string,
    targetLang: string,
    options?: TranslationOptions
  ): Promise<TranslationResult>;
}

// Deterministic mock translation provider for offline / test runs
export class MockTranslationProvider implements ITranslationProvider {
  async translate(
    text: string,
    sourceLang: string,
    targetLang: string,
    options?: TranslationOptions
  ): Promise<TranslationResult> {
    const formality = options?.formality || 'neutral';
    
    // Quick dictionary mappings for common demo words
    const mockDict: Record<string, Record<string, string>> = {
      hello: { es: 'Hola', fr: 'Bonjour', ja: 'こんにちは', de: 'Hallo', it: 'Ciao' },
      water: { es: 'Agua', fr: 'Eau', ja: '水', de: 'Wasser', it: 'Acqua' },
      'thank you': { es: 'Gracias', fr: 'Merci', ja: 'ありがとう', de: 'Danke', it: 'Grazie' },
      friend: { es: 'Amigo', fr: 'Ami', ja: '友達', de: 'Freund', it: 'Amico' }
    };

    const lower = text.trim().toLowerCase();
    const mapped = mockDict[lower]?.[targetLang] || `[${targetLang.toUpperCase()}] ${text}`;

    const tokens = text.split(/\s+/).map(w => ({
      word: w,
      pos: 'NOUN',
      lemma: w.toLowerCase()
    }));

    return {
      translatedText: mapped,
      formality,
      tokens,
      detectedLanguage: sourceLang,
      provider: 'mock-engine',
      alternatives: [
        { formality: 'formal', text: `${mapped} (formal)`, context: 'Used with elders and clients' },
        { formality: 'casual', text: `${mapped} (casual)`, context: 'Used with close friends' }
      ]
    };
  }
}

// Lingva public provider with automatic failover
export class LingvaTranslationProvider implements ITranslationProvider {
  private instances = [
    'https://lingva.ml',
    'https://lingva.thedaviddelta.com',
    'https://translate.plausibility.cloud'
  ];

  async translate(
    text: string,
    sourceLang: string,
    targetLang: string,
    options?: TranslationOptions
  ): Promise<TranslationResult> {
    const encoded = encodeURIComponent(text);
    let lastError: Error | null = null;

    for (const baseUrl of this.instances) {
      try {
        const res = await fetch(`${baseUrl}/api/v1/${sourceLang}/${targetLang}/${encoded}`, {
          signal: AbortSignal.timeout(3000)
        });
        if (!res.ok) continue;
        const data = await res.json() as { translation: string };
        if (data && data.translation) {
          const tokens = text.split(/\s+/).map(w => ({ word: w }));
          return {
            translatedText: data.translation,
            formality: options?.formality || 'neutral',
            tokens,
            detectedLanguage: sourceLang,
            provider: 'lingva'
          };
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    // Failover to deterministic mock if all remote instances fail
    console.warn('Lingva instances timed out, failing over to deterministic mock provider');
    return new MockTranslationProvider().translate(text, sourceLang, targetLang, options);
  }
}
