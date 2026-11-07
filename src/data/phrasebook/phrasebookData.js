// Multi-Language Travel Phrasebook Data (8 Core Domains + Emergency Mode)
// Covers Spanish, French, German, Italian, and Japanese

export const PHRASEBOOK_DATA = {
  es: {
    language: 'Spanish',
    categories: [
      {
        slug: 'emergency',
        title: 'Emergency & Urgent',
        icon: '🚨',
        isEmergency: true,
        phrases: [
          { source: 'Help me, please!', target: '¡Ayúdeme, por favor!', phonetic: 'ah-YOO-deh-meh por fah-VOR', emergency: true },
          { source: 'Call the police!', target: '¡Llame a la policía!', phonetic: 'YAH-meh ah lah poh-lee-SEE-ah', emergency: true },
          { source: 'I need a doctor.', target: 'Necesito un médico.', phonetic: 'neh-seh-SEE-toh oon MEH-dee-koh', emergency: true },
          { source: 'Where is the hospital?', target: '¿Dónde está el hospital?', phonetic: 'DOHN-deh eh-STAH el ohs-pee-TAHL', emergency: true },
          { source: 'I lost my passport.', target: 'He perdido mi pasaporte.', phonetic: 'eh pehr-DEE-doh mee pah-sah-POHR-teh', emergency: true },
          { source: 'There is a fire!', target: '¡Hay un incendio!', phonetic: 'eye oon een-SEHN-dyoh', emergency: true }
        ]
      },
      {
        slug: 'medical',
        title: 'Medical & Pharmacy',
        icon: '💊',
        isEmergency: true,
        phrases: [
          { source: 'I am allergic to penicillin / peanuts.', target: 'Soy alérgico a la penicilina / los cacahuates.', phonetic: 'soy ah-LEHR-hee-koh ah...' },
          { source: 'I have a fever and headache.', target: 'Tengo fiebre y dolor de cabeza.', phonetic: 'TEHN-goh FYEH-breh ee doh-LOHR deh kah-BEH-sah' },
          { source: 'Do you have pain relievers?', target: '¿Tiene analgésicos?', phonetic: 'TYEH-neh ah-nahl-HEH-see-kohs' },
          { source: 'Where is the pharmacy?', target: '¿Dónde hay una farmacia?', phonetic: 'DOHN-deh eye OO-nah fahr-MAH-syah' }
        ]
      },
      {
        slug: 'greetings',
        title: 'Social & Greetings',
        icon: '🤝',
        phrases: [
          { source: 'Hello / Good morning', target: 'Hola / Buenos días', phonetic: 'OH-lah / BWEH-nohs DEE-ahs' },
          { source: 'Thank you very much', target: 'Muchas gracias', phonetic: 'MOO-chahs GRAH-syahs' },
          { source: 'Nice to meet you!', target: '¡Mucho gusto!', phonetic: 'MOO-choh GOO-stoh' },
          { source: 'Do you speak English?', target: '¿Habla usted inglés?', phonetic: 'AH-blah oo-STEHD een-GLEHS' }
        ]
      },
      {
        slug: 'dining',
        title: 'Dining & Dietary',
        icon: '🍽️',
        phrases: [
          { source: 'A table for two, please.', target: 'Una mesa para dos, por favor.', phonetic: 'OO-nah MEH-sah PAH-rah dohs...' },
          { source: 'The bill, please.', target: 'La cuenta, por favor.', phonetic: 'lah KWEN-tah por fah-VOR' },
          { source: 'Is this dish vegetarian?', target: '¿Este plato es vegetariano?', phonetic: 'EHS-teh PLAH-toh ehs veh-heh-tah-RYAH-noh' },
          { source: 'Still water, please.', target: 'Agua sin gas, por favor.', phonetic: 'AH-gwah seen gahs por fah-VOR' }
        ]
      },
      {
        slug: 'transit',
        title: 'Transit & Directions',
        icon: '🚆',
        phrases: [
          { source: 'Where is the train station?', target: '¿Dónde está la estación de tren?', phonetic: 'DOHN-deh eh-STAH lah eh-stah-SYOHN deh trehn' },
          { source: 'A ticket to Madrid, please.', target: 'Un billete para Madrid, por favor.', phonetic: 'oon beel-YEH-teh PAH-rah mah-DREED...' },
          { source: 'Where is the bathroom?', target: '¿Dónde está el baño?', phonetic: 'DOHN-deh eh-STAH el BAH-nyoh' }
        ]
      }
    ]
  },
  fr: {
    language: 'French',
    categories: [
      {
        slug: 'emergency',
        title: 'Urgence & Sécurité',
        icon: '🚨',
        isEmergency: true,
        phrases: [
          { source: 'Help me, please!', target: "Aidez-moi, s'il vous plaît !", phonetic: 'ay-DAY mwah seel voo play', emergency: true },
          { source: 'Call the police!', target: 'Appelez la police !', phonetic: 'ah-play lah poh-LEES', emergency: true },
          { source: 'I need a doctor.', target: "J'ai besoin d'un médecin.", phonetic: 'zhay buh-ZWAN duhn mayd-SAN', emergency: true },
          { source: 'Where is the hospital?', target: "Où est l'hôpital ?", phonetic: 'oo ay loh-pee-TAHL', emergency: true }
        ]
      },
      {
        slug: 'greetings',
        title: 'Salutations & Politesse',
        icon: '🤝',
        phrases: [
          { source: 'Hello / Good day', target: 'Bonjour', phonetic: 'bohn-ZHOOR' },
          { source: 'Thank you very much', target: 'Merci beaucoup', phonetic: 'mehr-SEE boh-KOO' },
          { source: 'Please', target: "S'il vous plaît", phonetic: 'seel voo play' },
          { source: 'Excuse me', target: 'Pardon / Excusez-moi', phonetic: 'pahr-DOHN / ehk-skew-zay MWAH' }
        ]
      },
      {
        slug: 'dining',
        title: 'Au Café & Restaurant',
        icon: '🥐',
        phrases: [
          { source: 'A table for two, please.', target: "Une table pour deux, s'il vous plaît.", phonetic: 'ewn TAH-bluh poor duh...' },
          { source: 'The check, please.', target: "L'addition, s'il vous plaît.", phonetic: 'lah-dee-SYOHN seel voo play' },
          { source: 'A croissant and coffee, please.', target: "Un croissant et un café, s'il vous plaît.", phonetic: 'uhn krwah-SAHN ay uhn kah-FAY...' },
          { source: 'Is this gluten-free?', target: 'Est-ce sans gluten ?', phonetic: 'ess sahn glew-TEN' }
        ]
      },
      {
        slug: 'transit',
        title: 'Transports & Métro',
        icon: '🚇',
        phrases: [
          { source: 'Where is the metro station?', target: 'Où est la station de métro ?', phonetic: 'oo ay lah stah-SYOHN duh may-TROH' },
          { source: 'A ticket to Paris, please.', target: "Un billet pour Paris, s'il vous plaît.", phonetic: 'uhn bee-YAY poor pah-REE...' },
          { source: 'Where are the toilets?', target: 'Où sont les toilettes ?', phonetic: 'oo sohn lay twah-LEHT' }
        ]
      }
    ]
  },
  de: {
    language: 'German',
    categories: [
      {
        slug: 'emergency',
        title: 'Notfall & Hilfe',
        icon: '🚨',
        isEmergency: true,
        phrases: [
          { source: 'Help me, please!', target: 'Helfen Sie mir bitte!', phonetic: 'HEL-fen zee meer BIT-teh', emergency: true },
          { source: 'Call the police!', target: 'Rufen Sie die Polizei!', phonetic: 'ROO-fen zee dee poh-lee-TSY', emergency: true },
          { source: 'I need a doctor.', target: 'Ich brauche einen Arzt.', phonetic: 'ikh BROW-khe EYE-nen ahtst', emergency: true },
          { source: 'Where is the hospital?', target: 'Wo ist das Krankenhaus?', phonetic: 'voh ist dahs KRAHN-ken-hows', emergency: true }
        ]
      },
      {
        slug: 'greetings',
        title: 'Begrüßung & Höflichkeit',
        icon: '🤝',
        phrases: [
          { source: 'Good day / Hello', target: 'Guten Tag / Hallo', phonetic: 'GOO-ten tahk / HAH-loh' },
          { source: 'Thank you very much', target: 'Vielen Dank', phonetic: 'FEE-len dahnk' },
          { source: 'Please / You are welcome', target: 'Bitte schön', phonetic: 'BIT-teh shoen' },
          { source: 'Do you speak English?', target: 'Sprechen Sie Englisch?', phonetic: 'SHPREKH-en zee ENG-lish' }
        ]
      },
      {
        slug: 'dining',
        title: 'Essen & Trinken',
        icon: '🍺',
        phrases: [
          { source: 'A table for two, please.', target: 'Einen Tisch für zwei, bitte.', phonetic: 'EYE-nen tish fewer tsvy BIT-teh' },
          { source: 'The bill, please.', target: 'Die Rechnung, bitte.', phonetic: 'dee REKH-noong BIT-teh' },
          { source: 'A mineral water, please.', target: 'Ein Mineralwasser, bitte.', phonetic: 'ine mee-neh-RAHL-vah-ser BIT-teh' },
          { source: 'Is this vegetarian?', target: 'Ist das vegetarisch?', phonetic: 'ist dahs veh-geh-TAH-rish' }
        ]
      },
      {
        slug: 'transit',
        title: 'Bahn & Richtungen',
        icon: '🚆',
        phrases: [
          { source: 'Where is the central station?', target: 'Wo ist der Hauptbahnhof?', phonetic: 'voh ist dair HOWPT-bahn-hohf' },
          { source: 'A ticket to Berlin, please.', target: 'Eine Fahrkarte nach Berlin, bitte.', phonetic: 'EYE-neh FAHR-kahr-teh nahkh bair-LEEN BIT-teh' },
          { source: 'Where is the bathroom?', target: 'Wo ist die Toilette?', phonetic: 'voh ist dee twah-LET-teh' }
        ]
      }
    ]
  },
  it: {
    language: 'Italian',
    categories: [
      {
        slug: 'emergency',
        title: 'Emergenza & Soccorso',
        icon: '🚨',
        isEmergency: true,
        phrases: [
          { source: 'Help me, please!', target: 'Aiuto, per favore!', phonetic: 'ah-YOO-toh pehr fah-VOH-reh', emergency: true },
          { source: 'Call an ambulance!', target: "Chiami un'ambulanza!", phonetic: 'KYAH-mee oon ahm-boo-LAHN-tsah', emergency: true },
          { source: 'Call the police!', target: 'Chiami la polizia!', phonetic: 'KYAH-mee lah poh-lee-TSEE-ah', emergency: true },
          { source: 'Where is the hospital?', target: "Dov'è l'ospedale?", phonetic: 'doh-VEH lohs-peh-DAH-leh', emergency: true }
        ]
      },
      {
        slug: 'greetings',
        title: 'Saluti & Sociale',
        icon: '🤝',
        phrases: [
          { source: 'Hello / Good morning', target: 'Buongiorno / Ciao', phonetic: 'bwohn-JOHR-noh / CHOW' },
          { source: 'Thank you very much', target: 'Grazie mille', phonetic: 'GRAH-tsyeh MEEL-leh' },
          { source: 'Please', target: 'Per favore', phonetic: 'pehr fah-VOH-reh' },
          { source: 'Nice to meet you!', target: 'Piacere di conoscerti!', phonetic: 'pyah-CHEH-reh dee koh-NOH-shehr-tee' }
        ]
      },
      {
        slug: 'dining',
        title: 'Al Bar & Al Ristorante',
        icon: '☕',
        phrases: [
          { source: 'An espresso at the counter, please.', target: 'Un caffè al banco, per favore.', phonetic: 'oon kahf-FEH ahl BAHN-koh...' },
          { source: 'The check, please.', target: 'Il conto, per favore.', phonetic: 'eel KOHN-toh pehr fah-VOH-reh' },
          { source: 'A table for two, please.', target: 'Un tavolo per due, per favore.', phonetic: 'oon TAH-voh-loh pehr DOO-eh...' },
          { source: 'Is this gluten-free?', target: 'È senza glutine?', phonetic: 'eh SEHN-tsah GLOO-tee-neh' }
        ]
      },
      {
        slug: 'transit',
        title: 'Treno & Direzioni',
        icon: '🚆',
        phrases: [
          { source: 'Where is the train station?', target: "Dov'è la stazione ferroviaria?", phonetic: 'doh-VEH lah stah-TSYOH-neh...' },
          { source: 'A ticket to Rome, please.', target: 'Un biglietto per Roma, per favore.', phonetic: 'oon beel-YEHT-toh pehr ROH-mah...' },
          { source: 'Where is the bathroom?', target: "Dov'è il bagno?", phonetic: 'doh-VEH eel BAH-nyoh' }
        ]
      }
    ]
  },
  ja: {
    language: 'Japanese',
    categories: [
      {
        slug: 'emergency',
        title: '緊急 & 助け (Emergency)',
        icon: '🚨',
        isEmergency: true,
        phrases: [
          { source: 'Help me, please!', target: '助けてください！', phonetic: 'Tasukete kudasai!', emergency: true },
          { source: 'Call the police!', target: '警察を呼んでください！', phonetic: 'Keisatsu o yonde kudasai!', emergency: true },
          { source: 'I need a doctor.', target: '医者が必要です。', phonetic: 'Isha ga hitsuyō desu.', emergency: true },
          { source: 'Where is the hospital?', target: '病院はどこですか？', phonetic: 'Byōin wa doko desu ka?', emergency: true }
        ]
      },
      {
        slug: 'greetings',
        title: '挨拶 & 礼儀 (Greetings)',
        icon: '🤝',
        phrases: [
          { source: 'Hello / Good afternoon', target: 'こんにちは', phonetic: 'Konnichiwa' },
          { source: 'Thank you very much', target: 'ありがとうございます', phonetic: 'Arigatō gozaimasu' },
          { source: 'Excuse me / Sorry', target: 'すみません', phonetic: 'Sumimasen' },
          { source: 'Do you speak English?', target: '英語を話せますか？', phonetic: 'Eigo o hanasemasu ka?' }
        ]
      },
      {
        slug: 'dining',
        title: '飲食店 & 注文 (Dining)',
        icon: '🍱',
        phrases: [
          { source: 'A table for two, please.', target: '二名です、お願いします。', phonetic: 'Ni-mei desu, onegaishimasu.' },
          { source: 'The check, please.', target: 'お会計をお願いします。', phonetic: 'O-kaikei o onegaishimasu.' },
          { source: 'Water, please.', target: 'お水をお願いします。', phonetic: 'O-mizu o onegaishimasu.' },
          { source: 'It was delicious!', target: 'ごちそうさまでした！', phonetic: 'Gochisōsama deshita!' }
        ]
      },
      {
        slug: 'transit',
        title: '駅 & 道案内 (Transit)',
        icon: '🚅',
        phrases: [
          { source: 'Where is the station?', target: '駅はどこですか？', phonetic: 'Eki wa doko desu ka?' },
          { source: 'Where is the restroom?', target: 'お手洗いはどこですか？', phonetic: 'O-tearai wa doko desu ka?' },
          { source: 'A ticket to Kyoto, please.', target: '京都までの切符を一枚ください。', phonetic: 'Kyōto made no kippu o ichimai kudasai.' }
        ]
      }
    ]
  }
};

export function getPhrasebook(langCode = 'es') {
  return PHRASEBOOK_DATA[langCode] || PHRASEBOOK_DATA.es;
}
