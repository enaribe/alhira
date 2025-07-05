import Image from 'next/image';

const evaluationData = {
  title: 'Évaluation & Diplôme',
  sections: [
    {
      title: 'Mémorisation Contrôlée',
      icon: '/assets/icons/star.svg',
      description: "Évaluation orale et écrite de la mémorisation des hadiths avec vérification de la compréhension et de l'application pratique.",
    },
    {
      title: 'Commentaire Écrit',
      icon: '/assets/icons/star.svg',
      description: "Rédaction d'un commentaire détaillé d'un hadith choisi, démontrant la maîtrise des sciences du hadith.",
    },
    {
      title: 'Certificat Final',
      icon: '/assets/icons/star.svg',
      description: "Examen final et remise du certificat de la Faculté du Ḥadīth attestant de la maîtrise des sciences prophétiques.",
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

const HadithProgramEvaluation = () => (
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

export default HadithProgramEvaluation; 