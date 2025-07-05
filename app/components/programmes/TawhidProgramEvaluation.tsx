import Image from 'next/image';

const evaluationData = {
  title: 'Évaluation & Diplôme',
  sections: [
    {
      title: 'Évaluations par Niveaux',
      icon: '/assets/icons/star.svg',
      description: "Contrôles écrits et oraux réguliers pour valider la compréhension des concepts fondamentaux du tawḥīd et de la ʿaqīdah.",
    },
    {
      title: 'Projet Final',
      icon: '/assets/icons/star.svg',
      description: "Exposé final ou mini-mémoire au niveau avancé sur un sujet d'actualité lié à la croyance islamique authentique.",
    },
    {
      title: 'Certification',
      icon: '/assets/icons/star.svg',
      description: "Diplôme de fin de cycle attestant de la maîtrise des fondements du tawḥīd selon la voie des pieux prédécesseurs.",
    },
  ],
};

const EvaluationCard = ({ section }: { section: (typeof evaluationData.sections)[0] }) => (
  <div className="bg-[#0F3A42]/5 border border-[#D7E2ED] rounded-xl p-5 flex-1 min-w-[300px]">
    <div className="flex items-center gap-3 mb-5">
      <Image src={section.icon} alt="" width={23} height={22} className="opacity-70"/>
      <h3 className="font-grange font-bold text-xl text-[#0F3A42]">{section.title}</h3>
    </div>
    <p className="text-sm font-medium text-[#0F3A42] pl-1 leading-relaxed">
        {section.description}
    </p>
  </div>
);

const TawhidProgramEvaluation = () => (
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

export default TawhidProgramEvaluation; 