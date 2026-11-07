// Extended Cultural Data: 5 Historical Milestones, 5 Dos & 5 Don'ts, and 5 Cultural Quiz Questions per language

export const CULTURE_EXTENDED = {
  es: {
    timeline: [
      { year: "218 BC", title: "Roman Conquest of Hispania", description: "Vulgar Latin is introduced across the Iberian peninsula, displacing pre-Roman Celtic and Iberian tongues." },
      { year: "711 AD", title: "Moorish Influence & Arabic Lexicon", description: "Nearly 8 centuries of Moorish presence embeds over 4,000 Arabic loanwords into Spanish (almohada, azúcar, ojalá)." },
      { year: "1250", title: "Alfonso X Establishes Castilian", description: "King Alfonso X the Wise makes Castilian the official language of government and commissions translations of science and law." },
      { year: "1492", title: "Nebrija's Grammar & Transatlantic Expansion", description: "Antonio de Nebrija publishes the first grammar of a modern European language; Columbus voyages to the Americas." },
      { year: "1713", title: "Founding of the Real Academia Española (RAE)", description: "The RAE is created with the motto 'Limpia, fija y da esplendor' to standardize spelling and grammar globally." }
    ],
    etiquette: {
      dos: [
        { rule: "Greet with two kisses (dos besos)", context: "When introduced socially in Spain, touch right cheek to right, then left to left. In Latin America, one cheek kiss is standard." },
        { rule: "Use 'Usted' with elders and officials", context: "Switching to formal register demonstrates deep respect unless the person invites you to use 'tú' ('puedes tutearme')." },
        { rule: "Embrace the 'Sobremesa'", context: "Never rush away immediately after a meal. Lingering for conversation, coffee, and digestifs for an hour is essential hospitality." },
        { rule: "Say 'Buen provecho' when people are eating", context: "Whether joining a table or walking past someone dining, wishing them a good meal is polite etiquette." },
        { rule: "Keep hands visible above the table", context: "Rest wrists gently on the table edge while eating rather than hiding hands on your lap." }
      ],
      donts: [
        { rule: "Don't expect lunch at 12:00 PM", context: "In Spain, lunch is served between 2:00 PM and 4:00 PM, and dinner rarely begins before 9:30 PM." },
        { rule: "Don't arrive exactly on the minute for dinner parties", context: "Arriving 10 to 15 minutes late is socially expected; arriving early catches the host unprepared." },
        { rule: "Don't tip excessively (15-20%)", context: "Service is included by law in Spain and Latin America. Rounding up or leaving 5-10% for exceptional dining is customary." },
        { rule: "Don't initiate business talk immediately", context: "Spanish-speaking culture values personal relationship and rapport building before diving into transactions." },
        { rule: "Don't confuse regional languages", context: "Be mindful that Catalan, Basque (Euskara), and Galician are distinct co-official languages, not Spanish dialects." }
      ]
    },
    quiz: {
      badgeId: "badge-es-culture",
      badgeTitle: "Iberian & Latino Explorer",
      badgeIcon: "🇪🇸",
      xpReward: 50,
      questions: [
        {
          id: "es-q1",
          question: "¿Qué acontecimiento lingüístico ocurrió en el año 1492?",
          options: ["La conquista romana", "La publicación de la primera gramática de Nebrija", "La fundación de la RAE", "La creación de la sobremesa"],
          correctIndex: 1,
          explanation: "Antonio de Nebrija publicó la 'Gramática de la lengua castellana' en 1492, la primera en un idioma romance europeo."
        },
        {
          id: "es-q2",
          question: "¿Aproximadamente cuántas palabras del árabe existen en el español moderno?",
          options: ["Menos de 100", "Alrededor de 4,000", "Más de 50,000", "Ninguna"],
          correctIndex: 1,
          explanation: "Ocho siglos de convivencia dejaron más de 4,000 palabras de origen árabe en el léxico castellano."
        },
        {
          id: "es-q3",
          question: "¿Qué es la 'sobremesa' en la cultura hispanohablante?",
          options: ["El postre principal", "Conversar tranquilamente en la mesa después de comer", "Poner los platos en el lavavajillas", "Pagar la cuenta por separado"],
          correctIndex: 1,
          explanation: "La sobremesa es la entrañable costumbre de prolongar la charla en la mesa tras terminar el almuerzo o cena."
        },
        {
          id: "es-q4",
          question: "¿A qué hora se acostumbra almorzar tradicionalmente en España?",
          options: ["11:30 AM", "12:00 PM", "Entre las 14:00 y las 16:00", "A las 18:00"],
          correctIndex: 2,
          explanation: "El almuerzo es la comida fuerte del día y tiene lugar entre las dos y las cuatro de la tarde."
        },
        {
          id: "es-q5",
          question: "¿Cuál de estos NO es un dialecto del español, sino un idioma independiente y cooficial?",
          options: ["El andaluz", "El euskera (vasco)", "El canario", "El rioplatense"],
          correctIndex: 1,
          explanation: "El euskera es un idioma aislado pre-indoeuropeo que no guarda relación genética con el castellano."
        }
      ]
    }
  },

  fr: {
    timeline: [
      { year: "842 AD", title: "Oaths of Strasbourg", description: "The oldest extant written document in Old French, signaling divergence from Vulgar Latin." },
      { year: "1539", title: "Ordinance of Villers-Cotterêts", description: "King Francis I decrees French the sole official language of administration and justice over Latin." },
      { year: "1635", title: "Founding of the Académie Française", description: "Cardinal Richelieu establishes the Académie to safeguard and standardize the French language." },
      { year: "1784", title: "Rivarol's Universal Language Discourse", description: "French becomes the lingua franca of Enlightenment European diplomacy, nobility, and arts." },
      { year: "1970", title: "Creation of the Francophonie", description: "Global alliance of 88 member nations celebrating shared linguistic and cultural heritage." }
    ],
    etiquette: {
      dos: [
        { rule: "Always say 'Bonjour Madame / Monsieur' upon entering", context: "Entering a bakery, shop, or elevator without saying 'Bonjour' is perceived as disrespectful." },
        { rule: "Use 'Vous' until invited to 'Tutoyer'", context: "Switching to 'Tu' without explicit permission ('On peut se tutoyer ?') is overly intimate." },
        { rule: "Tear bread with your hands, don't cut it", context: "Never slice your baguette with a knife at the dining table; break off bite-sized morsels by hand." },
        { rule: "Keep hands resting on the table", context: "Both hands should remain visible, resting wrists gently beside your plate." },
        { rule: "Wait until everyone is served and say 'Bon appétit'", context: "Dining is a shared collective experience that begins together." }
      ],
      donts: [
        { rule: "Don't speak excessively loudly in public", context: "Loud speaking in bistros or on the metro is considered unrefined and disruptive." },
        { rule: "Don't ask for a 'doggy bag' unless casually offered", context: "Taking food home from upscale dining was historically considered faux pas, though changing recently." },
        { rule: "Don't eat on the go while walking down the street", context: "French culture savors food seated; walking while wolfing down meals is discouraged." },
        { rule: "Don't place bread upside down on the table", context: "An ancient superstition linked upside-down bread to the executioner's portion." },
        { rule: "Don't start eating before the host or hostess", context: "Wait until the host takes their napkin or raises their glass." }
      ]
    },
    quiz: {
      badgeId: "badge-fr-culture",
      badgeTitle: "Francophone Connoisseur",
      badgeIcon: "🇫🇷",
      xpReward: 50,
      questions: [
        {
          id: "fr-q1",
          question: "Quel est le plus ancien document écrit en ancien français connu ?",
          options: ["Le Code Napoléon", "Les Serments de Strasbourg (842)", "La Déclaration des Droits de l'Homme", "Les Misérables"],
          correctIndex: 1,
          explanation: "Les Serments de Strasbourg (842) constituent le premier texte rédigé en langue romane pré-française."
        },
        {
          id: "fr-q2",
          question: "Quelle institution linguistique a été fondée en 1635 par le cardinal de Richelieu ?",
          options: ["L'Académie Française", "Le Louvre", "La Sorbonne", "L'UNESCO"],
          correctIndex: 0,
          explanation: "L'Académie Française a été créée pour normaliser et perfectionner la langue française."
        },
        {
          id: "fr-q3",
          question: "Que doit-on toujours dire impérativement en entrant dans une boutique en France ?",
          options: ["Rien du tout", "Bonjour Madame / Monsieur", "Donnez-moi du pain", "Combien ça coûte ?"],
          correctIndex: 1,
          explanation: "Saluer poliment d'un 'Bonjour' est le fondement incontournable de la politesse française."
        },
        {
          id: "fr-q4",
          question: "Comment doit-on manger le pain à table ?",
          options: ["Le couper avec un grand couteau", "Le rompre à la main en petits morceaux", "L'avaler tout entier", "Le tremper dans le verre de vin"],
          correctIndex: 1,
          explanation: "La tradition exige de rompre le pain délicatement avec les doigts."
        },
        {
          id: "fr-q5",
          question: "Que signifie le verbe 'tutoyer' ?",
          options: ["Parler de météo", "Utiliser le pronom familier 'tu'", "Nettoyer la table", "Chanter une chanson"],
          correctIndex: 1,
          explanation: "'Tutoyer' signifie s'adresser à quelqu'un en utilisant 'tu' plutôt que le formel 'vous'."
        }
      ]
    }
  },

  de: {
    timeline: [
      { year: "750 AD", title: "Old High German Emerges", description: "First written glosses and religious texts appear in Bavarian and Alemannic dialects." },
      { year: "1522", title: "Martin Luther's Bible Translation", description: "Luther translates the New Testament into East Central German, forging the basis of Modern Standard German (Hochdeutsch)." },
      { year: "1770", title: "Weimar Classicism & Goethe", description: "Goethe and Schiller establish the zenith of German literary and philosophical vocabulary." },
      { year: "1854", title: "The Brothers Grimm Dictionary", description: "Jacob and Wilhelm Grimm begin the 'Deutsches Wörterbuch', the most comprehensive historical lexicon of the language." },
      { year: "1996", title: "Rechtschreibreform", description: "Official spelling reform across Germany, Austria, and Switzerland standardizing ss/ß and compound rules." }
    ],
    etiquette: {
      dos: [
        { rule: "Be punctual to the minute (Pünktlichkeit)", context: "Arriving 5 minutes early is on time; arriving 5 minutes late requires a sincere apology." },
        { rule: "Maintain direct, confident eye contact during toasts", context: "Clink glasses, say 'Prost!' or 'Zum Wohl!', and look directly into the eyes to avoid 7 years of bad luck." },
        { rule: "Use formal titles and 'Sie'", context: "Address doctors, professors, and elders with 'Herr Dr. Schmidt' or 'Frau Müller' until invited to use first names." },
        { rule: "Separate recyclables conscientiously (Mülltrennung)", context: "Germans take waste sorting very seriously: paper, yellow bag (packaging), glass, and bio." },
        { rule: "Honor the 'Ruhezeit' (quiet hours)", context: "Sundays and evenings after 10:00 PM are quiet hours; no loud drilling or mowing lawns." }
      ],
      donts: [
        { rule: "Don't cross the street on a red pedestrian light (Ampelmännchen)", context: "Even if no cars are coming, crossing on red is strongly frowned upon, especially around children." },
        { rule: "Don't wish someone happy birthday early", context: "Superstition holds that wishing early ('vorfeiern') brings profound misfortune." },
        { rule: "Don't keep your hands in your pockets while speaking", context: "Speaking with hands buried in pockets is considered disrespectful or indifferent." },
        { rule: "Don't be offended by directness (Direktheit)", context: "Germans communicate feedback transparently without sugarcoating; it is intended constructively, not rudely." },
        { rule: "Don't enter a sauna in a bathing suit", context: "Saunas in Germany are strictly textile-free (FKK) for hygiene reasons." }
      ]
    },
    quiz: {
      badgeId: "badge-de-culture",
      badgeTitle: "Teutonic Virtuoso",
      badgeIcon: "🇩🇪",
      xpReward: 50,
      questions: [
        {
          id: "de-q1",
          question: "Wer schuf 1522 mit seiner Bibelübersetzung das Fundament des modernen Hochdeutsch?",
          options: ["Johann Wolfgang von Goethe", "Martin Luther", "Die Brüder Grimm", "Friedrich Schiller"],
          correctIndex: 1,
          explanation: "Martin Luthers Übersetzung der Bibel vereinigte die deutschen Dialekte zu einer gemeinsamen Schriftsprache."
        },
        {
          id: "de-q2",
          question: "Was bedeutet 'Pünktlichkeit' im Alltag in Deutschland?",
          options: ["30 Minuten später kommen", "Exakt zur vereinbarten Zeit da sein", "Vor Mitternacht ankommen", "Wann immer man Zeit hat"],
          correctIndex: 1,
          explanation: "Pünktlichkeit gilt als Zeichen des gegenseitigen Respekts und der Verlässlichkeit."
        },
        {
          id: "de-q3",
          question: "Was sollte man beim Anstoßen ('Prost!') unbedingt tun?",
          options: ["Auf den Boden schauen", "Dem Gegenüber direkt in die Augen schauen", "Das Glas zerspringen lassen", "Die Augen schließen"],
          correctIndex: 1,
          explanation: "Direkter Blickkontakt beim Anstoßen ist traditionell obligatorisch."
        },
        {
          id: "de-q4",
          question: "Welcher Tag gilt in Deutschland traditionell als gesetzlich geschützte 'Ruhezeit'?",
          options: ["Mittwoch", "Freitagabend", "Sonntag", "Montagmorgen"],
          correctIndex: 2,
          explanation: "Am Sonntag ruht die laute Arbeit; Rasenmähen oder Baulärm sind verboten."
        },
        {
          id: "de-q5",
          question: "Welches Sprachdenkmal begannen die Brüder Grimm 1854?",
          options: ["Ein Kochbuch", "Das Deutsche Wörterbuch", "Einen Atlas", "Einen Reiseführer"],
          correctIndex: 1,
          explanation: "Das 'Deutsche Wörterbuch' der Brüder Grimm ist das monumentalste etymologische Lexikon der deutschen Sprache."
        }
      ]
    }
  },

  it: {
    timeline: [
      { year: "1320", title: "Dante's Divine Comedy", description: "Dante Alighieri writes in the vernacular Florentine dialect, establishing it as the standard literary Italian." },
      { year: "1583", title: "Accademia della Crusca", description: "Founded in Florence, it creates the world's first modern dictionary ('Vocabolario') in 1612." },
      { year: "1600", title: "The Language of Opera and Music", description: "Italian becomes the universal terminology of classical music (allegro, forte, soprano, tempo)." },
      { year: "1861", title: "Unification of Italy (Risorgimento)", description: "Only ~2.5% of Italians spoke standard Italian daily; nationwide schooling spreads standard Tuscan." },
      { year: "1954", title: "RAI Television Unification", description: "National television broadcasts play a pivotal role in standardizing spoken Italian across regional dialects." }
    ],
    etiquette: {
      dos: [
        { rule: "Drink cappuccino exclusively in the morning", context: "Ordering a cappuccino after 11:00 AM or after a heavy meal is seen as digestive heresy." },
        { rule: "Say 'Permesso' when entering someone's home", context: "Asking permission to step across the threshold is courteous etiquette." },
        { rule: "Dress with 'Bella Figura' (style & poise)", context: "Looking polished and well-groomed reflects personal pride and respect for others." },
        { rule: "Twirl spaghetti using only your fork", context: "Never use a spoon or knife to assist with spaghetti; curl small amounts against the curve of the plate." },
        { rule: "Greet shopkeepers with 'Buongiorno' / 'Buonasera'", context: "Acknowledge the merchant as you enter and leave with 'Arrivederci'." }
      ],
      donts: [
        { rule: "Don't put pineapple or chicken on pizza", context: "Traditional Italian gastronomy respects ingredient integrity; poultry or fruit toppings are considered insults." },
        { rule: "Don't break dry pasta before boiling", context: "Snapping long pasta in half before dropping it into the pot is culinary sacrilege." },
        { rule: "Don't ask for grated parmesan cheese on seafood pasta", context: "Cheese overwhelms delicate fish and seafood flavors ('formaggio sul pesce è vietato')." },
        { rule: "Don't rush an espresso at the bar", context: "Drink it standing in two or three warm sips, chat for 30 seconds, and leave with grace." },
        { rule: "Don't walk outside with wet hair ('colpo d'aria')", context: "Italians believe an atmospheric draft or wet hair causes cervical neck pain and chills." }
      ]
    },
    quiz: {
      badgeId: "badge-it-culture",
      badgeTitle: "Italian Renaissance Virtuoso",
      badgeIcon: "🇮🇹",
      xpReward: 50,
      questions: [
        {
          id: "it-q1",
          question: "Quale autore ha reso il volgare fiorentino la base della lingua italiana con la sua opera?",
          options: ["Petrarca", "Dante Alighieri", "Boccaccio", "Machiavelli"],
          correctIndex: 1,
          explanation: "Dante Alighieri con la Divina Commedia è considerato il padre della lingua italiana."
        },
        {
          id: "it-q2",
          question: "In quale momento della giornata è consuetudine bere il cappuccino in Italia?",
          options: ["Dopo cena a mezzanotte", "Esclusivamente al mattino per colazione", "Durante il pranzo con la bistecca", "Solo nei giorni festivi"],
          correctIndex: 1,
          explanation: "Il cappuccino è una bevanda mattutina per via del latte abbondante, sconsigliato dopo pasti pesanti."
        },
        {
          id: "it-q3",
          question: "Cosa non si deve mai aggiungere alla pasta con i frutti di mare?",
          options: ["L'olio extravergine d'oliva", "Il prezzemolo fresco", "Il formaggio parmigiano grattugiato", "L'aglio"],
          correctIndex: 2,
          explanation: "La tradizione culinaria italiana vieta tassativamente il formaggio sul pesce."
        },
        {
          id: "it-q4",
          question: "Cosa significa il concetto culturale di 'Fare una bella figura'?",
          options: ["Disegnare un bel ritratto", "Presentarsi con eleganza, decoro e buone maniere", "Comprare vestiti costosi", "Arrivare sempre in ritardo"],
          correctIndex: 1,
          explanation: "La 'bella figura' è l'arte di presentarsi al meglio con decoro, grazia ed educazione."
        },
        {
          id: "it-q5",
          question: "Come si mangiano correttamente gli spaghetti?",
          options: ["Tagliandoli con il coltello", "Arrotolandoli con la sola forchetta", "Con il cucchiaio da minestra", "Bevendoli con la cannuccia"],
          correctIndex: 1,
          explanation: "Gli spaghetti si arrotolano esclusivamente sui rebbi della forchetta."
        }
      ]
    }
  },

  ja: {
    timeline: [
      { year: "400 AD", title: "Introduction of Chinese Characters (Kanji)", description: "Kanji enters Japan via Korea and China, laying the written foundation for Yamato Japanese." },
      { year: "800 AD", title: "Invention of Hiragana & Katakana", description: "Phonetic kana scripts evolve from cursive kanji; women court writers pioneer classical Japanese prose." },
      { year: "1008", title: "The Tale of Genji (Murasaki Shikibu)", description: "The world's first novel is written in native kana, establishing literary aesthetics (mono no aware)." },
      { year: "1868", title: "Meiji Restoration & Gembun'itchi", description: "Movement to align spoken and written Japanese; thousands of modern scientific terms (wasei-kango) coined." },
      { year: "1946", title: "Post-War Script Reform (Tōyō Kanji)", description: "Japanese Ministry of Education standardizes official kanji lists and horizontal left-to-right writing." }
    ],
    etiquette: {
      dos: [
        { rule: "Take off your shoes when entering homes and tatami rooms", context: "Step out of shoes at the genkan without letting your socks touch the lower floor; slide into slippers." },
        { rule: "Bow with appropriate angle and posture (Ojigi)", context: "A 15-degree bow for casual greetings (eshaku), 30 degrees for respect (keirei), and 45 degrees for deep apologies." },
        { rule: "Say 'Itadakimasu' and 'Gochisousama'", context: "Express gratitude for nature and cooks before ('Itadakimasu') and after meals ('Gochisousama deshita')." },
        { rule: "Hold business cards with both hands (Meishi koukan)", context: "Receive cards with two hands, read them attentively, and place them carefully in front of you." },
        { rule: "Slurp noodles enthusiastically", context: "Slurping cools ramen and soba noodles while aerating broth, demonstrating appreciation to the chef." }
      ],
      donts: [
        { rule: "Don't stick chopsticks upright in rice (Tsukitate-bashi)", context: "This mirrors funeral incense burning (makura-gohan) and is a severe taboo." },
        { rule: "Don't pass food chopstick-to-chopstick (Hashi-watashi)", context: "Directly passing food between chopsticks mimics bone-handling cremation rites." },
        { rule: "Don't talk on the phone inside trains or subways", context: "Trains are quiet communal zones; switch your phone to 'manner mode' and text silently." },
        { rule: "Don't tip in restaurants or taxis", context: "Exceptional service (omotenashi) is included; leaving extra money confuses staff who may run after you to return it." },
        { rule: "Don't walk around while eating street food", context: "Eat your takoyaki or ice cream next to the stall and dispose of trash in their bin." }
      ]
    },
    quiz: {
      badgeId: "badge-ja-culture",
      badgeTitle: "Samurai & Edo Scholar",
      badgeIcon: "🇯🇵",
      xpReward: 50,
      questions: [
        {
          id: "ja-q1",
          question: "平安時代に紫式部によって書かれた、世界最古の長編小説は何ですか？",
          options: ["枕草子", "源氏物語", "平家物語", "古事記"],
          correctIndex: 1,
          explanation: "紫式部が11世紀初頭に執筆した『源氏物語』は世界最古の長編小説として高く評価されています。"
        },
        {
          id: "ja-q2",
          question: "食事の前に命と料理人へ感謝を込めて言う言葉は何ですか？",
          options: ["ごちそうさまでした", "いただきます", "こんにちは", "おやすみなさい"],
          correctIndex: 1,
          explanation: "「いただきます」は命をいただくことへの敬意と感謝を示す日本の伝統的な挨拶です。"
        },
        {
          id: "ja-q3",
          question: "ご飯の上に箸を垂直に突き刺す行為（突き立て箸）がタブーとされる理由は何ですか？",
          options: ["ご飯が冷めてしまうから", "仏教の葬儀（枕ご飯）を連想させるから", "お茶碗が割れるから", "箸が汚れるから"],
          correctIndex: 1,
          explanation: "葬儀の際に死者の枕元に供える枕ご飯と同じ形式になるため、強い不吉のタブーとされています。"
        },
        {
          id: "ja-q4",
          question: "日本のレストランでチップを置かない理由は何ですか？",
          options: ["サービスが悪いから", "おもてなし精神としてサービスが価格に含まれているから", "法律で禁止されているから", "店員がお金を受け取れないから"],
          correctIndex: 1,
          explanation: "「おもてなし」の心に基づき、最善のサービスを提供することが基本と考えられているためチップは不要です。"
        },
        {
          id: "ja-q5",
          question: "日本の電車内でマナーとされる行動はどれですか？",
          options: ["大声で電話通話する", "マナーモードにして通話を控える", "通路で踊る", "音楽をスピーカーで流す"],
          correctIndex: 1,
          explanation: "車内アナウンスでも案内される通り、マナーモードに設定し通話は控えるのが公共マナーです。"
        }
      ]
    }
  }
};

export function getCultureExtended(langCode) {
  return CULTURE_EXTENDED[langCode] || CULTURE_EXTENDED.es;
}
