// Verb Conjugation Knowledge Base for Spanish, French, Italian, German, Portuguese
// Supporting: Present, Preterite/Past, Imperfect, Future, Conditional, Subjunctive

export const CONJUGATION_DATABASE = {
  es: {
    language: 'Spanish',
    verbs: {
      ser: {
        infinitive: 'ser',
        meaning: 'to be (permanent essence)',
        isIrregular: true,
        tenses: {
          present: { yo: 'soy', tú: 'eres', él: 'es', nosotros: 'somos', ellos: 'son' },
          preterite: { yo: 'fui', tú: 'fuiste', él: 'fue', nosotros: 'fuimos', ellos: 'fueron' },
          imperfect: { yo: 'era', tú: 'eras', él: 'era', nosotros: 'éramos', ellos: 'eran' },
          future: { yo: 'seré', tú: 'serás', él: 'será', nosotros: 'seremos', ellos: 'serán' },
          conditional: { yo: 'sería', tú: 'serías', él: 'sería', nosotros: 'seríamos', ellos: 'serían' },
          subjunctive: { yo: 'sea', tú: 'seas', él: 'sea', nosotros: 'seamos', ellos: 'sean' }
        }
      },
      estar: {
        infinitive: 'estar',
        meaning: 'to be (temporary state, location)',
        isIrregular: true,
        tenses: {
          present: { yo: 'estoy', tú: 'estás', él: 'está', nosotros: 'estamos', ellos: 'están' },
          preterite: { yo: 'estuve', tú: 'estuviste', él: 'estuvo', nosotros: 'estuvimos', ellos: 'estuvieron' },
          imperfect: { yo: 'estaba', tú: 'estabas', él: 'estaba', nosotros: 'estábamos', ellos: 'estaban' },
          future: { yo: 'estaré', tú: 'estarás', él: 'estará', nosotros: 'estaremos', ellos: 'estarán' },
          conditional: { yo: 'estaría', tú: 'estarías', él: 'estaría', nosotros: 'estaríamos', ellos: 'estarían' },
          subjunctive: { yo: 'esté', tú: 'estés', él: 'esté', nosotros: 'estemos', ellos: 'estén' }
        }
      },
      tener: {
        infinitive: 'tener',
        meaning: 'to have',
        isIrregular: true,
        tenses: {
          present: { yo: 'tengo', tú: 'tienes', él: 'tiene', nosotros: 'tenemos', ellos: 'tienen' },
          preterite: { yo: 'tuve', tú: 'tuviste', él: 'tuvo', nosotros: 'tuvimos', ellos: 'tuvieron' },
          imperfect: { yo: 'tenía', tú: 'tenías', él: 'tenía', nosotros: 'teníamos', ellos: 'tenían' },
          future: { yo: 'tendré', tú: 'tendrás', él: 'tendrá', nosotros: 'tendremos', ellos: 'tendrán' },
          conditional: { yo: 'tendría', tú: 'tendrías', él: 'tendría', nosotros: 'tendríamos', ellos: 'tendrían' },
          subjunctive: { yo: 'tenga', tú: 'tengas', él: 'tenga', nosotros: 'tengamos', ellos: 'tengan' }
        }
      },
      hablar: {
        infinitive: 'hablar',
        meaning: 'to speak',
        isIrregular: false,
        tenses: {
          present: { yo: 'hablo', tú: 'hablas', él: 'habla', nosotros: 'hablamos', ellos: 'hablan' },
          preterite: { yo: 'hablé', tú: 'hablaste', él: 'habló', nosotros: 'hablamos', ellos: 'hablaron' },
          imperfect: { yo: 'hablaba', tú: 'hablabas', él: 'hablaba', nosotros: 'hablábamos', ellos: 'hablaban' },
          future: { yo: 'hablaré', tú: 'hablarás', él: 'hablará', nosotros: 'hablaremos', ellos: 'hablarán' },
          conditional: { yo: 'hablaría', tú: 'hablarías', él: 'hablaría', nosotros: 'hablaríamos', ellos: 'hablarían' },
          subjunctive: { yo: 'hable', tú: 'hables', él: 'hable', nosotros: 'hablemos', ellos: 'hablen' }
        }
      }
    }
  },
  fr: {
    language: 'French',
    verbs: {
      etre: {
        infinitive: 'être',
        meaning: 'to be',
        isIrregular: true,
        tenses: {
          present: { je: 'suis', tu: 'es', 'il/elle': 'est', nous: 'sommes', vous: 'êtes', 'ils/elles': 'sont' },
          preterite: { je: 'fus', tu: 'fus', 'il/elle': 'fut', nous: 'fûmes', vous: 'fûtes', 'ils/elles': 'furent' },
          imperfect: { je: 'étais', tu: 'étais', 'il/elle': 'était', nous: 'étions', vous: 'étiez', 'ils/elles': 'étaient' },
          future: { je: 'serai', tu: 'seras', 'il/elle': 'sera', nous: 'serons', vous: 'serez', 'ils/elles': 'seront' },
          conditional: { je: 'serais', tu: 'serais', 'il/elle': 'serait', nous: 'serions', vous: 'seriez', 'ils/elles': 'seraient' },
          subjunctive: { je: 'sois', tu: 'sois', 'il/elle': 'soit', nous: 'soyons', vous: 'soyez', 'ils/elles': 'soient' }
        }
      },
      avoir: {
        infinitive: 'avoir',
        meaning: 'to have',
        isIrregular: true,
        tenses: {
          present: { je: "ai", tu: 'as', 'il/elle': 'a', nous: 'avons', vous: 'avez', 'ils/elles': 'ont' },
          preterite: { je: 'eus', tu: 'eus', 'il/elle': 'eut', nous: 'eûmes', vous: 'eûtes', 'ils/elles': 'eurent' },
          imperfect: { je: 'avais', tu: 'avais', 'il/elle': 'avait', nous: 'avions', vous: 'aviez', 'ils/elles': 'avaient' },
          future: { je: 'aurai', tu: 'auras', 'il/elle': 'aura', nous: 'aurons', vous: 'aurez', 'ils/elles': 'auront' },
          conditional: { je: 'aurais', tu: 'aurais', 'il/elle': 'aurait', nous: 'aurions', vous: 'auriez', 'ils/elles': 'auraient' },
          subjunctive: { je: 'aie', tu: 'aies', 'il/elle': 'ait', nous: 'ayons', vous: 'ayez', 'ils/elles': 'aient' }
        }
      }
    }
  },
  de: {
    language: 'German',
    verbs: {
      sein: {
        infinitive: 'sein',
        meaning: 'to be',
        isIrregular: true,
        tenses: {
          present: { ich: 'bin', du: 'bist', 'er/sie': 'ist', wir: 'sind', ihr: 'seid', 'sie/Sie': 'sind' },
          preterite: { ich: 'war', du: 'warst', 'er/sie': 'war', wir: 'waren', ihr: 'wart', 'sie/Sie': 'waren' },
          future: { ich: 'werde sein', du: 'wirst sein', 'er/sie': 'wird sein', wir: 'werden sein', ihr: 'werdet sein', 'sie/Sie': 'werden sein' },
          subjunctive: { ich: 'wäre', du: 'wärest', 'er/sie': 'wäre', wir: 'wären', ihr: 'wäret', 'sie/Sie': 'wären' }
        }
      },
      haben: {
        infinitive: 'haben',
        meaning: 'to have',
        isIrregular: true,
        tenses: {
          present: { ich: 'habe', du: 'hast', 'er/sie': 'hat', wir: 'haben', ihr: 'habt', 'sie/Sie': 'haben' },
          preterite: { ich: 'hatte', du: 'hattest', 'er/sie': 'hatte', wir: 'hatten', ihr: 'hattet', 'sie/Sie': 'hatten' },
          future: { ich: 'werde haben', du: 'wirst haben', 'er/sie': 'wird haben', wir: 'werden haben', ihr: 'werdet haben', 'sie/Sie': 'werden haben' },
          subjunctive: { ich: 'hätte', du: 'hättest', 'er/sie': 'hätte', wir: 'hätten', ihr: 'hättet', 'sie/Sie': 'hätten' }
        }
      }
    }
  },
  it: {
    language: 'Italian',
    verbs: {
      essere: {
        infinitive: 'essere',
        meaning: 'to be',
        isIrregular: true,
        tenses: {
          present: { io: 'sono', tu: 'sei', 'lui/lei': 'è', noi: 'siamo', voi: 'siete', loro: 'sono' },
          preterite: { io: 'fui', tu: 'fosti', 'lui/lei': 'fu', noi: 'fummo', voi: 'foste', loro: 'furono' },
          imperfect: { io: 'ero', tu: 'eri', 'lui/lei': 'era', noi: 'eravamo', voi: 'eravate', loro: 'erano' },
          future: { io: 'sarò', tu: 'sarai', 'lui/lei': 'sarà', noi: 'saremo', voi: 'sarete', loro: 'saranno' },
          conditional: { io: 'sarei', tu: 'saresti', 'lui/lei': 'sarebbe', noi: 'saremmo', voi: 'sareste', loro: 'sarebbero' },
          subjunctive: { io: 'sia', tu: 'sia', 'lui/lei': 'sia', noi: 'siamo', voi: 'siate', loro: 'siano' }
        }
      },
      avere: {
        infinitive: 'avere',
        meaning: 'to have',
        isIrregular: true,
        tenses: {
          present: { io: 'ho', tu: 'hai', 'lui/lei': 'ha', noi: 'abbiamo', voi: 'avete', loro: 'hanno' },
          preterite: { io: 'ebbi', tu: 'avesti', 'lui/lei': 'ebbe', noi: 'avemmo', voi: 'aveste', loro: 'ebbero' },
          imperfect: { io: 'avevo', tu: 'avevi', 'lui/lei': 'aveva', noi: 'avevamo', voi: 'avevate', loro: 'avevano' },
          future: { io: 'avrò', tu: 'avrai', 'lui/lei': 'avrà', noi: 'avremo', voi: 'avrete', loro: 'avranno' },
          conditional: { io: 'avrei', tu: 'avresti', 'lui/lei': 'avrebbe', noi: 'avremmo', voi: 'avreste', loro: 'avrebbero' },
          subjunctive: { io: 'abbia', tu: 'abbia', 'lui/lei': 'abbia', noi: 'abbiamo', voi: 'abbiate', loro: 'abbiano' }
        }
      }
    }
  }
};

