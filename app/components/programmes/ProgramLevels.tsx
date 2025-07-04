import Image from 'next/image';

interface Level {
  title: string;
  duration: string;
  topics: string[];
  activities: string;
}

interface LevelCardProps {
  level: Level;
}

const LevelCard: React.FC<LevelCardProps> = ({ level }) => (
  <div className="relative w-full max-w-[361px] h-[491px]">
    <Image
      src="/images/svgs/card-bg.svg"
      alt=""
      layout="fill"
      objectFit="contain"
      className="z-0"
    />
    <div className="relative z-10 p-8 pt-20 h-full flex flex-col text-center">
      
      <h4 className="text-2xl font-bold text-[#489EAF] mb-2">{level.title}</h4>
      
      <div className="bg-[#F6F8F9] inline-flex items-center gap-2 text-sm text-[#0F3A42] px-4 py-2 rounded-full border border-black-300 mx-auto mb-4">
        <Image src="/assets/icons/clock.svg" alt="Durée" width={16} height={16} />
        <span>Durée : {level.duration}</span>
      </div>
      
      <ul className="space-y-2 mb-6 list-disc list-inside text-sm text-[#0F3A42] text-left pl-4">
        {level.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>

      <div className="bg-[#F6F8F9] p-4 rounded-xl text-sm mt-auto">
        <p className="font-bold text-[#489EAF] mb-1">Activités pédagogiques</p>
        <p className="text-[#0F3A42]">{level.activities}</p>
      </div>
    </div>
  </div>
);

const ProgramLevels = () => {
  const levels: Level[] = [
    {
      title: 'Niveau 1 – Débutant',
      duration: '6 mois',
      topics: [
        'Introduction à la Sīrah',
        'Sources fiables de la biographie prophétique',
        'Contexte historique de la Péninsule arabique',
        'Enfance et jeunesse du Prophète ﷺ',
        'Début de la mission prophétique',
      ],
      activities: 'Chronologie simplifiée • Quiz sur les événements clés • Fiches de vocabulaire',
    },
    {
      title: 'Niveau 2 – Intermédiaire',
      duration: '6 mois',
      topics: [
        'Période mecquoise approfondie',
        'Le voyage à Ṭā\'if',
        'Le miracle du voyage nocturne (al-Isrā\' wa al-Miʿrāj)',
        'L\'Hégire (Hijrah)',
        'Début de la période médinoise',
      ],
      activities: 'Chronologie simplifiée • Quiz sur les événements clés • Fiches de vocabulaire',
    },
    {
      title: 'Niveau 3 – Avancé',
      duration: '6 mois',
      topics: [
        'Grandes batailles et pactes',
        'Le traité de Hudaybiyyah',
        'La conquête de La Mecque',
        'La dernière phase de la vie prophétique',
        'Leçons tirées de la sīrah',
      ],
      activities: 'Chronologie simplifiée • Quiz sur les événements clés • Fiches de vocabulaire',
    },
  ];

  return (
    <section className="py-16 px-8">
      <h2 className="text-4xl font-bold font-grange text-center text-[#0F3A42] mb-12">
        Programme d'Études
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center items-center">
        {levels.map((level) => (
          <LevelCard key={level.title} level={level} />
        ))}
      </div>
    </section>
  );
};

export default ProgramLevels; 