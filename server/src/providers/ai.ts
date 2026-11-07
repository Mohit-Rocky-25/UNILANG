import { z } from 'zod';

export interface DialogueTurnResponse {
  reply: string;
  translation: string;
  phonetic: string;
  correction: {
    hasError: boolean;
    userMistake?: string;
    correctedPhrase?: string;
    explanation?: string;
  };
  recommendedReplies: string[];
}

export interface GrammarAnalysisResponse {
  isValid: boolean;
  correctedSentence: string;
  tokens: Array<{
    word: string;
    lemma: string;
    pos: string;
    role: string;
    notes?: string;
  }>;
  errors: Array<{
    type: string;
    culprit: string;
    fix: string;
    reason: string;
  }>;
  conjugationReference?: {
    verb: string;
    tense: string;
    fullTable?: Record<string, string>;
  };
}

export interface IAIProvider {
  generateDialogueTurn(
    scenarioKey: string,
    history: Array<{ role: 'user' | 'ai'; text: string }>,
    targetLanguage: string,
    cefrLevel: string
  ): Promise<DialogueTurnResponse>;

  analyzeGrammar(
    sentence: string,
    targetLanguage: string
  ): Promise<GrammarAnalysisResponse>;
}

// Deterministic Mock Provider (works offline / with zero API keys)
export class MockAIProvider implements IAIProvider {
  async generateDialogueTurn(
    scenarioKey: string,
    history: Array<{ role: 'user' | 'ai'; text: string }>,
    targetLanguage: string,
    cefrLevel: string
  ): Promise<DialogueTurnResponse> {
    const lastUserMsg = history.filter(h => h.role === 'user').pop()?.text.toLowerCase() || '';

    // Check for common learner mistakes (e.g. German du vs Sie)
    let hasError = false;
    let mistake = '';
    let fix = '';
    let explanation = '';

    if (targetLanguage === 'de' && lastUserMsg.includes('du') && scenarioKey.includes('interview')) {
      hasError = true;
      mistake = 'du';
      fix = 'Sie';
      explanation = "In a formal German job interview, always use the formal polite pronoun 'Sie' rather than casual 'du'.";
    } else if (targetLanguage === 'es' && lastUserMsg.includes('yo querer')) {
      hasError = true;
      mistake = 'yo querer';
      fix = 'quisiera / me gustaría';
      explanation = "In Spanish restaurants, use polite conditional 'quisiera' or 'me gustaría' instead of raw infinitive 'querer'.";
    }

    // Roleplay scenario replies
    const scenarioMap: Record<string, { reply: string; translation: string; phonetic: string }> = {
      italian_cafe: {
        reply: 'Certamente! Desidera un espresso normale o un macchiato?',
        translation: 'Certainly! Would you like a regular espresso or a macchiato?',
        phonetic: 'chehr-tah-MEN-teh! deh-zee-DEH-rah oon ehs-PREHS-soh nohr-MAH-leh oh oon mahk-KYAH-toh?'
      },
      paris_metro: {
        reply: 'Prenez la ligne 1 en direction de La Défense et descendez à Châtelet.',
        translation: 'Take line 1 towards La Défense and get off at Châtelet.',
        phonetic: 'pruh-nay lah leen-yuh uhn ahn dee-rehk-syohn duh lah day-fahns...'
      },
      berlin_interview: {
        reply: 'Guten Tag. Bitte nehmen Sie Platz. Können Sie uns etwas über Ihren Werdegang erzählen?',
        translation: 'Good day. Please have a seat. Could you tell us something about your career background?',
        phonetic: 'GOO-tehn tahk. BIT-teh NAY-mehn zee plahtz...'
      },
      tokyo_hotel: {
        reply: 'いらっしゃいませ。ご予約のお名前をいただけますでしょうか？',
        translation: 'Welcome. May I have the name for the reservation, please?',
        phonetic: 'Irasshaimase. Go-yoyaku no o-namae o itadakemasu deshou ka?'
      },
      madrid_tapas: {
        reply: '¡Buenas! ¿Le traigo unas tapas de jamón ibérico o patatas bravas?',
        translation: 'Hello! Shall I bring you some Iberian ham tapas or patatas bravas?',
        phonetic: 'BWEH-nahs! Leh TRY-goh OO-nahs TAH-pahs...'
      },
      mexico_taxi: {
        reply: 'Buenas tardes, joven. ¿A qué dirección nos dirigimos?',
        translation: 'Good afternoon. What address are we heading to?',
        phonetic: 'BWEH-nahs TAHR-dehs. Ah kay dee-rehk-SYOHN nohs dee-ree-HEE-mohs?'
      }
    };

    const fallbackReply = scenarioMap[scenarioKey] || {
      reply: '¡Muy bien! ¿Qué más le gustaría practicar hoy?',
      translation: 'Very well! What else would you like to practice today?',
      phonetic: 'MOO-ee byehn! Kay mahs leh goos-tah-REE-ah prahk-tee-KAHR oy?'
    };

    return {
      reply: fallbackReply.reply,
      translation: fallbackReply.translation,
      phonetic: fallbackReply.phonetic,
      correction: {
        hasError,
        userMistake: hasError ? mistake : undefined,
        correctedPhrase: hasError ? fix : undefined,
        explanation: hasError ? explanation : undefined
      },
      recommendedReplies: [
        'Un café solo, por favor.',
        '¿Cuánto cuesta esto?',
        'Muchas gracias.'
      ]
    };
  }

  async analyzeGrammar(
    sentence: string,
    targetLanguage: string
  ): Promise<GrammarAnalysisResponse> {
    const words = sentence.trim().split(/\s+/);
    const tokens = words.map((w, i) => ({
      word: w,
      lemma: w.toLowerCase().replace(/[¿?¡!.,]/g, ''),
      pos: i === 0 ? 'NOUN' : i === 1 ? 'VERB' : 'ADJ',
      role: i === 0 ? 'Subject' : i === 1 ? 'Predicate' : 'Modifier',
      notes: ''
    }));

    // Detect sample agreement errors
    const errors = [];
    let isValid = true;
    let corrected = sentence;

    if (sentence.toLowerCase().includes('la problema')) {
      isValid = false;
      corrected = sentence.replace(/la problema/gi, 'el problema');
      errors.push({
        type: 'GENDER_AGREEMENT',
        culprit: 'la problema',
        fix: 'el problema',
        reason: "'Problema' is of Greek origin and takes the masculine article 'el', despite ending in -a."
      });
    }

    if (sentence.toLowerCase().includes('yo sabo')) {
      isValid = false;
      corrected = sentence.replace(/yo sabo/gi, 'yo sé');
      errors.push({
        type: 'IRREGULAR_VERB_CONJUGATION',
        culprit: 'sabo',
        fix: 'sé',
        reason: "The first-person present of 'saber' is irregular ('yo sé', not 'yo sabo')."
      });
    }

    return {
      isValid,
      correctedSentence: corrected,
      tokens,
      errors,
      conjugationReference: {
        verb: 'saber',
        tense: 'Presente de Indicativo',
        fullTable: {
          yo: 'sé',
          tú: 'sabes',
          'él/ella': 'sabe',
          nosotros: 'sabemos',
          ellos: 'saben'
        }
      }
    };
  }
}

