import Image from 'next/image';
import CardMosqueBg from '../svgs/CardMosqueBg';

const level1 = {
  title: 'Niveau 1 : Initiation',
  duration: '3 à 6 mois',
  objectives: ['Lecture correcte du Coran', 'Apprentissage des règles de base du tajwīd', 'Premières sourates mémorisées', 'Introduction aux sciences du Coran'],
  modules: [
    {
      title: 'Tajwīd pratique',
      points: ['Makharij al-ḥurūf', 'Sifāt al-ḥurūf', 'Règles du nūn sākin et du mīm sākin', 'Madd naturel (madd ṭabīʿī)'],
    },
    {
      title: 'Mémorisation (ḥifẓ)',
      points: ["Juz 'Amma (sourate an-Nās à an-Naba')", 'Méthodes de mémorisation quotidienne'],
    },
    {
      title: 'Sciences du Coran',
      points: ["Définition du Coran", "La révélation : al-Waḥy", "Les premières révélations", "Les noms du Coran dans le Coran", "La vertu de la lecture et de l'apprentissage"],
    },
  ],
};

const level2 = {
  title: 'Niveau 2 : Consolidation',
  duration: '6 mois',
  objectives: [
    'Application des règles intermédiaires de tajwīd',
    "Mémorisation d'un second Juz",
    'Introduction à la compilation du Coran',
    'Étude des types de versets',
  ],
  modules: [
    {
      title: 'Tajwīd avancé',
      points: [
        "Règles de l'idghām (avec/sans ghunna)",
        "Règles de l'ikhfā'",
        'Qalqala – Ahkām al-mīm – Ahkām al-lām',
        'Madds secondaires : madd lājīmī, madd munfaṣil',
      ],
    },
    {
      title: 'Mémorisation (ḥifẓ)',
      points: [
        'Juz Tabārak (al-Mulk à al-Mursalāt)',
        'Plan de révision quotidien et hebdomadaire',
      ],
    },
    {
      title: 'Sciences du Coran',
      points: [
        "Compilation à l'époque du Prophète ﷺ",
        "Les 7 aḥruf et les qirā'āt",
        'Sourates mecquoises et médinoises',
        'Causes de révélation (Asbāb an-Nuzūl)',
      ],
    },
  ],
};

const level3 = {
    title: 'Niveau 3 : Maîtrise',
    duration: '6 mois',
    objectives: [
      'Maîtriser les règles avancées de tajwīd',
      'Approfondir les sciences du Coran',
      'Introduction au Tafsīr',
    ],
    modules: [
      {
        title: 'Tajwīd expert',
        points: [
          'Règles du waqf (pause)',
          'Hamzat al-waṣl / hamzat al-qaṭʿ',
          'Nabr – Imāla – Sakt',
          'Règles selon la lecture de Ḥafṣ',
        ],
      },
      {
        title: 'Mémorisation (ḥifẓ)',
        points: [
          'Juz 27 ou 26 (au choix de l\'étudiant)',
          'Révision complète des juz précédents',
          'Contrôle individuel hebdomadaire',
        ],
      },
      {
        title: 'Sciences approfondies',
        points: [
          'Types de versets : muḥkam / mutashābih',
          'Nāsikh wa al-mansūkh',
          "L'ijāz du Coran (inimitabilité)",
          'L\'ordre des sourates et versets',
          'Introduction au Tafsīr et ses types',
        ],
      },
    ],
  };

const ModuleCard = ({ module }: { module: { title: string; points: string[] } }) => (
    <div className="relative w-full max-w-[326px] h-[420px] lg:h-[400px] flex-shrink-0 mx-auto">
      <CardMosqueBg className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 pt-24 pb-8 px-4 h-full flex flex-col items-center text-center">
        <h4 className="text-lg font-bold text-[#489EAF] mb-4">{module.title}</h4>
        <ul className="w-full space-y-1 text-sm text-[#0F3A42] text-left list-disc list-inside">
          {module.points.map(point => <li key={point}>{point}</li>)}
        </ul>
      </div>
    </div>
  );

const LevelSection = ({ level }: { level: typeof level1 }) => (
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
                {level.objectives.map(obj => <span key={obj}>{obj}</span>)}
            </div>
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap gap-10 justify-center items-end">
          {level.modules.map(module => <ModuleCard key={module.title} module={module} />)}
        </div>
    </div>
    <div className="bg-gradient-to-b from-white to-[#EBF2F3] border-t border-[#D7E2ED] py-3 text-center">
                    <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeJR9IpREgaYC6NM4RzC1ch2q0azYbC40RfEVx_fY7omZclLg/viewform?usp=dialog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-grange text-xl text-[#489EAF] hover:underline cursor-pointer"
              >
                S'inscrire au programme
              </a>
    </div>
  </div>
);

const CoranProgramDetails = () => {
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

export default CoranProgramDetails; 