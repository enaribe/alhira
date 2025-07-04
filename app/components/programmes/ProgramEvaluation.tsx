import Image from 'next/image';

const evaluationData = {
  title: 'Évaluation & Diplôme',
  sections: [
    {
      title: 'Évaluation Continue',
      icon: '/assets/icons/star.svg',
      points: [
        'Lecture et tajwīd',
        'Mémorisation (ḥifẓ)',
        'Compréhension théorique',
        'Participation en classe',
      ],
    },
    {
      title: 'Examens de Fin',
      icon: '/assets/icons/star.svg',
      points: [
        'Examen oral de récitation',
        'Test écrit théorique',
        'Contrôle de mémorisation',
        'Évaluation du tajwīd',
      ],
    },
    {
      title: 'Certification',
      icon: '/assets/icons/star.svg',
      points: [
        'Attestation après chaque niveau',
        'Certificat final de la Faculté du Coran',
        'Validation si réussite des 3 niveaux',
        'Reconnaissance officielle',
      ],
    },
  ],
};

const EvaluationCard = ({ section }: { section: (typeof evaluationData.sections)[0] }) => (
  <div className="bg-[#0F3A42]/5 border border-[#D7E2ED] rounded-xl p-5 flex-1 min-w-[300px]">
    <div className="flex items-center gap-3 mb-5">
      <Image src={section.icon} alt="" width={23} height={22} className="opacity-70"/>
      <h3 className="font-grange font-bold text-xl text-[#0F3A42]">{section.title}</h3>
    </div>
    <ul className="list-disc list-inside space-y-2 text-sm font-medium text-[#0F3A42] pl-1">
      {section.points.map(point => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  </div>
);

const ProgramEvaluation = () => (
    <div className="max-w-6xl mx-auto bg-white border border-[#D7E2ED] rounded-2xl overflow-hidden">
        <div className="p-6 px-8 border-b border-[#D7E2ED]">
            <h2 className="font-grange font-extrabold text-3xl text-[#0F3A42]">
                {evaluationData.title}
            </h2>
        </div>
        <div className="p-8 flex flex-col md:flex-row gap-6 justify-between">
            {evaluationData.sections.map(section => (
                <EvaluationCard key={section.title} section={section} />
            ))}
        </div>
    </div>
);

export default ProgramEvaluation; 