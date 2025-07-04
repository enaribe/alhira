import Image from 'next/image';

const level1 = {
  title: 'Niveau 1 : Débutant',
  duration: '6 mois',
  objectives: ['Lecture', 'Ecriture', 'Expression', 'Grammaire'],
  modules: [
    {
      title: 'Lecture et écriture',
      points: [
        "Apprentissage de l'alphabet arabe avec les voyelles",
        'Écriture des lettres seules et liées',
        'Lecture de mots et phrases simples',
        'Exercices d\'orthographe (dictées – recopies)',
      ],
    },
    {
      title: 'Grammaire de base',
      points: [
        'La phrase nominale (ismiyya) et verbale (fiʿliyya)',
        'Le sujet (al-mubtada) et le prédicat (al-khabar)',
        'Le verbe et le sujet (fiʿl – fāʿil)',
        'Les genres (masculin/féminin), singulier/double/pluriel',
      ],
    },
    {
        title: 'Expression',
        points: [
            'Formulation de phrases simples',
            'Présenter une personne, une chose, une action',
            'Jeux de rôle, répétitions, activités ludiques',
        ]
    }
  ],
};

const level2 = {
    title: 'Niveau 2 : Intermédiaire',
    duration: '6 mois',
    objectives: ["Compréhension", "Conjugaison", "Rédaction", "Analyse"],
    modules: [
      {
        title: 'Lecture et compréhension',
        points: [
            'Lecture de petits textes (histoires, dialogues, extraits religieux simples)',
            'Identification du vocabulaire et des idées principales',
            'Réponses à des questions de compréhension',
        ],
      },
      {
        title: 'Grammaire intermédiaire',
        points: [
            "Le complément d'objet (mafʿūl bih)",
            'Les pronoms personnels et démonstratifs',
            'Les négations (lā, mā, laysa, etc.)',
            'Introduction aux cas grammaticaux (rafʿ, naṣb, jarr)',
        ]
      },
      {
        title: 'Conjugaison',
        points: [
          'Conjugaison du verbe au passé, présent et impératif',
          'Conjugaison des verbes réguliers (thulāthī mujarrad)',
          'Pratique orale et écrite',
        ],
      },
    ],
  };

  const level3 = {
    title: 'Niveau 3 : Maîtrise',
    duration: '6 mois',
    objectives: ["Approche comparative, cas contemporains et fondements juridiques approfondis."],
    modules: [
      {
        title: 'Fiqh Avancé',
        points: [
            "Mariage : khulʿ, 'iddah, garde d'enfants",
            "Aliments et abattage : ḥalāl / ḥarām",
            "Transactions modernes : banque, assurance, crédit",
            "Pèlerinage : questions avancées (ḥajj de la femme, du malade, erreurs, agences de voyage...)"
        ],
      },
      {
        title: 'Uṣūl al-Fiqh Avancé',
        points: [
            "Al-'Āmm wa al-Khāṣṣ – Al-Mutlaq wa al-Muqayyad",
            "L'intérêt public (al-maṣlaḥa), les coutumes ('urf)",
            "Raisonnement juridique dans les cas nouveaux (furū')",
            "Différences entre les écoles (madhāhib)",
        ],
      },
    ],
  };

const ModuleCard = ({ module }: { module: { title: string; points: string[] } }) => (
    <div className="relative w-[326px] h-[338px] flex-shrink-0">
      <Image src="/images/svgs/card-mosque-bg.svg" alt="" layout="fill" objectFit="contain" className="z-0" />
      <div className="relative z-10 pt-24 pb-8 px-4 h-full flex flex-col items-center text-center">
        <h4 className="text-lg font-bold text-[#489EAF] mb-4">{module.title}</h4>
        <ul className="space-y-1 text-sm text-[#0F3A42] text-left list-disc list-inside">
          {module.points.map(point => <li key={point}>{point}</li>)}
        </ul>
      </div>
    </div>
  );

const LevelSection = ({ level }: { level: any }) => (
  <div className="bg-white rounded-2xl border border-[#D7E2ED] shadow-sm overflow-hidden">
    <div className="bg-[#0F3A42] text-white flex items-center p-5 px-10 gap-6">
        <h3 className="text-2xl font-bold">{level.title}</h3>
        <div className="flex items-center gap-2 text-sm border border-white/80 px-4 py-1 rounded-full bg-white/10">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 4.5V9L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Durée : {level.duration}</span>
        </div>
    </div>
    <div className="p-10">
        <div className="bg-[#F2F4F6] p-4 rounded-lg mb-8">
            <h4 className="font-bold text-[#0F3A42] mb-2 text-sm">Objectifs :</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#0F3A42] font-semibold">
                {level.objectives.map((obj: string) => <span key={obj}>{obj}</span>)}
            </div>
        </div>
        <div className="flex flex-row gap-10 justify-center items-end">
          {level.modules.map((module: any) => <ModuleCard key={module.title} module={module} />)}
        </div>
    </div>
    <div className="bg-gradient-to-b from-white to-[#EBF2F3] border-t border-[#D7E2ED] py-3 text-center">
      <button className="font-grange text-xl text-[#489EAF] hover:underline">S'inscrire au programme</button>
    </div>
  </div>
);

const ArabeProgramDetails = () => {
  const levels = [level1, level2, level3];

  return (
    <section className="py-16 px-8">
      <h2 className="text-4xl font-bold font-grange text-center text-[#0F3A42] mb-12">
        Programme d'Études
      </h2>
      <div className="max-w-6xl mx-auto space-y-16">
        {levels.map(level => <LevelSection key={level.title} level={level} />)}
      </div>
    </section>
  );
};

export default ArabeProgramDetails; 