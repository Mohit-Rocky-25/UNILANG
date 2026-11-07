// Dedicated practice drills for tricky phonemes across 5 core languages
// Each drill contains phonetic IPA notations, articulation coaching tips, and word items

export const PHONEME_DRILLS = {
  es: [
    {
      id: "es-trill-r",
      phoneme: "[r] / [rr]",
      title: "Alveolar Trill (Rolled R)",
      tip: "Touch the tip of your tongue to the roof of your mouth just behind your front teeth and blow air to make it vibrate.",
      items: [
        { word: "Perro", phonetic: "ˈpe.ro", translation: "Dog", sentence: "El perro corre en el parque." },
        { word: "Ferrocarril", phonetic: "fe.ro.kaˈril", translation: "Railway", sentence: "El ferrocarril llega puntual." },
        { word: "Rápido", phonetic: "ˈra.pi.ðo", translation: "Fast", sentence: "El coche es muy rápido." }
      ]
    },
    {
      id: "es-jota",
      phoneme: "[x]",
      title: "Spanish Jota (Voiceless Velar Fricative)",
      tip: "Pronounced in the back of the throat, like a soft clearing of the throat, stronger than the English 'h'.",
      items: [
        { word: "Jamón", phonetic: "xaˈmon", translation: "Ham", sentence: "Me gusta el jamón ibérico." },
        { word: "Ojo", phonetic: "ˈo.xo", translation: "Eye", sentence: "Abre bien el ojo." },
        { word: "Trabajo", phonetic: "tɾaˈβa.xo", translation: "Work / Job", sentence: "Voy al trabajo temprano." }
      ]
    }
  ],
  fr: [
    {
      id: "fr-nasal-vowels",
      phoneme: "[ɑ̃] / [ɔ̃] / [ɛ̃]",
      title: "French Nasal Vowels",
      tip: "Lower the soft palate so air passes through both the nose and mouth. Do not pronounce a hard 'n' consonant at the end.",
      items: [
        { word: "Croissant", phonetic: "kʁwa.sɑ̃", translation: "Croissant", sentence: "Un bon croissant au beurre." },
        { word: "Maison", phonetic: "mɛ.zɔ̃", translation: "House", sentence: "C'est une belle maison." },
        { word: "Vin", phonetic: "vɛ̃", translation: "Wine", sentence: "Un verre de vin rouge." }
      ]
    },
    {
      id: "fr-uvular-r",
      phoneme: "[ʁ]",
      title: "French Uvular R",
      tip: "Vibrate the back of your tongue against your uvula. Avoid the English rolling tongue tip.",
      items: [
        { word: "Merci", phonetic: "mɛʁ.si", translation: "Thank you", sentence: "Merci beaucoup pour l'aide." },
        { word: "Paris", phonetic: "pa.ʁi", translation: "Paris", sentence: "Paris est magnifique." },
        { word: "Rouge", phonetic: "ʁuʒ", translation: "Red", sentence: "La pomme est rouge." }
      ]
    }
  ],
  de: [
    {
      id: "de-umlauts",
      phoneme: "[øː] / [yː]",
      title: "German Umlauts (ö / ü)",
      tip: "Shape your lips to say 'O' or 'OO', but pronounce an 'E' or 'EE' with your tongue.",
      items: [
        { word: "Schön", phonetic: "ʃøːn", translation: "Beautiful / Nice", sentence: "Das Wetter ist heute schön." },
        { word: "Über", phonetic: "ˈyː.bɐ", translation: "Over / Above", sentence: "Die Brücke über den Fluss." },
        { word: "Mädchen", phonetic: "ˈmɛːt.çn̩", translation: "Girl", sentence: "Das Mädchen liest ein Buch." }
      ]
    },
    {
      id: "de-ich-laut",
      phoneme: "[ç]",
      title: "German Ich-Laut (Soft Ch)",
      tip: "After vowels 'e', 'i', 'ä', 'ö', 'ü', hiss softly with the middle of your tongue against the hard palate.",
      items: [
        { word: "Ich", phonetic: "ʔɪç", translation: "I", sentence: "Ich lerne gern Sprachen." },
        { word: "Nicht", phonetic: "nɪçt", translation: "Not", sentence: "Das ist nicht schwer." },
        { word: "Möchte", phonetic: "ˈmœç.tə", translation: "Would like", sentence: "Ich möchte ein Wasser." }
      ]
    }
  ],
  it: [
    {
      id: "it-geminates",
      phoneme: "Double Consonants",
      title: "Consonant Gemination (Doubling)",
      tip: "Hold the consonant twice as long before releasing it. 'Notte' has a distinct pause at the 'tt'.",
      items: [
        { word: "Notte", phonetic: "ˈnɔt.te", translation: "Night", sentence: "Buona notte a tutti." },
        { word: "Cappuccino", phonetic: "kapputˈtʃiːno", translation: "Cappuccino", sentence: "Un cappuccino caldo per favore." },
        { word: "Pizza", phonetic: "ˈpit.tsa", translation: "Pizza", sentence: "La pizza margherita è deliziosa." }
      ]
    }
  ],
  ja: [
    {
      id: "ja-pitch-mora",
      phoneme: "Mora Timing & Pitch",
      title: "Mora Equidistance & Pitch Accent",
      tip: "Each Japanese mora takes equal time (e.g. 'To-o-kyo-o' has 4 beats). Notice high vs low pitch contours.",
      items: [
        { word: "東京 (Tōkyō)", phonetic: "To-o-kyo-o", translation: "Tokyo", sentence: "東京へ新幹線で行きます。" },
        { word: "箸 (Hashi - chopsticks)", phonetic: "Há-shi (High-Low)", translation: "Chopsticks", sentence: "お箸を使って食べます。" },
        { word: "橋 (Hashi - bridge)", phonetic: "ha-shí (Low-High)", translation: "Bridge", sentence: "橋を渡ります。" }
      ]
    }
  ]
};
